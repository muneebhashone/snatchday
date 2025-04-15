"use client";
import React from 'react';
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
import { useGetTickets } from '@/hooks/api';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye } from "lucide-react";

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
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: tickets, isLoading } = useGetTickets({
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  console.log(tickets);

  const totalPages = Math.ceil((tickets?.data?.total || 0) / ITEMS_PER_PAGE);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-500";
      case "IN_PROGRESS":
        return "bg-[#FF7324]";
      case "CLOSED":
        return "bg-green-500";
      default:
        return "bg-gray-500";
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

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Maximum number of visible page numbers

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible page numbers
      let start = Math.max(currentPage - 1, 2);
      let end = Math.min(currentPage + 1, totalPages - 1);

      // Adjust if we're near the start or end
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add visible page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tickets</h2>
        {/* <Button 
          onClick={() => router.push('/support/create-ticket')}
          className="bg-[#FF7324] hover:bg-[#FF7324]/90 text-white"
        >
          CREATE NEW TICKET
        </Button> */}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Date Added</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Ticket Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  Loading tickets...
                </TableCell>
              </TableRow>
            ) : tickets?.data?.tickets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              tickets?.data?.tickets?.map((ticket) => (
                <TableRow key={ticket._id} className="hover:bg-gray-50">
                  <TableCell>
                    {ticket.messages[0] ? formatDate(ticket.messages[0].timestamp) : "N/A"}
                  </TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>#{ticket.ticketNo}</TableCell>
                  <TableCell>{ticket.department}</TableCell>
                  <TableCell>{ticket.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-md text-white text-sm
                      ${getStatusColor(ticket.status)}`}
                    >
                      {getStatusText(ticket.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {ticket.messages[ticket.messages.length - 1] 
                      ? formatDate(ticket.messages[ticket.messages.length - 1].timestamp)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => router.push(`/admin/tickets/${ticket._id}`)}
                      size="icon"
                      variant="ghost"
                      className="hover:bg-gray-100"
                    >
                      <Eye className="h-5 w-5 text-blue-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="text-sm text-gray-500">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, tickets?.data?.total || 0)} of {tickets?.data?.total || 0} entries
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(prev => prev - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum, idx) => (
              <PaginationItem key={idx}>
                {pageNum === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(Number(pageNum));
                    }}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AdminTicketTable;