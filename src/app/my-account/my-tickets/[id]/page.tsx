"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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
import { useCreateTicket, useGetTicketById, useReplyTicket } from "@/hooks/api";
import { format } from "date-fns";
import { toast } from "sonner";
import ClientLayout from "@/components/landing-page/ClientLayout";
import {
  Calendar,
  Clock,
  Folder,
  MessageCircle,
  Paperclip,
  Send,
  User,
  FileText,
  ArrowLeft,
  Check,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

const TicketDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const {
    data: ticket,
    isLoading,
    refetch,
  } = useGetTicketById(params.id as string);

  const { mutate: replyTicket, isPending } = useReplyTicket();

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
        formData: formData,
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
        },
      }
    );
  }

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="container max-w-5xl mx-auto py-44">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-100"></div>
              <div className="p-6 space-y-6">
                <div className="h-8 bg-gray-100 rounded-md w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-32 bg-gray-100 rounded-md"></div>
                  <div className="h-32 bg-gray-100 rounded-md"></div>
                </div>
                <div className="h-40 bg-gray-100 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Open</span>
          </div>
        );
      case "IN_PROGRESS":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium">
            <Clock3 className="h-3.5 w-3.5" />
            <span>In Progress</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
            <Check className="h-3.5 w-3.5" />
            <span>Resolved</span>
          </div>
        );
    }
  };

  return (
    <ClientLayout>
      <div className="container max-w-5xl mx-auto pt-44 pb-52">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with back button and title */}
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 h-auto rounded-full"
              onClick={() => router.push("/my-account/my-profile")}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to tickets</span>
            </Button>

            <h1 className="text-lg font-semibold text-center text-gray-800 flex-1">
              Support Ticket Details
            </h1>

            {ticket?.data?.status && getStatusBadge(ticket.data.status)}
          </div>

          <div className="p-6">
            {/* Ticket subject */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                {ticket?.data?.subject}
              </h2>
            </div>

            {/* Ticket metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Folder className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Category
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {ticket?.data?.department || "General"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Created</p>
                    <p className="text-gray-900 font-semibold">
                      {ticket?.data?.messages[0]
                        ? formatDate(ticket?.data?.messages[0].timestamp)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Last Update
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {ticket?.data?.messages.length > 0
                        ? formatDate(
                            ticket?.data?.messages[
                              ticket?.data?.messages.length - 1
                            ].timestamp
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation header */}
            <div className="flex items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Conversation</h3>
              <div className="ml-4 px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {ticket?.data?.messages.length || 0} messages
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-6 mb-10">
              {ticket?.data?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden ${
                    msg.sender === "user" ? "ml-4 md:ml-10" : "mr-4 md:mr-10"
                  }`}
                >
                  <div
                    className={`relative ${
                      msg.sender === "user"
                        ? "bg-primary/5 border border-primary/10"
                        : "bg-gray-50 border border-gray-100"
                    } rounded-xl p-5`}
                  >
                    {/* Message header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          msg.sender === "user"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {msg.sender === "user" ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <MessageCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {msg.sender === "user" ? "Me" : "Support Team"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(msg.timestamp)}
                        </p>
                      </div>
                    </div>

                    {/* Message content */}
                    <div className="text-gray-700 whitespace-pre-wrap mb-3 pl-13">
                      {msg.message}
                    </div>

                    {/* Attachments if any */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 pl-13">
                        <div className="flex items-center gap-2 mb-3">
                          <Paperclip className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {msg.attachments.length} Attachment
                            {msg.attachments.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.attachments.map((attachment, i) => (
                            <a
                              key={i}
                              href={attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
                            >
                              <Paperclip className="h-3.5 w-3.5" />
                              <span>Attachment {i + 1}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Form */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">
                  Your Reply
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type your message here..."
                            className="min-h-[150px] border-gray-200 focus:border-primary focus:ring-primary rounded-lg resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <p className="text-gray-700 font-medium mb-3">
                      Add Attachments
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full p-6 rounded-lg border-dashed border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      <Paperclip className="h-5 w-5" />
                      <span>Drag files here or click to upload</span>
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileChange}
                    />

                    {attachments.length > 0 && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-100">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Files to upload ({attachments.length})
                        </p>
                        <div className="space-y-2">
                          {attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm text-gray-700 py-2 px-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{file.name}</span>
                              </div>
                              <span className="text-xs text-gray-500 flex-shrink-0">
                                {(file.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-5 py-2.5 h-auto border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => router.push("/my-account/my-profile")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      <span>Back to My Tickets</span>
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary text-white px-5 py-2.5 h-auto rounded-lg flex items-center gap-2"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Reply</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default TicketDetailsPage;
