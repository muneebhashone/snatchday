"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
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
import { CalendarIcon } from "lucide-react";

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
        if (val === '' || val === null || val === undefined) return undefined;
        const numberVal = Number(val);
        return isNaN(numberVal) ? undefined : numberVal;
      },
      z.number({
        required_error: "Value is required",
        invalid_type_error: "Value must be a number"
      }).min(1, "Value must be positive or greater than 0")
    ),
    registered: z.boolean(),
    noShipping: z.boolean(),
    products: z.array(z.string()).min(1, "Product is required"),
    categories: z.array(z.string()).min(1, "Category is required"),
    from: z.string().min(1, "Valid From date is required"),
    until: z.string().min(1, "Valid Until date is required"),
    noOfUsage: z.coerce.number().min(1, "Number of usage must be at least 1"),
    usagePerUser: z.coerce.number().min(1, "Usage per user must be at least 1"),
  })
  .refine((data) => {
    const from = new Date(data.from);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return from >= today;
  }, {
    message: "Valid From date cannot be in the past",
    path: ["from"],
  })
  .refine((data) => {
    const from = new Date(data.from);
    const until = new Date(data.until);
    return until > from;
  }, {
    message: " Until date must be greater than  From date",
    path: ["until"],
  });



const VoucherForm = () => {
  const router = useRouter();
  const { mutate: createVoucher, isPending } = useCreateVoucher();
  const { data: productsResponse } = useGetProducts();
  const { data: categoriesResponse } = useGetCategories(
    {
      limit:'9999999'
    }
  );

  const products = productsResponse?.data?.products || [];
  const categories = categoriesResponse?.data?.categories || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "",
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
      createVoucher(values, {
        onSuccess: () => {
          toast.success("Voucher created successfully");
          form.reset();
          router.push("/admin/voucher");
        },
        onError: (error: Error) => {
          const errorMessage = error?.message || "Failed to create voucher";
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
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Voucher</h1>
        <p className="text-muted-foreground">
          Create a new discount voucher for your customers
        </p>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
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
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product._id} value={product._id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {field.value?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((productId) => {
                          const product = products.find(
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
                                    field.value.filter((id) => id !== productId)
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
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
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
                              <span className="text-sm">{category?.name}</span>
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
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Registered Users Only</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noShipping"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>No Shipping</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
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
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
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
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
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
                name="noOfUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Number of Usage
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
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

            <div className="flex justify-end space-x-4 pt-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Voucher"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VoucherForm;
