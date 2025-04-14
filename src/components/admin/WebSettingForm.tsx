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
      ['link', 'image'],
      ['clean']
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Content</FormLabel>
              <FormControl>
                <div className="min-h-[200px] border rounded-md">
                  {typeof window !== 'undefined' && (
                    <ReactQuill
                      theme="snow"
                      value={quillContent}
                      onChange={setQuillContent}
                      modules={modules}
                      formats={formats}
                      className="h-[150px]"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter meta title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter meta description"
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Keywords</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Enter meta keywords"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter order number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button className='hover:bg-primary' type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Content'}
        </Button>
      </form>
    </Form>
  );
};

export default WebSettingForm;
   