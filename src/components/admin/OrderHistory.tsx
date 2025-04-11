"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MessageCircle, Upload, Info, ChevronDown, Loader } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useGetOrderById, usePatchOrder } from "@/hooks/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { IFormData } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

// Define form schema
const formSchema = z.object({
  status: z.string(),
  customerInformed: z.boolean().default(false),
  remarks: z.string().optional(),
  //   fileUpload: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function OrderHistory() {
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const params = useParams();
  const paramsId = params.id;
  const { data: order } = useGetOrderById(paramsId);
  const { mutate: updateOrder, isPending } = usePatchOrder(paramsId);
  const queryClient = useQueryClient();

  console.log(order?.data.createdAt, "ajgj");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "pending",
      customerInformed: false,
      remarks: "",
    },
  });

  function onSubmit(data) {
    console.log("Form submitted:", data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    updateOrder(formData as unknown as IFormData, {
      onSuccess: () => {
        toast.success("Order updated successfully");
        queryClient.invalidateQueries({ queryKey: ["order"] });
        form.reset({ status: "", customerInformed: false, remarks: "" });
      },
      onError: (error) => {
        toast.error(`Failed to update order: ${error.message}`);
      },
    });
  }

  return (
    <div className="mt-5 border bg-white">
      {/* Header */}
      <div className="w-full bg-primary text-white p-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h2 className="text-lg font-medium">Order history</h2>
        </div>
      </div>

      {/* Tabs */}
      {/* <div className="p-4 border-b">
        <Tabs defaultValue="course">
          <TabsList className="grid w-full max-w-xs grid-cols-3">
            <TabsTrigger value="course">Course</TabsTrigger>
            <TabsTrigger value="refund">Refund points</TabsTrigger>
            <TabsTrigger value="more">More</TabsTrigger>
          </TabsList>
        </Tabs>
      </div> */}

      {/* Order History Table */}
      <div className="p-4 border-b">
        {!order?.data.history.length ? (
          <div className="font-bold text-center">*no orders history*</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-primary text-center">
                  Created
                </TableHead>
                <TableHead className="text-primary text-center">
                  Remarks
                </TableHead>
                <TableHead className="text-primary text-center">
                  status
                </TableHead>
                <TableHead className="text-primary text-center">
                  Customer informed
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.data.history.map((odr) => (
                <TableRow key={odr}>
                  <TableCell className="font-medium text-center">
                    {odr?.date.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-center">{odr.remarks}</TableCell>
                  <TableCell className="text-center capitalize">
                    {odr.status}
                  </TableCell>
                  <TableCell className="text-center">
                    {odr.customerInformed ? "yes" : "no"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Order Management Section */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-6 flex items-center text-primary">
          <span>+</span> Order history
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="mb-6">
              <CardContent className="p-4">
                {/* Order Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[200px_1fr] items-center mb-4">
                      <FormLabel className="text-right pr-4 font-medium">
                        Order status
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue=""
                        >
                          <SelectTrigger className="w-full max-w-md">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="dispatch">Dispatch</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="return">Return</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Inform customer */}
                <FormField
                  control={form.control}
                  name="customerInformed"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[200px_1fr] items-center mb-4 border-t pt-4">
                      <FormLabel className="text-right pr-4 font-medium">
                        Inform customer
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Comment */}
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[200px_1fr] items-start mb-4 border-t pt-4">
                      <FormLabel className="text-right pr-4 pt-2 font-medium">
                        comment
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} className="min-h-[150px] w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Attachments */}
            {/* <div className="mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="uppercase text-xs font-semibold text-primary">
                      Order Attachments
                    </TableHead>
                    <TableHead className="uppercase text-xs font-semibold text-primary">
                      Order Attachment ID
                    </TableHead>
                    <TableHead className="uppercase text-xs font-semibold text-primary">
                      File Location
                    </TableHead>
                    <TableHead className="uppercase text-xs font-semibold text-primary">
                      Date Added
                    </TableHead>
                    <TableHead className="uppercase text-xs font-semibold text-primary">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No attachments added
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div> */}

            {/* Upload Wizard */}
            {/* <div className="grid grid-cols-[200px_1fr] items-center mt-8">
              <div className="text-right pr-4 font-medium">Upload Wizard</div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FormField
                    control={form.control}
                    name="fileUpload"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[200px_1fr] items-start mb-4 border-t pt-4">
                        <FormControl>
                          <Input type="file" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleUpload}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Upload className="w-4 h-4 mr-2" /> UPLOAD
                </Button>
              </div>
            </div> */}

            {/* Order Status Button */}
            <div className="flex justify-end mt-8">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-primary hover:bg-primary"
              >
                {isPending ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  <div className="flex items-center capitalize justify-center">
                    update status
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
