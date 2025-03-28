"use client";
import React, { useState } from "react";
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
import { CalendarIcon, Filter, List } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { OrdersListTable } from "./OrdersListTable";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  status: z.string().optional(),
  from: z.coerce.date().optional(),
  until: z.coerce.date().optional(),
});

export default function OrdersList() {
  const [status, setStatus] = useState();
  const [date, setDate] = useState<string>();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: undefined,
      from: undefined,
      until: undefined,
    },
  });
  const router = useRouter();

  const clearFileds = () => {
    // router.refresh();
    form.reset({ status: "", from: undefined, until: undefined });
  };

  const onSubmit = (values: any) => {
    console.log("Form Submitted:", values);
    setStatus(values.status);

    if (values.from && values.until) {
      const endDate = new Date(values.until);
      endDate.setHours(23, 59, 0, 0);
      setDate(JSON.stringify([values.from, endDate]));
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="max-w-full mx-auto rounded-sm border">
      <div className="w-full pl-4 flex items-center gap-1">
        <List size={18} />
        Overview
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 grid grid-cols-4 items-center justify-center gap-2 bg-gray-100 pl-24 pt-4 pb-8"
        >
          {/* status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue  />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={undefined} disabled>
                      Select Status
                    </SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="dispatch">Dispatch</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="return">Return</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2 col-span-1 mx-auto">
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
          <FormField
            control={form.control}
            name="until"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2 mx-auto">
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

          {/* Buttons */}
          <div className="flex justify-start items-center pt-7 mx-auto gap-2">
            <Button
              onClick={clearFileds}
              type="button"
              className="bg-primary hover:bg-primary"
            >
              {/* <C /> */}
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
        <OrdersListTable status={status} date={date} />
      </div>
    </div>
  );
}
