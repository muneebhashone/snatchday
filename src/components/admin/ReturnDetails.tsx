"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetReturnById } from "@/hooks/api";
import { formatDate } from "date-fns";
import {
  Package,
  ArrowLeft,
  Clock,
  FileText,
  Info,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AdminLayout from "@/components/admin/AdminLayout";
// import { Badge } from '@/components/ui/badge';

const ReturnDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetReturnById(id as string);

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "complete":
        return "bg-green-100 rounded-md ml-2 px-2 text-green-800";
      case "pending":
        return "bg-yellow-100 rounded-md ml-2 px-2 text-yellow-800";
      case "rejected":
        return "bg-red-100 rounded-md ml-2 px-2 text-red-800";
      default:
        return "bg-primary px-2 rounded-md ml-2 text-white";
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-pulse text-primary" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-red-500">
          Error Loading Return Details
        </h2>
      </div>
    );

  const returnData = data?.data;
  console.log(returnData, "returnData");

  return (
    <div className="my-4 min-w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold flex text-white items-center bg-primary px-3 rounded-md">
          <Package className="mr-3 text-white" />
          Return Details
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Return Summary Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center text-primary">
                <Info className="mr-2 text-blue-600" />
                Return Information
              </div>
              <div>
                <span className="font-bold">Status:</span>
                <span
                  className={` ${getStatusColor(
                    returnData?.status
                  )} capitalize`}
                >
                  {returnData?.status || "N/A"}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="flex items-center mb-2">
                  <FileText className="mr-2 text-gray-500" />
                  <span className="font-semibold">Return Number:</span>
                  <span className="ml-2">
                    {returnData?.returnNumber || "N/A"}
                  </span>
                </p>
                <p className="flex items-center mb-2">
                  <ShoppingCart className="mr-2 text-gray-500" />
                  <span className="font-semibold">Order Number:</span>
                  <span className="ml-2">
                    {returnData?.orderNumber || "N/A"}
                  </span>
                </p>
                <p className="flex items-center">
                  <Clock className="mr-2 text-gray-500" />
                  <span className="font-semibold">Created At:</span>
                  <span className="ml-2">
                    {formatDate(returnData?.createdAt, "dd/MM/yyyy")}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Package className="mr-2 text-blue-600" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {returnData?.productsData?.map((item, index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 space-y-2">
                    {/* <h4 className="font-semibold">Product Details</h4> */}
                    <p className="text-sm text-gray-500">
                      <Image
                        src={item?.product.images[0]}
                        alt={item?.product.description}
                        width={50}
                        height={50}
                      />
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Name:</strong> {item?.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Article:</strong> {item?.product.article}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Quantity:</strong> {item?.quantity}
                    </p>
                    <p className="text-sm my-4 text-gray-500">
                      <strong>Reason:</strong> {item?.reason}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Price:</strong> {item?.product.price.toFixed()}€
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Created:</strong>{" "}
                      {formatDate(item?.product?.createdAt || "", "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="my-6">
        <h3 className="font-bold">Previous course</h3>
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Created</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Comment</th>
            </tr>
          </thead>
          <tbody>
            {returnData?.history && returnData.history.length > 0 ? (
              returnData?.history.map(
                (item) =>
                  item?.customerInformed ? (
                    <tr key={item.id}>
                      <td className="border p-2">
                        {formatDate(item?.date || "", "dd/MM/yyyy")}
                      </td>
                      <td className="border p-2 capitalize">{item?.status}</td>
                      <td className="border truncate p-2">{item?.remarks}</td>
                    </tr>
                  ) : null // Skip rendering if customerInformed is false
              )
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No previous course found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnDetailsPage;
