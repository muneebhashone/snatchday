"use client";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AdminLayout from "@/components/admin/AdminLayout";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader, Save } from "lucide-react";
import ReactRating from "react-rating";
import { Star } from "lucide-react";
import {
  useCreateReview,
  useGetInfiniteProducts,
  useGetReviewById,
  useUpdateReview,
} from "@/hooks/api";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Select } from "antd";

const formSchema = z.object({
  product: z.string().min(1, "Product is required"),
  rating: z.number().min(1, "Rating is required"),
  comment: z.string().min(1, "Comment is required"),
  userName: z.string().min(1, "User name is required"),
});

type IForm = z.infer<typeof formSchema>;

const Rating = ReactRating as any;

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const params = useParams();
  const router = useRouter();
  const reviewId = params?.id as string | undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const {
    data: products,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteProducts({
    limit: "10",
    offset: "0",
    name: search,
  });
  const { data: reviewData } = useGetReviewById(reviewId);
  const { mutate: createReview, isPending: isCreating } = useCreateReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      rating: 0,
      comment: "",
      userName: "",
    },
  });

  // Effect to update products data when API response changes
  useEffect(() => {
    if (!products?.pages || products.pages.length === 0) return;

    try {
      // Get products from first page
      const firstPageProducts = products.pages[0].data?.products || [];

      if (products.pages.length === 1) {
        setData(firstPageProducts);
      }
    } catch (error) {
      console.error("Error processing product data:", error);
    }
  }, [products?.pages]);

  // Effect to append new products when additional pages are loaded
  useEffect(() => {
    if (!products?.pages || products.pages.length <= 1) return;

    try {
      // Get the latest page
      const latestPage = products.pages[products.pages.length - 1];
      const latestPageProducts = latestPage.data?.products || [];

      // Append new products to existing data
      setData((prevData) => {
        // Filter out duplicates by _id
        const existingIds = new Set(prevData.map((product) => product._id));
        const uniqueNewProducts = latestPageProducts.filter(
          (product) => !existingIds.has(product._id)
        );

        return [...prevData, ...uniqueNewProducts];
      });
    } catch (error) {
      console.error("Error appending new products:", error);
    }
  }, [products?.pages?.length]);

  // Populate form with review data if editing
  useEffect(() => {
    if (reviewId && reviewData?.data) {
      console.log(reviewData.data);
      form.reset({
        product: reviewData.data.product,
        rating: reviewData.data.rating,
        comment: reviewData.data.comment,
        userName: reviewData.data.userName,
      });
    }
  }, [reviewId, reviewData, form]);

  const onSubmit = (data: IForm) => {
    setIsLoading(true);

    if (reviewId) {
      // Update existing review
      updateReview(
        {
          id: reviewId,
          data: {
            ...data,
            product: undefined,
          },
        },
        {
          onSuccess: () => {
            toast.success("Review updated successfully");
            router.push("/admin/reviews");
            setIsLoading(false);
          },
          onError: () => {
            toast.error("Failed to update review");
            setIsLoading(false);
          },
        }
      );
    } else {
      // Create new review
      createReview(data, {
        onSuccess: () => {
          toast.success("Review created successfully");
          router.push("/admin/reviews");
          setIsLoading(false);
        },
        onError: () => {
          toast.error("Failed to create review");
          setIsLoading(false);
        },
      });
    }
  };

  const isPending = isCreating || isUpdating || isLoading;
  const isEditMode = !!reviewId;

  // Handle product selection change
  const handleProductChange = (value: string) => {
    form.setValue("product", value);
  };

  // Handle search in select dropdown
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  // Filter function for local filtering
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // Convert products to select options
  const getProductOptions = useCallback(() => {
    if (!data || data.length === 0) return [];

    return data.map((product) => ({
      value: product._id,
      label: product.name || "Unknown Product",
    }));
  }, [data]);

  // Handle scrolling in dropdown for infinite loading
  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrolledToBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      20;

    if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb
        title={isEditMode ? "Edit Review" : "Create Review"}
        items={[{ title: "Reviews", href: "/admin/reviews" }]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Review" : "Create Review"}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/reviews")}
            className="hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="review-form"
            disabled={isPending}
            className="bg-primary transition-colors"
          >
            <Save className="mr-2 h-4 w-4" />
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin mr-2 text-white" />
            ) : isEditMode ? (
              "Update Review"
            ) : (
              "Create Review"
            )}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-8">
        <Form {...form}>
          <form
            id="review-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium">
                      Product *
                    </FormLabel>
                    <div className="w-full">
                      <Select
                        size="large"
                        showSearch
                        placeholder="Select Product"
                        optionFilterProp="label"
                        onChange={handleProductChange}
                        onSearch={handleSearch}
                        filterOption={filterOption}
                        value={field.value}
                        options={getProductOptions()}
                        loading={isFetchingNextPage}
                        notFoundContent={
                          !isFetchingNextPage && "No products found"
                        }
                        onPopupScroll={handlePopupScroll}
                        style={{ width: "100%" }}
                        allowClear
                        disabled={isEditMode}
                      />
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-medium">
                      Rating *
                    </FormLabel>
                    <div className="py-2">
                      <Rating
                        emptySymbol={
                          <Star className="text-gray-300 w-7 h-7 transition-all" />
                        }
                        fullSymbol={
                          <Star
                            className="text-yellow-400 w-7 h-7 transition-all"
                            fill="#facc15"
                          />
                        }
                        initialRating={field.value}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        className="flex gap-1"
                      />
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium">
                    User Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter user name"
                      className="h-12 rounded-md border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium">
                    Comment *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter review comment"
                      className="min-h-[150px] rounded-md border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Page;
