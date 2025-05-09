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
import {
  CalendarIcon,
  X,
  PlusCircle,
  ChevronsUpDown,
  AlertCircle,
} from "lucide-react";
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
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const discountSchema = z.object({
  // customerGroup: z.string().min(1, "Customer group cannot be empty"),
  customerGroup: z.enum(["BASIC", "VIP"]),
  price: z.number().nonnegative("Price must be 0 or greater"),
  away: z.coerce.date().optional(),
  until: z.coerce.date().optional(),
});

// const formSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     description: z.string().optional(),
//     company: z.string().optional(),
//     images: z.any(),
//     colors: z.string().optional(),
//     stock: z.number().min(0, "Stock must be 0 or greater"),
//     price: z.number().min(1, "Price must be 0 or greater"),
//     attributes: z.any(),
//     categoryIds: z
//       .array(z.string())
//       .min(1, "At least one category is required"),
//     type: z.enum(["NEW", "SALE"]),
//     isFeatured: z.boolean(),
//     metaTitle: z.string().min(2, "Meta title must be at least 2 characters"),
//     metaDescription: z.string().optional(),
//     metaKeywords: z.string().optional(),
//     article: z.string().min(1, "Article cannot be empty"),
//     currentOffer: z.boolean(),
//     sku: z.string().optional(),
//     barcodeEAN: z.string().optional(),
//     noStockMessage: z.string().optional(),
//     relatedProducts: z.array(z.string()).default([]),
//     requireShipping: z.boolean(),
//     liscenseKey: z.string().optional(),
//     discounts: z.array(discountSchema).optional(),
//   })
//   .superRefine((data, ctx) => {
//     if (data.requireShipping && data.liscenseKey) {
//       ctx.addIssue({
//         path: ["liscenseKey"],
//         code: z.ZodIssueCode.custom,
//         message: "License key is not required when shipping is enable",
//       });
//     } else if (!data.requireShipping && !data.liscenseKey) {
//       ctx.addIssue({
//         path: ["liscenseKey"],
//         code: z.ZodIssueCode.custom,
//         message: "License key is required when shipping is not enable",
//       });
//     }

//     if (data.discounts && data.discounts.length > 0) {
//       data.discounts.forEach((discount, index) => {
//         const startDate = new Date(discount.away);
//         const endDate = new Date(discount.until);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time to start of day

//         if (startDate < today) {
//           ctx.addIssue({
//             path: [`discounts.${index}.away`],
//             code: z.ZodIssueCode.custom,
//             message: "Start Date cannot be in the past",
//           });
//         }

//         if (endDate <= startDate) {
//           ctx.addIssue({
//             path: [`discounts.${index}.until`],
//             code: z.ZodIssueCode.custom,
//             message: "End Date must be greater than Start Date",
//           });
//         }

//         // Check if discount price is greater than product price
//         if (discount.price > data.price) {
//           ctx.addIssue({
//             path: [`discounts.${index}.price`],
//             code: z.ZodIssueCode.custom,
//             message: `Discount price cannot be greater than product price (${data.price})`,
//           });
//         }
//       });
//     }
//   })
//   .refine(
//     (data) => {
//       if (data.images && data.images.length === 0) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: "At least one image is required",
//       path: ["images"],
//     }
//   )
//   .refine(
//     (data) => {
//       if (!data.images && previewUrls.length === 0) {
//         return true;
//       }

//       return data.images.every(
//         (file) => file instanceof File && file.type.startsWith("image/")
//       );
//     },
//     {
//       message: "Only image files are allowed",
//       path: ["images"],
//     }
//   );

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
  currentOffer: boolean;
  sku: string;
  barcodeEAN: string;
  noStockMessage: string;
  relatedProducts: { _id: string }[];
  requireShipping: boolean;
  liscenseKey: string;
}

interface ProductFormValues {
  name: string;
  description: string;
  company: string;
  images: any;
  colors: string;
  stock: number;
  price: number;
  attributes: Record<string, any>;
  categoryIds: string[];
  type: "NEW" | "SALE";
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  sku: string;
  currentOffer: boolean;
  barcodeEAN: string;
  noStockMessage: string;
  relatedProducts: string[];
  requireShipping: boolean;
  liscenseKey: string;
  discounts: {
    customerGroup: "BASIC" | "VIP";
    price: number;
    away?: Date;
    until?: Date;
  }[];
}

