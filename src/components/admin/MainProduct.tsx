"use client";

import {
  useCreateProduct,
  useGetCategories,
  useGetProducts,
  useGetFilters,
} from "@/hooks/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { any, z } from "zod";
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
import { Checkbox } from "../ui/checkbox";
import { CalendarIcon, Check, PlusCircle, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const discountSchema = z.object({
  customerGroup: z.string().optional(),
  price: z.number().nonnegative("Price must be 0 or greater").optional(),
  away: z.coerce.date().optional(),
  until: z.coerce.date().optional(),
});

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  company: z.string().min(1, "Company name is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  colors: z.string().min(1, "Colors are required"),
  stock: z.coerce.number().min(0, "Stock must be 0 or greater"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
  type: z.enum(["NEW", "SALE"]),
  discounts: z.array(discountSchema).optional(),
  attributes: z.record(z.string(), z.array(z.string())).optional(),

  isFeatured: z.boolean().default(false),
  metaTitle: z.string().min(1, "Meta title is required"),
  metaDescription: z.string().min(1, "Meta description is required"),
  metaKeywords: z.string().min(1, "Meta keywords are required"),
  article: z.string().min(1, "Article is required"),
  sku: z.string().min(1, "SKU is required"),
  barcodeEAN: z.string().optional(),
  noStockMessage: z.string().optional(),
  relatedProducts: z.array(z.string()).optional(),
  requireShipping: z.boolean().default(true),
  liscenseKey: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

// Define the proper interface for the filter data structure
interface FilterResponse {
  filters: Array<{
    _id: string;
    name: string;
    value: string[];
    category: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

const MainProduct = () => {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { data: categoriesData } = useGetCategories({
    limit: "99999999",
    offset: "0",
  });
  const { data: filtersResponse } = useGetFilters() as { data: any };

  // Extract the filters array from the response if it exists
  const filtersArray = filtersResponse?.data?.filters || [];
  console.log("Filters array:", filtersArray);
  const { data: productsData, isLoading: productsLoading } = useGetProducts({
    limit: "99999999",
    offset: "0",
  });
  const [relatedProductsOpen, setRelatedProductsOpen] = useState(false);

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

  const [attributes, setAttributes] = useState<Record<string, string>>({});

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
      if (key === "colors" && typeof value === "string") {
        // Convert comma-separated colors to array
        const colorsArray = value
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean);
        formData.append("colors", JSON.stringify(colorsArray));
      } else if (key === "categoryIds" || key === "relatedProducts") {
        formData.append(key, JSON.stringify(value));
      } else if (key === "discounts" && Array.isArray(value)) {
        // Only include non-empty discounts
        const validItems = value.filter((item) => {
          return Object.values(item).some((v) => v !== undefined && v !== "");
        });
        formData.append(key, JSON.stringify(validItems));
      } else if (key === "attributes") {
        // loop through selectedFilter and convert all the values to an string then convert it again to an object and then append to formData
        const attributesObject = Object.entries(selectedFilters).reduce(
          (acc: Record<string, string>, [key, value]) => {
            acc[key] = value.join(",");
            return acc;
          },
          {}
        );

        formData.append(key, JSON.stringify(attributesObject));
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (value !== undefined && value !== null) {
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

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

                {/* Improved drag and drop area */}
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
                      const files = Array.from(e.dataTransfer.files).filter(
                        (file) => file.type.startsWith("image/")
                      );

                      if (files.length > 0) {
                        // Get existing files
                        const existingFiles = Array.isArray(value)
                          ? [...value]
                          : [];
                        const updatedFiles = [...existingFiles, ...files];

                        // Clear previous previews
                        previewUrls.forEach((url) => URL.revokeObjectURL(url));

                        // Create new preview URLs for all files
                        const newUrls = updatedFiles.map((file) =>
                          URL.createObjectURL(file)
                        );
                        setPreviewUrls(newUrls);

                        // Update form value with all files
                        onChange(updatedFiles);

                        console.log(
                          `Added ${files.length} images, total: ${updatedFiles.length}`
                        );
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
                          // Get existing files
                          const existingFiles = Array.isArray(value)
                            ? [...value]
                            : [];
                          const newFiles = Array.from(files);
                          const updatedFiles = [...existingFiles, ...newFiles];

                          // Release existing preview URLs
                          previewUrls.forEach((url) =>
                            URL.revokeObjectURL(url)
                          );

                          // Create new previews for all files
                          const newUrls = updatedFiles.map((file) =>
                            URL.createObjectURL(file)
                          );
                          setPreviewUrls(newUrls);

                          // Update form value with all files
                          onChange(updatedFiles);

                          console.log(
                            `Added ${newFiles.length} images, total: ${updatedFiles.length}`
                          );

                          // Reset input to allow selecting the same file again
                          e.target.value = "";
                        }
                      }}
                      {...field}
                    />
                  </div>
                </div>

                {/* Better warning/help text */}
                {previewUrls.length === 0 && (
                  <div className="text-center text-amber-600 text-sm bg-amber-50 p-2 rounded-md">
                    <strong>Image required!</strong> Please upload at least one
                    product image.
                    <p className="text-gray-500 mt-1">
                      Supported formats: JPG, PNG, WebP
                    </p>
                  </div>
                )}

                {/* Enhanced image gallery preview */}
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
                          previewUrls.forEach((url) =>
                            URL.revokeObjectURL(url)
                          );
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
                            // Remove the image from preview
                            URL.revokeObjectURL(url);
                            const newPreviews = [...previewUrls];
                            newPreviews.splice(index, 1);
                            setPreviewUrls(newPreviews);

                            // Remove the file from form value
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
                <FormDescription>
                  Enter colors separated by commas
                </FormDescription>
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

          <div className="space-y-4 border p-4 rounded-md">
            <h2 className="text-lg font-medium">Categories *</h2>

            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Product Categories</FormLabel>
                  <Popover
                    open={categoriesOpen}
                    onOpenChange={setCategoriesOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length
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
                          {categoriesData?.data?.categories?.map((category) => (
                            <CommandItem
                              key={category._id}
                              value={category.name}
                              onSelect={() => {
                                const currentCategories = field.value || [];
                                const selected = currentCategories.includes(
                                  category._id
                                );

                                const updatedCategories = selected
                                  ? currentCategories.filter(
                                      (id) => id !== category._id
                                    )
                                  : [...currentCategories, category._id];

                                field.onChange(updatedCategories);
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
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((categoryId) => {
                        const category = categoriesData?.data?.categories?.find(
                          (c) => c._id === categoryId
                        );
                        return category ? (
                          <div
                            key={categoryId}
                            className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm"
                          >
                            {category.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 ml-1 hover:bg-transparent"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((id) => id !== categoryId)
                                );
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  <FormDescription>
                    Select one or more categories for this product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  {/* Filter selection */}
                  <div>
                    <FormLabel>Select Filters</FormLabel>
                    <div className="flex flex-col space-y-2">
                      {filtersArray.map((filter: any) => (
                        <div
                          key={filter._id}
                          className="flex items-start space-x-2"
                        >
                          <Checkbox
                            id={`filter-${filter._id}`}
                            checked={selectedFilters[filter.name] !== undefined}
                            onCheckedChange={(checked) => {
                              setSelectedFilters((prev) => {
                                const newFilters = { ...prev };

                                if (checked) {
                                  // Add filter
                                  newFilters[filter.name] = [];
                                } else {
                                  // Remove filter
                                  delete newFilters[filter.name];
                                }

                                // Update the form field with the new object
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

                            {/* If filter is selected, show value selection */}
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
                                        selectedFilters[filter.name]?.includes(
                                          value
                                        )
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
                                            // Remove the value
                                            newFilters[filter.name] =
                                              currentValues.filter(
                                                (v) => v !== value
                                              );
                                          } else {
                                            // Add the value
                                            newFilters[filter.name] = [
                                              ...currentValues,
                                              value,
                                            ];
                                          }

                                          // Update the form field
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

                  {/* Show selected filters summary */}
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

          {/* Discounts section */}
          <div className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Discounts</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendDiscount({ customerGroup: "BASIC", price: 0 })
                }
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Discount
              </Button>
            </div>

            {discountFields.map((field, index) => (
              <div key={field.id} className="space-y-4 border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`discounts.${index}.customerGroup`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Group</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                    onClick={() => removeDiscount(index)}
                  >
                    Remove Discount
                  </Button>
                </div>
              </div>
            ))}

            {discountFields.length === 0 && (
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
                  <Popover
                    open={relatedProductsOpen}
                    onOpenChange={setRelatedProductsOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value?.length && "text-muted-foreground"
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} products selected`
                            : "Select related products"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search products..." />
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup className="max-h-48 overflow-auto">
                          {productsData?.data?.products?.map((product) => (
                            <CommandItem
                              key={product._id}
                              value={product.name}
                              onSelect={() => {
                                const currentProducts = field.value || [];
                                const selected = currentProducts.includes(
                                  product._id
                                );

                                const updatedProducts = selected
                                  ? currentProducts.filter(
                                      (id) => id !== product._id
                                    )
                                  : [...currentProducts, product._id];

                                field.onChange(updatedProducts);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value?.includes(product._id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {product.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((productId) => {
                        const product = productsData?.data?.products?.find(
                          (p) => p._id === productId
                        );
                        return product ? (
                          <div
                            key={productId}
                            className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                          >
                            {product.name}
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
                        ) : null;
                      })}
                    </div>
                  )}

                  <FormDescription>
                    Products that are related to this one and may be shown
                    together
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

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MainProduct;
