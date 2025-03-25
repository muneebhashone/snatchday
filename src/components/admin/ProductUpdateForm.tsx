"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  useUpdateProduct,
  useGetCategories,
  useGetFilters,
  useGetProducts,
} from "@/hooks/api";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { formatDate } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format, sub } from "date-fns";
import { Checkbox } from "../ui/checkbox";

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
  images: z.any(),
  colors: z.string().min(1, "Colors cannot be empty"),
  stock: z.number().min(0, "Stock must be 0 or greater"),
  price: z.number().min(0, "Price must be 0 or greater"),
  // discounts: z.string().optional(),
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
  relatedProducts: z.array(z.string()).default([]),
  requireShipping: z.boolean(),
  liscenseKey: z.string().min(1, "License key cannot be empty"),
  discounts: z.array(discountSchema).optional(),
});

interface Category {
  _id: string;
  name: string;
  displayName: string;
}

interface FilterData {
  _id: string;
  name: string;
  value: string[];
}

interface ProductData {
  _id: string;
  name: string;
  // ... other product fields
}

interface CategoryResponse {
  data: {
    categories: Category[];
  };
}

interface ProductResponse {
  data: {
    products: ProductData[];
  };
}

interface FilterResponse {
  data: FilterData[];
}

interface DiscountItem {
  amount: number;
  type: "PERCENTAGE";
  customerGroup: "BASIC" | "VIP";
  price: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  company: string;
  images: string[];
  colors: string[];
  stock: number;
  price: number;
  discounts: DiscountItem[];
  attributes: Record<string, any>;
  categoryIds: string[];
  type: "NEW" | "SALE";
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  sku: string;
  barcodeEAN: string;
  noStockMessage: string;
  relatedProducts: string[];
  requireShipping: boolean;
  liscenseKey: string;
}

export default function ProductUpdateForm({ product }: { product: Product }) {
  const [applyDiscounts, setApplyDiscounts] = useState(false);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    product.images || []
  );
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: categoriesData } = useGetCategories() as {
    data: CategoryResponse;
  };
  const { data: productsData } = useGetProducts() as { data: ProductResponse };
  const { data: filtersData } = useGetFilters() as { data: FilterResponse };
  const params = useParams();
  const productId = params.id as string;
  const [selectedFilter, setSelectedFilters] = useState<
    Record<string, string[]>
  >(
    Object.entries(product.attributes || {}).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value : [value];
      return acc;
    }, {} as Record<string, string[]>)
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      company: product.company,
      images: null,
      colors: product.colors.join(", "),
      stock: product.stock,
      price: product.price,
      discounts: product.discounts || [],
      attributes: Object.keys(product.attributes || {}),
      categoryIds: product.categoryIds[0]?._id || "",
      type: product.type,
      isFeatured: product.isFeatured,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
      metaKeywords: product.metaKeywords,
      article: product.article,
      sku: product.sku,
      barcodeEAN: product.barcodeEAN,
      noStockMessage: product.noStockMessage,
      relatedProducts: product.relatedProducts,
      requireShipping: product.requireShipping,
      liscenseKey: product.liscenseKey,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "discounts",
  });
  useEffect(() => {
    if (product?.discounts) {
      replace(product.discounts);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Clear previous previews that are blob URLs
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });

      // Create new previews
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls([
        ...previewUrls.filter((url) => !url.startsWith("blob:")),
        ...urls,
      ]);

      // Update form
      form.setValue("images", files);
    }
  };

  const onSubmit2 = (value) => {
    console.log(value, "submitted value");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      if (removedImages.length > 0) {
        formData.append("removedImages", JSON.stringify(removedImages));
      }

      for (const [key, value] of Object.entries(values)) {
        if (key === "images" && value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append("images", file);
          });
        } else if (key === "categoryIds") {
          formData.append("categoryIds", JSON.stringify([value]));
        } else if (key === "colors") {
          const colorsArray = value
            .split(",")
            .map((color) => color.trim())
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
            {} as Record<string, string>
          );
          formData.append("attributes", JSON.stringify(attributesObject));
        } else if (key === "relatedProducts") {
          formData.append("relatedProducts", JSON.stringify(value));
        } else if (key === "discounts" && Array.isArray(value)) {
          if (value.length > 0) {
            formData.append("discounts", JSON.stringify(value));
          } else {
            formData.append("discounts", "[]"); // Explicitly send an empty array
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      }

      updateProduct(
        {
          id: productId,
          data: formData as any,
        },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            queryClient.invalidateQueries({ queryKey: ["products"] });
            // router.push("/admin/products");
          },
          onError: (error) => {
            toast.error("Failed to update product");
            console.error(error);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  }

  const [discountRemove, setDiscountRemove] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                <FormLabel>Company</FormLabel>
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
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <div className="flex gap-4 my-2">
                  {previewUrls.map((url, index) => (
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
                        type="button"
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                        onClick={() => {
                          if (url.startsWith("blob:")) {
                            URL.revokeObjectURL(url);
                          }
                          setRemovedImages((prev) => [...prev, url]);
                          setPreviewUrls((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
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
                  <FormLabel>Price</FormLabel>
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
                  <FormLabel>Stock</FormLabel>
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
                <FormLabel>Category</FormLabel>
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
                    {categoriesData?.data?.categories?.map(
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
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
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

          {fields.length > 0 && (
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
                onClick={() => {
                  const currentDiscounts = form.getValues("discounts") || [];
                  form.setValue(
                    "discounts",
                    [
                      ...currentDiscounts, // Keep existing discounts
                      {
                        customerGroup: "BASIC",
                        price: 0,
                        away: undefined,
                        until: undefined,
                      },
                    ],
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  );
                }}
              >
                Add Discount
              </Button>

              {/* Submit Button */}
              <Button
                className="hover:bg-primary mx-auto self-center mt-4 justify-self-center"
                type="button"
                onClick={() => {
                  setApplyDiscounts(false);
                }}
              >
                Apply
              </Button>
            </div>
          )}
          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filters name</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const currentValues = field.value || [];
                    if (!currentValues.includes(value)) {
                      field.onChange([...currentValues, value]);
                      const filter = filtersData?.data?.find(
                        (f) => f.name === value
                      );
                      if (filter) {
                        setSelectedFilters((prevFilters) => ({
                          ...prevFilters,
                          [filter.name]: filter.value,
                        }));
                      }
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filtersData?.data?.map((filter) => (
                      <SelectItem key={filter._id} value={filter.name}>
                        {filter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                              delete updatedFilters[filterName];
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
            name="relatedProducts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Products</FormLabel>
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
                    {productsData?.data?.products?.map((product) => (
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
                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((productId) => {
                      const product = productsData?.data?.products?.find(
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
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="SEO meta title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
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
                <FormLabel>Meta Keywords</FormLabel>
                <FormControl>
                  <Input placeholder="SEO meta keywords" {...field} />
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
                <FormLabel>Article</FormLabel>
                <FormControl>
                  <Input placeholder="Product article" {...field} />
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
                <FormLabel>SKU</FormLabel>
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
                <FormLabel>Barcode EAN</FormLabel>
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
                <FormLabel>No Stock Message</FormLabel>
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
            name="requireShipping"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Require Shipping</FormLabel>
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
                <FormLabel>License Key</FormLabel>
                <FormControl>
                  <Input placeholder="Product license key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
