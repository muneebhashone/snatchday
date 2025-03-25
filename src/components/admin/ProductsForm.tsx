"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useCreateProduct,
  useGetCategories,
  useGetFilters,
  useGetProducts,
} from "@/hooks/api";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CalendarIcon, X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils"; // Adjust the import path as necessary
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

interface DiscountItem {
  amount: number;
  type: "PERCENTAGE";
  customerGroup: string;
  price: number;
}

const discountSchema = z.object({
  // customerGroup: z.string().min(1, "Customer group cannot be empty"),
  customerGroup: z.enum(["BASIC", "VIP"]),
  price: z.number().nonnegative("Price must be 0 or greater"),
  away: z.coerce.date().optional(),
  until: z.coerce.date().optional(),
});

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description cannot be empty"),
  company: z.string().min(1, "Company cannot be empty"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  colors: z.string().min(1, "Colors cannot be empty"),
  stock: z.number().min(0, "Stock must be 0 or greater"),
  price: z.number().min(0, "Price must be 0 or greater"),
  attributes: z.any(),
  categoryIds: z.string().min(1, "Category is required"),
  type: z.enum(["NEW", "SALE"]),
  isFeatured: z.boolean(),
  metaTitle: z.string().min(2, "Meta title must be at least 2 characters"),
  metaDescription: z.string().min(1, "Meta description cannot be empty"),
  metaKeywords: z.string().min(1, "Meta keywords cannot be empty"),
  article: z.string().min(1, "Article cannot be empty"),
  sku: z.string().min(1, "SKU cannot be empty"),
  barcodeEAN: z.string().min(1, "Barcode EAN cannot be empty"),
  noStockMessage: z.string().min(1, "No stock message cannot be empty"),
  relatedProducts: z.array(z.string()).optional(),
  requireShipping: z.boolean(),
  liscenseKey: z.string().min(1, "License key cannot be empty"),
  discounts: z.array(discountSchema).optional(),
});

