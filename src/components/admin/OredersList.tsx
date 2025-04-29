"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon, ChevronsUpDown, Loader } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { OrdersListTable } from "./OrdersListTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useCustomers } from "@/hooks/api";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";

const formSchema = z.object({
  status: z.string().optional(),
  fromDate: z.string().optional(),
  untilDate: z.string().optional(),
  user: z.string().optional(),
});

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function OrdersList() {
  // State
  const [data, setData] = useState<User[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string[]>([]);
  const [user, setUser] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false);

  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hooks - Reduce debounce time for search to 300ms to reduce delay
  const debouncedSearch = useDebounce(search, 300);
  const {
    data: customers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomers({
    limit: 10,
    search: debouncedSearch,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: undefined,
      fromDate: undefined,
      untilDate: undefined,
      user: undefined,
    },
  });

  // Debounced form values
  const debouncedStatus = useDebounce(form.watch("status"), 500);
  const debouncedFromDate = useDebounce(form.watch("fromDate"), 500);
  const debouncedUntilDate = useDebounce(form.watch("untilDate"), 500);
  const debouncedUser = useDebounce(form.watch("user"), 500);

  // Convert users data to Cascader options format
  const getUserOptions = useCallback(() => {
    if (!data || data.length === 0) return [];

    console.log("Converting data to options:", data.length);
    return data.map((user) => ({
      value: user._id,
      label: user.name || user.email || "Unknown User",
    }));
  }, [data]);

  // Update data from API response - Modified to append new data instead of replacing
  const handleCustomersUpdate = useCallback(() => {
    if (!customers?.pages) return;

    try {
      const newCustomers = customers.pages.flatMap((page) => {
        if (!page.data?.customers?.[0]?.data) {
          console.warn("Unexpected data structure:", page);
          return [];
        }
        return page.data.customers[0].data;
      });

      // Only set data if we have new customers and this is the first page
      // For subsequent pages, the data is appended in the fetchNextPage handler
      if (Array.isArray(newCustomers) && customers.pages.length === 1) {
        console.log("Setting new data with", newCustomers.length, "customers");
        setData(newCustomers);
      }
    } catch (error) {
      console.error("Error processing customer data:", error);
    }
  }, [customers]);

  // Handle appending new data when next page is fetched
  useEffect(() => {
    if (customers?.pages && customers.pages.length > 1) {
      try {
        // Get only the latest page
        const latestPage = customers.pages[customers.pages.length - 1];
        if (latestPage?.data?.customers?.[0]?.data) {
          const newPageData = latestPage.data.customers[0].data;

          // Append new data to existing data
          setData((prevData) => {
            // Filter out duplicates by _id
            const existingIds = new Set(prevData.map((user) => user._id));
            const uniqueNewData = newPageData.filter(
              (user) => !existingIds.has(user._id)
            );

            console.log(
              "Appending",
              uniqueNewData.length,
              "new users to existing",
              prevData.length
            );
            return [...prevData, ...uniqueNewData];
          });
        }
      } catch (error) {
        console.error("Error appending new data:", error);
      }
    }
  }, [customers?.pages?.length]);

  // Improved search handler with timeout clearing to prevent excessive API calls
  const handleCascaderSearch = (searchText: string) => {
    console.log("Searching for:", searchText);

    // Clear previous timeout to prevent multiple rapid searches
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a timeout to prevent excessive API calls while typing
    searchTimeoutRef.current = setTimeout(() => {
      setSearch(searchText);
      // Reset data when search term changes
      if (searchText !== search) {
        setData([]);
      }
    }, 300);
  };

  // Enhanced popup scroll handler for better infinite scroll detection
  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrolledToBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      20;

    if (scrolledToBottom && hasNextPage && !isFetchingNextPage) {
      console.log("Scrolled to bottom, loading more data...");
      fetchNextPage();
    }
  };

  // Updated handleCascaderChange
  const handleCascaderChange = useCallback(
    (value) => {
      console.log("Selected:", value);
      if (value) {
        setValue([value]);
        form.setValue("user", value);
      } else {
        setValue([]);
        form.setValue("user", undefined);
      }
    },
    [form]
  );

  const handleClearFields = useCallback(() => {
    form.reset({
      status: "",
      fromDate: undefined,
      untilDate: undefined,
      user: undefined,
    });
    setValue([]);
    setSearch("");
    setStatus("");
    setDate([]);
    setPage(1);
  }, [form]);

  const handleFormSubmit = useCallback((values: any) => {
    setStatus(values.status);
    if (values.fromDate && values.untilDate) {
      setDate([values.fromDate, values.untilDate]);
    } else {
      setDate(undefined);
    }
    setUser(values.user);
    setPage(1);
  }, []);

  // Effect to update data when customers or search changes
  useEffect(() => {
    handleCustomersUpdate();
  }, [customers?.pages?.[0], handleCustomersUpdate]);

  // Effect to submit form when debounced values change
  useEffect(() => {
    form.handleSubmit(handleFormSubmit)();
  }, [
    debouncedStatus,
    debouncedFromDate,
    debouncedUntilDate,
    debouncedUser,
    form,
    handleFormSubmit,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Update the filter function to work with Select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // Custom dropdown render to handle pagination and loading states
  const dropdownRender = (menu: React.ReactElement) => (
    <div
      ref={dropdownRef}
      onScroll={handlePopupScroll}
      style={{ maxHeight: "300px", overflow: "auto" }}
    >
      {menu}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center", padding: "8px" }}>
          <Spin size="small" />
          <span style={{ marginLeft: "8px" }}>Loading more...</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-full mx-auto rounded-sm bg-white p-4">
      <h1 className="text-2xl font-bold mb-8">Orders</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-between w-full">
            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <ShadcnSelect
                    onValueChange={field.onChange}
                    value={debouncedStatus}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Payment Pending</SelectItem>
                      <SelectItem value="paid">Pending</SelectItem>
                      <SelectItem value="dispatch">Dispatch</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="returned">Returned</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </ShadcnSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* From Date */}
            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : "From Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date.toISOString());
                            }
                          }}
                          disabled={(date) => {
                            const untilDate = form.getValues("untilDate");
                            if (!untilDate) {
                              return undefined;
                            }
                            const until = new Date(untilDate);
                            until.setDate(until.getDate() - 1);
                            return date > until || date < new Date();
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Until Date */}
            <FormField
              control={form.control}
              name="untilDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : "Until Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date.toISOString());
                            }
                          }}
                          disabled={(date) => {
                            const fromDate = form.getValues("fromDate");
                            if (!fromDate) {
                              return undefined;
                            }
                            const from = new Date(fromDate);
                            from.setDate(from.getDate() + 1);
                            return date < from;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User Field - Updated Ant Design Cascader with correct props */}
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="w-[200px]">
                      <Select
                        size="large"
                        showSearch
                        placeholder="Select User"
                        optionFilterProp="label"
                        onChange={handleCascaderChange}
                        onSearch={handleCascaderSearch}
                        filterOption={filterOption}
                        value={field.value}
                        options={getUserOptions()}
                        notFoundContent={
                          isFetchingNextPage ? (
                            <Loader className="animate-spin text-primary" />
                          ) : (
                            "No users found"
                          )
                        }
                        onPopupScroll={handlePopupScroll}
                        style={{ width: "100%" }}
                        allowClear
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Clear Button */}
            <div className="col-span-1">
              <Button
                onClick={handleClearFields}
                type="button"
                className="border border-primary text-primary bg-white hover:bg-primary hover:text-white"
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {/* Orders Table */}
      <div className="my-5">
        <OrdersListTable
          status={status}
          date={JSON.stringify(date)}
          user={user}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
