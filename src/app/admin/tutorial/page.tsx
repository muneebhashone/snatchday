"use client";

import AdminLayout from '@/components/admin/AdminLayout'
import { useState } from 'react'
import { useGetTutorial, useDeleteTutorial } from '@/hooks/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader, Plus, Pencil, Trash2, Search, Eye } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { YouTubePlayer } from '@/components/admin/YouTubePlayer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TutorialPage = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  
  // Fetch tutorials
  const { data: tutorialsResponse, isLoading, refetch } = useGetTutorial()

  // Delete tutorial
  const { mutate: deleteTutorial } = useDeleteTutorial()

  const handleDelete = (id: string) => {
    setSelectedTutorialId(id);
  }

  const confirmDelete = () => {
    if (!selectedTutorialId) return;
    
    setIsDeleting(true);
    deleteTutorial(selectedTutorialId, {
      onSuccess: () => {
        toast.success('Tutorial deleted successfully')
        refetch()
      },
      onError: (error) => {
        toast.error(error.message || 'Failed to delete tutorial')
      },
      onSettled: () => {
        setIsDeleting(false)
        setSelectedTutorialId(null)
      }
    })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tutorials</h1>
          <Link href="/admin/tutorial/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Tutorial
            </Button>
          </Link>
        </div>

        <div className="border rounded-md">
          {isLoading ? (
            <div className="h-44">
              <div className="flex items-center justify-center w-full h-full">
                <Loader className="h-4 w-4 animate-spin text-primary" />
              </div>
            </div>
          ) : !tutorialsResponse?.data || tutorialsResponse.data.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No tutorials found. Create your first tutorial!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">TITLE</TableHead>
                  <TableHead className="font-semibold">ORDER</TableHead>
                  <TableHead className="font-semibold">PREVIEW</TableHead>
                  <TableHead className="font-semibold">CREATED AT</TableHead>
                  <TableHead className="font-semibold">UPDATED AT</TableHead>
                  <TableHead className="text-right font-semibold">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tutorialsResponse.data.map((tutorial) => (
                  <TableRow key={tutorial._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{tutorial.title}</TableCell>
                    <TableCell>{tutorial.order || '-'}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedTutorial(tutorial)}>
                            <Eye className="h-4 w-4 mr-1" /> Preview
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
                    <TableCell>{new Date(tutorial.createdAt).toLocaleDateString() || '-'}</TableCell>
                    <TableCell>{new Date(tutorial.updatedAt).toLocaleDateString() || '-'}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/admin/tutorial/edit/${tutorial._id}`}>
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
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(tutorial._id)}
                                    disabled={isDeleting && selectedTutorialId === tutorial._id}
                                  >
                                    {isDeleting && selectedTutorialId === tutorial._id ? (
                                      <Loader className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the tutorial.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setSelectedTutorialId(null)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete Tutorial</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default TutorialPage