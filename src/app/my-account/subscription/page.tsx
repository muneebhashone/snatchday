"use client";
import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import { Button } from "@/components/ui/button";
import {
  useDeleteMandate,
  useGetAllSubscription,
  useGetMandate,
  useCancelSubscription,
  useGetSnapSubscriptions,
  useCancelSnapSubscription,
} from "@/hooks/api";
import {
  Loader,
  CheckCircle,
  Calendar,
  DollarSign,
  Clock,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Page = () => {
  const { data: snapSubscriptions, isLoading } = useGetSnapSubscriptions();
  const { mutate: cancelSnapSubscription, isPending } = useCancelSnapSubscription();

  if (isLoading) {
    return (
      <MyAccountLayout>
        <div className="flex justify-center items-center h-40">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MyAccountLayout>
    );
  }

  const sub = snapSubscriptions?.data?.subscription;
  const pkg = sub?.package;

  return (
    <MyAccountLayout>
      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-primary">Subscription Overview</h2>
          {/* Example admin-style action button */}
          {snapSubscriptions?.data?.hasSubscription && (
            <Button variant="destructive" size="sm" onClick={() => {
              cancelSnapSubscription();
            }}>
              Cancel Subscription
            </Button>
          )}
        </div>
        {!snapSubscriptions?.data?.hasSubscription ? (
          <div className="bg-white rounded-lg shadow p-10 flex flex-col items-center border border-gray-200">
            <XCircle className="h-14 w-14 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No active subscription found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-10 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <CheckCircle className="h-7 w-7 text-green-500" />
              <span className="font-semibold text-xl text-green-700">
                {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
              {sub.autoRenew && (
                <span className="ml-2 flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <RefreshCcw className="h-4 w-4" /> Auto Renew
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Package</div>
                <div className="font-bold text-lg text-primary">{pkg?.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Interval</div>
                <div className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {pkg?.interval}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Price</div>
                <div className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  {pkg?.price} €
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Snap Points Deducted</div>
                <div className="font-medium">{sub.snapPointsDeducted}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Start Date</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">End Date</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "-"}
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-xs text-gray-500 mb-1">Description</div>
              <div className="text-gray-700">{pkg?.description}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Features</div>
              <ul className="list-disc ml-6 text-gray-700">
                {pkg?.features?.map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </MyAccountLayout>
  );
};

export default Page;
