"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { toast } from 'react-hot-toast';

import { Loader2, Pencil, Trash2, Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useDeleteContent, useGetContent } from "@/hooks/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { toast } from "sonner";

const WebSettingsList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch all web settings
  const { data: webSettings, isLoading, refetch } = useGetContent();
  console.log(webSettings);

  // Delete mutation
  const { mutate: deleteWebSetting } = useDeleteContent();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSettingId, setSelectedSettingId] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id: string) => {
    setSelectedSettingId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSettingId) {
      setIsDeleting(true);
      deleteWebSetting(selectedSettingId, {
        onSuccess: () => {
          toast.success("Web setting deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["webSettings"] });
          refetch();
          setShowDeleteModal(false);
          setSelectedSettingId(null);
          setIsDeleting(false);
        },
        onError: (error) => {
          toast.error("Failed to delete web setting");
          console.error(error);
          setShowDeleteModal(false);
          setSelectedSettingId(null);
          setIsDeleting(false);
        },
      });
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/web-settings/edit/${id}`);
  };

  const handleCreate = () => {
    router.push("/admin/web-settings/create");
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
                        onClick={() => handleDelete(setting._id)}
                        variant="ghost"
                        size="icon"
                        disabled={
                          isDeleting && selectedSettingId === setting._id
                        }
                      >
                        {isDeleting && selectedSettingId === setting._id ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSettingId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Web Setting?"
        description="Are you sure you want to delete this web setting? This action cannot be undone."
        confirmText="Delete Setting"
        cancelText="Keep Setting"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default WebSettingsList;
