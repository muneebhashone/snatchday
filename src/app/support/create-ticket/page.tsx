"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import ClientLayout from "@/components/landing-page/ClientLayout";
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
import { useState } from "react";
import { useCreateTicket } from "@/hooks/api";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileText,
  Paperclip,
  Send,
  FileType,
  Loader,
} from "lucide-react";
import { useUserContext } from "@/context/userContext";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  department: z.string().min(1, "Department is required"),
  message: z.string().min(1, "Message is required"),
});

const CreateTicketPage = () => {
  const userData = useUserContext();
  console.log(userData);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const router = useRouter();
  const [attachments, setAttachments] = useState<File[]>([]);
  const { mutate: createTicketMutation } = useCreateTicket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userData?.user?.user?.email,
      subject: "",
      department: category || "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("department", values.department);
      formData.append("message", values.message);

      attachments.forEach((file) => {
        formData.append("attachments", file);
      });

      createTicketMutation(formData, {
        onSuccess: (data) => {
          toast.success("Ticket created successfully!");
          userData?.user
            ? router.push("/my-account/my-profile")
            : router.push(`/guest/my-tickets/${formData.get("email")}`);
        },
        onError: (error) => {
          console.error("Error creating ticket:", error);
          toast.error("Failed to create ticket. Please try again.");
        },
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create ticket. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <ClientLayout>
      <div className="container max-w-5xl mx-auto py-44 px-4">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-primary transition-colors">
            Home
          </a>
          <span>/</span>
          <a href="/support" className="hover:text-primary transition-colors">
            Support
          </a>
          <span>/</span>
          <span className="text-primary font-medium">Create Ticket</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 h-auto rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold text-center text-gray-800 flex-1">
              Create New Support Ticket
            </h1>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>

          {/* Form content */}
          <div className="p-6">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Submit a New Request
              </h2>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    disabled={userData?.user ? true : false}
                    defaultValue={userData?.user?.email}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Email Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email address"
                            {...field}
                            className="p-3 rounded-lg border-gray-200 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Category <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={category || field.value}
                          disabled={category ? true : false}
                        >
                          <FormControl>
                            <SelectTrigger className="p-3 rounded-lg border-gray-200 focus:border-primary">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Orders">Orders</SelectItem>
                            <SelectItem value="Miscellaneous">
                              Miscellaneous
                            </SelectItem>
                            <SelectItem value="Technical problem">
                              Technical problem
                            </SelectItem>
                            <SelectItem value="tournaments, duels">
                              Tournaments, duels
                            </SelectItem>
                            <SelectItem value="VIP membership">
                              VIP membership
                            </SelectItem>
                            <SelectItem value="Shipping/exchange">
                              Shipping/exchange
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Subject <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the subject of your ticket"
                          {...field}
                          className="p-3 rounded-lg border-gray-200 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Message <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your issue in detail..."
                          className="p-3 rounded-lg border-gray-200 focus:border-primary focus:ring-primary min-h-[200px] resize-none"
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
                              <FileType className="h-4 w-4 text-gray-400 flex-shrink-0" />
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

                <div className="flex flex-wrap gap-4 pt-6">
                  <Button
                    type="submit"
                    className="bg-primary text-white px-6 py-2.5 h-auto rounded-lg flex items-center gap-2"
                    disabled={createTicketMutation.isPending}
                  >
                    {createTicketMutation.isPending ? (
                      <Loader className="h-4 w-4 animate-spin " />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Ticket</span>
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 py-2.5 h-auto border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => router.back()}
                    disabled={createTicketMutation.isPending}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <span>Cancel</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 py-2.5 h-auto border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => router.push("/my-account/my-profile")}
                    disabled={createTicketMutation.isPending}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    <span>My Tickets</span>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default CreateTicketPage;
