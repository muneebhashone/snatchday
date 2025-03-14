// "use client";

// import { useEffect, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { toast } from "sonner";
// import { useUpdateProduct, useGetCategories, useGetFilters } from "@/hooks/api";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { useQueryClient } from "@tanstack/react-query";

// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { X } from "lucide-react";



// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   description: z.string().min(1, "Description cannot be empty"),
//   company: z.string().min(1, "Company cannot be empty"),
//   images: z.any(),
//   colors: z.string().min(1, "Colors cannot be empty"),
//   stock: z.number().min(0, "Stock must be 0 or greater"),
//   price: z.number().min(0, "Price must be 0 or greater"),
//   discounts: z.array(z.string()).optional(),
//   attributes: z.any(),
//   categoryIds: z.any(),
//   type: z.enum(["NEW", "SALE"]),
//   isFeatured: z.boolean(),
//   metaTitle: z.string().min(2, "Meta title must be at least 2 characters"),
//   metaDescription: z.string().min(1, "Meta description cannot be empty"),
//   metaKeywords: z.string().min(1, "Meta keywords cannot be empty"),
//   article: z.string().min(1, "Article cannot be empty"),
//   sku: z.string().min(1, "SKU cannot be empty"),
//   barcodeEAN: z.string().min(1, "Barcode EAN cannot be empty"),
//   noStockMessage: z.string().min(1, "No stock message cannot be empty"),
//   relatedProducts: z.array(z.string()).default([]),
//   requireShipping: z.boolean(),
//   liscenseKey: z.string().min(1, "License key cannot be empty"),
// }) as z.ZodType<ProductFormData>;

// // interface CategoryResponse {
// //   data: {
// //     categories: Category[];
// //   }
// // }



// interface ProductFormData {
//   name: string;
//   description: string;
//   company: string;
//   images: FileList | null;
//   colors: string;
//   stock: number;
//   price: number;
//   discounts: string[];
//   attributes: string;
//   categoryIds: string;
  
//   type: "NEW" | "SALE";
//   isFeatured: boolean;
//   metaTitle: string;
//   metaDescription: string;
//   metaKeywords: string;
//   article: string;
//   sku: string;
//   barcodeEAN: string;
//   noStockMessage: string;
//   relatedProducts: string[];
//   requireShipping: boolean;
//   liscenseKey: string;
// }

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   company: string;
//   images: string[];
//   colors: string[];
//   stock: number;
//   price: number;
//   discounts: {
//     amount: number;
//     price: number;
//     type: 'PERCENTAGE';
//     customerGroup: string;
//   }[];
//   attributes: "";
//   categoryIds: string[] | string;
//   type: "NEW" | "SALE";
//   isFeatured: boolean;
//   metaTitle: string;
//   metaDescription: string;
//   metaKeywords: string;
//   article: string;
//   sku: string;
//   barcodeEAN: string;
//   noStockMessage: string;
//   relatedProducts: string[];
//   requireShipping: boolean;
//   liscenseKey: string;
// }

// interface Category {
//   _id: string;
//   name: string;
//   displayName: string;
  
// }

// export default function ProductUpdateForm({ product }: { product: Product}) {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//    const parms =useParams()
//    const productId = parms.id as string
//   const [previewUrls, setPreviewUrls] = useState<string[]>(product.images || []);
//   const { mutate: updateProduct } = useUpdateProduct();
//   const { data: categoriesResponse } = useGetCategories();
//   const [selectedFilter, setSelectedFilters] = useState<string | null>(null);

//   const { data: filters } = useGetFilters();
//   const categories = categoriesResponse?.data?.categories || [];



//  // Re-run when filters or product attributes change


