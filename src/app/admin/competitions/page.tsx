"use client";

import React from "react";
import { useGetCompetitions } from "@/hooks/api";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { Loader, Edit, Users } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { Button } from "@/components/ui/button";

const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Page = () => {
  const { data: competitions, isLoading } = useGetCompetitions();
  console.log(competitions);

  return (
    <AdminLayout>
      <AdminBreadcrumb title="Competitions" items={[]} />
      <div className="max-w-full mx-auto py-8 bg-white px-6 rounded-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Competitions</h1>
          <Link href="/admin/competitions/create">
            <Button>Create Competition</Button>
          </Link>
        </div>
        <div className="border rounded-md bg-white  mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader size={32} className="animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitions?.data?.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                        {item.product?.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Image
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium line-clamp-2 h-[60px] max-h-max max-w-[400px]">
                      {item.product?.name || "-"}
                    </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.fee}</TableCell>
                    <TableCell>
                      {item.month
                        ? monthNames[new Date(item.month).getMonth() + 1]
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs capitalize ${
                          item.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/admin/competitions/edit/${item._id}`}
                              >
                                <Edit className="h-4 w-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`/admin/competitions/participants/${item._id}`}
                              >
                                <Users className="h-4 w-4" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>See Participants</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
