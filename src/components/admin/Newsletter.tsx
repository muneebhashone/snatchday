'use client';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useDeleteFilter, useGetFilters, useGetCategories, useGetNewsletters } from '@/hooks/api'
import { CreateFilterDialog } from './CreateFilterDialog'
import { EditFilterDialog } from './EditFilterDialog'
import { toast } from 'sonner'
import { useState } from 'react'





const Newsletter = () => {
  // Fetch newsletters using the hook
  const { data: newsletters, isLoading, isError } = useGetNewsletters();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Newsletters</h1>
      <div className="bg-white rounded-md shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center">Loading newsletters...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Error loading newsletters</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletters?.data?.map((newsletter) => (
                  <TableRow key={newsletter._id}>
                    <TableCell>{newsletter.name || "N/A"}</TableCell>
                    <TableCell>{newsletter.email || "N/A"}</TableCell>
                    <TableCell>{new Date(newsletter.subscribedAt).toLocaleDateString() || "N/A"}</TableCell>
                  </TableRow>
                ))}
                {!newsletters?.length && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      No newsletters found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Newsletter