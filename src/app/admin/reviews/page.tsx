"use client";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useGetReviews, useGetProducts, useDeleteReview } from "@/hooks/api";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Star, Edit, Loader, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
}

interface Review {
  _id: string;
  userName: string;
  product: string | Product;
  rating: number;
  comment: string;
}

interface ProductsResponse {
  data: {
    products: Product[];
  };
}

interface ReviewsResponse {
  data: {
    reviews: Review[];
    total: number;
    currentPage: number;
    limit: number;
  };
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { mutate: deleteReview } = useDeleteReview();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useGetReviews({
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    sort_attr: "createdAt",
    sort: "desc",
  });

  const { data: productsData } = useGetProducts();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    setSelectedReviewId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedReviewId) {
      setIsDeleting(true);
      deleteReview(selectedReviewId, {
        onSuccess: () => {
          toast.success("Review deleted successfully");
          setShowDeleteModal(false);
          setSelectedReviewId(null);
          setIsDeleting(false);
          refetch(); 
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to delete review"
          );
          setIsDeleting(false);
        },
      });
    }
  };

  // Safely handle reviews data
  const reviews = useMemo(() => {
    return (reviewsData as ReviewsResponse)?.data?.reviews || [];
  }, [reviewsData]);

  const totalItems = (reviewsData as ReviewsResponse)?.data?.total || 0;

  return (
    <AdminLayout>
      <AdminBreadcrumb title="Reviews" />
      <div className="container mx-auto py-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Reviews</h1>
                <Button className="bg-primary text-white">
                  <Link href="/admin/reviews/create">Add Review</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>USER NAME</TableHead>
                      <TableHead>PRODUCT</TableHead>
                      <TableHead>RATING</TableHead>
                      <TableHead>COMMENT</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow className="h-44">
                        <TableCell colSpan={5} className="text-center">
                          <div className="flex items-center justify-center w-full">
                            <Loader className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : reviews.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-8 text-gray-500"
                        >
                          No reviews found. Create a new review to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      reviews.map((review) => (
                        <TableRow key={review._id}>
                          <TableCell className="font-medium">
                            {review.userName}
                          </TableCell>
                          <TableCell>
                            {typeof review.product === "object" &&
                            review.product !== null
                              ? (review.product as Product).name
                              : "No product"}
                          </TableCell>
                          <TableCell>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">
                            {typeof review.comment === "string"
                              ? review.comment
                              : JSON.stringify(review.comment)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" asChild>
                                      <Link
                                        href={`/admin/reviews/edit/${review._id}`}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit Review</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDelete(review._id)}
                                      disabled={
                                        isDeleting &&
                                        selectedReviewId === review._id
                                      }
                                    >
                                      {isDeleting &&
                                      selectedReviewId === review._id ? (
                                        <Loader className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Trash className="h-4 w-4" />
                                      )}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete Review</p>
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

              <div className="flex items-center justify-between py-4">
                <p className="text-sm text-gray-500">
                  Displaying{" "}
                  {Math.min(totalItems, 1 + (currentPage - 1) * pageSize)} to{" "}
                  {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
                  entries
                </p>
                <DynamicPagination
                  totalItems={totalItems}
                  itemsPerPage={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedReviewId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Review?"
        description="Are you sure you want to delete this review? This action cannot be undone."
        confirmText="Delete Review"
        cancelText="Keep Review"
        isLoading={isDeleting}
      />
    </AdminLayout>
  );
};

export default Page;
