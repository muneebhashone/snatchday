"use client"

import Image from "next/image"
import {  useRouter } from "next/navigation"
import { Clock } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useGetOrderById } from "@/hooks/api"
import { useUserContext } from "@/context/userContext"

// Define types
interface Address {
  id: string
  firstName: string
  lastName: string
  email: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  addressType: "Home" | "Office"
}

interface ConfirmationStepProps {
  selectedAddress: Address | null
  cart: any,
  orderId:string,
  orderSummary: {
    subtotal: number
    tax: number
    total: number
  }
}

export function ConfirmationStep({ selectedAddress, cart, orderSummary,orderId }: ConfirmationStepProps) {
  const router = useRouter()
  const { data: order } = useGetOrderById(orderId as string)
  const {user}=useUserContext()

  console.log(order,"order data confirmation step")


  const orderNumber = Math.floor(Math.random() * 10000000)

    .toString()
    .padStart(7, "0")
  const email = selectedAddress?.email || "john.doe@example.com"
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Thank You! 😊</h2>
          <p className="text-gray-600">Your order #{order?.data?.orderNumber || "N/A"} has been placed!</p>

          <div className="mt-4 text-sm text-gray-500">
            <p>We sent an email to {user?.user?.email} with your order confirmation and receipt.</p>
            <p>
              If the email hasn't arrived within two minutes, please check your spam folder to see if the email was
              routed there.
            </p>
          </div>

          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Time placed: { new Date(order?.data?.createdAt).toLocaleDateString() || "N/A"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Shipping</h3>
              {order?.data?.shippingDetails && (
                <div className="text-sm">
                  <p>
                    {order?.data?.shippingDetails?.firstName} {order?.data?.shippingDetails?.lastName}
                  </p>
                  <p>{order?.data?.shippingDetails?.street || "N/A"}</p>
                  <p>
                    {order?.data?.shippingDetails?.city || "N/A"}, {order?.data?.shippingDetails?.state || "N/A"} {order?.data?.shippingDetails?.zip || "N/A"  }
                  </p>
                  <p>{order?.data?.shippingDetails?.country || "N/A"} </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Billing Address</h3>
              {order?.data?.billingDetails   && (
                <div className="text-sm">
                  <p>
                    {order?.data?.billingDetails?.firstName} {order?.data?.billingDetails?.lastName}
                  </p>
                  <p>{order?.data?.billingDetails?.street || "N/A"}</p>
                  <p>
                    {order?.data?.billingDetails?.city || "N/A"}, {order?.data?.billingDetails?.state || "N/A"} {order?.data?.billingDetails?.zip || "N/A"  }
                  </p>
                  <p>{order?.data?.billingDetails?.country || "N/A"}</p>
                </div>
              )}
            </div>
          </div>

          {/* <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Shipping Method</h3>
              <p className="text-sm">{order?.data?.shippingMethod || "N/A"}</p>
              <p className="text-sm text-gray-500">(Normally 3-4 business days)</p>
            </div>
          </div> */}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>

          <div className="space-y-4">
            {order?.data?.cartObject?.cart?.map((item:any) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <Image
                  src={item?.product?.images[0] || "/placeholder.svg"}
                  alt={item?.product?.name}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item?.product?.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">Quantity: {item?.quantity}</p>
                      <p className="text-xs text-green-600 mt-1">In Stock</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item?.product?.price?.toFixed(2)}€</p>
                      <p className="text-sm text-gray-500">{(item?.product?.price * item?.quantity)?.toFixed(2)}€</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Price Details</h3>

          <div className="space-y-2">
            {/* <div className="flex justify-between">
              <span>Order Total</span>
              <span>{order?.data?.cartObject?.totalPrice}€</span>
            </div> */}
            {/* <div className="flex justify-between">
              <span>Delivery Charges</span>
              <div className="flex items-center">
                <span className="line-through text-gray-500 mr-2">5.00€</span>
                <span className="text-green-600 text-xs font-semibold bg-green-100 px-2 py-0.5 rounded">FREE</span>
              </div>
            </div> */}

             
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Sub Total</span>
              <span>{order?.data?.cartObject?.subTotal.toFixed(2)}€</span>
            </div>

               
              {
                  order?.data?.cartObject?.appliedDiscount ? 
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                   <span>Applied Discount</span>
                   <span>{order?.data?.cartObject?.appliedDiscount}€</span>
                 </div>
              :""
              }
           
                   <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                   <span>DiscountPoints</span>
                   <span>{order?.data?.cartObject?.discountPoints}€</span>
                 </div>
             
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>SnapPoints</span>
              <span>{order?.data?.cartObject?.snapPoints}€</span>
            </div>
            
            {
                  order?.data?.cartObject?.voucherDiscount ? 
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                   <span>Voucher Discount</span>
                   <span>{order?.data?.cartObject?.voucherDiscount}€</span>
                 </div>
              :""
              }
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>VAT</span>
              <span>19%</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Total</span>
              <span>{order?.data?.cartObject?.total.toFixed(2)}€</span>
            </div>

        
            
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={() => router.push("/")} className="bg-[#F37835] hover:bg-[#FF9900] text-white">
            Continue Shopping
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
