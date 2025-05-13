"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useUpdateBanner,
  useGetInfiniteProducts,
  useGetBannerById,
} from "@/hooks/api";
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
import { useParams } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z
    .instanceof(File)
    .refine((file) => {
      if (!file) return true;
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      return validTypes.includes(file.type);
    }, "Only .jpg, .jpeg, .png, .gif and .webp formats are supported.")
    .optional(),
  productId: z.string().optional(),
  date: z.string().optional(),
});

type IForm = z.infer<typeof formSchema>;

const Page = () => {
  const params = useParams();
  const { mutate: updateBanner, isPending } = useUpdateBanner();
  const { data: bannerData, isLoading } = useGetBannerById(params.id as string);
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
      productId: "",
      date: "",
    },
  });

  useEffect(() => {
    if (bannerData?.data) {
      const banner = bannerData.data;
      form.reset({
        title: banner.title,
        content: banner.content,
        productId: banner.productId,
        date: banner.date,
      });
    }
  }, [bannerData, form]);

  const onSubmit = (data: IForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.productId) {
      formData.append("productId", data.productId);
    }
    if (data.date) {
      formData.append("date", data.date);
    }

    updateBanner(
      { id: params.id as string, data: formData as unknown as BannerFormData },
      {
        onSuccess: () => {
          toast.success("Banner updated successfully");
          //   window.location.href = "/admin/banner-settings";
        },
        onError: () => {
          toast.error("Failed to u// pdate banner");
        },
      }
    );
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50/30 flex items-center justify-center">
          <Loader size={32} className="animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30">
        <AdminBreadcrumb
          title="Edit"
          items={[{ title: "Banner Settings", href: "/admin/banner-settings" }]}
        />
        <div className="px-6 py-8">
          <Card className="max-w-full mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Edit Banner
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Update existing banner information
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

                  {bannerData?.data?.productId && (
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
                                isFetchingNextPage
                                  ? "Loading..."
                                  : "No products found"
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
                  )}
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
                  {bannerData?.data?.date && (
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Image <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-4">
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
                              ) : bannerData?.data?.image ? (
                                <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border">
                                  <Image
                                    src={bannerData.data.image}
                                    alt="Current Banner Image"
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
                  )}
                  {bannerData?.data?.date && (
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
                  )}
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
                    {isPending ? "Updating..." : "Update Banner"}
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
