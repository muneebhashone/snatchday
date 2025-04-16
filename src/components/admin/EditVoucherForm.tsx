"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  useUpdateVoucher,
  useGetVoucherById,
  useGetProducts,
  useGetCategories,
} from "@/hooks/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
import { CalendarIcon, Loader2 } from "lucide-react";

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
    products: z.array(z.string()),
    categories: z.array(z.string()),
    from: z.string().min(1, "Start date is required"),
    until: z.string().min(1, "End date is required"),
  })
  .superRefine((val, ctx) => {
    // End date must be after start date
    if (new Date(val.until) <= new Date(val.from)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be greater than start date",
        path: ["until"],
      });
    }

    // Value must not exceed 100 when type is PERCENTAGE
    if (val.type === "PERCENTAGE" && val.value > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Percentage value cannot exceed 100%",
        path: ["value"],
      });
    }
  });

interface EditVoucherFormProps {
  voucherId: string;
}

export function EditVoucherForm({ voucherId }: EditVoucherFormProps) {
  const router = useRouter();
  const { mutate: updateVoucher, isPending } = useUpdateVoucher(voucherId);
  const { data: voucherResponse } = useGetVoucherById(voucherId);
  const { data: productsResponse } = useGetProducts({
    limit: "99999999"
  });
  const { data: categoriesResponse } = useGetCategories({
    limit: "99999999"
  });

  const products = productsResponse?.data?.products || [];
  const categories = categoriesResponse?.data?.categories || [];

  const voucher = voucherResponse?.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: voucher?.from || "",
      until: voucher?.until || "",
      code: voucher?.code || "",
      name: voucher?.name || "",
      type: voucher?.type || "FIXED",
      estate: voucher?.estate || "",
      value: voucher?.value || 0,
      registered: voucher?.registered || false,
      noShipping: voucher?.noShipping || false,
      products: voucher?.products || [],
      categories: voucher?.categories || [],
      // minOrderValue: voucher?.minOrderValue || 0,
      // maxUses: voucher?.maxUses || 0,
    },
  });


  useEffect(() => {
    if (voucher) {
      form.reset({
        from: voucher.from,
        until: voucher.until,
        code: voucher.code,
        name: voucher.name,
        type: voucher.type,
        estate: voucher.estate,
        value: voucher.value,
        registered: voucher.registered,
        noShipping: voucher.noShipping,
        products: voucher.products || [],
        categories: voucher.categories || [],
        expiryDate: voucher.expiryDate
          ? new Date(voucher.expiryDate)
          : undefined,
        // minOrderValue: voucher.minOrderValue,
        // maxUses: voucher.maxUses,
      });
    }
  }, [voucher, form]);

  const watchProducts = form.watch("products");
  const watchCategories = form.watch("categories");

  const isProductsSelected = watchProducts.length > 0;
  const isCategoriesSelected = watchCategories.length > 0;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values)
    updateVoucher(
      { ...values },
      {
        onSuccess: () => {
          toast.success("Voucher updated successfully");
          router.push("/admin/voucher");
          router.refresh();
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update voucher");
        },
      }
    );
  }

  if (!voucher) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
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
                      {products?.length > 0 && products.map((product) => (
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
                      const product = products?.find((p) => p._id === productId);
                      if (!product || !product.name) return null;

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
                      {categories?.length > 0 && categories.map((category) => (
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
                      console.log(categoryId,"categoryId")
                      const category = categories?.find(
                        (c) => c._id === categoryId
                      );
                      console.log(category,"category")
                      if (!category || !category.name) return null;
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
                                field.value.filter((id) => id !== categoryId)
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
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
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
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
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
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            className="hover:bg-primary"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Voucher
          </Button>
        </div>
      </form>
    </Form>
  );
}
