"use client";
import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import { Button } from "@/components/ui/button";
import {
  useDeleteMandate,
  useGetAllSubscription,
  useGetMandate,
  useCancelSubscription,
} from "@/hooks/api";
import { Loader, TrashIcon, CreditCard, Calendar, DollarSign, Clock, CheckCircle } from "lucide-react";
import React, { useState } from "react";
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
  const { mutate: deleteMandate } = useDeleteMandate();
  const { refetch } = useGetMandate();
  const { mutate: cancelSubscription, isPending: isCancelling } =
    useCancelSubscription();
  const { data: getmandates } = useGetMandate();
  const mandates = getmandates?.data?.mandates;
  const { data: allSubscription, refetch: refetchAllSubscription } =
    useGetAllSubscription();
  const subscription = allSubscription?.data?.subscriptions;
  const [subscriptionToCancel, setSubscriptionToCancel] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  console.log(subscription);
  console.log(mandates);

  // Format card number with spaces (for display purposes)
  const formatCardNumber = (number) => {
    if (!number) return "•••• •••• •••• ••••";
    // Extract the last 4 digits from account number
    const lastFour = number.replace(/[^0-9]/g, "").slice(-4);
    // Display masked numbers with last 4 digits visible
    return `•••• •••• •••• ${lastFour}`;
  };

  // Format currency value
  const formatCurrency = (amount, currency) => {
    if (!amount || !currency) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(parseFloat(amount));
  };

  const handleDelete = (mandateId: string) => {
    deleteMandate(mandateId, {
      onSuccess: () => {
        toast.success("Payment method deleted successfully");
        refetch();
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to delete payment method"
        );
      },
    });
  };

  const handleCancelSubscription = () => {
    if (!subscriptionToCancel) return;
    
    cancelSubscription(subscriptionToCancel, {
      onSuccess: () => {
        toast.success("Subscription cancelled successfully");
        refetchAllSubscription();
        setShowCancelDialog(false);
        setSubscriptionToCancel(null);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to cancel subscription"
        );
        setShowCancelDialog(false);
        setSubscriptionToCancel(null);
      },
    });
  };

  return (
    <MyAccountLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Subscriptions</h1>
          <p className="text-gray-500 mt-1">Manage your subscriptions and payment methods</p>
        </div>

        {/* Subscription section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Active Subscriptions</h2>
          </div>
          <div className="space-y-6">
            {subscription && subscription.length > 0 ? (
              subscription.map((sub, index) => (
                <div
                  key={sub.id || index}
                  className={`rounded-xl overflow-hidden shadow-md bg-white transition-all duration-200 hover:shadow-lg border ${
                    sub.status === "active"
                      ? "border-l-4 border-green-500"
                      : "border border-gray-200"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-800">
                          {sub.description || "Subscription Package"}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {sub.interval || "Monthly"} subscription
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          sub.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {sub.status === "active" && <CheckCircle className="w-3.5 h-3.5 mr-1" />}
                        {sub.status}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-50 rounded-lg mr-3">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">AMOUNT</p>
                          <p className="font-semibold text-gray-900 text-lg">
                            {formatCurrency(
                              sub?.amount?.value,
                              sub?.amount?.currency
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-green-50 rounded-lg mr-3">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">NEXT PAYMENT</p>
                          <p className="font-semibold text-gray-900">
                            {sub.nextPaymentDate
                              ? new Date(sub.nextPaymentDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })
                              : "Not scheduled"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-purple-50 rounded-lg mr-3">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">START DATE</p>
                          <p className="font-semibold text-gray-900">
                            {sub.startDate
                              ? new Date(sub.startDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })
                              : "-"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-amber-50 rounded-lg mr-3">
                          <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-medium">
                            PAYMENTS REMAINING
                          </p>
                          <p className="font-semibold text-gray-900">
                            {sub.timesRemaining || "∞"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-gray-100 pt-5 mt-5 gap-5">
                      {sub.mandateId && mandates && (
                        <div className="flex-grow">
                          <p className="text-xs text-gray-500 uppercase font-medium mb-2">
                            PAYMENT METHOD
                          </p>
                          {mandates.map(
                            (mandate) =>
                              mandate.id === sub.mandateId && (
                                <div
                                  key={mandate.id}
                                  className="flex items-center p-3 bg-gray-50 rounded-lg max-w-md"
                                >
                                  <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mr-3 shadow-sm">
                                    <span className="text-sm font-medium text-gray-700">
                                      {mandate.method === "directdebit"
                                        ? "DD"
                                        : mandate.method === "paypal"
                                        ? "PP"
                                        : "CC"}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {mandate.method === "directdebit"
                                        ? "Direct Debit"
                                        : mandate.method === "paypal"
                                        ? "PayPal"
                                        : "Credit Card"}
                                    </p>
                                    {mandate?.details?.consumerAccount && (
                                      <p className="text-xs text-gray-500">
                                        {formatCardNumber(
                                          mandate?.details?.consumerAccount
                                        )}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      )}
                      <div className="flex gap-3 mt-2 md:mt-0">
                        <Button
                          variant="outline"
                          className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                          onClick={() => {
                            setSubscriptionToCancel(sub.id);
                            setShowCancelDialog(true);
                          }}
                        >
                          {isCancelling && subscriptionToCancel === sub.id ? (
                            <Loader className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          {isCancelling && subscriptionToCancel === sub.id ? "Cancelling..." : "Cancel Subscription"}
                        </Button>
                        {sub.status !== "active" && (
                          <Button className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all">
                            Complete Subscription
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No subscriptions found</p>
                <p className="text-gray-400 text-sm mt-1">You currently don't have any active subscriptions</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment methods section */}
        <div className="my-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Your Payment Methods
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {mandates && mandates.length > 0 ? (
              mandates.map((mandate, index) => (
                <div
                  key={mandate.id || index}
                  className={`rounded-xl p-5 shadow-md relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  style={{
                    background:
                      mandate.method !== "paypal"
                        ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                        : "linear-gradient(135deg, #f97316, #ea580c)",
                    maxWidth: "360px",
                  }}
                >
                  {/* Background pattern - subtle waves */}
                  <div className="absolute inset-0 opacity-5">
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id={`wave-${index}`}
                          patternUnits="userSpaceOnUse"
                          width="100"
                          height="100"
                        >
                          <path
                            d="M0 20 Q 20 40 40 20 T 80 20 T 120 20"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#wave-${index})`}
                      />
                    </svg>
                  </div>
                  
                  {/* Card logo */}
                  <div className="absolute top-5 right-5 z-10">
                    {mandate.method !== "paypal" ? (
                      <span className="text-white font-bold text-lg">Direct Debit</span>
                    ) : (
                      <span className="text-white font-bold text-lg">
                        Paypal
                      </span>
                    )}
                  </div>
                  
                  {/* Chip */}
                  <div className="mb-6 mt-1 relative z-10">
                    <div
                      className="h-10 w-14 bg-yellow-200 rounded-md inline-block"
                      style={{
                        background: "linear-gradient(145deg, #e6c200, #ffd700)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                      }}
                    ></div>
                  </div>
                  
                  {/* Card number */}
                  <div className="text-xl font-medium mb-6 tracking-wider text-white relative z-10">
                    {formatCardNumber(mandate?.details?.consumerAccount)}
                  </div>
                  
                  {/* Card details - in a more compact layout */}
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div>
                      <p className="text-xs text-white/70 uppercase">MEMBER</p>
                      <p
                        className="font-semibold text-sm uppercase truncate max-w-full text-white"
                        title={mandate?.details?.consumerName || ""}
                      >
                        {mandate?.details?.consumerName || "----"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase">METHOD</p>
                      <p className="font-semibold text-sm capitalize text-white">
                        {mandate.method || "----"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status indicator as a badge */}
                  <div className="mt-4 flex justify-between items-center relative z-10">
                    <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full mr-2 ${
                          mandate.status === "valid"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      ></span>
                      <p className="font-medium text-xs capitalize text-white">
                        {mandate.status || "----"}
                      </p>
                    </div>
                    <div className="relative z-20">
                      {allSubscription?.data?.subscriptions[0]?.mandateId !==
                        mandate.id && (
                        <Button
                          onClick={() => {
                            handleDelete(mandate.id);
                          }}
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer text-white hover:text-white hover:bg-white/20 rounded-full relative z-20"
                        >
                          <TrashIcon fill="white" className="w-4 h-4 text-white" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-8 bg-gray-50 rounded-xl text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No payment methods found</p>
                <p className="text-gray-400 text-sm mt-1">Add a payment method to start a subscription</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Cancel Subscription Confirmation Dialog */}
        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your subscription? This action cannot be undone and you'll lose access to subscription benefits immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSubscriptionToCancel(null)}>
                No, Keep Subscription
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelSubscription}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {isCancelling ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isCancelling ? "Cancelling..." : "Yes, Cancel Subscription"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MyAccountLayout>
  );
};

export default Page;
