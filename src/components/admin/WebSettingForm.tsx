'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { WebSetting } from '@/types';
import { addContent } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MultiSelect } from '../ui/multi-select';
import { toast } from 'sonner';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

// Make sure to import the React Quill CSS in your project
// You can add this to your global CSS or import it here:
// import 'react-quill/dist/quill.snow.css';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Content is required'),
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  metaKeywords: z.array(z.string()).min(1, 'Meta keywords are required'),
});

const WebSettingForm = () => {
  const router = useRouter();
  // State to store the Quill editor content
  const [quillContent, setQuillContent] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [] as string[],
    },
  });

  // Set the form content value when quill content changes
  useEffect(() => {
    form.setValue('content', quillContent);
  }, [quillContent, form]);

  const { mutate: createContent , isPending} = useMutation({
    mutationFn: (data: WebSetting) => addContent(data),
    onSuccess: () => {
      toast.success('Content created successfully');
      router.push('/admin/web-settings');
      router.refresh();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createContent({
      name: values.name,
      content: values.content, // This will contain the Quill editor content
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
      metaKeywords: values.metaKeywords.join(','),
      order: 0,
    });
  };

  // Quill modules and formats configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'script',
    'indent', 'color', 'background',
    'link', 'image'
  ];

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Web Setting</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin/web-settings')}
          >
            Discard
          </Button>
          <Button type="submit" form="web-setting-form" disabled={isPending}>
            {isPending ? "Saving..." : "Save Content"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form 
          id="web-setting-form" 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg border p-6 col-span-2">
              <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
              
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <div className="min-h-[300px] border rounded-md">
                          {typeof window !== 'undefined' && (
                            <ReactQuill
                              theme="snow"
                              value={quillContent}
                              onChange={setQuillContent}
                              modules={modules}
                              formats={formats}
                              className="h-[250px]"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Rich text editor for your content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* SEO Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">SEO Information</h2>
              
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter meta title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Title that appears in search engine results
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter meta description"
                          className="resize-none h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Short description for search engine results
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Keywords *</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Enter meta keywords"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription>
                        Keywords to help with search engine optimization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WebSettingForm;
   