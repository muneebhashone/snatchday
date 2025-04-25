"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useState } from "react";
import { useGetTutorial, useDeleteTutorial } from "@/hooks/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { YouTubePlayer } from "@/components/admin/YouTubePlayer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const TutorialPage = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch tutorials
  const { data: tutorialsResponse, isLoading, refetch } = useGetTutorial();

  // Delete tutorial
  const { mutate: deleteTutorial } = useDeleteTutorial();

  const handleDelete = (id: string) => {
    setSelectedTutorialId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedTutorialId) return;

    setIsDeleting(true);
    deleteTutorial(selectedTutorialId, {
      onSuccess: () => {
        toast.success("Tutorial deleted successfully");
        refetch();
        setShowDeleteModal(false);
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to delete tutorial");
      },
      onSettled: () => {
        setIsDeleting(false);
        setSelectedTutorialId(null);
      },
    });
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb title="Tutorials" />
      <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Tutorial Management
          </h2>
          <Link href="/admin/tutorial/create">
            <Button className="bg-primary hover:bg-primary">
              <Plus className="mr-2 h-4 w-4" /> Add New Tutorial
            </Button>
          </Link>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Title
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Order
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Preview
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Created At
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Updated At
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-24 border-t">
                  <TableCell colSpan={6} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : !tutorialsResponse?.data ||
                tutorialsResponse.data.length === 0 ? (
                <TableRow className="border-t">
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-gray-500">No tutorials found</p>
                      <Link href="/admin/tutorial/create">
                        <Button variant="outline" className="mt-2">
                          <Plus className="mr-2 h-4 w-4" /> Add Your First
                          Tutorial
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                tutorialsResponse.data.map((tutorial) => (
                  <TableRow
                    key={tutorial._id}
                    className="border-t transition-colors hover:bg-gray-50/50"
                  >
                    <TableCell className="font-medium">
                      {tutorial.title}
                    </TableCell>
                    <TableCell>{tutorial.order || "-"}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTutorial(tutorial)}
                            className="text-xs"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" /> Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                          <DialogHeader>
                            <DialogTitle>{tutorial.title}</DialogTitle>
                            <DialogDescription>
                              Tutorial Video Preview
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <YouTubePlayer youtubeUrl={tutorial.videoUrl} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(tutorial.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(tutorial.updatedAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                asChild
                                className="h-8 w-8 text-gray-600"
                              >
                                <Link
                                  href={`/admin/tutorial/edit/${tutorial._id}`}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Tutorial</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(tutorial._id)}
                                disabled={
                                  isDeleting &&
                                  selectedTutorialId === tutorial._id
                                }
                                className="h-8 w-8 text-gray-600"
                              >
                                {isDeleting &&
                                selectedTutorialId === tutorial._id ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Tutorial</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTutorialId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Tutorial"
        description="Are you sure you want to delete this tutorial? This action cannot be undone."
        confirmText="Delete Tutorial"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </AdminLayout>
  );
};

export default TutorialPage;