export default function ProductUpdateForm({ product }: { product: Product }) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    product?.images || []
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [lengthOfImages, setLengthOfImages] = useState(0);
  const formSchema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      description: z.string().optional(),
      company: z.string().optional(),
      images: z.any(),
      colors: z.string().optional(),
      stock: z.number().min(0, "Stock must be 0 or greater"),
      price: z.number().min(1, "Price must be 0 or greater"),
      attributes: z.any(),
      categoryIds: z
        .array(z.string())
        .min(1, "At least one category is required"),
      type: z.enum(["NEW", "SALE"]),
      isFeatured: z.boolean(),
      metaTitle: z.string().min(2, "Meta title must be at least 2 characters"),
      metaDescription: z.string().optional(),
      metaKeywords: z.string().optional(),
      article: z.string().min(1, "Article cannot be empty"),
      currentOffer: z.boolean(),
      sku: z.string().optional(),
      barcodeEAN: z.string().optional(),
      noStockMessage: z.string().optional(),
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

      if (data.discounts && data.discounts.length > 0) {
        data.discounts.forEach((discount, index) => {
          const startDate = new Date(discount.away);
          const endDate = new Date(discount.until);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset time to start of day

          if (startDate < today) {
            ctx.addIssue({
              path: [`discounts.${index}.away`],
              code: z.ZodIssueCode.custom,
              message: "Start Date cannot be in the past",
            });
          }

          if (endDate <= startDate) {
            ctx.addIssue({
              path: [`discounts.${index}.until`],
              code: z.ZodIssueCode.custom,
              message: "End Date must be greater than Start Date",
            });
          }

          // Check if discount price is greater than product price
          if (discount.price > data.price) {
            ctx.addIssue({
              path: [`discounts.${index}.price`],
              code: z.ZodIssueCode.custom,
              message: `Discount price cannot be greater than product price (${data.price})`,
            });
          }
        });
      }
    })
    .refine(
      (data) => {
        if (removedImages.length === lengthOfImages && !data.images) {
          console.log(previewUrls, "previewUrls");
          return true;
        }

        return data.images.every(
          (file) => file instanceof File && file.type.startsWith("image/")
        );
      },
      {
        message: "Only image files are allowed",
        path: ["images"],
      }
    );

  const [emptyCategory, setEmptyCategory] = useState(false);
  const [disableLicenseKey, setDisableLicenseKey] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
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
  // console.log(product?.categoryIds);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      company: "",
      images: [],
      colors: "",
      stock: 0,
      price: 0,
      discounts: [],
      attributes: {},
      categoryIds: [],
      type: "NEW",
      isFeatured: false,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      article: "",
      sku: "",
      currentOffer: false,
      barcodeEAN: "",
      noStockMessage: "",
      relatedProducts: [],
      requireShipping: true,
      liscenseKey: "",
    },
  });

  useEffect(() => {
    console.log(
      product.relatedProducts.map((product) => product._id),
      "related products"
    );
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        company: product.company,
        images: [],
        colors: product.colors?.join(", "),
        stock: product.stock,
        price: product.price,
        discounts: product.discounts || [],
        attributes: product.attributes || {},
        categoryIds: product.categoryIds?.map((cat) => cat._id) || [],
        type: product.type,
        isFeatured: product.isFeatured,
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        metaKeywords: product.metaKeywords,
        article: product.article,
        sku: product.sku,
        currentOffer: product.currentOffer,
        barcodeEAN: product.barcodeEAN,
        noStockMessage: product.noStockMessage,
        relatedProducts: product.relatedProducts.map((product) => product._id),
        requireShipping: product.requireShipping,
        liscenseKey: product.liscenseKey,
      });

      setPreviewUrls(product.images || []);
      setLengthOfImages(product.images?.length || 0);
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
    if (values.categoryIds.length < 1) {
      form.setError("categoryIds", {
        type: "custom",
        message: "At least one category is required",
      });
      return;
    }

    // Check if all images are removed and no new images are added
    if (previewUrls.length === removedImages.length && !values.images) {
      form.setError("images", {
        type: "custom",
        message: "At least one image is required",
      });
      return;
    }

    // Check for invalid discounts
    const invalidDiscounts = values.discounts?.filter(
      (discount) => discount.price > values.price
    );

    if (invalidDiscounts && invalidDiscounts.length > 0) {
      toast.error("Discount prices cannot be greater than product price");
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
        if (value === "" || value === null || value === undefined) {
          delete data[key];
        } else if (
          key === "images" &&
          (Array.isArray(value) || value instanceof FileList)
        ) {
          // Support both array of File and FileList
          const files = Array.isArray(value) ? value : Array.from(value);
          files.forEach((file) => {
            formData.append("images", file);
          });
        } else if (key === "categoryIds") {
          formData.append("categoryIds", JSON.stringify(value));
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
        } else if (key === "currentOffer") {
          formData.append("currentOffers", value ? "true" : "false");
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
            router.push("/admin/products");
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
      toast.error("Failed to update product");
      console.error(error);
    }
  }

  const [discountRemove, setDiscountRemove] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Update Product</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
          <Button type="submit" form="product-form" disabled={isPending}>
            {isPending ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Information Section */}
            <div className="bg-white rounded-lg border p-6 col-span-2">
              <h2 className="text-lg font-semibold mb-6">
                Product Information
              </h2>

              <div className="space-y-6">
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
                        <Textarea
                          placeholder="Product description"
                          {...field}
                        />
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
                      <FormLabel>Product Images *</FormLabel>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
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

                          if (
                            e.dataTransfer.files &&
                            e.dataTransfer.files.length > 0
                          ) {
                            const files = Array.from(
                              e.dataTransfer.files
                            ).filter((file) => file.type.startsWith("image/"));

                            if (files.length > 0) {
                              const existingFiles = Array.isArray(value)
                                ? [...value]
                                : [];
                              const updatedFiles = [...existingFiles, ...files];
                              onChange(updatedFiles);

                              const newUrls = files.map((file) =>
                                URL.createObjectURL(file)
                              );
                              setPreviewUrls((prev) => [...prev, ...newUrls]);
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
                          <div className="text-gray-500 text-sm">
                            or click to browse
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                const existingFiles = Array.isArray(value)
                                  ? [...value]
                                  : [];
                                const newFiles = Array.from(files);
                                const updatedFiles = [
                                  ...existingFiles,
                                  ...newFiles,
                                ];
                                onChange(updatedFiles);

                                const newUrls = newFiles.map((file) =>
                                  URL.createObjectURL(file)
                                );
                                setPreviewUrls((prev) => [...prev, ...newUrls]);

                                e.target.value = "";
                              }
                            }}
                            {...field}
                          />
                        </div>
                      </div>

                      {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {previewUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative group cursor-pointer rounded-md overflow-hidden border"
                              onClick={() => {
                                if (url.startsWith("blob:")) {
                                  URL.revokeObjectURL(url);
                                }
                                const newPreviews = [...previewUrls];
                                newPreviews.splice(index, 1);
                                setPreviewUrls(newPreviews);
                                setRemovedImages((prev) => [...prev, url]);

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
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Pricing & Inventory
              </h2>

              <div className="space-y-6">
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
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
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
                        <Input placeholder="Barcode EAN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories & Attributes Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Categories & Attributes
              </h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {field.value?.length > 0
                                ? `${field.value.length} categories selected`
                                : "Select categories"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search categories..." />
                            <CommandEmpty>No categories found.</CommandEmpty>
                            <CommandGroup className="max-h-48 overflow-auto">
                              {categoriesData?.data?.categories?.map(
                                (category: Category) => (
                                  <CommandItem
                                    key={category._id}
                                    value={category._id}
                                    onSelect={() => {
                                      const currentValues = field.value || [];
                                      if (
                                        currentValues.includes(category._id)
                                      ) {
                                        field.onChange(
                                          currentValues.filter(
                                            (id) => id !== category._id
                                          )
                                        );
                                      } else {
                                        field.onChange([
                                          ...currentValues,
                                          category._id,
                                        ]);
                                      }
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value?.includes(category._id)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {category.displayName || category.name}
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                                  <CommandEmpty>
                                    No attributes found.
                                  </CommandEmpty>
                                  <CommandGroup className="max-h-48 overflow-auto">
                                    {filtersData?.data?.filters
                                      ?.filter(
                                        (filter) =>
                                          !selectedFilter.hasOwnProperty(
                                            filter.name
                                          )
                                      )
                                      .map((filter) => (
                                        <CommandItem
                                          key={filter._id}
                                          value={filter.name}
                                          onSelect={() => {
                                            setSelectedFilters((prev) => {
                                              const newFilters = { ...prev };
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

                          {Object.keys(selectedFilter).length > 0 ? (
                            <div className="space-y-4 border rounded-md p-3">
                              {Object.entries(selectedFilter).map(
                                ([filterName, values]) => {
                                  const filter =
                                    filtersData?.data?.filters?.find(
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
                                          const isSelected =
                                            values[0] === value;

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
                                                    const newFilters = {
                                                      ...prev,
                                                    };
                                                    newFilters[filterName] = [
                                                      value,
                                                    ];
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
                              No attributes selected. Click &quot;Add
                              Attribute&quot; to select product attributes.
                            </div>
                          )}
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-white rounded-lg border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Discounts</h2>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        append({
                          customerGroup: "BASIC",
                          price: 0,
                          away: undefined,
                          until: undefined,
                        })
                      }
                      className="flex items-center gap-1"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Discount
                    </Button>
                  </div>

                  {fields.length > 0 ? (
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md relative"
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>

                          <FormField
                            control={form.control}
                            name={`discounts.${index}.customerGroup`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Customer Group</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select group" />
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
                            render={({ field }) => {
                              const productPrice = form.watch("price");
                              return (
                                <FormItem>
                                  <FormLabel>Price</FormLabel>
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
                                      onChange={(e) => {
                                        const value = parseFloat(
                                          e.target.value
                                        );
                                        field.onChange(value);
                                      }}
                                      className={
                                        field.value > productPrice
                                          ? "border-destructive"
                                          : ""
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                  {field.value > productPrice && (
                                    <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      Discount price cannot be greater than
                                      product price ({productPrice})
                                    </p>
                                  )}
                                </FormItem>
                              );
                            }}
                          />

                          <FormField
                            control={form.control}
                            name={`discounts.${index}.away`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
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
                                      onSelect={field.onChange}
                                      disabled={(date) => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const endDate = new Date(
                                          form.getValues(
                                            `discounts.${index}.until`
                                          )
                                        );
                                        endDate.setHours(0, 0, 0, 0);
                                        return (
                                          date < today ||
                                          (endDate.getTime() && date >= endDate)
                                        );
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
                            name={`discounts.${index}.until`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
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
                                      onSelect={field.onChange}
                                      disabled={(date) => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const startDate = new Date(
                                          form.getValues(
                                            `discounts.${index}.away`
                                          )
                                        );
                                        startDate.setHours(0, 0, 0, 0);
                                        return date <= startDate;
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 border rounded-md text-muted-foreground text-sm">
                      No discounts added. Click "Add Discount" to create special
                      pricing for customer groups.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Options Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Product Options</h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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

                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Colors</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Colors (comma separated: Red, Blue, Green)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter colors separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Featured Product
                        </FormLabel>
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
                  name="currentOffer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Current Offers
                        </FormLabel>
                        <FormDescription>
                          Display this product in current offers sections
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
                  name="requireShipping"
                  render={({ field }) => {
                    setDisableLicenseKey(field.value);
                    return (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Requires Shipping
                          </FormLabel>
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
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* SEO Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">SEO Information</h2>

              <div className="space-y-6">
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
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="SEO meta description"
                          {...field}
                        />
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
                      <FormLabel>Article *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Product article content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