//   const form = useForm<ProductFormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: product.name,
//       description: product.description,
//       company: product.company,
//       images: [product.images] || [],
//       colors: product.colors.join(', '),
//       stock: product.stock,
//       price: product.price,
//       discounts: product.discounts.map(d => `${d.price}`),
//       attributes: "", 
//       categoryIds: product.categoryIds[0]._id as string || "",
//       type: product.type,
//       isFeatured: product.isFeatured,
//       metaTitle: product.metaTitle,
//       metaDescription: product.metaDescription,
//       metaKeywords: product.metaKeywords,
//       article: product.article,
//       sku: product.sku,
//       barcodeEAN: product.barcodeEAN,
//       noStockMessage: product.noStockMessage,
//       relatedProducts: product.relatedProducts,
//       requireShipping: product.requireShipping,
//       liscenseKey: product.liscenseKey,
//     },
//   });

//   const arrayToFileList = (files: File[]): FileList => {
//     const dataTransfer = new DataTransfer();
//     files.forEach((file) => {
//       dataTransfer.items.add(file);
//     });
//     return dataTransfer.files;
//   };


//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//         const filesArray = Array.from(files); // Convert FileList to an array of File objects

//         const newUrls = filesArray.map((file) => URL.createObjectURL(file));
//         setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);

//         const fileList = arrayToFileList(filesArray); // Ensure this function returns a FileList
//         form.setValue('images', fileList); // Set the images field to the FileList
//     }
//   };
  
//   async function onSubmit(values: ProductFormData) {
//     try {
//       const formData = new FormData();
      
//       // Convert form values to FormData
//       Object.entries(values).forEach(([key, value]) => {
//         if (key === 'images' && value instanceof FileList) {
//           Array.from(value).forEach((file) => {
//             formData.append('images', file);
//           });
//         } else if (key === 'categoryIds') {
//           // Convert single category ID to array format
//           formData.append('categoryIds', JSON.stringify([value]));
//         } else if (key === 'colors') {
//           const colorsArray = value.split(',').map((color: string) => color.trim()).filter(Boolean);
//           formData.append('colors', JSON.stringify(colorsArray));
//         } else if (key === 'attributes') {
//           try {
//             const attributesObject = Object.entries(selectedFilter).reduce(
//               (acc, [filterName, filterValues]) => {
//                 filterValues.forEach((value) => {
//                   acc[filterName] = value;
//                 });
//                 return acc;
//               },
//               {}
//             );
//             formData.append('attributes', JSON.stringify(attributesObject));
//           } catch (error) {
//             console.error('Error parsing attributes:', error);
//             formData.append('attributes', '{}');
//           }
//         } else if (key === 'relatedProducts') {
//           formData.append('relatedProducts', JSON.stringify(value));
//         } else if (key === 'discounts') {
//           try {
//             interface DiscountItem {
//               amount: number;
//               price: number;
//               type: 'PERCENTAGE';
//               customerGroup: string;
//             }

//             const discountsArray = value.split(',').map((discount: string) => {
//               const [amountStr, priceStr] = discount.split(':').map((v: string) => v.trim());
//               const amount = parseFloat(amountStr);
//               const price = parseFloat(priceStr);
              
//               if (isNaN(amount) || isNaN(price)) {
//                 throw new Error(`Invalid discount format: ${discount}`);
//               }

//               return {
//                 amount,
//                 price,
//                 type: 'PERCENTAGE' as const,
//                 customerGroup: 'ALL'
//               };
//             }).filter((d: DiscountItem) => d.amount > 0 && d.price > 0);

//             formData.append('discounts', JSON.stringify(discountsArray));
//           } catch (error) {
//             console.error('Error parsing discounts:', error);
//             formData.append('discounts', '[]');
//           }
//         } else if (value !== undefined && value !== null) {
//           formData.append(key, value.toString());
//         }
//       });

