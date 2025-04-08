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

const CustomerTournaments = () => {
  const [page, setPage] = useState(0);
  const params = useParams();
  const paramsId = params.id;
  const { data: customerTournaments, isLoading } = useGetCustomerTournaments(
    paramsId,
    page
  );
  console.log(customerTournaments?.data);
  return isLoading ? (
    <div className="flex items-center justify-center w-full mt-10">
      <Loader size={25} className="animate-spin text-primary" />
    </div>
  ) : !customerTournaments?.data.tournaments.length ? (
    <div className="text-center text-red-500 font-bold">
      *Not Any Tournament Record Of This Customer*
    </div>
  ) : (
    <div>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow className="border border-primary">
            <TableHead className="text-primary font-bold w-[100px]">
              Opinion
            </TableHead>
            <TableHead className="text-primary font-bold w-[100px]">
              Title
            </TableHead>
            <TableHead className="text-primary font-bold">
              Your Result
            </TableHead>
            <TableHead className="text-primary font-bold ">Product</TableHead>
            <TableHead className="text-primary font-bold">Price</TableHead>
            <TableHead className="text-primary font-bold">Status</TableHead>
            <TableHead className="text-primary font-bold">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customerTournaments?.data?.tournaments?.map((tournament, i) => (
            <TableRow className="" key={tournament?.title}>
              <TableCell>
                <Image
                  src={i % 2 === 0 ? imageForOpinion : imageForOpinion2}
                  alt="not found image"
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell className="font-bold">{tournament.title}</TableCell>
              <TableCell className="">
                <div className="flex flex-col justify-center ">
                  <span>Round: {i + 1}</span>
                  <span>Attemps: {i + 2}</span>
                  <span>Time: {i + 3}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 justify-start font-bold">
                  <Image
                    className="ml-6"
                    src={tournament.image}
                    alt={tournament.title}
                    width={50}
                    height={50}
                    unoptimized
                  />
                  {tournament?.name || "N/A"} {" "}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col justify-center items-start">
                  <span>{tournament?.article?.price || "N/A"}</span>
                  <span>
                    -
                    {tournament?.priceReduction *
                      tournament?.numberOfParticipants || "N/A"}
                  </span>
                  <span className="text-primary">
                    {tournament?.article?.price -
                      tournament?.priceReduction *
                        tournament?.numberOfParticipants || "N/A"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="">coming soon..</TableCell>
              <TableCell className="">
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
        <TableFooter className="w-full">
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <button
                onClick={() => {
                  setPage((prev) => Math.max(prev - 5, 0)); // negative value nhi jaegi
                }}
              >
                Prev
              </button>
              {Array.from(
                {
                  length: Math.ceil((customerTournaments?.data.total || 0) / 5),
                },
                (_, index) => {
                  console.log(index);
                  return (
                    <button
                      key={index}
                      className={`page-indicator m-1 ${
                        index === page / 5 ? "bg-primary px-2 text-white" : ""
                      }`}
                      onClick={() => setPage(index * 5)}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}
              <button
                onClick={() => {
                  setPage((prev) =>
                    Math.min(
                      prev + 5,
                      (customerTournaments?.data.total || 0) - page
                    )
                  ); // last page ke bad api hit nhi krega
                }}
              >
                Next
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CustomerTournaments;
