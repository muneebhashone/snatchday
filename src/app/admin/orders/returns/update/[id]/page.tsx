"use client";

import type React from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MessageCircle, Upload, Info, ChevronDown } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/admin/AdminLayout";
import { useGetReturnById, useUpdateReturnHistory } from "@/hooks/api";
import { useParams } from "next/navigation";
import { formatDate } from "date-fns";
import { UpdateReturnTypes } from "@/types/admin";
import { toast } from "sonner";

// Define form schema
const formSchema = z.object({
  status: z.string(),
  customerInformed: z.boolean().default(false),
  remarks: z.string().optional(),
  //   fileUpload: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReturnHistory() {   
    const {id}=useParams()

   const {data:returnData,refetch}=useGetReturnById(id as string)
   const {mutate:updateReturnMutation,isPending}=useUpdateReturnHistory()

   console.log(returnData,"returnData4")

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "waiting",
      customerInformed: false,
      remarks: "",
    },
  });

  const onSubmit=async(data: FormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
    const updateData={
        status:data.status,
        customerInformed:data.customerInformed,
        remarks:data.remarks,
        date: new Date().toLocaleDateString()
    }
    console.log(updateData,"updateData")
    await updateReturnMutation({id:id as string,data:updateData},
        {
        onSuccess:()=>{
            toast.success("Return updated successfully")
            form.reset()
            refetch()
        },
        onError:(error)=> {
            console.log(error,"error from api")
            console.log("Update failed");
            toast.error("Return update failed");
        }
    })
   
  }
  return (
    <AdminLayout>
    <div className="mt-5 border bg-white">
     
      <div className="w-full bg-primary text-white p-2">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h2 className="text-lg font-medium">Return history</h2>
        </div>
      </div>

      {/* <div className="p-4 border-b">
        <Tabs defaultValue="course">
          <TabsList className="grid w-full max-w-xs grid-cols-3">
            <TabsTrigger value="course">Course</TabsTrigger>
            <TabsTrigger value="refund">Refund points</TabsTrigger>
            <TabsTrigger value="more">More</TabsTrigger>
          </TabsList>
        </Tabs>
      </div> */}

      <div className="p-4 border-b">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-primary">Created</TableHead>
              <TableHead className="text-primary">comment</TableHead>
              <TableHead className="text-primary">status</TableHead>
              <TableHead className="text-primary">Customer informed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {returnData?.data?.history?.map((item,index)=>(
            <TableRow key={index}>
              <TableCell className="font-medium">{formatDate(item?.date || "", "dd/MM/yyyy")}</TableCell>
              <TableCell>{item?.remarks}</TableCell>
              <TableCell className="capitalize">{item?.status}</TableCell>
              <TableCell>{item?.customerInformed ? "Yes" : "No"}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-right text-sm text-muted-foreground mt-2">
          Showing 1 to 1 of 1 (1 page(s))
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium mb-6 flex items-center text-primary">
          <span>+</span> Return history
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
                        Return status
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full max-w-md">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="waiting">
                               Wating for Product                            </SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="complete">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
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

            {/* Order Status Button */}
            <div className="flex justify-end mt-8">
              <Button type="submit" disabled={isPending} className="bg-primary capitalize hover:bg-primary/90">
                 {isPending ? "updating..." : "update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
    </AdminLayout>
  );
}