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
import defaultAvatar from "@/app/images/avatarimage.svg";
import { useGetDuels } from "@/hooks/api";
import { UserRoundIcon } from "lucide-react";
import { useUserContext } from "@/context/userContext";
import { DynamicPagination } from "../ui/dynamic-pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualRangeSlider } from "@/components/tournaments/dualSlider";
import { Button } from "@/components/ui/button";

interface Duel {
  id: string;
  gameIcon: string;
  gameTitle: string;
  date: string;
  opponent: {
    avatar: StaticImageData;
    round: number;
    attempts: number;
    time: string;
  };
  yourResult: {
    round: number;
    attempts: number;
    time: string;
  };
  stakeAmount: string;
  status: "Won" | "No opponent";
}

const DuelsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const itemsPerPage = 10;

  const { data } = useGetDuels({
    status: status,
    search: search,
    priceRange: priceRange ? `[${priceRange.join(",")}]` : undefined,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });
  const duel = data?.data?.duels;
  const totalPages = Math.ceil((data?.data?.total || 0) / itemsPerPage);
  const user = useUserContext();
  const userID = user?.user?._id;

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    setSearch(undefined);
    setStatus(undefined);
    setPriceRange([0, 1000000]);
    setCurrentPage(1);
  };

  console.log(duel);

  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Duels</h2>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-6 items-end">
        <div className="flex-1">
          <Input
            placeholder="Search duels..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={undefined}>All</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="draw">Draw</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-5 flex-1">
          {/* <label className="text-sm font-medium">Price Range</label> */}
          <div className="flex flex-col gap-2">
            <DualRangeSlider
              className="w-[400px]"
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              min={0}
              max={1000000}
              step={50}
            />
            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mb-5">
        <Button onClick={handleClearFilters} variant="outline" className="h-10">
          Clear Filters
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Opinion</TableHead>
              <TableHead>Description / Date</TableHead>
              <TableHead>Opponent</TableHead>
              <TableHead>Opponents result</TableHead>
              <TableHead>Your result</TableHead>
              <TableHead className="text-right">Stake amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {duel?.map((duel) => (
              <TableRow key={duel?._id}>
                <TableCell>
                  <p className="text-sm text-foreground w-max">
                    {duel?.duelId}
                  </p>
                </TableCell>
                <TableCell>
                  <Image
                    src={duel?.game?.logo}
                    alt={duel?.game?.title}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium text-primary">
                    {duel?.game?.title}
                  </div>
                  <div className="text-sm text-foreground">
                    <p>{new Date(duel?.createdAt).toLocaleString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {duel?.player2 && duel?.player2?.image ? (
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={duel?.player2?.image}
                        alt="Opponent"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  ) : duel?.player2 && !duel?.player2?.image ? (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserRoundIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  ) : (
                    <p>No opponent</p>
                  )}
                </TableCell>
                <TableCell>
                  <div>Score: {duel?.player2Score?.score}</div>
                  <div>Time: {duel?.player2Score?.time}</div>
                  <div>
                    Round:{" "}
                    {duel?.player2Score?.time && duel?.player2Score?.score
                      ? duel?.rounds
                      : 0}
                  </div>
                </TableCell>
                <TableCell>
                  <div>Score: {duel?.player1Score?.score}</div>
                  <div>Time: {duel?.player1Score?.time}</div>
                  <div>
                    Round:{" "}
                    {duel?.player1Score?.time && duel?.player1Score?.score
                      ? duel?.rounds
                      : 0}
                  </div>
                </TableCell>
                <TableCell className="text-center font-medium text-primary">
                  <div>
                    <p>{duel?.value}</p>{" "}
                    <p>{duel?.type === "snap" ? "SP" : "DP"}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {duel?.winner && duel?.winner !== userID ? (
                      <p className="capitalize w-max px-2 bg-red-500 rounded-full text-white font-bold text-sm">
                        You Lose
                      </p>
                    ) : duel?.isDraw ? (
                      <p className="capitalize w-max px-2 bg-primary rounded-full text-white font-bold text-sm">
                        Draw
                      </p>
                    ) : duel?.winner && duel?.winner === userID ? (
                      <p className="capitalize w-max px-2 bg-green-500 rounded-full text-white font-bold text-sm">
                        You Won
                      </p>
                    ) : (userID === duel?.player1?._id &&
                        !duel?.player1Score?.score &&
                        !duel?.player1Score?.time) ||
                      (userID === duel?.player2?._id &&
                        !duel?.player2Score?.score &&
                        !duel?.player2Score?.time) ? (
                      <p className="capitalize w-max px-2 bg-gray-300 text-white rounded-full text-sm font-bold">
                        you haven&apos;t played yet
                      </p>
                    ) : duel.status === "cancelled" ? (
                      <p className="capitalize w-max px-2 bg-amber-500 text-white rounded-full text-sm font-bold">
                        cancelled
                      </p>
                    ) : (
                      <p className="capitalize w-max px-2 bg-gray-500 text-white rounded-full text-sm font-bold">
                        waiting for the opponent
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t">
          <DynamicPagination
            totalItems={data?.data?.total || 0}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DuelsTable;
