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
    <div className="mt-6">
      <Card className="shadow-sm">
        <div className="p-6">
          {/* Order History Table */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Order History</h2>
            </div>
            {!order?.data.history.length ? (
              <div className="text-center py-4 text-gray-500">No order history available</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-center">Customer Informed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order?.data.history.map((odr, index) => (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell>{new Date(odr.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          odr.status === "completed" 
                            ? "bg-green-50 text-green-700"
                            : odr.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {odr.status}
                        </span>
                      </TableCell>
                      <TableCell>{odr.remarks}</TableCell>
                      <TableCell className="text-center">
                        {odr.customerInformed ? (
                          <span className="text-green-600">Yes</span>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Update Order Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Order Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="dispatch">Dispatch</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="returned">Returned</SelectItem>

                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerInformed"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-medium !mt-0">Inform Customer</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Add any comments or notes..."
                          className="min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isPending ? (
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Update Status
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
}
