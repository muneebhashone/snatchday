"use client";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  useGetReviews,
  useGetProducts,
  useDeleteReview,
  useGetReviewsStats,
} from "@/hooks/api";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select } from "antd";

interface Product {
  _id: string;
  name: string;
  description?: string;
  images?: string[];
}

interface Review {
  _id: string;
  userName: string;
  product: Product;
  rating: number;
  comment: string;
  createdAt: string;
  userId?: {
    image?: string;
  };
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
  const { data: reviewsStats, refetch: fetchReviewStats } =
    useGetReviewsStats();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { mutate: deleteReview } = useDeleteReview();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );
  const [productSearch, setProductSearch] = useState("");
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  const [productPage, setProductPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [productOptions, setProductOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useGetReviews({
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    search: debouncedSearch.trim(),
    product: selectedProduct,
  });

  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts({
    limit: "10",
    offset: ((productPage - 1) * 10).toString(),
    sort_attr: "createdAt",
    sort: "desc",
    name: productSearch,
  });

  useEffect(() => {
    if (productsData?.data?.products) {
      const newOptions = productsData.data.products.map((product) => ({
        value: product._id,
        label: product.name,
      }));

      if (productPage === 1) {
        setProductOptions(newOptions);
      } else {
        setProductOptions((prev) => [...prev, ...newOptions]);
      }

      setHasMoreProducts(productsData.data.products.length === 10);
    }
  }, [productsData, productPage]);

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
          fetchReviewStats();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to delete review");
          setIsDeleting(false);
        },
      });
    }
  };

  const handleProductSearch = (value: string) => {
    setProductSearch(value);
    setProductPage(1);
    setProductOptions([]);
    setHasMoreProducts(true);
  };

  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    setCurrentPage(1); // Reset to first page when changing product
  };

  const handleProductPopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop === clientHeight &&
      hasMoreProducts &&
      !isLoadingProducts
    ) {
      setProductPage((prev) => prev + 1);
    }
  };

  // Safely handle reviews data
  const reviews = useMemo(() => {
    return (reviewsData as ReviewsResponse)?.data?.reviews || [];
  }, [reviewsData]);

  const totalItems = (reviewsData as ReviewsResponse)?.data?.total || 0;

  // Get stats from reviewsStats
  const stats = reviewsStats?.data || {
    averageRating: 0,
    currentWeekReviews: 0,
    fiveStarReviews: 0,
    fourStarReviews: 0,
    oneStarReviews: 0,
    positiveReviewsPercentage: 0,
    threeStarReviews: 0,
    totalReviews: 0,
    twoStarReviews: 0,
  };

  // Calculate rating statistics from the API data
  const ratingStats = {
    1: stats.oneStarReviews,
    2: stats.twoStarReviews,
    3: stats.threeStarReviews,
    4: stats.fourStarReviews,
    5: stats.fiveStarReviews,
  };

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
                      <span className="text-4xl font-bold">
                        {stats.averageRating.toFixed(2)}
                      </span>
                      <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total {stats.totalReviews} reviews
                    </p>
                    <p className="text-sm text-muted-foreground">
                      All reviews are from genuine customers
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      +{stats.currentWeekReviews} This week
                    </Badge>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-12">{rating} Star</span>
                        <Progress
                          value={
                            (ratingStats[rating] / stats.totalReviews) * 100
                          }
                          className="h-2"
                        />
                        <span className="text-sm w-8">
                          {ratingStats[rating]}
                        </span>
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
                    <h3 className="text-lg font-semibold">
                      Reviews statistics
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm">
                        {stats.currentWeekReviews} New reviews
                      </span>
                      <Badge variant="success">
                        +
                        {(
                          (stats.currentWeekReviews / stats.totalReviews) *
                          100
                        ).toFixed(1)}
                        %
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {stats.positiveReviewsPercentage.toFixed(1)}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Positive reviews
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Weekly Report
                    </p>
                  </div>
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
                  <div className="w-[200px]">
                    <Select
                      size="large"
                      showSearch
                      placeholder="Select Product"
                      optionFilterProp="label"
                      onChange={handleProductChange}
                      onSearch={handleProductSearch}
                      value={selectedProduct}
                      options={productOptions}
                      notFoundContent={
                        isLoadingProducts ? (
                          <div className="flex justify-center p-2">
                            <Loader className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        ) : (
                          "No products found"
                        )
                      }
                      onPopupScroll={handleProductPopupScroll}
                      style={{ width: "100%" }}
                      allowClear
                      loading={isLoadingProducts}
                    />
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search Review"
                      className="pl-8"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
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
                      {/* <TableHead>STATUS</TableHead> */}
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
                              <Avatar>
                                <AvatarImage
                                  className="w-10 h-10 object-cover object-center"
                                  src={
                                    typeof review.product === "object"
                                      ? (review.product as Product)?.images?.[0]
                                      : undefined
                                  }
                                />
                                <AvatarFallback>
                                  {typeof review.product === "object"
                                    ? (review.product as Product)?.name?.charAt(
                                        0
                                      )
                                    : "P"}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium md:w-[500px] w-[300px] truncate">
                                  {typeof review.product === "object" &&
                                  review.product !== null
                                    ? (review.product as Product).name
                                    : "No product"}
                                </p>
                                <p className="text-sm text-muted-foreground md:w-[500px] w-[300px] line-clamp-2">
                                  {typeof review.product === "object" &&
                                  review.product !== null
                                    ? (review.product as Product).description
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage
                                  className="w-10 h-10 object-cover object-center"
                                  src={review?.userId?.image}
                                />
                                <AvatarFallback>
                                  {review.userName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>{review.userName}</div>
                            </div>
                          </TableCell>
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
                              <p className="text-sm text-muted-foreground line-clamp-2 md:w-[300px] w-[200px]">
                                {review.comment}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </TableCell>
                          {/* <TableCell>
                            <Badge className="text-green-500 bg-green-500/10">
                              Published
                            </Badge>
                          </TableCell> */}
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
