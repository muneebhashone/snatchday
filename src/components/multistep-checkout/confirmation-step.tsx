"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, Loader2, CheckCircle, Package, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrderById } from "@/hooks/api";
import { useUserContext } from "@/context/userContext";
import { formatCurrency } from "@/lib/utils";

// Define types
interface Address {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  addressType: "Home" | "Office";
}

interface ConfirmationStepProps {
  selectedAddress: Address | null;
  cart: any;
  orderId: string;
  orderSummary: {
    subtotal: number;
    tax: number;
    total: number;
  };
}

export function ConfirmationStep({
  selectedAddress,
  cart,
  orderSummary,
  orderId,
}: ConfirmationStepProps) {
  const router = useRouter();
  const { data: order, isLoading } = useGetOrderById(orderId as string);
  const { user } = useUserContext();

  console.log(order, "order data confirmation step");

  const orderNumber = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, "0");
  const email = selectedAddress?.email || "john.doe@example.com";
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="bg-white shadow-md rounded-lg max-w-6xl mx-auto">
      <CardContent className="px-3 py-5 sm:py-8">
        {isLoading ? (
          <div className="flex flex-col text-[#F37835] justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="text-lg">Confirming your order...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {/* Thank You section - Centered and enhanced */}
            <div className="flex flex-col items-center justify-center text-center pb-8 mx-auto max-w-xl border-b border-gray-200">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-[#F37835]">
                Thank You! 😊
              </h2>
              <p className="text-gray-700 text-lg mb-3">
                Your order #{order?.data?.orderNumber || "N/A"} has been placed!
              </p>

              {user && (
                <div className="mt-4 text-sm text-gray-500 max-w-md">
                  <p>
                    We sent an email to {user.email} with your order
                    confirmation and receipt.
                  </p>
                  <p className="mt-1">
                    If the email hasn't arrived within two minutes, please check
                    your spam folder to see if the email was routed there.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  Time placed:{" "}
                  {new Date(order?.data?.createdAt).toLocaleDateString() ||
                    "N/A"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* First main div - addresses and order items */}
              <div className="md:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <Package className="h-5 w-5 text-[#F37835] mr-2" />
                      <h3 className="text-md font-semibold">
                        Shipping Address
                      </h3>
                    </div>
                    {order?.data?.shippingDetails && (
                      <div className="text-sm space-y-1">
                        <p className="font-medium">
                          {order?.data?.shippingDetails?.firstName}{" "}
                          {order?.data?.shippingDetails?.lastName}
                        </p>
                        <p>{order?.data?.shippingDetails?.street || "N/A"}</p>
                        <p>
                          {order?.data?.shippingDetails?.city || "N/A"},{" "}
                          {order?.data?.shippingDetails?.state || "N/A"}{" "}
                          {order?.data?.shippingDetails?.zip || "N/A"}
                        </p>
                        <p>{order?.data?.shippingDetails?.country || "N/A"} </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <CreditCard className="h-5 w-5 text-[#F37835] mr-2" />
                      <h3 className="text-md font-semibold">Billing Address</h3>
                    </div>
                    {order?.data?.billingDetails && (
                      <div className="text-sm space-y-1">
                        <p className="font-medium">
                          {order?.data?.billingDetails?.firstName}{" "}
                          {order?.data?.billingDetails?.lastName}
                        </p>
                        <p>{order?.data?.billingDetails?.street || "N/A"}</p>
                        <p>
                          {order?.data?.billingDetails?.city || "N/A"},{" "}
                          {order?.data?.billingDetails?.state || "N/A"}{" "}
                          {order?.data?.billingDetails?.zip || "N/A"}
                        </p>
                        <p>{order?.data?.billingDetails?.country || "N/A"}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Order Items
                  </h3>

                  <div className="space-y-4">
                    {order?.data?.cartObject?.cart?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center border-b pb-4 hover:bg-gray-50 p-2 rounded"
                      >
                        <div className="bg-gray-100 p-2 rounded">
                          <Image
                            src={item?.product?.images[0] || "/placeholder.svg"}
                            alt={item?.product?.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium text-gray-800">
                                {item?.product?.name || "N/A"}
                              </p>
                              <p className="text-sm text-gray-500">
                                Quantity: {item?.quantity}
                              </p>
                              <p className="text-xs text-green-600 mt-1 font-medium">
                                In Stock
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-800">
                                {formatCurrency(item?.product?.price)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatCurrency(
                                  item?.product?.price * item?.quantity
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second main div - Price details and button */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm sticky top-4">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Order Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sub Total</span>
                      <span className="font-medium">
                        {formatCurrency(order?.data?.cartObject?.subTotal)}
                      </span>
                    </div>

                    {order?.data?.cartObject?.appliedDiscount ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Applied Discount</span>
                        <span className="font-medium text-green-600">
                          -
                          {formatCurrency(
                            order?.data?.cartObject?.appliedDiscount
                          )}
                        </span>
                      </div>
                    ) : null}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount Points</span>
                      <span className="font-medium">
                        {formatCurrency(
                          order?.data?.cartObject?.discountPoints / 100
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Snap Points</span>
                      <span className="font-medium">
                        {formatCurrency(
                          order?.data?.cartObject?.snapPoints / 100
                        )}
                      </span>
                    </div>

                    {order?.data?.cartObject?.voucherDiscount ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Voucher Discount</span>
                        <span className="font-medium text-green-600">
                          -
                          {formatCurrency(
                            order?.data?.cartObject?.voucherDiscount
                          )}
                        </span>
                      </div>
                    ) : null}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">VAT (19%)</span>
                      <span className="font-medium">Included</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg pt-3 border-t mt-2 text-[#F37835]">
                      <span>Total</span>
                      <span>
                        {formatCurrency(order?.data?.cartObject?.total)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={() => router.push("/")}
                      className="w-full bg-[#F37835] hover:bg-[#FF9900] text-white py-2 shadow-md hover:shadow-lg transition-all"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
