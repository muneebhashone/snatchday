"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useCreateBanner, useGetInfiniteProducts } from "@/hooks/api";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ImageIcon, Loader, Loader2 } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BannerFormData } from "@/types";
import { toast } from "sonner";
import { Select as AntdSelect, Spin } from "antd";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.instanceof(File).refine(
    (file) => {
      const acceptedImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
      ];
      return acceptedImageTypes.includes(file.type);
    },
    {
      message: "Only .jpg, .jpeg, .png, .webp and .gif formats are supported.",
    }
  ),
  productId: z.string().optional(),
  date: z.string().optional(),
});

type IForm = z.infer<typeof formSchema>;

const Page = () => {
  const { mutate: createBanner, isPending } = useCreateBanner();
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteProducts({
    limit: "10",
    name: debounceSearch,
  });

  const [productOptions, setProductOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (productsData?.pages) {
      const allProducts = productsData.pages.flatMap(
        (page) => page.data.products
      );
      const uniqueProducts = Array.from(
        new Map(allProducts.map((p) => [p._id, p])).values()
      );
      setProductOptions(
        uniqueProducts.map((p) => ({ value: p._id, label: p.name }))
      );
    }
  }, [productsData]);

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: null,
      productId: "",
      date: "",
    },
  });

  const onSubmit = (data: IForm) => {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.content) formData.append("content", data.content);
    if (data.image) formData.append("image", data.image);
    if (data.productId) formData.append("productId", data.productId);
    if (data.date) formData.append("date", data.date);

    createBanner(formData as unknown as BannerFormData, {
      onSuccess: () => {
        toast.success("Banner created successfully");
        window.location.href = "/admin/banner-settings";
      },
      onError: () => {
        toast.error("Failed to create banner");
      },
    });
  };

  const handleProductSearch = (value: string) => {
    setSearch(value);
  };

  const handleProductScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (
      target.scrollHeight - target.scrollTop === target.clientHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30">
        <AdminBreadcrumb
          title="Create"
          items={[{ title: "Banner Settings", href: "/admin/banner-settings" }]}
        />
        <div className="px-6 py-8">
          <Card className="max-w-full mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Create Banner
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Add a new banner to showcase on the platform
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter banner title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product ID</FormLabel>
                        <FormControl>
                          <AntdSelect
                            showSearch
                            placeholder="Select a product"
                            value={field.value || undefined}
                            onChange={(value) => field.onChange(value)}
                            onSearch={handleProductSearch}
                            filterOption={false}
                            notFoundContent={
                              isFetchingNextPage ? (
                                <Spin size="small" />
                              ) : (
                                "No products found"
                              )
                            }
                            options={productOptions}
                            onPopupScroll={handleProductScroll}
                            style={{ width: "100%", height: "40px" }}
                            allowClear
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Content <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter banner content"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Image <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="">
                            <Input
                              type="file"
                              placeholder="Enter image URL"
                              className="flex-1"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                            {field.value ? (
                              <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border">
                                <Image
                                  src={URL.createObjectURL(field.value)}
                                  alt="Selected Banner Image"
                                  className="w-full h-full object-cover"
                                  fill
                                />
                              </div>
                            ) : null}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(new Date(field.value), "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
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
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    onClick={() => {
                      window.location.href = "/admin/banner-settings";
                    }}
                    type="button"
                    variant="outline"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Banner"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
