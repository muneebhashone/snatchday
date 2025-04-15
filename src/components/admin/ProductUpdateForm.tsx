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
  useGetProductById,
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
import { CalendarIcon, X, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { formatDate } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format, sub } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { get } from "http";
import { IError } from "@/app/admin/games/create/page";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const discountSchema = z.object({
  // customerGroup: z.string().min(1, "Customer group cannot be empty"),
  customerGroup: z.enum(["BASIC", "VIP"]),
  price: z.number().nonnegative("Price must be 0 or greater"),
  away: z.coerce.date().optional(),
  until: z.coerce.date().optional(),
});

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(1, "Description cannot be empty"),
    company: z.string().min(1, "Company cannot be empty"),
    images: z.any(),
    colors: z.string().min(1, "Colors cannot be empty").optional(),
    stock: z.number().min(0, "Stock must be 0 or greater"),
    price: z.number().min(0, "Price must be 0 or greater"),
    // discounts: z.string().optional(),
    attributes: z.any(),
    categoryIds: z.any(),
    type: z.enum(["NEW", "SALE"]),
    isFeatured: z.boolean(),
    metaTitle: z.string().min(2, "Meta title must be at least 2 characters"),
    metaDescription: z
      .string()
      .min(1, "Meta description cannot be empty")
      .optional(),
    metaKeywords: z.string().min(1, "Meta keywords cannot be empty").optional(),
    article: z.string().min(1, "Article cannot be empty"),
    sku: z.string().min(1, "SKU cannot be empty").optional(),
    barcodeEAN: z.string().min(1, "Barcode EAN cannot be empty"),
    noStockMessage: z.string().min(1, "No stock message cannot be empty"),
    relatedProducts: z.array(z.string()).default([]),
    requireShipping: z.boolean(),
    liscenseKey: z.string().optional(),
    discounts: z.array(discountSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.requireShipping && data.liscenseKey) {
      ctx.addIssue({
        path: ["liscenseKey"],
        code: z.ZodIssueCode.custom,
        message: "License key is not required when shipping is enable",
      });
    } else if (!data.requireShipping && !data.liscenseKey) {
      ctx.addIssue({
        path: ["liscenseKey"],
        code: z.ZodIssueCode.custom,
        message: "License key is required when shipping is not enable",
      });
    }

    // Custom validation for discounts (dates)
    if (data.discounts && data.discounts.length > 0) {
      data.discounts.forEach((discount, index) => {
        const startDate = new Date(discount.away);
        const endDate = new Date(discount.until);

        // Check if the start date is in the past
        if (startDate < new Date()) {
          ctx.addIssue({
            path: [`discounts.${index}.away`],
            code: z.ZodIssueCode.custom,
            message: "Start Date cannot be in the past",
          });
        }

        // Check if the end date is greater than the start date
        if (endDate <= startDate) {
          ctx.addIssue({
            path: [`discounts.${index}.until`],
            code: z.ZodIssueCode.custom,
            message: "End Date must be greater than Start Date",
          });
        }
      });
    }
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
  category: string;
  createdAt: string;
  updatedAt: string;
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
  data: {
    filters: FilterData[];
  };
}

interface DiscountItem {
  amount: number;
  type: "PERCENTAGE";
  customerGroup: "BASIC" | "VIP";
  price: number;
}

