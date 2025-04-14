"use client";

import { useState } from "react";
import { useGetVouchers, useDeleteVoucher } from "@/hooks/api";
import { VoucherData } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Edit, Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";
// import { EditVoucherModal } from "./EditVoucherModal";
import { toast } from "sonner";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function VoucherList() {
  const { data: vouchersResponse, isLoading, error } = useGetVouchers();
  const { mutate: deleteVoucher } = useDeleteVoucher();
  const vouchers = vouchersResponse?.data || [];

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      deleteVoucher(id, {
        onSuccess: () => {
          toast.success("Voucher deleted successfully");
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to delete voucher");
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Error loading vouchers. Please try again later.
        </p>
      </div>
    );
  }

  if (!vouchers?.length) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No vouchers found.</p>
      </div>
    );
  }

  return (
    <div className="">
      <Table className="border border-primary">
        <TableHeader>
          <TableRow className="border-b border-primary">
            <TableHead className="text-primary font-bold">Name</TableHead>
            <TableHead className="text-primary font-bold">Code</TableHead>
            <TableHead className="text-primary font-bold">Type</TableHead>
            <TableHead className="text-primary font-bold">Value</TableHead>
            {/* <TableHead>Products</TableHead> */}
            <TableHead className="text-primary font-bold">Valid From</TableHead>
            <TableHead className="text-primary font-bold">
              Valid Until
            </TableHead>
            <TableHead className="text-primary font-bold">Status</TableHead>
            <TableHead className="text-primary font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.map((voucher) => (
            <TableRow key={voucher._id}>
              <TableCell className="font-medium">{voucher.name}</TableCell>
              <TableCell>{voucher.code}</TableCell>
              <TableCell className="capitalize">
                {voucher.type.toLowerCase()}
              </TableCell>
              <TableCell>
                {voucher.type === "PERCENTAGE"
                  ? `${voucher.value}%`
                  : `${formatCurrency(voucher.value)}`}
              </TableCell>
              {/* <TableCell>
                {voucher.products?.map((product) => (
                  <Badge key={product._id} variant="secondary" className="mr-1">
                    {product.name}
                  </Badge>
                ))}
              </TableCell> */}
              <TableCell>
                {format(new Date(voucher.from), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(voucher.until), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    new Date(voucher.until) > new Date()
                      ? "success"
                      : "destructive"
                  }
                >
                  {new Date(voucher.until) > new Date() ? "Active" : "Expired"}
                </Badge>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/admin/voucher/update/${voucher._id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Voucher</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(voucher._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Voucher</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
