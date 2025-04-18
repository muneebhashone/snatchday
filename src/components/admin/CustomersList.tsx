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
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CustomeListTable } from "../CustomerListTable";

const formSchema = z.object({
  Search: z.string().optional(),
  customerGroup: z.string().optional(),
  approved: z.string().optional(),
  created: z.string().optional(),
});

export default function CustomersList() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [date, setDate] = useState("");
  const [isApprove, setApprove] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Search: "",
      customerGroup: "all",
      approved: "all",
      created: "",
    },
  });

  // Watch form values with useEffect instead of using form.watch directly
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      const debouncedUpdate = setTimeout(() => {
        setSearch(value.Search?.trim() || "");
        setGroup(value.customerGroup === "all" ? "" : value.customerGroup || "");
        setDate(value.created || "");
        setApprove(value.approved === "all" ? "" : value.approved || "");
      }, 1000);

      return () => clearTimeout(debouncedUpdate);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  const ClearFields = () => {
    form.reset({
      Search: "",
      customerGroup: "all",
      approved: "all",
      created: "",
    });
    setSearch("");
    setGroup("");
    setDate("");
    setApprove("");
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="space-y-4">
        <Form {...form}>
          <div className="grid grid-cols-4 gap-4">
            {/* customer name */}
            <FormField
              control={form.control}
              name="Search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2 block">Search</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Search customer here" className="bg-white" />
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
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2 block">Customer Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || "all"}
                    defaultValue="all"
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Groups</SelectItem>
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
                  <FormLabel className="text-sm font-medium mb-2 block">Approve</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || "all"}
                    defaultValue="all"
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
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
                <FormItem>
                  <FormLabel className="text-sm font-medium block">Created</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? new Date(field.value).toLocaleDateString("en-CA")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            field.onChange(
                              date ? new Date(date).toLocaleDateString("en-CA") : undefined
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
          </div>
        </Form>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={ClearFields}
              className="border border-primary text-primary hover:bg-primary/10"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="border rounded-md bg-white">
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
    </div>
  );
}
