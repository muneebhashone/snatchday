"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTickets } from "@/hooks/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import ClientLayout from "@/components/landing-page/ClientLayout";
const Page = () => {
  const { email } = useParams();
  console.log(email);
  const { data: tickets, isLoading } = useGetTickets({
    email: email as string,
  });
  console.log(tickets);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-500";
      case "IN_PROGRESS":
        return "bg-[#FF7324]";
      case "CLOSED":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <ClientLayout>
      <div className="container mx-auto pt-44 pb-56">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#FF7324]">Date</TableHead>
                <TableHead className="text-[#FF7324]">Category</TableHead>
                <TableHead className="text-[#FF7324]">Ticket ID</TableHead>
                <TableHead className="text-[#FF7324]">Regarding</TableHead>
                <TableHead className="text-[#FF7324]">Status</TableHead>
                <TableHead className="text-[#FF7324]">Last activity</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    Loading tickets...
                  </TableCell>
                </TableRow>
              ) : tickets?.data?.tickets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    No tickets found
                  </TableCell>
                </TableRow>
              ) : (
                tickets?.data?.tickets?.map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell className="font-medium">
                      {ticket.messages[0]
                        ? formatDate(ticket.messages[0].timestamp, "dd/MM/yyyy")
                        : "N/A"}
                    </TableCell>
                    <TableCell>{ticket.department}</TableCell>
                    <TableCell>{ticket.ticketNo}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
                      ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {ticket.messages[ticket.messages.length - 1]
                        ? formatDate(
                            ticket.messages[ticket.messages.length - 1]
                              .timestamp,
                            "dd/MM/yyyy"
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() =>
                          router.push(`/my-account/my-tickets/${ticket._id}`)
                        }
                        variant="secondary"
                        className="bg-gray-500 text-white hover:bg-gray-600"
                      >
                        VIEW TICKET
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
