"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, getDate, setDate } from "date-fns";
import { toast } from "sonner";
import { useCreateVoucher } from "@/hooks/api";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/hooks/api";
import { useGetCategories } from "@/hooks/api";
import { CreateVoucherData } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";

const formSchema = z
  .object({
    code: z.string().min(3, "Code must be at least 3 characters"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    type: z.enum(["PERCENTAGE", "FIXED"], {
      required_error: "Voucher type is required",
    }),
    estate: z.string(),
    value: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const numberVal = Number(val);
        return isNaN(numberVal) ? undefined : numberVal;
      },
      z
        .number({
          required_error: "Value is required",
          invalid_type_error: "Value must be a number",
        })
        .min(1, "Value must be positive or greater than 0")
    ),
    registered: z.boolean(),
    noShipping: z.boolean(),
    products: z.array(z.string()),
    categories: z.array(z.string()),
    from: z.string().min(1, "Start date is required"),
    until: z.string().min(1, "End date is required"),
    noOfUsage: z.coerce.number().min(1, "Number of usage must be at least 1"),
    usagePerUser: z.coerce.number().min(1, "Usage per user must be at least 1"),
  })
  .superRefine((val, ctx) => {
    if (val.products.length === 0 && val.categories.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either products or categories must be selected",
        path: ["products"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either products or categories must be selected",
        path: ["categories"],
      });
    }

    if (new Date(val.until) <= new Date(val.from)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be greater than start date",
        path: ["until"],
      });
    }

    if (val.type === "PERCENTAGE" && val.value > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Percentage value cannot exceed 100%",
        path: ["value"],
      });
    }
  })
  .refine(
    (data) => {
      if (data.noOfUsage < data.usagePerUser) {
        return false;
      }
      return true;
    },
    {
      message: "Number of usage cannot be less than usage per user",
      path: ["noOfUsage"],
    }
  );
