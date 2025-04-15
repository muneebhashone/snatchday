"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AdminLayout from "@/components/admin/AdminLayout";
import { useGetTicketById, useReplyTicket } from "@/hooks/api";
import { SelectItem, Select } from "@/components/ui/select";
import { SelectContent, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required",
  }),
  status: z.string().min(1, {
    message: "Status is required",
  }),
});

const TicketReplyPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: ticket, isLoading } = useGetTicketById(params.id as string);
  const { mutate: replyTicket, isPending } = useReplyTicket();

  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      status: ticket?.data?.status || "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("status", values.status);
    
    // Append each attachment to formData
    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    replyTicket(
      {
        id: params.id as string,
        formData: formData
      },
      {
        onSuccess: () => {
          toast.success("Reply sent successfully");
          router.push("/admin/tickets");
        },
        onError: (error) => {
          toast.error("Failed to send reply");
          console.error("Error:", error);
        }
      }
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Reply to Ticket #{ticket?.data?.ticketNo}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Ticket Details</h3>
              <p><span className="font-medium">From:</span> {ticket?.data?.email}</p>
              <p><span className="font-medium">Subject:</span> {ticket?.data?.subject}</p>
              <p><span className="font-medium">Department:</span> {ticket?.data?.department}</p>
              <p><span className="font-medium">Status:</span> {ticket?.data?.status}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Previous Messages</h3>
              <div className="space-y-4">
                {ticket?.data?.messages.map((msg, index) => (
                  <div key={index} className={`p-4 rounded-lg ${msg.sender === 'user' ? 'bg-gray-100' : 'bg-blue-50'}`}>
                    <p className="text-sm text-gray-500 mb-1">{msg.sender === 'user' ? 'Customer' : 'Admin'}</p>
                    <p>{msg.message}</p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.attachments.map((attachment, i) => (
                            <a 
                              key={i}
                              href={attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline text-sm"
                            >
                              📎 Attachment {i + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reply Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Type your reply here..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Attachments</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full p-3 rounded-lg border-dashed border-2"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    📎 ADD SCREENSHOT/FILE
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                  {attachments.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">Selected files:</p>
                      <ul className="list-disc pl-5">
                        {attachments.map((file, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OPEN">Offen</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Bearbeitung</SelectItem>
                            <SelectItem value="CLOSED">Erledigt</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />   
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Sending..." : "Send Reply"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default TicketReplyPage;