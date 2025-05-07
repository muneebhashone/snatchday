"use client";
import { useGetCustomerSubscription } from "@/hooks/api";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  DollarSign,
  Info,
  Tag,
  Calendar,
  Globe,
  Link2,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function to format currency
const formatCurrency = (amount: string, currency: string) => {
  if (!amount || !currency) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(parseFloat(amount));
};

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CustomerSubscription = ({ customerId }: { customerId: string }) => {
  const { data, isLoading, error } = useGetCustomerSubscription(customerId);
  console.log(data);
  const subscription = data?.data?.subscription;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-2 text-gray-500">Loading subscription...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <p className="flex items-center">
          <Info className="w-5 h-5 mr-2" />
          Error loading subscription data
        </p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">No subscription found for this customer</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Subscription Details
            </CardTitle>
            <Badge
              variant={subscription.status === "active" ? "success" : "default"}
              className="capitalize text-xs px-3 py-1"
            >
              {subscription.status}
            </Badge>
          </div>
          <p className="text-gray-500 text-sm">
            {data?.data?.message || "Customer Subscription"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  PACKAGE NAME
                </p>
                <p className="font-semibold text-gray-900">{subscription?.package?.name || "-"}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  SNAP POINTS DEDUCTED
                </p>
                <p className="font-semibold text-gray-900 text-lg">
                  {subscription.snapPointsDeducted}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-green-50 rounded-lg mr-3">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  NEXT BILLING DATE
                </p>
                <p className="font-semibold text-gray-900">
                  {subscription.nextBillingDate
                    ? formatDate(subscription.nextBillingDate)
                    : "-"}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-purple-50 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  INTERVAL
                </p>
                <p className="font-semibold text-gray-900">
                  {subscription?.package?.interval || "-"}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-amber-50 rounded-lg mr-3">
                <Tag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">
                  PACKAGE ID
                </p>
                <p className="font-semibold text-gray-900 capitalize">
                  {subscription?.package?._id || "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">USER ID</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {subscription.user}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">SUBSCRIPTION ID</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {subscription._id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">START DATE</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formatDate(subscription.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">CREATED AT</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formatDate(subscription.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSubscription;
