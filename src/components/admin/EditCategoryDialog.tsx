"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { useGetCategories, useGetCategoryById, useUpdateCategory } from "@/hooks/api"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Category {
  _id: string;
  name: string;
  description: string;
  displayName: string;
  image: string;
  parentCategory: string | null;
  shop: boolean;
  above: boolean;
  filters: string[];
  subCategories: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description cannot be empty"),
  image: z.any(),
  parentCategory: z.string().optional(),
  shop: z.boolean(),
  above: z.boolean(),
})

interface EditCategoryDialogProps {
  categoryId: string;
}

export function EditCategoryDialog({ categoryId }: EditCategoryDialogProps) {
  
  const {data:  getSingleCategory}=useGetCategoryById(categoryId)


  const [open, setOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const { mutate: updateCategory,isPending  : isUpdateLoading } = useUpdateCategory()
  const queryClient = useQueryClient()

 

  const { data: getCategories } = useGetCategories({
    limit: "9999999"
  })
  const categories = getCategories?.data?.categories


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: getSingleCategory?.data?.name || '',
      description: getSingleCategory?.data?.description || '',
      parentCategory: getSingleCategory?.data?.parentCategory || '',
      shop: getSingleCategory?.data?.shop || false,
      above: getSingleCategory?.data?.above || false,
    },
  })


  useEffect(() => {
    if (getSingleCategory) {
      form.reset({
        name: getSingleCategory?.data?.name,
        description: getSingleCategory?.data?.description,
        parentCategory: getSingleCategory?.data?.parentCategory || '',
        shop: getSingleCategory?.data?.shop,
        above: getSingleCategory?.data?.above,
      });
    }
  }, [ getSingleCategory , form]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Clear previous preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      
      // Create new preview
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      
      // Update form
      form.setValue('image', file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()

      // Append all form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'image') {
          const file = value as File
          if (file) {
            formData.append('image', file)
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString())
        }
      })

      const dataTosend = {
        name: values.name,
        description: values.description,
        image: values.image,
        shop: values.shop,
        above: values.above,
        ...(values.parentCategory && { parentCategoryId: values.parentCategory })
      };

      updateCategory(
        { id: categoryId, data: dataTosend },
        {
          onSuccess: () => {
            toast.success("Category updated successfully")
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            form.reset()
          },
          onError: (error) => {
            toast.error("Failed to update category")
            console.error(error)
          }
        }
      )
    } catch (error) {
      toast.error("Failed to update category")
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-600 transition-colors">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update category information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
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
                    <Input placeholder="Category description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  {previewUrl && (
                    <div className="relative aspect-square w-40 rounded-lg overflow-hidden border mt-2">
                      <Image
                        src={previewUrl}
                        alt="Category preview"
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="parentCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category ID</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Parent category ID (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
            control={form.control}
            name="parentCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category ID</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Parent category ID (optional)" {...field} /> */}
                  <Select onValueChange={field.onChange} value={field.value} >
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category: Category) => (
                        <SelectItem key={category._id} value={category._id} >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="shop"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Shop</FormLabel>
                    <FormDescription>
                      Is this a shop category?
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
              name="above"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Make child Category</FormLabel>
                    <FormDescription>
                      Is this an child category?
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

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdateLoading}>
                {isUpdateLoading ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 