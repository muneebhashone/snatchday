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
import { CalendarIcon, X, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { IError } from "@/app/admin/games/create/page";
import { Checkbox } from "@/components/ui/checkbox";

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
    attributes: z.any(),
    categoryIds: z.any(),
    type: z.enum(["NEW", "SALE"]),
    isFeatured: z.boolean(),
    metaTitle: z.string().min(2, "Meta title must be at least 2 characters"),
    metaDescription: z.string().min(1, "Meta description cannot be empty").optional(),
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
    filters: Array<{
      _id: string;
      name: string;
      value: string[];
      category: string;
      createdAt: string;
      updatedAt: string;
    }>;
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
  const [categories, getCategories] = useState([]);
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
  const { data: productsData } = useGetProducts() as { data: ProductResponse };
  const { data: filtersData } = useGetFilters() as { data: FilterResponse };
  const params = useParams();
  const productId = params.id as string;
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(
    Object.entries(product?.attributes || {}).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value : [value];
      return acc;
    }, {} as Record<string, string[]>)
  );
  console.log(product?.categoryIds);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      company: product?.company || "",
      images: null,
      colors: product?.colors?.join(", ") || "",
      stock: product?.stock || 0,
      price: product?.price || 0,
      discounts: product?.discounts || [],
      attributes: Object.keys(product?.attributes || {}),
      categoryIds: product?.categoryIds[0]?._id || "",
      type: product?.type || "NEW",
      isFeatured: product?.isFeatured || false,
      metaTitle: product?.metaTitle || "",
      metaDescription: product?.metaDescription || "",
      metaKeywords: product?.metaKeywords || "",
      article: product?.article || "",
      sku: product?.sku || "",
      barcodeEAN: product?.barcodeEAN || "",
      noStockMessage: product?.noStockMessage || "",
      relatedProducts: product?.relatedProducts || [],
      requireShipping: product?.requireShipping ?? true,
      liscenseKey: product?.liscenseKey || "",
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
        getCategories(product.categoryIds);
      }
      setSelectedFilters(
        Object.entries(product.attributes || {}).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value : [value];
          return acc;
        }, {} as Record<string, string[]>)
      );
    }
  }, [product]);

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "discounts",
  });

  useEffect(() => {
    if (product?.discounts) {
      replace(product.discounts);
    }
    if (product && product.categoryIds) {
      getCategories(product?.categoryIds);
    }
  }, [categoriesData?.data?.categories, product, replace]);

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
          const attributesObject = Object.entries(selectedFilters).reduce(
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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description" {...field} />
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
            name="images"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem className="space-y-4">
                <FormLabel>Images *</FormLabel>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.add("border-primary");
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.remove("border-primary");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.classList.remove("border-primary");

                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const files = Array.from(e.dataTransfer.files).filter(
                        (file) => file.type.startsWith("image/")
                      );

                      if (files.length > 0) {
                        const existingFiles = Array.isArray(value) ? [...value] : [];
                        const updatedFiles = [...existingFiles, ...files];

                        previewUrls.forEach((url) => URL.revokeObjectURL(url));
                        const newUrls = updatedFiles.map((file) =>
                          URL.createObjectURL(file)
                        );
                        setPreviewUrls(newUrls);
                        onChange(updatedFiles);
                      }
                    }
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="text-gray-600 font-medium">
                      {previewUrls.length > 0
                        ? `Add more images (${previewUrls.length} selected)`
                        : "Drag & drop images here"}
                    </div>
                    <div className="text-gray-500 text-sm">or click to browse</div>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      {...field}
                    />
                  </div>
                </div>

                {previewUrls.length === 0 && (
                  <div className="text-center text-amber-600 text-sm bg-amber-50 p-2 rounded-md">
                    <strong>Image required!</strong> Please upload at least one
                    product image.
                    <p className="text-gray-500 mt-1">
                      Supported formats: JPG, PNG, WebP
                    </p>
                  </div>
                )}

                {previewUrls.length > 0 && (
                  <div className="space-y-3 border rounded-md p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {previewUrls.length} image
                          {previewUrls.length !== 1 ? "s" : ""} selected
                        </h3>
                        <p className="text-sm text-gray-500">
                          Click on an image to remove it
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          previewUrls.forEach((url) => URL.revokeObjectURL(url));
                          setPreviewUrls([]);
                          onChange([]);
                        }}
                      >
                        Clear All
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {previewUrls.map((url, index) => (
                        <div
                          key={index}
                          className="relative group cursor-pointer rounded-md overflow-hidden border"
                          onClick={() => {
                            URL.revokeObjectURL(url);
                            const newPreviews = [...previewUrls];
                            newPreviews.splice(index, 1);
                            setPreviewUrls(newPreviews);

                            if (Array.isArray(value)) {
                              const newFiles = [...value];
                              newFiles.splice(index, 1);
                              onChange(newFiles);
                            }
                          }}
                        >
                          <div className="aspect-square w-full overflow-hidden bg-white">
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              width={200}
                              height={200}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <X className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                    placeholder="Colors (comma separated: Red, Blue, Green)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter colors separated by commas</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                      {...field}
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
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                      {...field}
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
                <FormLabel>Product Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
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

          <div className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Categories *</h2>
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Product Categories</FormLabel>
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
                        getCategories((prev) => [...prev, category]);
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
                      {categoriesData?.data?.categories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.displayName || category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    {categories.map((cat, i) => (
                      <div
                        className="relative bg-primary rounded px-2 text-white"
                        key={i}
                      >
                        <X
                          onClick={() => {
                            getCategories((prev) =>
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
                  <FormMessage />
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
            name="attributes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Filters</FormLabel>
                <FormDescription>
                  Select attributes and values for product filtering
                </FormDescription>

                <div className="space-y-4">
                  <div>
                    <FormLabel>Select Filters</FormLabel>
                    <div className="flex flex-col space-y-2">
                      {filtersData?.data?.filters?.map((filter) => (
                        <div key={filter._id} className="flex items-start space-x-2">
                          <Checkbox
                            id={`filter-${filter._id}`}
                            checked={selectedFilters[filter.name] !== undefined}
                            onCheckedChange={(checked) => {
                              setSelectedFilters((prev) => {
                                const newFilters = { ...prev };

                                if (checked) {
                                  newFilters[filter.name] = [];
                                } else {
                                  delete newFilters[filter.name];
                                }

                                field.onChange(newFilters);
                                return newFilters;
                              });
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={`filter-${filter._id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {filter.name}
                            </label>

                            {selectedFilters[filter.name] !== undefined && (
                              <div className="pl-6 mt-2">
                                <FormLabel className="text-xs">
                                  Select Values
                                </FormLabel>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {filter.value.map((value) => (
                                    <Button
                                      key={value}
                                      type="button"
                                      size="sm"
                                      variant={
                                        selectedFilters[filter.name]?.includes(value)
                                          ? "default"
                                          : "outline"
                                      }
                                      className="text-xs h-7"
                                      onClick={() => {
                                        setSelectedFilters((prev) => {
                                          const newFilters = { ...prev };
                                          const currentValues =
                                            newFilters[filter.name] || [];

                                          if (currentValues.includes(value)) {
                                            newFilters[filter.name] =
                                              currentValues.filter((v) => v !== value);
                                          } else {
                                            newFilters[filter.name] = [
                                              ...currentValues,
                                              value,
                                            ];
                                          }

                                          field.onChange(newFilters);
                                          return newFilters;
                                        });
                                      }}
                                    >
                                      {value}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {Object.keys(selectedFilters).length > 0 && (
                    <div className="border rounded-md p-3 bg-muted/20">
                      <h4 className="text-sm font-medium mb-2">
                        Selected Attributes
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedFilters).map(
                          ([filterName, values]) => (
                            <div key={filterName} className="flex flex-col">
                              <span className="text-sm font-medium">
                                {filterName}
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {values.length > 0 ? (
                                  values.map((value) => (
                                    <span
                                      key={value}
                                      className="bg-primary/10 text-primary text-xs rounded px-2 py-1"
                                    >
                                      {value}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    No values selected
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Discounts</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    customerGroup: "BASIC",
                    price: 0,
                    away: undefined,
                    until: undefined,
                  })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Discount
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`discounts.${index}.customerGroup`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Group</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select customer group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="BASIC">Basic</SelectItem>
                            <SelectItem value="VIP">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`discounts.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Discounted price"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`discounts.${index}.away`}
                    render={({ field }) => (
                      <FormItem>
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
                                  : "Pick a start date"}
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
                    name={`discounts.${index}.until`}
                    render={({ field }) => (
                      <FormItem>
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
                                  : "Pick an end date"}
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    Remove Discount
                  </Button>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No discounts added yet.
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Product</FormLabel>
                  <FormDescription>
                    Display this product in featured sections
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
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

          <div className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">SEO Information</h2>

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
                    <Input placeholder="SEO meta keywords" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="article"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article *</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product article content" {...field} />
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
                  <Input placeholder="Barcode EAN" {...field} />
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
                <FormLabel>Out of Stock Message</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Message when product is out of stock"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Related Products</h2>

            <FormField
              control={form.control}
              name="relatedProducts"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
                            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                          >
                            {product?.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 ml-1 hover:bg-transparent"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((id) => id !== productId)
                                );
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <FormDescription>
                    Products that are related to this one and may be shown together
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="requireShipping"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Requires Shipping</FormLabel>
                  <FormDescription>
                    Does this product require shipping?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {!form.watch("requireShipping") && (
            <FormField
              control={form.control}
              name="liscenseKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="License key for digital products"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
