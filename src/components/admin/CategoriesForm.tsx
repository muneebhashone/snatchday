"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCreateCategory, useGetCategories } from "@/hooks/api";
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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Category } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  image: z.custom<File>((v) => v instanceof File, "Please upload an image"),
  parentCategory: z.string().optional(),
  shop: z.boolean(),
  above: z.boolean(),
});

type CategoriesFormProps = {
  onSuccess?: () => void;
};

export default function CategoriesForm({ onSuccess }: CategoriesFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { mutate: createCategory, isPending } = useCreateCategory();
  const { data: getCategories } = useGetCategories({
    limit: "999999",
    offset: "0",
  });
  const categories = getCategories?.data?.categories;
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      parentCategory: "",
      shop: false,
      above: false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Clear previous preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create new preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Update form with the File object
      form.setValue("image", file, { shouldValidate: true });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      // Append all form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      createCategory(formData, {
        onSuccess: () => {
          toast.success("Category created successfully");
          // Clear image preview
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          setPreviewUrl("");
          form.reset();
          onSuccess?.();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message);
          console.error(error);
        },
      });
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    }
  }

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-6">Create New Category</h2> */}
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Category description" {...field} />
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
                <FormLabel>Image *</FormLabel>
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
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parentCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Category ID</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Parent category ID (optional)" {...field} /> */}
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category: Category) => (
                        <SelectItem key={category._id} value={category._id}>
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
                  <FormDescription>Is this a shop category?</FormDescription>
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
                  <FormLabel>Show In Mega Menu</FormLabel>
                  <FormDescription>Wanna show in mega menu?</FormDescription>
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

          <div className="flex justify-end">
            <Button
              className="hover:bg-primary"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
