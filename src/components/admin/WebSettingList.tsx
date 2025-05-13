"use client";

import React, { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { toast } from 'react-hot-toast';
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDeleteContent, useGetContent } from "@/hooks/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterParams {
  limit?: string;
  offset?: string;
}

const WebSettingsList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch all web settings
  const { data: webSettingsData, isLoading, refetch } = useGetContent();

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
          queryClient.invalidateQueries({ queryKey: ["content"] });
          refetch();
          setShowDeleteModal(false);
          setSelectedSettingId(null);
          setIsDeleting(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to delete web setting");
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Content Settings</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleCreate}>
                  <Link href="/admin/web-settings/create">Add New Content</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create new web content</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>NAME</TableHead>
                <TableHead>META TITLE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-44">
                  <TableCell colSpan={3} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : webSettingsData?.data?.length > 0 ? (
                webSettingsData.data.map((setting) => (
                  <TableRow key={setting._id}>
                    <TableCell className="font-medium">
                      {setting.name}
                    </TableCell>
                    <TableCell>{setting.metaTitle}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
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
                                  isDeleting &&
                                  selectedSettingId === setting._id
                                }
                              >
                                {isDeleting &&
                                selectedSettingId === setting._id ? (
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    No content found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

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
