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
import { CalendarIcon, Filter, List, Save } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CustomeListTable } from "../CustomerListTable";

const formSchema = z.object({
  customerName: z.string().optional(),
  customerGroup: z.string().optional(),
  approved: z.enum(["yes", "no"]).optional(),
  created: z.coerce.date().optional(),
  email: z.string().optional(),
  // status: z.enum(["active", "inactive"]).optional(),
  status: z.string().optional(),
  IP: z.string().optional(),
});

export default function CustomersList() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [active, setActive] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerGroup: "",
      approved: undefined,
      created: null,
      email: "",
      status: undefined,
      IP: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log("Form Submitted:", values);
    setSearch(values.customerName);
    setGroup(values.customerGroup);
    setDate(null);
    setActive(values.status);
  };

  return (
    // <div className="max-w-full mx-auto p-6 rounded-lg bg-gray-100 pl-24">
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
            name="customerName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter customer name" />
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={null}>Select</SelectItem>
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
                <FormLabel>Approved</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Approved or not" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* created at */}
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
                        {field.value ? String(field.value) : "Pick a date"}
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
                            new Date(date).toISOString().split("T")[0]
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

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="Enter email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={null}>Select</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IP */}
          <FormField
            control={form.control}
            name="IP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IP</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="IP" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-start items-center pt-7 ">
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
          isActive={active}
        />
      </div>
    </div>
  );
}
