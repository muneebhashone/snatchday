"use client";

import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import {
  useGetWithdrawalRequestById,
  useUpdateWithdrawalReject,
  useUpdateWithdrawalRequest,
} from "@/hooks/api";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  Loader,
  User,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { WithdrawalRequest, WithdrawalRequestResponse } from "@/types";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { formatCurrency } from "@/lib/utils";

export default function WithdrawalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const {
    data: withdrawalRequest,
    isLoading,
    refetch,
  } = useGetWithdrawalRequestById(id);

  const [status, setStatus] = useState<WithdrawalRequest["status"]>("PENDING");
  const { mutate: updateWithdrawal, isPending } = useUpdateWithdrawalRequest();
  const { mutate: updateWithdrawalReject, isPending: isRejectPending } =
    useUpdateWithdrawalReject();
  console.log(withdrawalRequest?.data, "status2");

  useEffect(() => {
    if (withdrawalRequest?.data) {
      setStatus(withdrawalRequest.data.withdrawal.status);
      console.log(withdrawalRequest.data.withdrawal.status, "status");
    }
    console.log(withdrawalRequest?.data?.withdrawal?.status);
  }, [withdrawalRequest?.data]);

  const handleUpdateStatus = () => {
    if (status === "REJECTED") {
      updateWithdrawalReject(
        {
          id,
          status: "REJECTED",
        },
        {
          onSuccess: () => {
            toast.success("Withdrawal request rejected successfully");
            refetch();
          },
          onError: (error: any) => {
            toast.error(
              error.response?.data?.message ||
                "Failed to reject withdrawal request"
            );
          },
        }
      );
    } else {
      updateWithdrawal(
        {
          id,
          status,
        },
        {
          onSuccess: () => {
            toast.success("Withdrawal request updated successfully");
            refetch();
          },
          onError: (error: any) => {
            toast.error(
              error.response?.data?.message ||
                "Failed to update withdrawal request"
            );
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <div className="flex items-center justify-center h-44">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  const request = withdrawalRequest?.data as WithdrawalRequest;

  console.log(request);
  if (!request) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <div className="text-center py-10">No withdrawal request found</div>
        </div>
      </AdminLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Completed</span>
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            <span>Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>Pending</span>
          </div>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <AdminBreadcrumb
            title="Withdrawal Details"
            items={[
              { title: "Withdrawal Requests", href: "/admin/withdrawal" },
            ]}
          />
          <Link href="/admin/withdrawal">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Withdrawal Requests
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Withdrawal Request #{" "}
                {request?.withdrawal?.withdrawalNumber || "N/A"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-600">
                  {request
                    ? format(
                        new Date(request?.withdrawal?.createdAt),
                        "MMM dd, yyyy"
                      )
                    : "N/A"}
                </p>
                {getStatusBadge(request?.withdrawal?.status)}
              </div>
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(request?.withdrawal?.amount)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Customer Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Customer Details
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Name</span>
                <span className="font-medium">
                  {request?.withdrawal?.user?.name || "Unknown"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Email</span>
                <span className="font-medium">
                  {request?.withdrawal?.user?.email ||
                    request?.withdrawal?.bankDetails?.paypalEmail ||
                    "Not provided"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="font-medium">
                  {request?.withdrawal?.user?.phone || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Payout Method Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-50 p-2 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Payment Method
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Method:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    request?.withdrawal?.bankDetails?.paypalEmail
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {request?.withdrawal?.bankDetails?.paypalEmail
                    ? "PayPal"
                    : "Bank Transfer"}
                </span>
              </div>

              {request?.withdrawal?.bankDetails?.paypalEmail ? (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">PayPal Email</span>
                  <span className="font-medium">
                    {request?.withdrawal?.bankDetails?.paypalEmail}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">IBAN</span>
                    <span className="font-medium">
                      {request?.withdrawal?.bankDetails?.iban || "Not provided"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Account Holder
                    </span>
                    <span className="font-medium">
                      {request?.withdrawal?.bankDetails?.accountName ||
                        "Not provided"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-50 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Financial Summary
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Redemption Amount</span>
                <span className="font-medium">
                  {formatCurrency(request?.withdrawal?.amount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Shop Commission</span>
                <span className="font-medium">1.00€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Method Fee</span>
                <span className="font-medium">
                  {request?.withdrawal?.bankDetails?.paypalEmail
                    ? "0.35"
                    : "0.00"}
                  €
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Clearing</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(
                      request?.withdrawal?.amount +
                        request?.withdrawal?.platformFee
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Current Balance</span>
                  <span className="font-medium">
                    {formatCurrency(
                      withdrawalRequest?.data?.customerWallet?.snapPoints /
                        100 +
                        (request?.withdrawal?.amount +
                          request?.withdrawal?.platformFee)
                    ) || "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Balance Card */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Balance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{(request.amount || 0).toFixed(2)}€</h3>
                <p className="text-gray-600">Clearing Amount</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-cyan-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">{(request.user?.balance || 0).toFixed(2)}€</h3>
                <p className="text-gray-600">Actual Balance</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Status Update Card */}
        {request?.withdrawal?.status === "PENDING" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Action</h2>
            <div className="flex items-center gap-4">
              <div className="font-medium w-24">Status:</div>
              <Select
                value={status}
                onValueChange={(value) =>
                  setStatus(value as WithdrawalRequest["status"])
                }
                disabled={isPending || isRejectPending}
              >
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleUpdateStatus}
                disabled={
                  isPending ||
                  isRejectPending ||
                  status === request?.withdrawal?.status
                }
                className="bg-primary text-white hover:bg-primary/90"
              >
                {isPending || isRejectPending
                  ? "Processing..."
                  : "Update Status"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
