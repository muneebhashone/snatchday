"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateFaq, useGetFaq, useUpdateFaq } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const faqFormSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  category: z.string().min(1, "Category is required"),
  order: z.coerce.number().min(1, "Order is required"),

});

type FaqFormData = z.infer<typeof faqFormSchema>;

const CreateFaqForm = ({ faqId }: { faqId?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Create hooks
  const { mutate: createFaq, isPending: isCreating } = useCreateFaq();
  
  // Update hooks
  const { mutate: updateFaq, isPending: isUpdating } = useUpdateFaq();
  console.log(faqId,"faqId")
  
  // Fetch existing FAQ data if we're updating
  const { data: faqResponse, isLoading: isFetching } = useGetFaq({
    category: "",
    status: ""
  });

  const form = useForm<FaqFormData>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
      order: 1,
     
    }
  });

  // Find the FAQ we're editing if faqId is provided
  useEffect(() => {
    if (faqId && faqResponse?.data) {
      const existingFaq = faqResponse.data.find(faq => faq._id === faqId);
      
      if (existingFaq) {
        const formData = {
          question: existingFaq.question || "",
          answer: existingFaq.answer || "",
          category: existingFaq.category || "",
          order: existingFaq.order || 1
        };
        form.reset(formData);
      }
    }
    
    setIsLoading(false);
  }, [faqId, faqResponse, form]);

  const onSubmit = (values: FaqFormData) => {
    // Ensure all values are defined
    const validFormData = {
      question: values.question || "",
      answer: values.answer || "",
      category: values.category || "",
      order: values.order || 1
    };
    
    if (faqId) {
      // Update existing FAQ
      updateFaq({
        id: faqId,
        data: validFormData
      }, {
        onSuccess: () => {
          toast.success("FAQ updated successfully");
          router.push("/admin/faq");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update FAQ");
        }
      });
    } else {
      // Create new FAQ
      createFaq(validFormData, {
        onSuccess: () => {
          toast.success("FAQ created successfully");
          router.push("/admin/faq");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create FAQ");
        }
      });
    }
  };

  if (isLoading && faqId) {
    return <div className="flex justify-center items-center p-10">Loading FAQ data...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {faqId ? "Update FAQ" : "Create New FAQ"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Enter the question" 
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Provide the answer"
                    className="min-h-[120px] focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the category"
                    className="focus-visible:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Enter the order"
                    className="focus-visible:ring-primary"
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/faq")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 bg-primary hover:bg-primary/90"
              disabled={isCreating || isUpdating}
            >
              {faqId 
                ? (isUpdating ? "Updating..." : "Update FAQ") 
                : (isCreating ? "Creating..." : "Create FAQ")
              }
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateFaqForm;