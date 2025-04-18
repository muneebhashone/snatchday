"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCustomerTournaments } from "@/hooks/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import imageForOpinion from "../admin/../../app/images/duel.png";
import imageForOpinion2 from "../admin/../../app/images/duel2.png";
import { Loader, LucideEye } from "lucide-react";
import Link from "next/link";
import { EditTournamentDialog } from "./EditTournamentDialog";
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import { formatCurrency } from "@/lib/utils";

const CustomerTournaments = () => {
  const [page, setPage] = useState(0);
  const params = useParams();
  const paramsId = params.id;
  const { data: customerTournaments, isLoading } = useGetCustomerTournaments(
    paramsId,
    page
  );

  const handlePageChange = (newPage: number) => {
    setPage((newPage - 1) * 5);
  };

  return isLoading ? (
    <div className="flex items-center justify-center w-full mt-10">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : !customerTournaments?.data.tournaments.length ? (
    <div className="text-center text-red-500 font-bold">
      *Not Any Tournament Record Of This Customer*
    </div>
  ) : (
    <div className="p-6">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Opinion</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Your Result</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerTournaments?.data?.tournaments?.map((tournament, i) => (
              <TableRow key={tournament?.title}>
                <TableCell>
                  <Image
                    src={i % 2 === 0 ? imageForOpinion : imageForOpinion2}
                    alt="not found image"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{tournament.title}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">Round: {i + 1}</span>
                    <span className="text-sm">Attempts: {i + 2}</span>
                    <span className="text-sm">Time: {i + 3}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={tournament.image}
                      alt={tournament.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                      unoptimized
                    />
                    <span className="font-medium">{tournament?.name || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">Original: {formatCurrency(tournament?.article?.price)}</span>
                    <span className="text-sm text-red-500">
                      Discount: -{formatCurrency(tournament?.priceReduction * tournament?.numberOfParticipants)}
                    </span>
                    <span className="text-sm text-primary font-medium">
                      Final: {formatCurrency(
                        tournament?.article?.price -
                        tournament?.priceReduction * tournament?.numberOfParticipants
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Coming soon
                  </span>
                </TableCell>
                <TableCell>
                  <EditTournamentDialog
                    tournament={{
                      ...tournament,
                      article: tournament?.article?.name,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-gray-500">
          Displaying {page + 1} to {Math.min(page + 5, customerTournaments?.data.total || 0)} of{" "}
          {customerTournaments?.data.total || 0} entries
        </p>
        <DynamicPagination
          totalItems={customerTournaments?.data.total || 0}
          itemsPerPage={5}
          currentPage={Math.floor(page / 5) + 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CustomerTournaments;
