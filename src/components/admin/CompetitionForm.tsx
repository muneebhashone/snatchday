"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreateCompetition,
  useGetCompetitionById,
  useGetInfiniteProducts,
  useUpdateCompetition,
} from "@/hooks/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select as AntdSelect, Spin } from "antd";
import type { SelectProps } from "antd";
import Link from "next/link";

const formSchema = z.object({
  product: z.string().min(1, "Product is required"),
  price: z.string().min(1, "Price is required"),
  fee: z.string().min(1, "Fee is required"),
  month: z.string().min(1, "Month is required"),
  question: z.string().min(1, "Question is required"),
  rightAnswer: z.string().min(1, "Right answer is required"),
  wrongAnswer: z.string().min(1, "Wrong answer is required"),
  status: z.string().min(1, "Status is required"),
});

type CompetitionFormValues = z.infer<typeof formSchema>;

type CompetitionFormProps = {
  id?: string;
  mode?: "create" | "edit";
  onSuccess?: () => void;
};

export const CompetitionForm: React.FC<CompetitionFormProps> = ({
  id,
  mode = "create",
  onSuccess,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetInfiniteProducts({ limit: "100", name: search });
  const { mutate: createCompetition } = useCreateCompetition();
  const { mutate: updateCompetition } = useUpdateCompetition();
  const { data: competition } = useGetCompetitionById(id);
  const competitionData = competition?.data;

  const form = useForm<CompetitionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      price: "",
      fee: "",
      month: "",
      question: "",
      rightAnswer: "",
      wrongAnswer: "",
      status: "",
    },
  });

  const products = data?.pages.flatMap((page) => page.data.products) || [];
  const listRef = useRef<HTMLDivElement>(null);

  // Ant Design Select handlers for infinite scroll and search
  const [productOptions, setProductOptions] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [productFetching, setProductFetching] = useState(false);
  const [productPage, setProductPage] = useState(1);
  const [productHasNext, setProductHasNext] = useState(true);
  const productDropdownRef = useRef<HTMLDivElement>(null);

  // Map products to options
  useEffect(() => {
    if (data?.pages) {
      const allProducts = data.pages.flatMap((page) => page.data.products);
      const uniqueProducts = Array.from(
        new Map(allProducts.map((p: any) => [p._id, p])).values()
      );
      setProductOptions(
        uniqueProducts.map((p: any) => ({ value: p._id, label: p.name }))
      );
      setProductHasNext(!!hasNextPage);
    }
  }, [data]);

  // Infinite scroll handler for Antd Select
  const handleProductPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrolledToBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      20;
    if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Search handler for Antd Select
  const handleProductSearch = (value: string) => {
    setSearch(value);
    setProductSearch(value);
    setProductPage(1);
    refetch();
  };

  // Ensure selected product is in options (for edit mode)
  useEffect(() => {
    if (
      id &&
      competition &&
      competition.product &&
      !productOptions.some((opt: any) => opt.value === competition.product._id)
    ) {
      setProductOptions((prev) => [
        { value: competition.product._id, label: competition.product.name },
        ...prev,
      ]);
    }
  }, [id, competition, productOptions]);

  // Set form values in edit mode
  useEffect(() => {
    if (id && competition) {
      form.reset({
        product: competitionData.product?._id || "",
        price: competitionData.price?.toString() || "",
        fee: competitionData.fee?.toString() || "",
        month: competitionData.month
          ? (new Date(competitionData.month).getMonth() + 1).toString()
          : "",
        question: competitionData.question || "",
        rightAnswer: competitionData.rightAnswer || "",
        wrongAnswer: competitionData.wrongAnswer || "",
        status: competitionData.status || "",
      });
    }
  }, [id, competition, form]);

  // Ensure selected product is in the products list for edit mode
  let productsWithSelected = products;
  const selectedProductId = form.getValues("product");
  if (
    id &&
    competition &&
    selectedProductId &&
    !products.some((p: any) => p._id === selectedProductId) &&
    competition.product
  ) {
    productsWithSelected = [competition.product, ...products];
  }

  const onSubmit = async (values: CompetitionFormValues) => {
    try {
      if (id && mode === "edit") {
        await updateCompetition(
          {
            id,
            data: {
              product: values.product,
              price: values.price,
              fee: values.fee,
              month: values.month,
              question: values.question,
              rightAnswer: values.rightAnswer,
              wrongAnswer: values.wrongAnswer,
              status: values.status,
            },
          },
          {
            onSuccess: () => {
              toast.success("Competition updated successfully!");
              form.reset();
              onSuccess?.();
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to update competition"
              );
            },
          }
        );
      } else {
        await createCompetition(
          {
            product: values.product,
            price: values.price,
            fee: values.fee,
            month: values.month,
            question: values.question,
            rightAnswer: values.rightAnswer,
            wrongAnswer: values.wrongAnswer,
            status: values.status,
          },
          {
            onSuccess: () => {
              onSuccess?.();
            },
            onError: (error: any) => {
              toast.error(
                error?.response?.data?.message || "Failed to create competition"
              );
            },
          }
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to submit competition"
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-md p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">Product Details</h1>
              <p className="text-sm italic text-gray-500">
                Enter the competition product information
              </p>
            </div>
            <hr className="border-t border-gray-200" />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <AntdSelect
                        showSearch
                        placeholder="Select a product"
                        value={field.value || undefined}
                        onChange={(value) => field.onChange(value)}
                        onSearch={handleProductSearch}
                        filterOption={false}
                        notFoundContent={
                          isLoading ? (
                            <Spin size="small" />
                          ) : (
                            "No products found"
                          )
                        }
                        options={productOptions}
                        onPopupScroll={handleProductPopupScroll}
                        style={{ width: "100%", height: "40px" }}
                        allowClear
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rightAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Right Answer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wrongAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wrong Answer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-white rounded-md p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold">Competition Settings</h1>
              <p className="text-sm italic text-gray-500">
                Configure competition parameters
              </p>
            </div>
            <hr className="border-t border-gray-200" />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
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
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <Link href="/admin/competitions">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="w-max">
            {mode === "edit" ? "Update Competition" : "Create Competition"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
