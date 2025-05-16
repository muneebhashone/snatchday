'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useRouter, useParams } from 'next/navigation';
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
import { Loader2 } from 'lucide-react';
import { useGetContent, useUpdateContent } from '@/hooks/api';
import { Select, SelectItem } from '../ui/select';
import { MultiSelect } from '../ui/multi-select';
import { toast } from 'sonner';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Content is required'),
  metaTitle: z.string().min(1, 'Meta title is required'),
  metaDescription: z.string().min(1, 'Meta description is required'),
  metaKeywords: z.array(z.string()).min(1, 'Meta keywords are required'),

});

const WebSettingEditForm = () => {
    const { data: contentData} = useGetContent()
    console.log(contentData)
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
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

  console.log(form?.formState?.errors,"errors")



// Fetch the content data

// Update form when content is loaded
useEffect(() => {
  if (contentData && id) {
    const currentContent = contentData.data.find(item => item._id === id);
    if (currentContent) {
      form.reset({
        name: currentContent.name,
        content: currentContent.content,
        metaTitle: currentContent.metaTitle,
        metaDescription: currentContent.metaDescription,
        metaKeywords: currentContent.metaKeywords,
   
      });
      setQuillContent(currentContent.content);
    }
  }
}, [contentData, form, id]);

// Set the form content value when quill content changes
useEffect(() => {
  form.setValue('content', quillContent);
}, [quillContent, form]);

const { mutate: updateWebContent, isPending } = useUpdateContent();

// Handle form value changes
useEffect(() => {
  const subscription = form.watch((data) => {
    if (data && data.content) {
      setQuillContent(data.content);
    }
  });
  return () => subscription.unsubscribe();
}, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateWebContent({
      id,
      name: values.name,
      content: values.content,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
      metaKeywords: values.metaKeywords.join(','),
      order: 0,
    }, {
      onSuccess: () => {
        toast.success('Content updated successfully');
        router.push('/admin/web-settings');
        router.refresh();
      }
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

//   if (isLoadingContent) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//         <span className="ml-2">Loading content...</span>
//       </div>
//     );
//   }

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

        <Button className='hover:bg-transparent' type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Content'}
        </Button>
      </form>
    </Form>
  );
};

export default WebSettingEditForm;