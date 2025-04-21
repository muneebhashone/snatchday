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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetTickets } from "@/hooks/api";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Loader } from "lucide-react";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  _id: string;
  message: string;
  sender: "user" | "admin";
  timestamp: string;
  attachments: string[];
}

interface Ticket {
  _id: string;
  email: string;
  isRegistered: boolean;
  name: string | null;
  subject: string;
  department: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  ticketNo: string;
  messages: Message[];
  __v: number;
}

interface TicketResponse {
  data: {
    tickets: Ticket[];
    total: number;
  };
}

const ITEMS_PER_PAGE = 10;

const AdminTicketTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    limit: ITEMS_PER_PAGE.toString(),
    offset: "0",
  });

  const { data: tickets, isLoading } = useGetTickets({
    limit: parseInt(filters.limit),
    offset: parseInt(filters.offset),
  });

  const totalPages = Math.ceil(
    (tickets?.data?.total || 0) / parseInt(filters.limit)
  );
  const totalItems = tickets?.data?.total || 0;
  const itemsPerPage = parseInt(filters.limit);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "CLOSED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "OPEN":
        return "Offen";
      case "IN_PROGRESS":
        return "In Bearbeitung";
      case "CLOSED":
        return "Erledigt";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy (HH:mm a)");
    } catch (error) {
      return dateString;
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      offset: "0",
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit)).toString(),
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-8">Tickets</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Select
              value={filters.limit}
              onValueChange={(value) => handleFilterChange("limit", value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder={ITEMS_PER_PAGE.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>DATE ADDED</TableHead>
                <TableHead>SUBJECT</TableHead>
                <TableHead>TICKET ID</TableHead>
                <TableHead>DEPARTMENT</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>LAST ACTIVITY</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-44">
                  <TableCell colSpan={8} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : tickets?.data?.tickets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No tickets found
                  </TableCell>
                </TableRow>
              ) : (
                tickets?.data?.tickets?.map((ticket) => (
                  <TableRow key={ticket._id} className="hover:bg-gray-50">
                    <TableCell>
                      {ticket.messages[0]
                        ? formatDate(ticket.messages[0].timestamp)
                        : "N/A"}
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>#{ticket.ticketNo}</TableCell>
                    <TableCell>{ticket.department}</TableCell>
                    <TableCell>{ticket.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusText(ticket.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {ticket.messages[ticket.messages.length - 1]
                        ? formatDate(
                            ticket.messages[ticket.messages.length - 1]
                              .timestamp
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={() =>
                                router.push(`/admin/tickets/${ticket._id}`)
                              }
                              variant="ghost"
                              size="icon"
                            >
                              <Eye className="h-4 w-4 text-blue-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Ticket</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
  );
};

export default AdminTicketTable;
