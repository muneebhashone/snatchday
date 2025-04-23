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
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

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

  const { data: tutorialResponse } = useGetTutorial();
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

  const videoUrl = form.watch("videoUrl");

  useEffect(() => {
    if (videoUrl && videoUrl.trim() !== "") {
      setPreviewUrl(videoUrl);
    }
  }, [videoUrl]);

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
        <AdminBreadcrumb
          items={[{ title: "Tutorials", href: "/admin/tutorial" }]}
          title="Edit Tutorial"
        />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminBreadcrumb
        items={[{ title: "Tutorials", href: "/admin/tutorial" }]}
        title="Edit Tutorial"
      />
      <div className="py-6 max-w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Tutorial</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/tutorial")}
            >
              Discard
            </Button>
            <Button type="submit" form="tutorial-form" disabled={isPending}>
              {isPending ? "Saving..." : "Save Tutorial"}
            </Button>
          </div>
        </div>

        <Form {...form}>
          <form
            id="tutorial-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tutorial Information Section */}
              <div className="bg-white rounded-lg border p-6 col-span-2">
                <h2 className="text-lg font-semibold mb-6">
                  Tutorial Information
                </h2>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Tutorial title" {...field} />
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
                        <FormLabel>YouTube Video URL *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            {...field}
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

                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            {...field}
                            className="w-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-lg font-semibold mb-6">Preview</h2>
                  {previewUrl && <YouTubePlayer youtubeUrl={previewUrl} />}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default EditTutorialPage;
