"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
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
import { CalendarIcon, Filter, List, Rotate3d } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CustomeListTable } from "../CustomerListTable";

const formSchema = z.object({
  Search: z.string().optional(),
  customerGroup: z.string().optional(),
  approved: z.string().optional(),
  created: z.string().optional(),
  // created: z.coerce.date().optional(),
});

export default function CustomersList() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [isApprove, setApprove] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Search: "",
      customerGroup: "",
      approved: undefined,
      created: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    setSearch(values.Search.trim());
    setGroup(values.customerGroup);
    setDate(values.created);
    setApprove(values.approved);
  };

  const ClearFields = () => {
    form.reset();
    setSearch("");
    setGroup("");
    setDate("");
    setApprove("");
  };

  return (
    <div>
      <h1>Customers</h1>
      <div className="max-w-full mx-auto rounded-sm border">
        <div className="w-full pl-4 flex items-center gap-1">
          {/* <OverviewIcon />  */}
          <List size={18} />
          Overview
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-1 grid grid-cols-4 items-center justify-center gap-2 bg-gray-100 pl-24 pt-4 pb-8"
          >
            {/* customer name */}
            <FormField
              control={form.control}
              name="Search"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Search customer here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* customer group */}
            <FormField
              control={form.control}
              name="customerGroup"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Customer Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue=""
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Title" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={undefined}>Select</SelectItem>
                      <SelectItem value="BASIC">Basic</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* approved */}
            <FormField
              control={form.control}
              name="approved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approve</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue=""
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Approved</SelectItem>
                      <SelectItem value="false">Not Approve</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date */}
            <FormField
              control={form.control}
              name="created"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-3">
                  <FormLabel>Created</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value
                            ? String(field.value.split("T")[0])
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(
                              date ? new Date(date).toISOString() : undefined
                            );
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
            {/* Buttons */}
            <div className="flex justify-start items-center pt-7 gap-4">
              <Button
                onClick={() => ClearFields()}
                type="button"
                className="ml-4 bg-[#007bff] hover:bg-[007bff]"
              >
                <Rotate3d />
                Clear
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary">
                <Filter />
                Filter
              </Button>
            </div>
          </form>
        </Form>
        <div className="px-3 my-5">
          <CustomeListTable
            search={search}
            group={group}
            date={date}
            isActive={isApprove}
          />
        </div>
      </div>
    </div>
  );
}
