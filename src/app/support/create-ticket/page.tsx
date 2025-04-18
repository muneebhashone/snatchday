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
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  department: z.string().min(1, "Department is required"),
  message: z.string().min(1, "Message is required"),
});

const CreateTicketPage = () => {
  const router = useRouter();
  const [attachments, setAttachments] = useState<File[]>([]);
  const createTicketMutation = useCreateTicket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      department: "",
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

      await createTicketMutation.mutateAsync(formData);
      toast.success("Ticket created successfully!");
      router.push("/my-account/my-profile");
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
      <div className="max-w-[1200px] mx-auto py-40 px-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-primary">Home</a>
          <span>/</span>
          <a href="/support" className="hover:text-primary">Support</a>
          <span>/</span>
          <span className="text-primary">Create ticket</span>
        </div>

        <h1 className="text-3xl lg:text-[48px] font-extrabold mb-12">Create ticket</h1>

        <div className="bg-white shadow-lg rounded-xl p-8 max-w-[800px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail address <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail address" {...field} className="p-3 rounded-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regarding <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Regarding" {...field} className="p-3 rounded-lg" />
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
                    <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="p-3 rounded-lg">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Orders">Orders</SelectItem>
                        <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                        <SelectItem value="Technical problem">Technical problem</SelectItem>
                        <SelectItem value="tournaments, duels">Tournaments, duels</SelectItem>
                        <SelectItem value="VIP membership">VIP membership</SelectItem>
                        <SelectItem value="Shipping/exchange">Shipping/exchange</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your message here"
                        className="p-3 rounded-lg min-h-[200px]"
                        {...field}
                      />
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

              <div className="flex flex-wrap gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-primary text-white px-12 py-6 rounded-lg hover:bg-primary/90"
                  disabled={createTicketMutation.isPending}
                >
                  {createTicketMutation.isPending ? "SUBMITTING..." : "SUBMIT"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-12 py-6 rounded-lg"
                  onClick={() => router.back()}
                  disabled={createTicketMutation.isPending}
                >
                  CANCEL
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-12 py-6 rounded-lg"
                  onClick={() => router.push("/my-account/my-profile")}
                  disabled={createTicketMutation.isPending}
                >
                  MY TICKETS
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ClientLayout>
  );
};

export default CreateTicketPage; 