export interface ICategoryIds {
  above: boolean;
  createdAt: string;
  description: string;
  displayName: string;
  filters: string[];
  image: string;
  isActive: boolean;
  name: string;
  parentCategory: string;
  shop: boolean;
  subCategories: string[];
  updatedAt: string;
  _id: string;
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
  categoryIds: ICategoryIds[];
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
  const [emptyCategory, setEmptyCategory] = useState(false);
  const [disableLicenseKey, setDisableLicenseKey] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    product?.images || []
  );
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { data: categoriesData } = useGetCategories({
    limit: "99999",
    offset: "0",
  }) as {
    data: CategoryResponse;
  };
  const params = useParams();
  const productId = params.id as string;
  const { data: productsData } = useGetProducts({
    limit: "99999",
    offset: "0",
  });
  const { data: filtersData } = useGetFilters() as { data: FilterResponse };
  const [selectedFilter, setSelectedFilters] = useState<
    Record<string, string[]>
  >(
    Object.entries(product?.attributes || {}).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value : [value];
      return acc;
    }, {} as Record<string, string[]>)
  );
  console.log(product?.categoryIds);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      company: "",
      images: null,
      colors: "",
      stock: 0,
      price: 0,
      discounts: [],
      attributes: [],
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
      requireShipping: true,
      liscenseKey: "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        company: product.company,
        images: null,
        colors: product.colors?.join(", "),
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
      });

      setPreviewUrls(product.images || []);
      if (product.categoryIds) {
        setCategories(product.categoryIds);
      }
      setSelectedFilters(
        Object.entries(product.attributes || {}).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value : [value];
          return acc;
        }, {} as Record<string, string[]>)
      );
    }
  }, [product, form]);

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "discounts",
  });

  useEffect(() => {
    if (product?.discounts) {
      replace(product.discounts);
    }
    if (product && product.categoryIds) {
      setCategories(product?.categoryIds);
    }
  }, [product, replace, setCategories]);

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
    console.log(categories, "categories");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (categories.length < 1) {
      setEmptyCategory(true);
      return;
    }
    setEmptyCategory(false);

    // Check if all images are removed and no new images are added
    if (removedImages.length === product.images.length && !values.images) {
      form.setError("images", {
        type: "custom",
        message: "At least one image is required",
      });
      return;
    }

    const data = { ...values };
    if (data.requireShipping) {
      delete data.liscenseKey;
    }
    try {
      const formData = new FormData();

      if (removedImages.length > 0) {
        formData.append("removedImages", JSON.stringify(removedImages));
      }

      for (const [key, value] of Object.entries(data)) {
        if (key === "images" && value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append("images", file);
          });
        } else if (key === "categoryIds") {
          formData.append(
            "categoryIds",
            JSON.stringify(categories.map((cat) => cat._id))
          );
        } else if (key === "colors") {
          const colorsArray = value
            .split(",")
            .map((color) => color.trim())
            .filter(Boolean);
          formData.append("colors", JSON.stringify(colorsArray));
        } else if (key === "attributes") {
          // Convert selectedFilters to the format expected by the API
          const attributesObject = Object.entries(selectedFilter).reduce(
            (acc: Record<string, string>, [key, value]) => {
              // Use the first value since we're using radio buttons (single selection)
              acc[key] = value[0] || "";
              return acc;
            },
            {}
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
            toast.error(
              (error as unknown as IError)?.response?.data.message ||
                "Failed to update product"
            );
            console.error(error);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update produc t");
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
            render={({ field }) => (
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

          <div>
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      const category = categoriesData?.data?.categories?.find(
                        (cat) => cat._id === e
                      );
                      const exist = categories.find(
                        (existCategory) => existCategory._id === category._id
                      );
                      if (!exist) {
                        setCategories((prev) => [...prev, category]);
                      }
                    }}
                    value=""
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
                  <div className="flex gap-2">
                    {categories.map((cat, i) => (
                      <div
                        className="relative bg-primary rounded px-2 text-white"
                        key={i}
                      >
                        <X
                          onClick={() => {
                            setCategories((prev) =>
                              prev.filter((_, index) => index !== i)
                            );
                          }}
                          className="rounded-full absolute -top-1 -right-2 bg-white text-primary"
                          size={13}
                        />
                        {
                          categoriesData?.data?.categories?.find(
                            (findCat) => findCat._id === cat?._id
                          )?.displayName
                        }
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            {categories.length < 1 && emptyCategory && (
              <p className="text-red-500 text-sm">
                *Please select atleast one category*
              </p>
            )}
          </div>

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

          {fields.length > 0 ? (
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
                    className="mt-2 bg-red-500 hover:bg-red-500 text-white"
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
                Add Another Discount
              </Button>
            </div>
          ) : (
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
                    className="mt-2 bg-red-500 hover:bg-red-500 text-white"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {/* Add Discount Button */}
              <Button
                type="button"
                className="mt-4 bg-blue-500 hover:bg-blue-500 text-white mr-2"
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
                <FormLabel>Product Filters</FormLabel>
                <FormDescription>
                  Select product attributes and values
                </FormDescription>

                <div className="space-y-4">
                  {/* Add filter button & dropdown */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Attributes</h3>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            disabled={
                              Object.keys(selectedFilter).length ===
                              filtersData?.data?.filters?.length
                            }
                          >
                            <PlusCircle className="h-4 w-4" />
                            Add Attribute
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-0" align="end">
                          <Command>
                            <CommandInput placeholder="Search attributes..." />
                            <CommandEmpty>No attributes found.</CommandEmpty>
                            <CommandGroup className="max-h-48 overflow-auto">
                              {filtersData?.data?.filters
                                ?.filter(
                                  (filter) =>
                                    !selectedFilter.hasOwnProperty(filter.name)
                                )
                                .map((filter) => (
                                  <CommandItem
                                    key={filter._id}
                                    value={filter.name}
                                    onSelect={() => {
                                      setSelectedFilters((prev) => {
                                        const newFilters = { ...prev };
                                        // Initialize with empty array
                                        newFilters[filter.name] = [];
                                        return newFilters;
                                      });
                                    }}
                                  >
                                    {filter.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Selected filters with their radio button selections */}
                    {Object.keys(selectedFilter).length > 0 ? (
                      <div className="space-y-4 border rounded-md p-3">
                        {Object.entries(selectedFilter).map(
                          ([filterName, values]) => {
                            // Find the corresponding filter object to get available values
                            const filter = filtersData?.data?.filters?.find(
                              (f) => f.name === filterName
                            );
                            if (!filter) return null;

                            return (
                              <div
                                key={filterName}
                                className="space-y-2 pb-3 border-b last:border-b-0 last:pb-0"
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-medium">
                                    {filterName}
                                  </h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      setSelectedFilters((prev) => {
                                        const newFilters = { ...prev };
                                        delete newFilters[filterName];
                                        return newFilters;
                                      });
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  {filter.value.map((value: string) => {
                                    // Check if this value is the selected one
                                    const isSelected = values[0] === value;

                                    return (
                                      <div
                                        key={value}
                                        className="flex items-center space-x-2"
                                      >
                                        <input
                                          type="radio"
                                          id={`${filterName}-${value}`}
                                          name={`filter-${filterName}`}
                                          className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                          checked={isSelected}
                                          onChange={() => {
                                            setSelectedFilters((prev) => {
                                              const newFilters = { ...prev };
                                              // Set single value
                                              newFilters[filterName] = [value];
                                              return newFilters;
                                            });
                                          }}
                                        />
                                        <label
                                          htmlFor={`${filterName}-${value}`}
                                          className="text-sm font-medium leading-none cursor-pointer"
                                        >
                                          {value}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-4 border rounded-md text-muted-foreground text-sm">
                        No attributes selected. Click &quot;Add Attribute&quot;
                        to select product attributes.
                      </div>
                    )}
                  </div>
                </div>

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
                  value=""
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
                          className="flex items-center gap-1 bg-primary text-white px-2 py-1 rounded-md"
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
            render={({ field }) => {
              setDisableLicenseKey(field.value);
              return (
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
              );
            }}
          />

          {!disableLicenseKey && (
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
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
