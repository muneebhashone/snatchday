"use client";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="mt-5 border">
      <div className="w-full bg-primary text-white p-2 mb-2 text-lg">
        Order ({Order?.data.orderNumber})
      </div>
      <div className="">
        <div className="grid grid-cols-2 gap-4 p-4">
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
              <h2 className="font-semibold text-lg mb-2">Delivery address</h2>
              <p>{Order?.data?.shippingDetails.street}</p>
              <p>{Order?.data?.shippingDetails.city}</p>
              <p>{Order?.data?.shippingDetails.country}</p>
              <p>{Order?.data?.shippingDetails.federalState}</p>
              <p>{Order?.data?.shippingDetails.zip}</p>
              {/* <p>Officiis expedita lo Aperiam fu</p>
              <p>New Zealand</p> */}
            </CardContent>
          </Card>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px] text-primary">Product</TableHead>
              <TableHead className="text-primary">Article number</TableHead>
              <TableHead className="text-right text-primary">Number</TableHead>
              <TableHead className="text-right text-primary">
                Unit price
              </TableHead>
              <TableHead className="text-right text-primary">Sum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-bold">{item.product.name}</TableCell>
                <TableCell>{item.product.article}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{item.unitPrice}€</TableCell>
                <TableCell className="text-right text-primary">
                  {item.totalPrice}€
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="w-full text-right">
              <TableCell colSpan={4}>Subtotal</TableCell>
              <TableCell colSpan={5}>
                {Order?.data?.cartObject.subTotal}
              </TableCell>
            </TableRow>
            <TableRow className="w-full text-right">
              <TableCell colSpan={4}>Free Shipping</TableCell>
              <TableCell colSpan={5}>0.00€</TableCell>
            </TableRow>
            <TableRow className="w-full text-right">
              <TableCell colSpan={4}>19% VAT</TableCell>
              <TableCell colSpan={5}>{Order?.data?.cartObject.vat}</TableCell>
            </TableRow>
            <TableRow className="w-full text-right">
              <TableCell colSpan={4}>Snap Points</TableCell>
              <TableCell colSpan={5}>
                {Order?.data?.cartObject.snapPoints}
              </TableCell>
            </TableRow>
            <TableRow className="w-full text-right">
              <TableCell colSpan={4}>Discount Points</TableCell>
              <TableCell colSpan={5}>
                {Order?.data?.cartObject.discountPoints}
              </TableCell>
            </TableRow>
            <TableRow className="w-full text-right">
              <TableCell colSpan={4}>In Total</TableCell>
              <TableCell className="text-primary font-bold" colSpan={5}>
                {Order?.data?.cartObject.total}€
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
