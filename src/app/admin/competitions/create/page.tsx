'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { toast } from 'sonner'
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command'
import { useCreateCompetition, useGetCompetitionById, useGetInfiniteProducts, useUpdateCompetition } from '@/hooks/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'
import { CompetitionForm } from '@/components/admin/CompetitionForm'

const formSchema = z.object({
  product: z.string().min(1, 'Product is required'),
  price: z.string().min(1, 'Price is required'),
  fee: z.string().min(1, 'Fee is required'),
  month: z.string().min(1, 'Month is required'),
  question: z.string().min(1, 'Question is required'),
  rightAnswer: z.string().min(1, 'Right answer is required'),
  wrongAnswer: z.string().min(1, 'Wrong answer is required'),
  status: z.string().min(1, 'Status is required'),
})

type CompetitionFormValues = z.infer<typeof formSchema>

const CompetitionCreatePage = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const mode = id ? 'edit' : 'create';
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">{mode === 'edit' ? 'Edit Competition' : 'Create Competition'}</h1>
        <CompetitionForm
          id={id}
          mode={mode as 'create' | 'edit'}
          onSuccess={() => router.push('/admin/competitions')}
        />
      </div>
    </AdminLayout>
  );
};

export default CompetitionCreatePage
