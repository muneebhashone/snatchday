'use client';

import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Loader2, Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useDeleteContent, useGetContent } from '@/hooks/api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const WebSettingsList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  


  // Fetch all web settings
  const { data: webSettings, isLoading } = useGetContent();
console.log(webSettings)

  // Delete mutation
  const { mutate: deleteWebSetting} = useDeleteContent();

  const handleDelete = (id: string) => {
    deleteWebSetting(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['content'] });
      }
    });
  };


  const handleEdit = (id: string) => {
    router.push(`/admin/web-settings/edit/${id}`);
  };

  const handleCreate = () => {
    router.push('/admin/web-settings/create');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Web Settings</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" /> Add New Content
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create new web content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Meta Title</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {webSettings?.data?.map((setting) => (
            <TableRow key={setting._id}>
              <TableCell className="font-medium">{setting.name}</TableCell>
              <TableCell>{setting.metaTitle}</TableCell>
              <TableCell>{setting.order}</TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEdit(setting._id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(setting._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
          {webSettings?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No content found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  );
};

export default WebSettingsList;