"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItemsTableProps {
  Order: any;
}

export default function OrderItemsTable({ Order }: OrderItemsTableProps) {
  const order = Order?.data.cartObject.cart;
  console.log(Order);
  order?.map((data) => console.log(data.product.article));
  return (
    <div className="mt-5">
      <Card className="shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-primary mb-4">Order details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-2">Billing address</h2>
                <p>
                  {Order?.data?.billingDetails.firstName +
                    " " +
                    Order?.data?.billingDetails.lastName}
                </p>
                <p>{Order?.data?.billingDetails.street}</p>
                <p>
                  {Order?.data?.billingDetails.zip +
                    Order?.data?.billingDetails.city}
                </p>
                <p>{Order?.data?.billingDetails.country}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg mb-2">Shipping address</h2>
                <p>{Order?.data?.shippingDetails.street}</p>
                <p>{Order?.data?.shippingDetails.city}</p>
                <p>{Order?.data?.shippingDetails.country}</p>
                <p>{Order?.data?.shippingDetails.federalState}</p>
                <p>{Order?.data?.shippingDetails.zip}</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="text-primary">PRODUCTS</TableHead>
                  <TableHead className="text-primary">PRICE</TableHead>
                  <TableHead className="text-primary text-center">QTY</TableHead>
                  <TableHead className="text-primary text-right">TOTAL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-bold">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Material: {item.product.material || "Wooden"}</p>
                        <p className="text-sm text-gray-500">Size: {item.product.size || "8UK"}</p>
                        <p className="text-sm text-gray-500">Storage: {item.product.storage || "128gb"}</p>
                        <p className="text-sm text-gray-500">Gender: {item.product.gender || "Women"}</p>
                      </div>
                    </TableCell>
                    <TableCell>${item.unitPrice}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right text-primary">
                      ${item.totalPrice}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="text-right">Subtotal:</TableCell>
                  <TableCell className="text-right">${Order?.data?.cartObject.subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">Discount:</TableCell>
                  <TableCell className="text-right">$00.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">Tax:</TableCell>
                  <TableCell className="text-right">${Order?.data?.cartObject.vat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">Total:</TableCell>
                  <TableCell className="text-right font-bold">${Order?.data?.cartObject.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
