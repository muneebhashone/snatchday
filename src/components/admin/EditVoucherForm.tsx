"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { useUpdateVoucher, useGetVoucherById, useGetProducts, useGetCategories } from "@/hooks/api";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminLayout from "./AdminLayout";

const formSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  estate: z.string(),
  value: z.coerce.number().min(0, "Value must be positive"),
  registered: z.boolean(),
  noShipping: z.boolean(),
  products: z.array(z.string()),
  categories: z.array(z.string()),
  expiryDate: z.date().optional(),
  minOrderValue: z.coerce.number().min(0, "Minimum order value must be positive"),
  maxUses: z.coerce.number().min(0, "Maximum uses must be positive"),
});

interface EditVoucherFormProps {
  voucherId: string;
}

export function EditVoucherForm({ voucherId }: EditVoucherFormProps) {
  const router = useRouter();
  const { mutate: updateVoucher, isPending } = useUpdateVoucher(voucherId);
  const { data: voucherResponse } = useGetVoucherById(voucherId);
  const { data: productsResponse } = useGetProducts();
  const { data: categoriesResponse } = useGetCategories();
  
  const products = productsResponse?.data?.products || [];
  const categories = categoriesResponse?.data?.categories || [];

  const voucher = voucherResponse?.data;





  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: voucher?.code || "",
      name: voucher?.name || "",
      type: voucher?.type || "FIXED",
      estate: voucher?.estate || "",
      value: voucher?.value || 0,
      registered: voucher?.registered || false,
      noShipping: voucher?.noShipping || false,
      products: voucher?.products || [],
      categories: voucher?.categories || [],
      minOrderValue: voucher?.minOrderValue || 0,
      maxUses: voucher?.maxUses || 0,
    },
  });

  useEffect(() => {
    if (voucher) {
      form.reset({
        code: voucher.code,
        name: voucher.name,
        type: voucher.type,
        estate: voucher.estate,
        value: voucher.value,
        registered: voucher.registered,
        noShipping: voucher.noShipping,
        products: voucher.products || [],
        categories: voucher.categories || [],
        expiryDate: voucher.expiryDate ? new Date(voucher.expiryDate) : undefined,
        minOrderValue: voucher.minOrderValue,
        maxUses: voucher.maxUses,
      });
    }
  }, [voucher, form]);

  const watchProducts = form.watch("products");
  const watchCategories = form.watch("categories");

  const isProductsSelected = watchProducts.length > 0;
  const isCategoriesSelected = watchCategories.length > 0;

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateVoucher(
      { ...values, id: voucherId },
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher Code</FormLabel>
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
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voucher type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FIXED">Fixed Amount</SelectItem>
                  <SelectItem value="PERCENTAGE">Percentage</SelectItem>
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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter voucher value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
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
                    selected={field.value}
                    onSelect={field.onChange}
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
          name="minOrderValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Order Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter minimum order value"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxUses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Uses</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter maximum uses"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registered"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Registered Users Only</FormLabel>
                <FormDescription>
                  Only registered users can use this voucher
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="noShipping"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>No Shipping</FormLabel>
                <FormDescription>
                  This voucher cannot be used for shipping costs
                </FormDescription>
              </div>
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

        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Update Voucher
        </Button>
      </form>
    </Form>
  
  );
}
