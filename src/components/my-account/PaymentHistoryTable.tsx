"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { usePaymentHistory } from "@/hooks/api";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { DynamicPagination } from "../ui/dynamic-pagination";
import { Input } from "../ui/input";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import PaymentInvoiceButton from "@/components/PaymentInvoiceButton";

interface Payment {
  orderNumber: string;
  date: string;
  occurrence: string;
  amount: string;
  status: "Complete" | "Canceled";
}

// Mock data kept for reference, but we'll use API data
const mockPayments: Payment[] = [
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
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("all");
  const [occurance, setOccurance] = useState("all");
  const itemsPerPage = 10; // You can adjust this value as needed

  const { data: paymentHistory, isLoading } = usePaymentHistory({
    status: status !== "all" ? status : undefined,
    occurance: occurance !== "all" ? occurance : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  const payments = paymentHistory?.data?.payments || [];
  const total = paymentHistory?.data?.total || 0;

  console.log(payments, "payments");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setStatus("all");
    setOccurance("all");
    setCurrentPage(1);
  };

  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">Payment History</h2>
      <div className="flex justify-between items-center mb-5">
        <div className="grid grid-cols-4 gap-2 flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate ? new Date(startDate) : undefined}
                onSelect={(date) => {
                  setCurrentPage(1);
                  setStartDate(date?.toISOString() || "");
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate ? new Date(endDate) : undefined}
                onSelect={(date) => {
                  setCurrentPage(1);
                  setEndDate(date?.toISOString() || "");
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select
            value={status}
            onValueChange={(value) => {
              setCurrentPage(1);
              setStatus(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={occurance}
            onValueChange={(value) => {
              setCurrentPage(1);
              setOccurance(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an occurance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="topup">TopUP</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
              <SelectItem value="order">Order</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={clearFilters}
          variant="outline"
          className="ml-2 border border-primary text-primary hover:bg-primary hover:text-white"
        >
          Clear Filters
        </Button>
      </div>
      <Table className="border border-primary rounded-md">
        <TableHeader className="rounded-t-3xl">
          <TableRow className="rounded-t-3xl border-b border-primary">
            <TableHead className="text-primary font-bold w-[120px]">
              Order No.
            </TableHead>
            <TableHead className="text-primary font-bold">Date</TableHead>
            <TableHead className="text-primary font-bold">Occurrence</TableHead>
            <TableHead className="text-primary font-bold text-right">
              Amount
            </TableHead>
            <TableHead className="text-primary font-bold text-center">
              Status
            </TableHead>
            <TableHead className="text-primary font-bold text-center">
              Invoice
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <div className="flex justify-center items-center">
                  <Loader className="animate-spin text-primary h-4 w-4" />
                </div>
              </TableCell>
            </TableRow>
          ) : payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.orderNumber}>
                <TableCell>{payment.orderNumber}</TableCell>
                <TableCell>{formatDate(payment.date)}</TableCell>
                <TableCell className="capitalize">
                  {payment.occurance}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(payment.amount)}
                </TableCell>
                <TableCell>
                  <div
                    className={`text-center capitalize rounded-md py-1 px-2 
                    ${
                      payment.status === "completed"
                        ? "bg-green-700 text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {payment.status}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <PaymentInvoiceButton paymentDetails={payment} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                No payment history found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="p-4 border border-t-0 rounded-b-md border-primary">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground">
            Showing{" "}
            {payments.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * itemsPerPage, total)} of {total} entries
          </p>
          <DynamicPagination
            totalItems={total}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