//       // Update product with FormData
//       updateProduct({ 
//         id: productId, 
//         data: formData as any // Type assertion needed due to FormData vs ProductFormData mismatch
//       }, {
//         onSuccess: () => {
//           toast.success("Product updated successfully");
//           queryClient.invalidateQueries({ queryKey: ['products'] });
//           // router.push(`/admin/products`);
//         },
//         onError: (error) => {
//           toast.error("Failed to update product");
//           console.error(error);
//         },
//       });
//     } catch (error) {
//       toast.error("Failed to update product");
//       console.error(error);
//     }
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Update Product</h2>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="company"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Company</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//                 <FormField
//             control={form.control}
//             name="images"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Images *</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </FormControl>
//                 <div className="flex gap-4 my-2">
//                   {previewUrls?.map((url, index) => (
//                     <div
//                       key={index}
//                       className="relative aspect-square w-20 h-20 rounded-lg overflow-hidden border"
//                     >
//                       <Image
//                         src={url}
//                         alt={`Preview ${index + 1}`}
//                         fill
//                         className="object-cover"
//                       />
//                       <button
//                         className="absolute top-0 left-0 bg-white rounded-full p-1 shadow"
//                         onClick={() => {
//                           setPreviewUrls((prev) =>
//                             prev.filter((_, i) => i !== index)
//                           );

