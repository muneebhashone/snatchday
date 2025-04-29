"use client";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useGetReviews, useGetProducts, useDeleteReview, useGetReviewsStats } from "@/hooks/api";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Star, Edit, Loader, Trash, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
  createdAt: string;
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
  const { data: reviewsStats } = useGetReviewsStats();
  console.log(reviewsStats);
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
          toast.error(error?.message || "Failed to delete review");
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

  // Calculate rating statistics
  const ratingStats = useMemo(() => {
    const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      stats[review.rating] = (stats[review.rating] || 0) + 1;
    });
    return stats;
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(2);
  }, [reviews]);

  const positiveReviews = useMemo(() => {
    const fourAndFiveStars = reviews.filter((review) => review.rating >= 4).length;
    return Math.round((fourAndFiveStars / reviews.length) * 100) || 0;
  }, [reviews]);

  const newReviewsGrowth = "+8.4%"; // You can calculate this based on your data

  return (
    <AdminLayout>
      <AdminBreadcrumb title="Reviews" />
      <div className="container mx-auto py-6">
        <div className="grid gap-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating Overview Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-bold">{averageRating}</span>
                      <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Total {totalItems} reviews</p>
                    <p className="text-sm text-muted-foreground">All reviews are from genuine customers</p>
                    <Badge variant="secondary" className="mt-2">+5 This week</Badge>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-12">{rating} Star</span>
                        <Progress value={(ratingStats[rating] / totalItems) * 100} className="h-2" />
                        <span className="text-sm w-8">{ratingStats[rating]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Statistics Card */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Reviews statistics</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm">12 New reviews</span>
                      <Badge variant="success">{newReviewsGrowth}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{positiveReviews}%</span>
                      <span className="text-sm text-muted-foreground">Positive reviews</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Weekly Report</p>
                  </div>
                  {/* Weekly chart would go here */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Reviews List</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search Review" className="pl-8" />
                  </div>
                  <Button asChild>
                    <Link href="/admin/reviews/create">Add Review</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>PRODUCT</TableHead>
                      <TableHead>REVIEWER</TableHead>
                      <TableHead>REVIEW</TableHead>
                      <TableHead>DATE</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow className="h-44">
                        <TableCell colSpan={6} className="text-center">
                          <div className="flex items-center justify-center w-full">
                            <Loader className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : reviews.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-muted-foreground"
                        >
                          No reviews found. Create a new review to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      reviews.map((review) => (
                        <TableRow key={review._id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {/* Add product image here if available */}
                              <div>
                                <p className="font-medium">
                                  {typeof review.product === "object" && review.product !== null
                                    ? (review.product as Product).name
                                    : "No product"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {typeof review.product === "object" && review.product !== null
                                    ? (review.product as Product).name
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{review.userName}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
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
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {review.comment}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className="text-green-500 bg-green-500/10">Published</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" asChild>
                                      <Link href={`/admin/reviews/edit/${review._id}`}>
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
                                      disabled={isDeleting && selectedReviewId === review._id}
                                    >
                                      {isDeleting && selectedReviewId === review._id ? (
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
                <p className="text-sm text-muted-foreground">
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
