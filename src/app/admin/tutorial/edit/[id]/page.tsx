"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetTutorial, useUpdateTutorial } from "@/hooks/api";
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
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader } from "lucide-react";
import { YouTubePlayer } from "@/components/admin/YouTubePlayer";

// Matched with the backend API requirements
const tutorialFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  videoUrl: z.string().url("Please enter a valid YouTube URL"),
  thumbnailUrl: z.string().optional(),
  order: z.coerce.number().int().positive(),

});

type TutorialFormValues = z.infer<typeof tutorialFormSchema>;

const EditTutorialPage = () => {
  const router = useRouter();
  const params = useParams();
  const tutorialId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");

  // Fetch the existing tutorial data
  const { data: tutorialResponse } = useGetTutorial();

  // Update tutorial hook
  const { mutate: updateTutorial, isPending } = useUpdateTutorial();

  const form = useForm<TutorialFormValues>({
    resolver: zodResolver(tutorialFormSchema),
    defaultValues: {
      title: "",
      videoUrl: "",
      thumbnailUrl: "",
      order: 1,
    
    },
  });

  // Watch the video URL field to update the preview
  const videoUrl = form.watch("videoUrl");
  
  // Update preview when video URL changes
  useEffect(() => {
    if (videoUrl && videoUrl.trim() !== "") {
      setPreviewUrl(videoUrl);
    }
  }, [videoUrl]);

  // Populate form when data is loaded
  useEffect(() => {
    if (tutorialResponse?.data && tutorialId) {
      const tutorial = tutorialResponse.data.find(
        (item) => item._id === tutorialId
      );

      if (tutorial) {
        const formData = {
          title: tutorial.title || "",
          videoUrl: tutorial.videoUrl || "",
          thumbnailUrl: tutorial.thumbnailUrl || "",
          order: tutorial.order || 1,
        
        };
        
        form.reset(formData);
        setPreviewUrl(tutorial.videoUrl || "");
      } else {
        toast.error("Tutorial not found");
        router.push("/admin/tutorial");
      }
      setIsLoading(false);
    }
  }, [tutorialResponse, tutorialId, form, router]);

  const onSubmit = (values: TutorialFormValues) => {
    updateTutorial(
      {
        id: tutorialId,
        data: values,
      },
      {
        onSuccess: () => {
          toast.success("Tutorial updated successfully");
          router.push("/admin/tutorial");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update tutorial");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Edit Tutorial</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter tutorial title" 
                        {...field} 
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://www.youtube.com/watch?v=..." 
                        {...field} 
                        className="focus-visible:ring-primary"
                        onChange={(e) => {
                          field.onChange(e);
                          setPreviewUrl(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Video Preview */}
              {previewUrl && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Video Preview</p>
                  <YouTubePlayer youtubeUrl={previewUrl} className="max-w-md" />
                </div>
              )}

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field} 
                        className="focus-visible:ring-primary w-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => router.push("/admin/tutorial")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Update Tutorial
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditTutorialPage; 