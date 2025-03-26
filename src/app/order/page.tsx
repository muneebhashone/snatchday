"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ClientLayout from "@/components/landing-page/ClientLayout";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import { useGetCart, useUpdateCart } from "@/hooks/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartTable = () => {
  const {data:cart, isLoading, refetch} = useGetCart()
  const {mutateAsync:updateCart,isPending} = useUpdateCart()

  const handleUpdateCart = async (id: string, quantity: number) => {
    await updateCart(
      { id: id, quantity: quantity   },
      {
        onSuccess: () => {
            toast.success("Cart updated successfully", {
              position: "top-right",
              style: { backgroundColor: 'green',color:'white' }
            })
          refetch();
        },
        onError: () => {
          toast.error("Failed to update cart", {
            position: "top-right",
            style: { backgroundColor: 'red',color:'white' }
          })
        }
      }
    );
  };

  return (
    <ClientLayout>
     
      <div className="container max-w-[1920px] my-20  mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
            <Image src={logo} alt="Snatch Day Logo" width={70} height={40} priority />
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
          </div>
          {cart?.data?.cart?.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Picture</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead className="text-right">Sum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart?.data?.cart?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img src={item?.product?.images[0]} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                      </TableCell>
                      <TableCell>{item?.product?.name}</TableCell>
                      <TableCell className="text-center">
                        <Button 
                          onClick={() => handleUpdateCart(item?.product?._id, item.quantity - 1)} 
                          variant="outline" 
                          size="sm" 
                          disabled={item.quantity <= 1 || isPending}
                        >
                             -
                          
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          onClick={() => handleUpdateCart(item?.product?._id, item.quantity + 1)} 
                          variant="outline" 
                          size="sm"
                          disabled={isPending}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell>{item?.product?.price.toFixed(2)}€</TableCell>
                      <TableCell className="text-right font-semibold">
                        {(item?.product?.price * item?.quantity).toFixed(2)}€
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Voucher Section */}
          <div className="mt-6">
            <h3 className="text-xl font-bold">Please choose next step</h3>
            <p className="text-gray-500">Redeem voucher</p>
            <Card className="p-4 mt-2">
              <label className="block text-gray-700 font-semibold">Voucher Code (coming soon)</label>
              <Input disabled placeholder="Enter voucher code" className="mt-2" />
            </Card>
            <Card className="p-4 mt-4">
              <label className="block text-gray-700 font-semibold">Gift Voucher (coming soon)</label>
              <Input disabled placeholder="Enter gift voucher" className="mt-2" />
            </Card>
          </div>

          {/* Summary Section */}
          <div className="mt-6 p-4 border-t">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>{cart?.data?.subTotal.toFixed(2)}€</span>
            </div>
            {cart?.data?.appliedDiscount > 0 && (
              <div className="flex justify-between text-lg font-semibold text-green-600">
                <span>Discount:</span>
                <span>-{cart?.data?.appliedDiscount.toFixed(2)}€</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold">
              <span>19% VAT:</span>
              <span>{((cart?.data?.subTotal || 0) * (cart?.data?.vat || 0) / 100).toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2 border-t pt-2">
              <span>Total:</span>
              <span>{cart?.data?.total.toFixed(2)}€</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end w-full">
            {/* <Button variant="outline">Continue Shopping</Button> */}
            <Button className="bg-[#F37835] text-white px-5 py-2 rounded-md hover:bg-[#FF9900]">
              Proceed to Checkout
            </Button>
          </div>
        </div>
        )}
      </div>
      
    </ClientLayout>
  );
};

export default CartTable;