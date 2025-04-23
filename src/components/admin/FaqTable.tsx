"use client";
import React, { useState, useEffect } from "react";
import { useGetFaq, useDeleteFaq } from "@/hooks/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash,
  Loader,
  Plus,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QAPair {
  question: string;
  answer: string;
}

interface FAQ {
  _id: string;
  qa: QAPair[];
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const queryClient = useQueryClient();
  const debouncedCategoryFilter = useDebounce(categoryFilter, 500);

  const {
    data: faqData,
    isLoading,
    refetch,
  } = useGetFaq({
    category: debouncedCategoryFilter,
  });

  console.log(faqData, "faqData");

  const { mutate: deleteFaq } = useDeleteFaq();

  const toggleExpand = (id: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">FAQ Management</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="mr-2"
          >
            <RefreshCcw
              className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
            />{" "}
            Refresh
          </Button>
          <Link href="/admin/faq/create">
            <Button className="bg-primary hover:bg-primary">
              <Plus className="mr-2 h-4 w-4" /> Add New FAQ
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by category"
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Category
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-600 py-3">
                  Q&A Pairs
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
                  <TableCell colSpan={5} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : faqData?.data?.length > 0 ? (
                faqData?.data?.map((faq) => (
                  <TableRow
                    key={faq._id}
                    className={`border-t transition-colors hover:bg-gray-50/50 ${
                      !faq.isActive ? "opacity-60" : ""
                    }`}
                  >
                    <TableCell>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {faq.category}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-md">
                      {faq.qa && faq.qa.length > 0 ? (
                        <div className="space-y-1.5">
                          {faq.qa.map((pair, index) => (
                            <div
                              key={index}
                              className="border rounded-md overflow-hidden bg-white shadow-sm"
                            >
                              <div
                                className="flex justify-between items-center p-2.5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                onClick={() =>
                                  toggleExpand(`${faq._id}-${index}`)
                                }
                              >
                                <div className="font-medium text-sm text-gray-700 line-clamp-1 pr-2">
                                  {pair.question}
                                </div>
                                <div className="flex-shrink-0">
                                  {expandedFaqs[`${faq._id}-${index}`] ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>
                              </div>
                              {expandedFaqs[`${faq._id}-${index}`] && (
                                <div className="p-3 bg-white border-t text-sm text-gray-600">
                                  {pair.answer}
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="text-xs text-gray-500 pl-1">
                            {faq.qa.length}{" "}
                            {faq.qa.length === 1 ? "question" : "questions"}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic px-1">
                          No Q&A pairs
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(faq.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(faq.updatedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
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
                                disabled={
                                  isDeleting && selectedFaqId === faq._id
                                }
                                className="h-8 w-8 text-gray-600"
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
                <TableRow className="border-t">
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-gray-500">No FAQs found</p>
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
      </div>

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
