"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon, ChevronsUpDown, Check, List } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { OrdersListTable } from "./OrdersListTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useCustomers } from "@/hooks/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const formSchema = z.object({
  status: z.string().optional(),
  fromDate: z.string().optional(),
  untilDate: z.string().optional(),
  user: z.string().optional(),
});

export default function OrdersList() {
  const [offset, setOffset] = useState(0);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const { data: customers } = useCustomers({
    limit: 10,
    offset: offset,
    search: "",
  });
  // console.log(customers.pages);

  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<string[]>([]);
  const [user, setUser] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: undefined,
      fromDate: undefined,
      untilDate: undefined,
      user: undefined,
    },
  });

  const clearFileds = () => {
    form.reset({
      status: "",
      fromDate: undefined,
      untilDate: undefined,
      user: undefined,
    });
    setStatus("");
    setDate([]);
    setPage(1);
  };

  const onSubmit = (values: any) => {
    setStatus(values.status);
    if (values.fromDate && values.untilDate) {
      setDate([values.fromDate, values.untilDate]);
    } else {
      setDate(undefined);
    }
    setUser(values.user);
    setPage(1);
  };

  const debouncedStatus = useDebounce(form.watch("status"), 500);
  const debouncedFromDate = useDebounce(form.watch("fromDate"), 500);
  const debouncedUntilDate = useDebounce(form.watch("untilDate"), 500);
  const debouncedUser = useDebounce(form.watch("user"), 500);

  useEffect(() => {
    form.handleSubmit(onSubmit)();
  }, [debouncedStatus, debouncedFromDate, debouncedUntilDate, debouncedUser]);

  return (
    <div className="max-w-full mx-auto rounded-sm bg-white p-4">
      <h1 className="text-2xl font-bold mb-8">Orders</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="flex items-center justify-between w-full">
            {/* status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-[300px]">
                  <Select
                    onValueChange={field.onChange}
                    value={debouncedStatus}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="dispatch">Dispatch</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="returned">Returned</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
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
                          <CalendarIcon />
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
                          <CalendarIcon />
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* user */}
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value
                            ? customers?.pages?.[0]?.data?.customers[0]?.data.find(
                                (user: any) => user._id === value
                              )?.name
                            : "Select framework..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {customers?.pages?.[0]?.data?.customers[0]?.data.map(
                                (user: any) => (
                                  <CommandItem
                                    key={user._id}
                                    value={user._id}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      field.onChange(currentValue);
                                      setOpen(false);
                                    }}
                                  >
                                    {user.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        value === user._id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Clear Button */}
            <div className="col-span-1">
              <Button
                onClick={clearFileds}
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
