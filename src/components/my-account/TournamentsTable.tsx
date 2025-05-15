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
import Image, { StaticImageData } from "next/image";
import { useMyAccountTournaments } from "@/hooks/api";
import { Pagination } from "@/components/ui/pagination";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useUserContext } from "@/context/userContext";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const TournamentsTable = () => {
  const [offset, setOffset] = useState(0);
  const { data: myTournaments, isLoading } = useMyAccountTournaments(offset);
  const tournaments = myTournaments?.data?.tournaments;
  const user = useUserContext();
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Tournaments</h2>
      <div className="">
        <Table className="border border-primary">
          <TableHeader>
            <TableRow className="border-b border-primary">
              <TableHead className="w-[50px] text-primary font-bold">
                #
              </TableHead>
              <TableHead className="text-primary font-bold">Product</TableHead>
              <TableHead className="text-primary font-bold">Title </TableHead>
              <TableHead className="text-primary font-bold">
                StartDate{" "}
              </TableHead>
              <TableHead className="text-primary font-bold">EndDate </TableHead>
              <TableHead className="text-primary text-center font-bold">
                Result
              </TableHead>
              <TableHead className="text-right text-primary font-bold">
                Price
              </TableHead>
              <TableHead className="text-center text-primary font-bold">
                Status
              </TableHead>
              <TableHead className="text-center text-primary font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : tournaments?.length > 0 ? (
              tournaments?.map((tournament, i) => (
                <TableRow key={tournament._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={tournament?.article?.images[0]}
                        alt={tournament?.article?.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                      <div className="max-w-[400px]">
                        {tournament?.article?.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="truncate max-w-[150px]">
                    {tournament.title}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-medium text-primary mb-1">
                      {formatDate(tournament?.start)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-medium text-primary mb-1">
                      {formatDate(tournament?.end)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div
                      className={`text-center text-xs border p-2 rounded-md ${
                        tournament?.winner === user?.user?.user?._id
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <div>Round: {tournament?.resubmissions || ""}</div>
                      <div>
                        Attempts:{" "}
                        {tournament?.results?.filter(
                          (result) => result?.user === user?.user?.user?._id
                        ).length || ""}
                      </div>
                      <div>
                        Highest Score:{" "}
                        {tournament?.results?.find(
                          (result) => result?.user === user?.user?.user?._id
                        )?.score || ""}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-foreground line-through">
                      {formatCurrency(tournament?.article?.calculatedPrice)}
                    </div>
                    <div className="text-red-500">
                      -
                      {formatCurrency(
                        tournament.priceReduction >
                          tournament?.participants?.length * tournament?.fee
                          ? tournament?.participants?.length * tournament?.fee
                          : tournament.priceReduction
                      )}
                    </div>
                    <div className="font-medium">
                      {formatCurrency(
                        tournament?.article?.calculatedPrice -
                          (tournament.priceReduction >
                          tournament?.participants?.length * tournament?.fee
                            ? tournament?.participants?.length * tournament?.fee
                            : tournament.priceReduction)
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`text-center rounded-md py-1 px-4 
                    ${
                      tournament?.winner === user?.user?.user?._id
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } capitalize`}
                    >
                      {tournament?.winner &&
                      tournament?.winner === user?.user?.user?._id
                        ? "Won"
                        : tournament?.winner &&
                          tournament?.winner !== user?.user?.user?._id
                        ? "Lost"
                        : "Pending"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      className="text-center w-10 h-10 flex items-center justify-center"
                      href={`/tournament/${tournament._id}`}
                    >
                      <Eye className="w-4 h-4 hover:text-primary" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  <p className="text-center font-bold italic">
                    *No tournaments found*
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        {/* <Pagination
          totalItems={myTournaments?.data?.total || 0}
          itemsPerPage={10}
          onPageChange={(page) => setOffset(page - 1)}
          currentPage={offset + 1}
        /> */}
      </div>
    </div>
  );
};

export default TournamentsTable;
