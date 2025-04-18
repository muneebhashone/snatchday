"use client";

import {
  useCreateProduct,
  useGetCategories,
  useGetProducts,
  useGetFilters,
} from "@/hooks/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Import component parts

// import SimpleImageUpload from './product/SimpleImageUpload'
import ProductAttributesField from "./product/ProductAttributesField";
import ProductCategoryField from "./product/ProductCategoryField";
import ProductDiscountField from "./product/ProductDiscountField";
import ProductRelatedField from "./product/ProductRelatedField";
import { X } from "lucide-react";
import Image from "next/image";

const discountSchema = z.object({
  customerGroup: z.string().optional(),
  price: z.number().nonnegative("Price must be 0 or greater").optional(),
  away: z.coerce.date().min(new Date(), "Start date must be in the future"),
  until: z.coerce.date().min(new Date(), "End date must be in the future"),
});

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  company: z.string().optional(),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  colors: z.string().min(1, "Colors are required"),
  stock: z.coerce.number().min(0, "Stock must be 0 or greater"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
  type: z.enum(["NEW", "SALE"]).optional(),
  discounts: z.array(discountSchema).optional(),
  attributes: z.record(z.string(), z.array(z.string())).optional(),

  isFeatured: z.boolean().default(false),
  metaTitle: z.string().min(1, "Meta title is required"),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  article: z.string().min(1, "Article is required"),
  sku: z.string().optional(),
  barcodeEAN: z.string().optional(),
  noStockMessage: z.string().optional(),
  relatedProducts: z.array(z.string()).optional(),
  requireShipping: z.boolean().default(true),
  liscenseKey: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

const MainProduct = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [relatedProductsOpen, setRelatedProductsOpen] = useState(false);
  const { mutate: createProduct, isPending } = useCreateProduct();

  const { data: categoriesData } = useGetCategories({
    limit: "99999999",
    offset: "0",
  });

  const { data: filtersResponse } = useGetFilters() as { data: any };
  const filtersArray = filtersResponse?.data?.filters || [];

  const { data: productsData, isLoading: productsLoading } = useGetProducts({
    limit: "99999999",
    offset: "0",
  });

  // Add state for attribute dialog
  const [attributeDialogOpen, setAttributeDialogOpen] = useState(false);

  // Add state for image previews
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      company: "",
      images: [],
      colors: "",
      stock: 0,
      price: 0,
      categoryIds: [],
      type: "NEW",
      discounts: [],
      attributes: {},
      isFeatured: false,
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      article: "",
      sku: "",
      relatedProducts: [],
      barcodeEAN: "",
      noStockMessage: "",
      requireShipping: true,
      liscenseKey: "",
    },
  });

  const {
    fields: discountFields,
    append: appendDiscount,
    remove: removeDiscount,
  } = useFieldArray({
    control: form.control,
    name: "discounts",
  });

  const onSubmit = (values: ProductFormValues) => {
    const formData = new FormData();

    // Make a copy of values to modify before appending to formData
    const dataToSend = { ...values };

    // Remove licenseKey if requireShipping is true
    if (dataToSend.requireShipping) {
      delete dataToSend.liscenseKey;
    }

    console.log("Form values:", dataToSend);
    console.log("Number of images:", dataToSend.images?.length || 0);

    // Handle images separately
    if (
      dataToSend.images &&
      Array.isArray(dataToSend.images) &&
      dataToSend.images.length > 0
    ) {
      // Remove images from dataToSend to prevent double processing
      const imageFiles = [...dataToSend.images];
      delete dataToSend.images;

      // Append each image separately for proper multi-image handling on server
      imageFiles.forEach((file, index) => {
        if (file instanceof File) {
          formData.append("images", file);
          console.log(
            `Appending image ${index + 1}/${imageFiles.length}: ${
              file.name
            } (${Math.round(file.size / 1024)}KB)`
          );
        }
      });
    } else {
      console.warn("No images included in submission!");
    }

    // Handle other fields
    Object.entries(dataToSend).forEach(([key, value]) => {
      // Skip if value is empty, undefined, or null
      if (value === undefined || value === null || value === "") {
        return;
      }

      if (key === "colors" && typeof value === "string") {
        // Convert comma-separated colors to array
        const colorsArray = value
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean);
        if (colorsArray.length > 0) {
          formData.append("colors", JSON.stringify(colorsArray));
        }
      } else if (key === "categoryIds" || key === "relatedProducts") {
        if (Array.isArray(value) && value.length > 0) {
          formData.append(key, JSON.stringify(value));
        }
      } else if (key === "discounts" && Array.isArray(value)) {
        // Only include non-empty discounts
        const validItems = value.filter((item) => {
          return Object.values(item).some(
            (v) => v !== undefined && v !== "" && v !== null
          );
        });
        if (validItems.length > 0) {
          formData.append(key, JSON.stringify(validItems));
        }
      } else if (key === "attributes") {
        // Convert attributes for API
        const attributesObject = Object.entries(selectedFilters).reduce(
          (acc: Record<string, string>, [key, value]) => {
            if (value && value[0]) {
              acc[key] = value[0];
            }
            return acc;
          },
          {}
        );
        if (Object.keys(attributesObject).length > 0) {
          formData.append(key, JSON.stringify(attributesObject));
        }
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value.toString());
      }
    });

    // Log the complete FormData for debugging
    console.log("FormData entries:");
    let imageCount = 0;
    for (const pair of Array.from(formData.entries())) {
      if (pair[0] === "images") {
        imageCount++;
        if (pair[1] instanceof File) {
          console.log(
            `Image ${imageCount}: ${pair[1].name} (${Math.round(
              (pair[1] as File).size / 1024
            )}KB)`
          );
        } else {
          console.log(`Image ${imageCount}: ${pair[1]}`);
        }
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
    console.log(`Total images in payload: ${imageCount}`);

    // Send to server
    createProduct(formData, {
      onSuccess: () => {
        toast.success("Product created successfully");
        router.push("/admin/products");
      },
      onError: (error: any) => {
        toast.error(
          `Failed to create product: ${error?.message || "Unknown error"}`
        );
        console.error("Error creating product:", error);
      },
    });
  };

  // Add cleanup effect to clean up object URLs when component unmounts
  useEffect(() => {
    // Cleanup function to revoke URLs when component unmounts
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []); // Empty dependency array means this runs on unmount

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Discard
          </Button>
          <Button type="submit" form="product-form" disabled={isPending}>
            {isPending ? "Saving..." : "Save Product"}
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
                <ProductCategoryField
                  control={form.control}
                  name="categoryIds"
                  categories={categoriesData?.data?.categories || []}
                  open={categoriesOpen}
                  setOpen={setCategoriesOpen}
                />

                <ProductAttributesField
                  control={form.control}
                  name="attributes"
                  filtersArray={filtersArray}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
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
                      <FormLabel>Product Type</FormLabel>
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
                      <FormLabel>Colors *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Colors (comma separated)"
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
                  name="requireShipping"
                  render={({ field }) => (
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
                        <Input
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
};

export default MainProduct;
