"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useCreateBanner } from "@/hooks/api";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { BannerFormData } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import ReactQuill from "react-quill";

const formSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  image: z
    .instanceof(File)
    .refine(
      (file) => {
        const acceptedImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ];
        return acceptedImageTypes.includes(file.type);
      },
      {
        message:
          "Only .jpg, .jpeg, .png, .webp and .gif formats are supported.",
      }
    )
    .optional(),
  logoImage: z
    .instanceof(File)
    .refine(
      (file) => {
        const acceptedImageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ];
        return acceptedImageTypes.includes(file.type);
      },
      {
        message:
          "Only .jpg, .jpeg, .png, .webp and .gif formats are supported.",
      }
    )
    .optional(),
  link: z.string().url("Please enter a valid URL").optional(),
  date: z.string().optional(),
});

type IForm = z.infer<typeof formSchema>;

const Page = () => {
  const { mutate: createBanner, isPending } = useCreateBanner();

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
      logoImage: undefined,
      link: "",
      date: "",
    },
  });

  const onSubmit = (data: IForm) => {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.content) formData.append("content", data.content);
    if (data.image) formData.append("image", data.image);
    if (data.logoImage) formData.append("logoImage", data.logoImage);
    if (data.link) formData.append("link", data.link);
    if (data.date) formData.append("date", data.date);

    createBanner(formData as unknown as BannerFormData, {
      onSuccess: () => {
        toast.success("Banner created successfully");
        window.location.href = "/admin/banner-settings";
      },
      onError: () => {
        toast.error("Failed to create banner");
      },
    });
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/30">
        <AdminBreadcrumb
          title="Create"
          items={[{ title: "Banner Settings", href: "/admin/banner-settings" }]}
        />
        <div className="px-6 py-8">
          <Card className="max-w-full mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Create Banner
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Add a new banner to showcase on the platform
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter banner title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter banner link" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="mb-10 h-[190px]">
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        {/* <Textarea
                          placeholder="Enter banner content"
                          className="min-h-[120px]"
                          {...field}
                        /> */}
                        <ReactQuill
                          className="h-[120px] mb-10"
                          theme="snow"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <div className="">
                            <Input
                              type="file"
                              placeholder="Enter image URL"
                              className="flex-1"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                            {field.value ? (
                              <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border">
                                <Image
                                  src={URL.createObjectURL(field.value)}
                                  alt="Selected Banner Image"
                                  className="w-full h-full object-cover"
                                  fill
                                />
                              </div>
                            ) : null}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo Image</FormLabel>
                        <FormControl>
                          <div className="">
                            <Input
                              type="file"
                              placeholder="Enter logo image"
                              className="flex-1"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                }
                              }}
                            />
                            {field.value ? (
                              <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border">
                                <Image
                                  src={URL.createObjectURL(field.value)}
                                  alt="Selected Logo Image"
                                  className="w-full h-full object-cover"
                                  fill
                                />
                              </div>
                            ) : null}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(new Date(field.value), "PPP")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(date?.toISOString())
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    onClick={() => {
                      window.location.href = "/admin/banner-settings";
                    }}
                    type="button"
                    variant="outline"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      "Create Banner"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
