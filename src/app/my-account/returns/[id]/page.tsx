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
import { Button } from "@/components/ui/button";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { Product } from "@/components/admin/Product";
// import { Badge } from '@/components/ui/badge';

const ReturnDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetReturnById(id as string);

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-16 h-16 animate-pulse text-blue-500" />
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

  return (
    <ClientLayout>
      <div className="my-32 w-[1400px] mx-auto px-4 py-24">
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <Package className="mr-3 text-blue-600" />
            Return Details
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Return Summary Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Info className="mr-2 text-blue-600" />
                  Return Information
                </div>
                <span
                  className={`${getStatusColor(returnData?.status)} capitalize`}
                >
                  {returnData?.status || "N/A"}
                </span>
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold mb-3">Return Reason</h3>
                  <p className="text-gray-600">
                    {returnData?.reason || "No specific reason provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 text-blue-600" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {returnData?.productsData?.map((item, index) => (
                <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                  <div className="flex items-start space-x-4">
                    
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold">Product Details</h4>
                      <p className="text-sm text-gray-500">
                     <Image src={item?.product.images[0]} alt={item?.product.description} width={50} height={50} />
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
                      <p className="text-sm text-gray-500">
                        <strong>Price:</strong> {item?.product.price}
                      </p>
                       
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ReturnDetailsPage;
