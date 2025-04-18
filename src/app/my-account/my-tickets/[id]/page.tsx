"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
import { useCreateTicket, useGetTicketById, useReplyTicket } from "@/hooks/api";
import { format } from "date-fns";
import { toast } from "sonner";
import ClientLayout from "@/components/landing-page/ClientLayout";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

const TicketDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: ticket, isLoading , refetch} = useGetTicketById(params.id as string);
  console.log(ticket, "ticket")
  const { mutate: replyTicket, isPending} = useReplyTicket();

  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy (HH:mm)");
    } catch (error) {
      return dateString;
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("message", values.message);
    
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
          form.reset();
          setAttachments([]);
          refetch();
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
    <ClientLayout>
      <div className="container mx-auto py-40">
        <Card>
          <CardContent className="p-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 border-b pb-4">
              <div>
                <div className="text-sm text-gray-500">category</div>
                <div className="font-medium">{ticket?.data?.department}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">
                  {ticket?.data?.messages[0] ? formatDate(ticket?.data?.messages[0].timestamp) : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">status</div>
                <div className={`inline-block px-3 py-1 rounded-md text-white text-sm
                  ${ticket?.data?.status === "OPEN" ? "bg-red-500" : 
                    ticket?.data?.status === "IN_PROGRESS" ? "bg-[#FF7324]" : 
                    "bg-green-500"}`}>
                  {ticket?.data?.status === "OPEN" ? "Pending" :
                    ticket?.data?.status === "IN_PROGRESS" ? "In Progress" :
                    "Completed"}
                </div>
              </div>
            </div>

            {/* Ticket Title */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{ticket?.data?.subject}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>You</span>
                <span>{formatDate(ticket?.data?.messages[0]?.timestamp || "")}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-6 mb-8">
              {ticket?.data?.messages.map((msg, index) => (
                <div key={index} className={`p-4 rounded-lg ${msg.sender === 'user' ? 'bg-gray-100' : 'bg-blue-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">user</span>
                      {/* <span className="text-sm text-gray-500">{msg.sender === 'admin' && 'Employees'}</span> */}
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(msg.timestamp)}</span>
                  </div>
                  <p className="mb-2">{msg.message}</p>
                  {msg.attachments && msg.attachments.length > 0 && (
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
                  )}
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="border-t pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">notice</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message here..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <p className="text-gray-500 mb-2">Attachments</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full p-3 rounded-lg border-dashed border-2 bg-[#4D7C0F] text-white hover:bg-[#4D7C0F]/90"
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

                  <div className="flex justify-center gap-4">
                    <Button 
                      type="submit" 
                      className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-8"
                      disabled={isPending}
                    >
                      {isPending ? "Submitting..." : "SUBMIT"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white px-8"
                      onClick={() => router.push("/my-account/my-profile")}
                    >
                      MY TICKETS
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default TicketDetailsPage;