//                           // Ensure to update the form value when an image is removed
//                           const currentImages = form.getValues('images') as FileList;
//                           const updatedImages = Array.from(currentImages).filter((_, i) => i !== index);
//                           form.setValue('images', updatedImages);
//                           URL.revokeObjectURL(url);
//                         }}
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={e => field.onChange(parseFloat(e.target.value))}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="stock"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Stock</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={e => field.onChange(parseInt(e.target.value))}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="categoryIds"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field?.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {categories?.map((category: Category) => (
//                       <SelectItem key={category._id} value={category._id}>
//                         {category.displayName || category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="type"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Type</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="NEW">New</SelectItem>
//                     <SelectItem value="SALE">Sale</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//            <FormField
//             control={form.control}
//             name="attributes"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Filters name</FormLabel>
//                 <FormControl>
//                   <Select
//                     onValueChange={(value) => {
//                       const currentValues = field.value || [];
//                       if (!currentValues.includes(value)) {
//                         field.onChange([...currentValues, value]);

//                         // Assuming each selected filter name will give corresponding values
//                         const filter = filters?.data.find(
//                           (f) => f.name === value
//                         );
//                         if (filter) {
//                           setSelectedFilters((prevFilters) => ({
//                             ...prevFilters,
//                             [filter.name]: filter.value, // Store filter name as key and its values as array
//                           }));
//                         }
//                       }
//                     }}
//                     multiple
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select filter" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {filters?.data?.map((filter) => (
//                         <SelectItem key={filter._id} value={filter.name}>
//                           {filter.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormControl>

//                 {field.value?.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {field.value.map((filterName) => (
//                       <div
//                         key={filterName}
//                         className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
//                       >
//                         <span className="text-sm">{filterName}</span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           className="h-auto p-0 px-1 hover:bg-transparent hover:opacity-70"
//                           onClick={() => {
//                             field.onChange(
//                               field.value.filter((name) => name !== filterName)
//                             );
//                             setSelectedFilters((prevFilters) => {
//                               const updatedFilters = { ...prevFilters };
//                               delete updatedFilters[filterName]; // Remove filter from selected filters
//                               return updatedFilters;
//                             });
//                           }}
//                         >
//                           ×
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="isFeatured"
//             render={({ field }) => (
//               <FormItem className="flex items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel>Featured Product</FormLabel>
//                   <FormDescription>
//                     Display this product in featured sections
//                   </FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="colors"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Colors *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Product colors (comma-separated)" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Enter colors separated by commas (e.g., Red, Blue, Green)
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="discounts"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Discounts</FormLabel>
//                 <FormControl>
//                   <Input 
//                     placeholder="Enter discounts" 
//                     {...field} 
//                   />
//                 </FormControl>
          
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

// <FormField
//             control={form.control}
//             name="type"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Type</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select type" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="NEW">New</SelectItem>
//                     <SelectItem value="SALE">Sale</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />


//           <FormField
//             control={form.control}
//             name="metaTitle"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Meta Title *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="SEO meta title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="metaDescription"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Meta Description *</FormLabel>
//                 <FormControl>
//                   <Textarea placeholder="SEO meta description" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="metaKeywords"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Meta Keywords *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="SEO meta keywords (comma-separated)" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="article"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Article *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Product article" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="sku"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>SKU *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Stock Keeping Unit" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="barcodeEAN"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Barcode EAN *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Barcode EAN number" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="noStockMessage"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>No Stock Message *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Message to show when out of stock" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="requireShipping"
//             render={({ field }) => (
//               <FormItem className="flex items-center justify-between rounded-lg border p-4">
//                 <div className="space-y-0.5">
//                   <FormLabel>Require Shipping *</FormLabel>
//                   <FormDescription>
//                     Does this product require shipping?
//                   </FormDescription>
//                 </div>
//                 <FormControl>
//                   <Switch
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="liscenseKey"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>License Key *</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Product license key" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex justify-end">
//             <Button type="submit">Update Product</Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useUpdateProduct, useGetCategories } from "@/hooks/api";
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

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  description: z.string().min(1, "Description cannot be empty").optional(),
  company: z.string().min(1, "Company cannot be empty").optional(),
  images: z.any().optional(),
  colors: z.string().min(1, "Colors cannot be empty").optional(),
  stock: z.number().min(0, "Stock must be 0 or greater").optional(),
  price: z.number().min(0, "Price must be 0 or greater").optional(),
  discounts: z.string().refine((value) => {
    try {
      const discounts = value.split(',').map(d => {
        const [amount, price] = d.split(':').map(v => parseFloat(v.trim()));
        return !isNaN(amount) && !isNaN(price);
      });
      return discounts.every(Boolean);
    } catch {
      return false;
    }
  }, "Enter discounts as 'percentage:price' pairs (e.g., '10:100, 20:200')").optional(),
  attributes: z.string().min(1, "Attributes cannot be empty").optional(),
  categoryIds: z.string().min(1, "Category is required").optional(),
  type: z.enum(["NEW", "SALE"]).optional(),
  isFeatured: z.boolean().optional(),
  metaTitle: z.string().min(2, "Meta title must be at least 2 characters").optional(),
  metaDescription: z.string().min(1, "Meta description cannot be empty").optional(),
  metaKeywords: z.string().min(1, "Meta keywords cannot be empty").optional(),
  article: z.string().min(1, "Article cannot be empty").optional(),
  sku: z.string().min(1, "SKU cannot be empty").optional(),
  barcodeEAN: z.string().min(1, "Barcode EAN cannot be empty").optional(),
  noStockMessage: z.string().min(1, "No stock message cannot be empty").optional(),
  relatedProducts: z.array(z.string()).default([]).optional(),
  requireShipping: z.boolean().optional(),
  liscenseKey: z.string().min(1, "License key cannot be empty").optional(),
}) as z.ZodType<ProductFormData>;

// interface CategoryResponse {
//   data: {
//     categories: Category[];
//   }
// }

interface ProductFormData {
  name: string;
  description: string;
  company: string;
  images: FileList | null;
  colors: string;
  stock: number;
  price: number;
  discounts: string;
  attributes: string;
  categoryIds: string;
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

interface Product {
  _id: string;
  name: string;
  description: string;
  company: string;
  images: string[];
  colors: string[];
  stock: number;
  price: number;
  discounts: {
    amount: number;
    price: number;
    type: 'PERCENTAGE';
    customerGroup: string;
  }[];
  attributes: Record<string, string>;
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

interface Category {
  _id: string;
  name: string;
  displayName: string;
  
}

export default function ProductUpdateForm({ product }: { product: Product}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [previewUrls, setPreviewUrls] = useState<string[]>(product.images || []);
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: categoriesResponse } = useGetCategories();
  const parms = useParams()
  const productId = parms.id as string
  
  const categories = categoriesResponse?.data?.categories || [];

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      company: product.company,
      images: null,
      colors: product.colors.join(', '),
      stock: product.stock,
      price: product.price,
      discounts: product.discounts.map(d => `${d.amount}:${d.price}`).join(', '),
      attributes: Object.entries(product.attributes).map(([key, value]) => `${key}:${value}`).join(', '),
      categoryIds: product.categoryIds[0] || '',
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Clear previous previews
      previewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      
      // Create new previews
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
      
      // Update form
      form.setValue('images', files);
    }
  };

  async function onSubmit(values: ProductFormData) {
    try {
      const formData = new FormData();
      console.log(values)
      
      // Convert form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'images' && value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append('images', file);
          });


        } else if (key === 'categoryIds') {
          // Convert single category ID to array format
          formData.append('categoryIds', JSON.stringify([value]));
        } else if (key === 'colors') {
          const colorsArray = value.split(',').map((color: string) => color.trim()).filter(Boolean);
          formData.append('colors', JSON.stringify(colorsArray));
        } else if (key === 'attributes') {
          try {
            const attributesObject = value.split(',').reduce((acc: Record<string, string>, pair: string) => {
              const [attrKey, attrValue] = pair.split(':').map(item => item.trim());
              if (attrKey && attrValue) {
                acc[attrKey] = attrValue;
              }
              return acc;
            }, {});
            formData.append('attributes', JSON.stringify(attributesObject));
          } catch (error) {
            console.error('Error parsing attributes:', error);
            formData.append('attributes', '{}');
          }
        } else if (key === 'relatedProducts') {
          formData.append('relatedProducts', JSON.stringify(value));
        } else if (key === 'discounts') {
          try {
            interface DiscountItem {
              amount: number;
              price: number;
              type: 'PERCENTAGE';
              customerGroup: string;
            }

            const discountsArray = value.split(',').map((discount: string) => {
              const [amountStr, priceStr] = discount.split(':').map((v: string) => v.trim());
              const amount = parseFloat(amountStr);
              const price = parseFloat(priceStr);
              
              if (isNaN(amount) || isNaN(price)) {
                throw new Error(`Invalid discount format: ${discount}`);
              }

              return {
                amount,
                price,
                type: 'PERCENTAGE' as const,
                customerGroup: 'ALL'
              };
            }).filter((d: DiscountItem) => d.amount > 0 && d.price > 0);

            formData.append('discounts', JSON.stringify(discountsArray));
          } catch (error) {
            console.error('Error parsing discounts:', error);
            formData.append('discounts', '[]');
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      // Update product with FormData
      updateProduct({ 
       id :productId, 
        data: formData as any // Type assertion needed due to FormData vs ProductFormData mismatch
      }, {
        onSuccess: () => {
          toast.success("Product updated successfully");
          queryClient.invalidateQueries({ queryKey: ['products'] });
          router.push(`/admin/products`);
        },
        onError: (error) => {
          toast.error("Failed to update product");
          console.error(error);
        },
      });
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
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
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
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
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category: Category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.displayName || category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors *</FormLabel>
                <FormControl>
                  <Input placeholder="Product colors (comma-separated)" {...field} />
                </FormControl>
                <FormDescription>
                  Enter colors separated by commas (e.g., Red, Blue, Green)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discounts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discounts *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter as percentage:price (e.g., 10:100, 20:200)" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter discounts as percentage:price pairs, separated by commas (e.g., 10:100, 20:200)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attributes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attributes *</FormLabel>
                <FormControl>
                  <Input placeholder="Product attributes (key:value pairs, comma-separated)" {...field} />
                </FormControl>
                <FormDescription>
                  Enter attributes as key:value pairs (e.g., Size:XL, Color:Blue)
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
                  <Input placeholder="SEO meta keywords (comma-separated)" {...field} />
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
                  <Input placeholder="Message to show when out of stock" {...field} />
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
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}