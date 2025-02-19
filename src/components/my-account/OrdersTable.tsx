import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Order {
  orderNumber: string;
  date: string;
  article: string;
  number: number;
  subtotal: string;
  totalAmount: string;
  status: "Paid" | "Complete" | "Canceled";
  invoice?: boolean;
}

const orders: Order[] = [
  {
    orderNumber: "1396",
    date: "January 23, 2025",
    article:
      "Canon CLI-551 C/M/Y/BK Multipack - Pack of 4 - Black, Yellow, Cyan, Magenta - (8714574584416)",
    number: 1,
    subtotal: "44.07€",
    totalAmount: "15.69€",
    status: "Paid",
  },
  {
    orderNumber: "1392",
    date: "July 10, 2024",
    article:
      'Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 256 GB SSD - 39.62 cm (15.6") - (4710886785279)',
    number: 2,
    subtotal: "603.20€",
    totalAmount: "776.81€",
    status: "Complete",
    invoice: true,
  },
  {
    orderNumber: "1391",
    date: "July 4, 2024",
    article:
      'Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6") - (4710886785170)',
    number: 2,
    subtotal: "593.00€",
    totalAmount: "715.62€",
    status: "Complete",
    invoice: true,
  },
  {
    orderNumber: "1246",
    date: "September 11, 2023",
    article:
      "Canon CLI-551 C/M/Y/BK Multipack - Pack of 4 - Black, Yellow, Cyan, Magenta - (8714574584416)",
    number: 1,
    subtotal: "44.07€",
    totalAmount: "67.44€",
    status: "Complete",
    invoice: true,
  },
  {
    orderNumber: "1236",
    date: "September 11, 2023",
    article:
      "Canon CLI-551 C/M/Y/BK Multipack - Pack of 4 - Black, Yellow, Cyan, Magenta - (8714574584416)",
    number: 1,
    subtotal: "44.07€",
    totalAmount: "62.44€",
    status: "Canceled",
  },
];

const OrdersTable = () => {
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Orders</h2>
      <Table className="border">
        <TableHeader className="rounded-t-3xl">
          <TableRow className="rounded-t-3xl">
            <TableHead className="w-[100px]">order number</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Article</TableHead>
            <TableHead className="text-center">Number</TableHead>
            <TableHead className="text-right">subtotal</TableHead>
            <TableHead className="text-right">total amount</TableHead>
            <TableHead className="text-center">status</TableHead>
            <TableHead className="text-center">View order</TableHead>
            <TableHead className="text-center">The invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.orderNumber}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="max-w-[400px]">{order.article}</TableCell>
              <TableCell className="text-center">{order.number}</TableCell>
              <TableCell className="text-right">{order.subtotal}</TableCell>
              <TableCell className="text-right">{order.totalAmount}</TableCell>
              <TableCell>
                <div
                  className={`text-center rounded-md py-1 px-2 
                  ${
                    order.status === "Paid"
                      ? "bg-green-700 text-white"
                      : order.status === "Complete"
                      ? "bg-green-700 text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {order.status}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/orders/${order.orderNumber}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Eye className="h-5 w-5 text-foreground" />
                  </Button>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {order.invoice && (
                  <Link href={`/invoices/${order.orderNumber}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                    >
                      <svg
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9M13 2L20 9M13 2V9H20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t">
        <p className="text-sm text-foreground">Showing 1 to 5 of 5 (1 page(s))</p>
      </div>
    </div>
  );
};

export default OrdersTable;
