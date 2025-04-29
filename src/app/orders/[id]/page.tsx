"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrderById } from "@/hooks/api";
import {
  CheckCheckIcon,
  Clock,
  Eye,
  Loader2,
  Package,
  RefreshCcw,
  ShoppingBag,
  Truck,
  Undo2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { formatDate } from "date-fns";
import ClientLayout from "@/components/landing-page/ClientLayout";
import Image from "next/image";
import React, { useState } from "react";
import ReturnOrderModal from "@/components/ReturnOrderModal";
import ReviewModal from "../../../../ReviewModal";
import { useUserContext } from "@/context/userContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Custom hover popover component that opens on hover
const HoverPopover = ({ children, content, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div
          className={className}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 shadow-lg rounded-lg border-orange-100">
        {content}
      </PopoverContent>
    </Popover>
  );
};

// Order status badge with appropriate color
const OrderStatusBadge = ({ status }) => {
  let color = "bg-gray-100 text-gray-800";

  if (status?.toLowerCase().includes("delivered")) {
    color = "bg-green-100 text-green-800";
  } else if (
    status?.toLowerCase().includes("shipped") ||
    status?.toLowerCase().includes("transit")
  ) {
    color = "bg-blue-100 text-blue-800";
  } else if (status?.toLowerCase().includes("processing")) {
    color = "bg-yellow-100 text-yellow-800";
  } else if (
    status?.toLowerCase().includes("cancelled") ||
    status?.toLowerCase().includes("returned")
  ) {
    color = "bg-red-100 text-red-800";
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const {
    data: orderDetails,
    isLoading,
    refetch,
  } = useGetOrderById(id as string);
  console.log(orderDetails, "orderDetails");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const reviewedProducts = orderDetails?.data?.reviewedProducts;
  const returnedProducts = orderDetails?.data?.returnedProducts;

  reviewedProducts?.map((pro) => console.log(pro.productId));

  const handleReturnClick = (productId, quantity) => {
    setSelectedProductId(productId);
    setSelectedQuantity(quantity);
    setModalOpen(true);
  };

  // Find review info for a product
  const findReviewInfo = (productId) => {
    const review = reviewedProducts?.find(
      (product) => product.productId === productId
    );
    return review;
  };

  // Get stars display for ratings
  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ⯨
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <ClientLayout>
      <TooltipProvider>
        <div className="p-6 max-w-7xl mx-auto mt-40 mb-52 min-h-screen bg-gradient-to-b from-white to-gray-50 ">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
              <p className="text-gray-500 animate-pulse">
                Loading order details...
              </p>
            </div>
          ) : (
            <Card className="shadow-xl rounded-xl overflow-hidden border-none">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="h-5 w-5" />
                      <Badge
                        variant="outline"
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                      >
                        Order #{orderDetails?.data?.orderNumber || "123"}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold mb-1">Order Details</h2>
                    <div className="flex items-center text-orange-100 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(
                        orderDetails?.data?.createdAt || new Date(),
                        "MMMM dd, yyyy 'at' h:mm a"
                      )}
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                    <div className="text-orange-100 mb-1">Order Status</div>
                    <OrderStatusBadge
                      status={orderDetails?.data?.status || "Processing"}
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6 bg-white">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-4 w-4 text-orange-500" />
                    <h3 className="font-bold text-lg">Company Details</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-orange-600">Snatch Day</p>
                    <p>Telramundweg 6</p>
                    <p>12167 Berlin</p>
                    <p>Phone: 03054612480</p>
                    <p>Email: info@snatchday.de</p>
                    <p>
                      Website:{" "}
                      <a
                        href="https://snatchday.de"
                        className="text-orange-500 hover:underline transition-all"
                      >
                        https://snatchday.de/
                      </a>
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="h-4 w-4 text-orange-500" />
                    <h3 className="font-bold text-lg">Order Information</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3">
                    <p className="font-medium text-gray-600">Invoice No.:</p>
                    <p className="font-medium">
                      #{orderDetails?.data?.orderNumber || "123123"}
                    </p>

                    <p className="font-medium text-gray-600">Order No.:</p>
                    <p className="font-medium">
                      {orderDetails?.data?.orderNumber || "N/A"}
                    </p>

                    <p className="font-medium text-gray-600">Payment Method:</p>
                    <p>{orderDetails?.data?.paymentMethod || "N/A"}</p>

                    <p className="font-medium text-gray-600">
                      Delivery Method:
                    </p>
                    <p>{orderDetails?.data?.deliveryMethod || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 px-6 pb-6 bg-white">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-500"
                    >
                      <path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                      <path d="M3 7h18"></path>
                      <path d="M8 5V3"></path>
                      <path d="M16 5V3"></path>
                      <path d="M8 12h8"></path>
                      <path d="M8 16h4"></path>
                    </svg>
                    <h3 className="font-bold text-lg">Billing Address</h3>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-gray-600">Name:</span>{" "}
                      <span className="font-medium">
                        {`${
                          orderDetails?.data?.billingDetails?.firstName || ""
                        } ${
                          orderDetails?.data?.billingDetails?.lastName || ""
                        }`}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Country:
                      </span>{" "}
                      {orderDetails?.data?.billingDetails?.country || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Street:</span>{" "}
                      {orderDetails?.data?.billingDetails?.street || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Federal State:
                      </span>{" "}
                      {orderDetails?.data?.billingDetails?.federalState ||
                        "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Zip:</span>{" "}
                      {orderDetails?.data?.billingDetails?.zip || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="h-4 w-4 text-orange-500" />
                    <h3 className="font-bold text-lg">Shipping Address</h3>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-gray-600">Name:</span>{" "}
                      <span className="font-medium">
                        {`${
                          orderDetails?.data?.shippingDetails?.firstName || ""
                        } ${
                          orderDetails?.data?.shippingDetails?.lastName || ""
                        }`}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Country:
                      </span>{" "}
                      {orderDetails?.data?.shippingDetails?.country || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Street:</span>{" "}
                      {orderDetails?.data?.shippingDetails?.street || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Federal State:
                      </span>{" "}
                      {orderDetails?.data?.shippingDetails?.federalState ||
                        "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Zip:</span>{" "}
                      {orderDetails?.data?.shippingDetails?.zip || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 bg-white">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Order Items
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600">
                        <th className="p-4 text-left">Product</th>
                        <th className="p-4 text-center">Quantity</th>
                        <th className="p-4 text-center">Unit Price</th>
                        <th className="p-4 text-center">Total</th>
                        <th className="p-4 text-center">Date</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orderDetails?.data?.cartObject?.cart?.map((item) => {
                        console.log(item, "item");
                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-orange-50 transition-colors duration-150"
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                                  <Image
                                    src={item?.product?.images[0]}
                                    alt={item?.product?.name}
                                    width={50}
                                    height={50}
                                    className="w-14 h-14 object-contain"
                                  />
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {item?.product?.name}
                                  </span>
                                  {item?.product?.sku && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      SKU: {item?.product?.sku}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                                {item?.quantity || 0}
                              </span>
                            </td>
                            <td className="p-4 text-center">{`${item?.unitPrice?.toFixed(
                              2
                            )}€`}</td>
                            <td className="p-4 text-center font-medium text-gray-900">{`${item?.totalPrice?.toFixed(
                              2
                            )}€`}</td>
                            <td className="p-4 text-center text-sm text-gray-600">
                              {formatDate(
                                item?.product?.createdAt || "",
                                "dd/MM/yyyy"
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2 justify-center items-center">
                                {returnedProducts?.some(
                                  (product) =>
                                    product.productId === item.product._id
                                ) ? (
                                  <Link
                                    href={
                                      returnedProducts?.find(
                                        (product) =>
                                          product.productId === item.product._id
                                      )?.link as string || "#"
                                    }
                                    className="flex items-center gap-1 text-gray-500 border p-2 rounded-md hover:bg-gray-50 transition-all duration-200 text-xs"
                                  >
                                    <Eye size={15} />
                                    Returned
                                  </Link>
                                ) : (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 shadow-sm cursor-pointer text-white p-2 rounded-md"
                                        onClick={() =>
                                          handleReturnClick(
                                            item.product._id,
                                            item.quantity
                                          )
                                        }
                                      >
                                        <Undo2 className="w-4 h-4" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Return Product</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                {reviewedProducts?.some(
                                  (product) =>
                                    product.productId === item.product._id
                                ) ? (
                                  <HoverPopover
                                    className="flex gap-2 items-center bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200 p-2 rounded-md text-sm cursor-default"
                                    content={
                                      <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900 text-lg">
                                          Your Review
                                        </h4>
                                        <div className="space-y-3">
                                          <div>
                                            <span className="font-medium text-gray-700 block mb-1">
                                              Rating:
                                            </span>
                                            <div className="flex items-center gap-2">
                                              {getRatingStars(
                                                findReviewInfo(item.product._id)
                                                  ?.rating
                                              )}
                                              <span className="text-sm text-gray-600">
                                                (
                                                {findReviewInfo(
                                                  item.product._id
                                                )?.rating || "N/A"}
                                                /5)
                                              </span>
                                            </div>
                                          </div>
                                          <div>
                                            <span className="font-medium text-gray-700 block mb-1">
                                              Comment:
                                            </span>
                                            <p className="text-gray-700 bg-orange-50 p-3 rounded-md italic border-l-2 border-orange-300">
                                              "
                                              {findReviewInfo(item.product._id)
                                                ?.review || "No comment"}
                                              "
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    }
                                  >
                                    <CheckCheckIcon className="w-4 h-4 text-green-500" />
                                    <span className="text-xs text-gray-600">
                                      Reviewed
                                    </span>
                                  </HoverPopover>
                                ) : (
                                  <ReviewModal
                                    orderId={id as string}
                                    product={item.product._id}
                                    userName={user?.user?.name}
                                    refetch={refetch}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-500"
                    >
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    Order Summary
                  </h3>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-sm">
                    <div className="space-y-3 divide-y divide-orange-200">
                      <div className="flex justify-between items-center pb-3">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">
                          {orderDetails?.data?.cartObject?.subTotal?.toFixed(2)}
                          €
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">
                          DE Shipping (Weight 0.00kg):
                        </span>
                        <span>N/A</span>
                      </div>

                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">VAT:</span>
                        <span>{`${orderDetails?.data?.cartObject?.vat}%`}</span>
                      </div>

                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Snap points:</span>
                        <span>
                          {`${orderDetails?.data?.cartObject?.snapPoints}€` ||
                            "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Discount points:</span>
                        <span>
                          {`${orderDetails?.data?.cartObject?.discountPoints}€` ||
                            "N/A"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Recharge credit:</span>
                        <span>N/A</span>
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <span className="font-bold text-xl">Total:</span>
                        <span className="font-bold text-xl text-orange-600">
                          {orderDetails?.data?.cartObject?.total?.toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardContent className="px-6 pb-8 bg-white">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Order History
                </h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600">
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Comment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orderDetails?.data?.history &&
                      orderDetails?.data?.history?.length > 0 ? (
                        orderDetails?.data?.history?.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-orange-50 transition-colors duration-150"
                          >
                            <td className="p-4">
                              {formatDate(item?.date || "", "MMM dd, yyyy")}
                            </td>
                            <td className="p-4">
                              <OrderStatusBadge status={item?.status} />
                            </td>
                            <td className="p-4 truncate max-w-xs">
                              {item?.remarks}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={3}
                            className="text-center p-8 text-gray-500"
                          >
                            <div className="flex flex-col items-center">
                              <Clock className="h-8 w-8 text-gray-300 mb-2" />
                              <p>No order history available</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              {/* 
              <div className="flex justify-end p-6 bg-gray-50 border-t">
                <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-6 py-2 rounded-md font-medium">
                  FURTHER
                </button>
              </div> */}
            </Card>
          )}
        </div>
        <ReturnOrderModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          orderNumber={orderDetails?.data?.orderNumber}
          productId={selectedProductId}
          selectedQuantity={selectedQuantity}
          refetch={refetch}
        />
      </TooltipProvider>
    </ClientLayout>
  );
};

export default OrderDetails;
