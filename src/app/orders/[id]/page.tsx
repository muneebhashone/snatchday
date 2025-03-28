"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useGetOrderById } from "@/hooks/api";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { formatDate } from "date-fns";
import ClientLayout from "@/components/landing-page/ClientLayout";
import Image from "next/image";
import React, { useState } from "react";
import ReturnOrderModal from "@/components/ReturnOrderModal";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderDetails, isLoading,refetch } = useGetOrderById(id as string);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);
 
 
 
  const handleReturnClick = (productId,quantity) => {
    setSelectedProductId(productId);
    setSelectedQuantity(quantity);
    setModalOpen(true);
  };

  return (
    <ClientLayout>
      <div className="p-6 max-w-7xl  mx-auto my-32 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <Card className="p-6">
            <h2 className="text-xl font-bold">Invoice #Invoice(comming soon)</h2>
            <div className="grid grid-cols-2 gap-4 mt-4 border p-4">
              <div>
                <h3 className="font-bold">Order details</h3>
                <p>
                  <strong>Snatch Day</strong>
                </p>
                <p>Telramundweg 6</p>
                <p>12167 Berlin</p>
                <p>Phone: 03054612480</p>
                <p>Email: info@snatchday.de</p>
                <p>
                  Website:{" "}
                  <a href="https://snatchday.de" className="text-blue-500">
                    https://snatchday.de/
                  </a>
                </p>
              </div>
              <div>
                <p>
                  <strong>Created on:</strong> {formatDate(orderDetails?.data?.createdAt || "", "dd/MM/yyyy")}
                </p>
                <p>
                  <strong>Invoice No.:</strong> Comming sooon
                </p>
                <p>
                  <strong>Order No.:</strong> {orderDetails?.data?.orderNumber || "N/A"}
                </p>
                <p>
                  <strong>Payment method:</strong>  Coming soon
                </p>
                <p>
                  <strong>Delivery method:</strong> Coming soon
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 border p-4">
              <div>
                <h3 className="font-bold">Billing address</h3>
                <p>{`Name : ${orderDetails?.data?.billingDetails?.firstName} ${orderDetails?.data?.billingDetails?.lastName}` || "N/A"}</p>
                <p>{`Country : ${orderDetails?.data?.billingDetails?.country}` || "N/A"}</p>
                <p>{`Street : ${orderDetails?.data?.billingDetails?.street}` || "N/A"}</p>
                <p>{`Federal State : ${orderDetails?.data?.billingDetails?.federalState}` || "N/A"}</p>
                <p>{`Zip : ${orderDetails?.data?.billingDetails?.zip}` || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-bold">Shipping address</h3>
                <p>{`Name : ${orderDetails?.data?.shippingDetails?.firstName} ${orderDetails?.data?.shippingDetails?.lastName}` || "N/A"}</p>
                <p>{`Country : ${orderDetails?.data?.shippingDetails?.country}` || "N/A"}</p>
                <p>{`Street : ${orderDetails?.data?.shippingDetails?.street}` || "N/A"}</p>
                <p>{`Federal State : ${orderDetails?.data?.shippingDetails?.federalState}` || "N/A"}</p>
                <p>{`Zip : ${orderDetails?.data?.shippingDetails?.zip}` || "N/A"}</p>
              </div>
            </div>

            <CardContent className="mt-4 border p-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <td className="border p-2">Image</td>
                    <th className="border p-2">Product Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2"> Unit Price</th>
                    <th className="border p-2">Total Price</th>
                    <th className="border p-2">Created</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.data?.cartObject?.cart?.map((item) => (
                    <tr key={item.id}>
                      <td className="border p-2">
                        <Image src={item?.product?.images[0]} alt={item?.product?.name} width={50} height={50} />
                      </td>
                      <td className="border p-2 text-center">
                        {item?.product?.name}
                      </td>
                      <td className="border p-2 text-center">{item?.quantity || 0}</td>
                      <td className="border p-2 text-center">{`${item?.unitPrice}€`}</td>
                      <td className="border p-2 text-center">{`${item?.totalPrice}€`}</td>
                      <td className="border p-2 text-center">{formatDate(item?.product?.createdAt || "", "dd/MM/yyyy")}</td>
                      <td className="border p-2">
                        <button
                          className="bg-orange-500 cursor-pointer capitalize text-white text-xs px-1 py-1 rounded"
                          onClick={() => handleReturnClick(item.product._id,item.quantity)}
                        >
                          return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 border-t pt-4">
                <p>
                  <strong>Subtotal:</strong> {orderDetails?.data?.cartObject?.subTotal}€
                </p>
                <p>
                  <strong>DE Shipping (Weight 0.00kg):</strong> Coming soon
                </p>
                <p>
                  <strong>VAT:</strong> {`${orderDetails?.data?.cartObject?.vat}%`}
                </p>
                <p>
                  <strong>Snap points:</strong> {`${orderDetails?.data?.cartObject?.snapPoints}€` || "N/A"}
                </p>
                <p>
                  <strong>Discount points:</strong> { `${orderDetails?.data?.cartObject?.discountPoints}€` || "N/A"}
                </p>
                <p>
                  <strong>Recharge credit:</strong> Coming soon
                </p>
                <p className="font-bold text-lg">In total: {orderDetails?.data?.cartObject?.total.toFixed(2)}€</p>
              </div>
            </CardContent>

            <CardContent className="mt-4 border p-4">
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
                  {orderDetails?.data?.history && orderDetails.data.history.length > 0 ? (
                    orderDetails?.data?.history.map((item) => (
                      item?.customerInformed ? (
                        <tr key={item.id}>
                          <td className="border p-2">{formatDate(item?.date || "", "dd/MM/yyyy")}</td>
                          <td className="border p-2">{item?.status}</td>
                          <td className="border truncate p-2">
                            {item?.remarks}
                          </td>
                        </tr>
                      ) : null // Skip rendering if customerInformed is false
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">No previous course found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>

            <div className="flex justify-end mt-4">
              <button className="bg-orange-500 text-white px-4 py-2 rounded">
                FURTHER
              </button>
            </div>
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
    </ClientLayout>
  );
};

export default OrderDetails;