const VoucherForm = () => {
  const productList = useRef(null);
  const categoryList = useRef(null);
  const showProductList = () => {
    console.log("ok");
    console.log(productList.current.scrollTop, "productList");
    console.log(productList.current.scrollHeight);
    console.log(productList.current.clientHeight);
    console.log(
      productList.current.scrollHeight - productList.current.scrollTop
    );
  };
  const router = useRouter();
  const { mutate: createVoucher, isPending } = useCreateVoucher();
  const [productOffset, setProductOffset] = useState(0);
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const { data: productsResponse, isLoading } = useGetProducts({
    limit: "10",
    offset: productOffset.toString(),
    name: search,
  });
  const { data: categoriesResponse, isLoading: isCategoriesLoading } =
    useGetCategories({
      limit: "10",
      offset: categoryOffset.toString(),
      name: searchCategory,
    });

  const products = productsResponse?.data?.products || [];
  const categories = categoriesResponse?.data?.categories || [];
  const [productDataList, setProductDataList] = useState(products);
  const [categoryDataList, setCategoryDataList] = useState(categories);
  const totalProductCount = productsResponse?.data?.total || 0;
  const totalCategoryCount = categoriesResponse?.data?.total || 0;

  useEffect(() => {
    if (products.length > 0) {
      setProductDataList((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newProducts = products.filter((p) => !existingIds.has(p._id));
        return [...prev, ...newProducts];
      });
    }
  }, [productsResponse?.data?.products]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryDataList((prev) => {
        const existingIds = new Set(prev.map((c) => c._id));
        const newCategories = categories.filter((c) => !existingIds.has(c._id));
        return [...prev, ...newCategories];
      });
    }
  }, [categoriesResponse?.data?.categories]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "PERCENTAGE",
      estate: "",
      value: undefined,
      registered: false,
      noShipping: false,
      products: [],
      categories: [],
      from: "",
      until: "",
      noOfUsage: 1,
      usagePerUser: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const voucherData: CreateVoucherData = {
        code: values.code,
        name: values.name,
        type: values.type,
        value: values.value,
        estate: values.estate,
        registered: values.registered,
        noShipping: values.noShipping,
        products: values.products,
        categories: values.categories,
        from: values.from,
        until: values.until,
        noOfUsage: values.noOfUsage,
        usagePerUser: values.usagePerUser,
      };

      createVoucher(voucherData, {
        onSuccess: () => {
          toast.success("Voucher created successfully");
          form.reset();
          router.push("/admin/voucher");
        },
        onError: (error: Error) => {
          const errorMessage =
            error?.response?.data?.message || "Failed to create voucher";
          toast.error(errorMessage);
          console.error("Error creating voucher:", error);
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create voucher");
    }
  };

  const watchProducts = form.watch("products");
  const watchCategories = form.watch("categories");

  const isProductsSelected = watchProducts.length > 0;
  const isCategoriesSelected = watchCategories.length > 0;

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Voucher</h1>
          <p className="text-primary italic text-sm font-bold">
            <span className="text-green-500">*</span> either product or the
            category can be selected <span className="text-green-500">*</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/voucher")}
          >
            Discard
          </Button>
          <Button
            type="submit"
            form="voucher-form"
            disabled={isPending}
            className="hover:bg-primary"
          >
            {isPending ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              "Create Voucher"
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="voucher-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Voucher Information Section */}
            <div className="bg-white rounded-lg border p-6 col-span-2">
              <h2 className="text-lg font-semibold mb-6">
                Voucher Information
              </h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Code
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter voucher code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Name
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter voucher name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Type
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select voucher type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                          <SelectItem value="FIXED">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estate</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter estate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Voucher Settings Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Voucher Settings</h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Value
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter value"
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                          {...field}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="registered"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Registered Users Only
                          </FormLabel>
                          <FormDescription>
                            Restrict voucher to registered users
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="noShipping"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            No Shipping
                          </FormLabel>
                          <FormDescription>
                            Exclude shipping costs from voucher
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Products & Categories Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Products & Categories
              </h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Products
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            const currentValues = field.value || [];
                            if (!currentValues.includes(value)) {
                              field.onChange([...currentValues, value]);
                            }
                          }}
                          disabled={isCategoriesSelected}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select products" />
                          </SelectTrigger>
                          <SelectContent
                            onScrollCapture={(e) => {
                              const target = e.target as HTMLElement;
                              const isBottom =
                                target.scrollTop + target.clientHeight >=
                                target.scrollHeight - 10;

                              if (
                                isBottom &&
                                productDataList.length < totalProductCount &&
                                !isLoading
                              ) {
                                setProductOffset((prev) => prev + 10);
                              }
                            }}
                            ref={productList}
                            className="max-h-52"
                          >
                            <div className="h-full">
                              <div>
                                <Input
                                  placeholder="Search products"
                                  onChange={(e) => {
                                    setProductDataList([]);
                                    setSearch(e.target.value);
                                    setProductOffset(0);
                                  }}
                                />
                                {productDataList.map((product) => (
                                  <SelectItem
                                    key={product._id}
                                    value={product._id}
                                  >
                                    {product.name}
                                  </SelectItem>
                                ))}
                                {isLoading && (
                                  <Loader className="h-4 w-4 animate-spin mx-auto" />
                                )}
                              </div>
                            </div>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {field.value?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((productId) => {
                            const product = productDataList.find(
                              (p) => p._id === productId
                            );
                            return (
                              <div
                                key={productId}
                                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                              >
                                <span className="text-sm">{product?.name}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(
                                      field.value.filter(
                                        (id) => id !== productId
                                      )
                                    );
                                  }}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Categories
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            const currentValues = field.value || [];
                            if (!currentValues.includes(value)) {
                              field.onChange([...currentValues, value]);
                            }
                          }}
                          disabled={isProductsSelected}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select categories" />
                          </SelectTrigger>
                          <SelectContent
                            onScrollCapture={(e) => {
                              const target = e.target as HTMLElement;
                              const isBottom =
                                target.scrollTop + target.clientHeight >=
                                target.scrollHeight - 10;

                              if (
                                isBottom &&
                                categoryDataList.length < totalCategoryCount &&
                                !isCategoriesLoading
                              ) {
                                setCategoryOffset((prev) => prev + 10);
                              }
                            }}
                            ref={categoryList}
                            className="max-h-52"
                          >
                            <div className="h-full">
                              <Input
                                placeholder="Search products"
                                onChange={(e) => {
                                  setCategoryDataList([]);
                                  setSearchCategory(e.target.value);
                                  setCategoryOffset(0);
                                }}
                              />
                              {categoryDataList.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                              {isCategoriesLoading && (
                                <Loader className="h-4 w-4 animate-spin mx-auto" />
                              )}
                            </div>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {field.value?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((categoryId) => {
                            const category = categories.find(
                              (c) => c._id === categoryId
                            );
                            return (
                              <div
                                key={categoryId}
                                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                              >
                                <span className="text-sm">
                                  {category?.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(
                                      field.value.filter(
                                        (id) => id !== categoryId
                                      )
                                    );
                                  }}
                                  className="text-muted-foreground hover:text-foreground"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Validity Period Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Validity Period</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Valid From
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString())
                              }
                              disabled={(date) => {
                                const untilDate = form.getValues("until");
                                if (!untilDate) return date < new Date();
                                const until = new Date(untilDate);
                                return date >= until || date < new Date();
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="until"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Valid Until
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString())
                              }
                              disabled={(date) => {
                                const fromDate = form.getValues("from");
                                if (!fromDate) return date < new Date();
                                const from = new Date(fromDate);
                                from.setDate(from.getDate() + 1);

                                return date < from;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="noOfUsage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Number of Usage
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
                            type="number"
                            placeholder="Enter number of usage"
                            {...field}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="usagePerUser"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          Usage Per User
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
                            type="number"
                            placeholder="Enter usage per user"
                            {...field}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VoucherForm;
