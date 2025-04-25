"use client";

import AdminLayout from '@/components/admin/AdminLayout'
import { useGetWithdrawalRequest } from '@/hooks/api'
import React, { useState } from 'react'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Loader } from "lucide-react"
import { useRouter } from 'next/navigation'
import { WithdrawalRequest, WithdrawalRequestResponse } from '@/types'
import AdminBreadcrumb from '@/components/admin/AdminBreadcrumb'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";

const WithdrawalRequestPage = () => {
  const { data: withdrawalRequestResponse, isLoading } = useGetWithdrawalRequest()
  const router = useRouter()
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });
  
  const handleViewRequest = (request: WithdrawalRequest) => {
    router.push(`/admin/withdrawal/${request._id}`)
  }

  const withdrawalRequests = withdrawalRequestResponse?.data as WithdrawalRequest[] || [];
  const totalItems = withdrawalRequests?.length || 0;

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      offset: (page - 1) * pagination.limit,
    });
  };

  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
  const itemsPerPage = pagination.limit;

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <AdminBreadcrumb 
          title="Withdrawal Requests" 
          items={[
            { title: "Dashboard", href: "/admin" }
          ]} 
        />
        
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Withdrawal Requests</h1>
            <p className="text-muted-foreground">
              Manage user withdrawal requests and process payments.
            </p>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>METHOD</TableHead>
                  <TableHead>CUSTOMER</TableHead>
                  <TableHead>CREATED</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow className="h-44">
                    <TableCell colSpan={6} className="text-center">
                      <div className="flex items-center justify-center w-full">
                        <Loader className="h-4 w-4 animate-spin text-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : withdrawalRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No withdrawal requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  withdrawalRequests
                    .slice(pagination.offset, pagination.offset + pagination.limit)
                    .map((request, index) => (
                    <TableRow key={request._id || index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {request.bankDetails?.paypalEmail ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              PayPal
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Bank
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{request.user?.name || "Unknown"}</span>
                          <span className="text-sm text-gray-500">{request.user?.email || request.bankDetails?.paypalEmail || "No email"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.createdAt ? format(new Date(request.createdAt), "dd/MM/yyyy") : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.amount ? `${request.amount.toFixed(2)}€` : "N/A"}</div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            request.status === "COMPLETED" ? "bg-green-100 text-green-800" :
                            request.status === "REJECTED" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status || "Unknown"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleViewRequest(request)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-gray-500">
              Displaying {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
              entries
            </p>
            <DynamicPagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default WithdrawalRequestPage