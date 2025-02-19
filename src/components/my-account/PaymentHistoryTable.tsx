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

interface Payment {
  orderNumber: string;
  date: string;
  occurrence: string;
  amount: string;
  status: "Complete" | "Canceled";
}

const payments: Payment[] = [
  {
    orderNumber: "1398",
    date: "January 30, 2025",
    occurrence: "deposit",
    amount: "5.00€",
    status: "Complete",
  },
  {
    orderNumber: "1392",
    date: "July 10, 2024",
    occurrence: "deposit",
    amount: "50.00€",
    status: "Complete",
  },
  {
    orderNumber: "1388",
    date: "July 3, 2024",
    occurrence: "deposit",
    amount: "5.00€",
    status: "Complete",
  },
  {
    orderNumber: "1246",
    date: "September 11, 2023",
    occurrence: "deposit",
    amount: "5.00€",
    status: "Complete",
  },
  {
    orderNumber: "1240",
    date: "September 11, 2023",
    occurrence: "deposit",
    amount: "10.00€",
    status: "Canceled",
  },
  {
    orderNumber: "1217",
    date: "August 31, 2023",
    occurrence: "deposit",
    amount: "50.00€",
    status: "Canceled",
  },
];

const PaymentHistoryTable = () => {
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">Payment History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">order number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Occurrence</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">status</TableHead>
              <TableHead className="text-center">Show process</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.orderNumber}>
                <TableCell>{payment.orderNumber}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.occurrence}</TableCell>
                <TableCell className="text-right">{payment.amount}</TableCell>
                <TableCell>
                  <div
                    className={`text-center rounded-md py-1 px-2 
                    ${
                      payment.status === "Complete"
                        ? "bg-green-700 text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {payment.status}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Eye className="h-5 w-5 text-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t">
          <p className="text-sm text-foreground">
            Showing 1 to 6 of 6 (1 page(s))
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
