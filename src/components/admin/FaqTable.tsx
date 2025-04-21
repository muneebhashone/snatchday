"use client";
import React, { useState, useEffect } from 'react';
import { useGetFaq, useDeleteFaq } from '@/hooks/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Loader, Plus, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQResponse {
  success: boolean;
  data: FAQ[];
}

const FaqTable = () => {
  
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
 


  const queryClient = useQueryClient();
  
  const { data: faqData, isLoading } = useGetFaq({
    category: categoryFilter,
    status: statusFilter,
  });
  
  const { mutate: deleteFaq } = useDeleteFaq();


  const handleDelete = (id: string) => {
    setSelectedFaqId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFaqId) {
      setIsDeleting(true);
      deleteFaq(selectedFaqId, {
        onSuccess: () => {
          toast.success("FAQ deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["faq"] });
          setShowDeleteModal(false);
          setSelectedFaqId(null);
          setIsDeleting(false);
        },
        onError: (error) => {
          toast.error("Failed to delete FAQ");
          console.error(error);
          setShowDeleteModal(false);
          setSelectedFaqId(null);
          setIsDeleting(false);
        },
      });
    }
  };

  // Filter FAQs based on search term
 

  // Sort FAQs by order
 
  

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["faq"] });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "DRAFT":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">FAQ Management</h2>
        <div className="flex gap-2">
       
          <Link href="/admin/faq/create">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add New FAQ
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>ORDER</TableHead>
                  <TableHead>QUESTION</TableHead>
                  <TableHead>ANSWER</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow className="h-24">
                    <TableCell colSpan={6} className="text-center">
                      <div className="flex items-center justify-center w-full">
                        <Loader className="h-4 w-4 animate-spin text-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : faqData?.data?.length > 0 ? (
                  faqData?.data?.map((faq) => (
                    <TableRow key={faq._id} className={!faq.isActive ? "opacity-50" : ""}>
                      <TableCell className="font-medium">{faq.order}</TableCell>
                      <TableCell className="max-w-md">
                        {faq.question.length > 50
                          ? `${faq.question.substring(0, 50)}...`
                          : faq.question}
                      </TableCell>
                      <TableCell className="max-w-md">
                        {faq.answer.length > 50
                          ? `${faq.answer.substring(0, 50)}...`
                          : faq.answer}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {faq.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(faq.status)}
                        <div className="mt-1 text-xs text-gray-500">
                          {faq.isActive ? "Visible" : "Hidden"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" asChild>
                                  <Link href={`/admin/faq/update/${faq._id}`}>
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit FAQ</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(faq._id)}
                                  disabled={isDeleting && selectedFaqId === faq._id}
                                >
                                  {isDeleting && selectedFaqId === faq._id ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete FAQ</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-muted-foreground">No FAQs found</p>
                        <Link href="/admin/faq/create">
                          <Button variant="outline" className="mt-2">
                            <Plus className="mr-2 h-4 w-4" /> Add Your First FAQ
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedFaqId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ? This action cannot be undone."
        confirmText="Delete FAQ"
        cancelText="Cancel"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default FaqTable;