export default function ProductsForm() {
  // const [discounts, setDiscounts] = useState([{ customerGroup: "", price: 0 }]);
  const [applyDiscounts, setApplyDiscounts] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: getCategories } = useGetCategories();

  const { data: getProducts } = useGetProducts();
  const { data: filters } = useGetFilters();

  console.log(applyDiscounts, "discounts");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      company: "",
      colors: "",
      stock: 0,
      price: 0,
      attributes: "",
      categoryIds: "",
      type: "NEW",
      isFeatured: false,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      article: "",
      sku: "",
      barcodeEAN: "",
      noStockMessage: "",
      relatedProducts: [],
      requireShipping: false,
      liscenseKey: "",
      images: [],
      discounts: [
        { customerGroup: "", price: 0, away: undefined, until: undefined },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "discounts",
  });

  const [selectedFilter, setSelectedFilters] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Clear previous previews
      previewUrls.forEach((url) => URL.revokeObjectURL(url));

      // Create new previews
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      // Update form field
      form.setValue("images", fileArray, { shouldValidate: true });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setApplyDiscounts(false);
      const formData = new FormData();
      // Append all form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === "categoryIds") {
          // Convert single category ID to array format
          formData.append("categoryIds", JSON.stringify([value]));
        } else if (key === "images") {
          // Handle multiple image files
          const files = value as File[];
          if (files) {
            Array.from(files).forEach((file) => {
              formData.append("images", file);
            });
          }
        } else if (key === "colors") {
          // Convert comma-separated colors to array
          const colorsArray = value
            .split(",")
            .map((color: string) => color.trim())
            .filter(Boolean);
          formData.append("colors", JSON.stringify(colorsArray));
        } else if (key === "attributes") {
          const attributesObject = Object.entries(selectedFilter).reduce(
            (acc, [filterName, filterValues]) => {
              filterValues.forEach((value) => {
                acc[filterName] = value;
              });
              return acc;
            },
            {}
          );

          formData.append("attributes", JSON.stringify(attributesObject));
        } else if (key === "relatedProducts") {
          // Handle empty or valid array of product IDs
          const productIds = Array.isArray(value) ? value : [];
          formData.append("relatedProducts", JSON.stringify(productIds));
        } else if (key === "discounts") {
          try {
            if (Array.isArray(value)) {
              // Ensure each discount object has required fields before appending
              const validDiscounts = value.filter(
                (discount) =>
                  discount.price &&
                  discount.customerGroup &&
                  discount.away &&
                  discount.until
              );

              formData.append("discounts", JSON.stringify(validDiscounts));
            } else {
              console.error("Discounts field is not an array:", value);
              formData.append("discounts", "[]"); // Fallback to an empty array
            }
          } catch (error) {
            console.error("Error handling discounts:", error);
            formData.append("discounts", "[]");
          }
        } else if (key === "price" || key === "stock") {
          // Ensure numbers are properly formatted
          formData.append(key, value.toString());
        } else if (key === "isFeatured" || key === "requireShipping") {
          // Convert boolean to string
          formData.append(key, value ? "true" : "false");
        } else if (value !== undefined && value !== null) {
          // Handle all other string fields
          formData.append(key, value.toString());
        }
      });

      createProduct(formData, {
        onSuccess: () => {
          toast.success("Product created successfully");
          setPreviewUrls([]);
          form.reset();
        },
        onError: (error) => {
          toast.error("Failed to create product");
          console.error(error);
        },
      });
    } catch (error) {
      toast.error("Failed to create product");
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company *</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <div className="flex gap-4 my-2">
                  {previewUrls?.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-square w-20 h-20 rounded-lg overflow-hidden border"
                    >
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        className="absolute top-0 left-0 bg-white rounded-full p-1 shadow"
                        onClick={() => {
                          setPreviewUrls((prev) =>
                            prev.filter((_, i) => i !== index)
                          );

                          URL.revokeObjectURL(url);
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="SALE">Sale</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Featured Product</FormLabel>
                  <FormDescription>
                    Display this product in featured sections
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
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getCategories?.data?.categories?.map(
                      (category: Category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.displayName || category.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title *</FormLabel>
                <FormControl>
                  <Input placeholder="SEO meta title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article *</FormLabel>
                <FormControl>
                  <Input placeholder="Product article" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product colors (comma-separated)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter colors separated by commas (e.g., Red, Blue, Green)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={applyDiscounts}
              onCheckedChange={(checked) => setApplyDiscounts(checked === true)}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apply Discounts
            </label>
          </div>
          {applyDiscounts && (
            <div className="bg-gray-100 p-4 rounded-lg">
              {fields.map((field, index) => (
                <div key={field.id} className="mb-4">
                  {/* Discount Type */}
                  <div className="flex items-center justify-center gap-5">
                    <FormField
                      control={form.control}
                      name={`discounts.${index}.customerGroup`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Discount Type</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select discount type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BASIC">Basic</SelectItem>
                                <SelectItem value="VIP">VIP</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Discount Price */}
                    <FormField
                      control={form.control}
                      name={`discounts.${index}.price`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Discount</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter discount price"
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value ? Number(e.target.value) : ""
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-center gap-5">
                    {/* Start Date */}
                    <FormField
                      control={form.control}
                      name={`discounts.${index}.away`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-5 flex-1">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value
                                    ? format(new Date(field.value), "PPP")
                                    : "Pick a date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* End Date */}
                    <FormField
                      control={form.control}
                      name={`discounts.${index}.until`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col mt-5 flex-1">
                          <FormLabel>End Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value
                                    ? format(new Date(field.value), "PPP")
                                    : "Pick a date"}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Remove Discount Button */}
                  <Button
                    type="button"
                    className="mt-2 bg-red-500 text-white"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {/* Add Discount Button */}
              <Button
                type="button"
                className="mt-4 bg-blue-500 text-white mr-2"
                onClick={() =>
                  append({
                    customerGroup: "BASIC",
                    price: 0,
                    away: undefined,
                    until: undefined,
                  })
                }
              >
                Add Discount
              </Button>
            </div>
          )}
          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filters name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      const currentValues = field.value || [];
                      if (!currentValues.includes(value)) {
                        field.onChange([...currentValues, value]);

                        // Assuming each selected filter name will give corresponding values
                        const filter = filters?.data.find(
                          (f) => f.name === value
                        );
                        if (filter) {
                          setSelectedFilters((prevFilters) => ({
                            ...prevFilters,
                            [filter.name]: filter.value, // Store filter name as key and its values as array
                          }));
                        }
                      }
                    }}
                    multiple
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filters?.data?.map((filter) => (
                        <SelectItem key={filter._id} value={filter.name}>
                          {filter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((filterName) => (
                      <div
                        key={filterName}
                        className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                      >
                        <span className="text-sm">{filterName}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 px-1 hover:bg-transparent hover:opacity-70"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((name) => name !== filterName)
                            );
                            setSelectedFilters((prevFilters) => {
                              const updatedFilters = { ...prevFilters };
                              delete updatedFilters[filterName]; // Remove filter from selected filters
                              return updatedFilters;
                            });
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description *</FormLabel>
                <FormControl>
                  <Textarea placeholder="SEO meta description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaKeywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Keywords *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="SEO meta keywords (comma-separated)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU *</FormLabel>
                <FormControl>
                  <Input placeholder="Stock Keeping Unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="barcodeEAN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barcode EAN *</FormLabel>
                <FormControl>
                  <Input placeholder="Barcode EAN number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noStockMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No Stock Message *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Message to show when out of stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="relatedProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Products</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      const currentValues = field.value || [];
                      if (!currentValues.includes(value)) {
                        field.onChange([...currentValues, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select related products" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getProducts?.data?.products?.map((product) => (
                        <SelectItem
                          key={product._id}
                          value={product._id}
                          disabled={field.value?.includes(product._id)}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((productId) => {
                      const product = getProducts?.data?.products?.find(
                        (p) => p._id === productId
                      );
                      return (
                        <div
                          key={productId}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span className="text-sm">{product?.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 px-1 hover:bg-transparent hover:opacity-70"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((id) => id !== productId)
                              );
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <FormDescription>
                  Select multiple products to relate to this product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requireShipping"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Require Shipping *</FormLabel>
                  <FormDescription>
                    Does this product require shipping?
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
            name="liscenseKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Key *</FormLabel>
                <FormControl>
                  <Input placeholder="Product license key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// {applyDiscounts && (
//   <div className="bg-gray-100 p-4 rounded-lg">
//     <FormField
//       control={form.control}
//       name={`discounts.${0}.customerGroup`}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Discount Type</FormLabel>
//           <FormControl>
//             <Select
//               onValueChange={field.onChange}
//               value={field.value}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select discount type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="basic">Basic</SelectItem>
//                 <SelectItem value="VIP">VIP</SelectItem>
//               </SelectContent>
//             </Select>
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     {/* Discount Price Input */}
//     <FormField
//       control={form.control}
//       name={`discounts.${0}.price`}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Discount</FormLabel>
//           <FormControl>
//             <Input placeholder="Enter discount price" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     {/* Start Date */}
//     <FormField
//       control={form.control}
//       name={`discounts.${index}.away`}
//       render={({ field }) => (
//         <FormItem className="flex flex-col mt-5">
//           <FormLabel>Start Date</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "w-full pl-3 text-left font-normal",
//                     !field.value && "text-muted-foreground"
//                   )}
//                 >
//                   {field.value
//                     ? format(new Date(field.value), "PPP")
//                     : "Pick a date"}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={
//                   field.value ? new Date(field.value) : undefined
//                 }
//                 onSelect={(date) =>
//                   field.onChange(date?.toISOString())
//                 }
//                 disabled={(date) => date < new Date()}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     {/* End Date */}
//     <FormField
//       control={form.control}
//       name={`discounts.${0}.until`}
//       render={({ field }) => (
//         <FormItem className="flex flex-col mt-5">
//           <FormLabel>End Date</FormLabel>
//           <Popover>
//             <PopoverTrigger asChild>
//               <FormControl>
//                 <Button
//                   variant={"outline"}
//                   className={cn(
//                     "w-full pl-3 text-left font-normal",
//                     !field.value && "text-muted-foreground"
//                   )}
//                 >
//                   {field.value
//                     ? format(new Date(field.value), "PPP")
//                     : "Pick a date"}
//                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>
//               </FormControl>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 mode="single"
//                 selected={
//                   field.value ? new Date(field.value) : undefined
//                 }
//                 onSelect={(date) =>
//                   field.onChange(date?.toISOString())
//                 }
//                 disabled={(date) => date < new Date()}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     {/* Submit Button */}
//     <Button
//       className="hover:bg-primary mx-auto self-center mt-4 justify-self-center"
//       type="button"
//       onClick={(e) => {
//         e.preventDefault();
//         console.log(form.getValues(), "form");
//         setApplyDiscounts(false);
//       }}
//     >
//       Apply
//     </Button>
//   </div>
// )}
