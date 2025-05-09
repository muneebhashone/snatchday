"use client";

import { useGetCurrentDuels } from "@/hooks/api";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DualRangeSlider } from "@/components/tournaments/dualSlider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "lucide-react";
import Link from "next/link";
import userImage from "../app/images/avatarimage.svg";
import { useUserContext } from "@/context/userContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import JoinDuelModal from "./JoinDuelModal";

const CurrentDuels = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [openModal, setOpenModal] = useState(false);
  const [duelId, setDuelId] = useState<string>("");
  const user = useUserContext();
  const userID = user?.user?.user?._id;
  console.log(userID);

  // Debounce function for search
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  // API call with filters
  const { data, isLoading, refetch } = useGetCurrentDuels({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    search: debouncedSearch || undefined,
    priceRange: priceRange ? `[${priceRange.join(",")}]` : undefined,
  });

  // Apply filters effect
  useEffect(() => {
    refetch();
  }, [debouncedSearch, priceRange, currentPage, refetch]);

  const duels = data?.data?.duels || [];
  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  console.log(data);

  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 10000]);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 max-w-[80%] mx-auto">
      {/* Filters Section */}
      <div className="p-6 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between gap-4 mt-10">
          {/* Search */}
          <div className="flex items-center gap-5 flex-1">
            <label className="text-sm font-medium">Search</label>
            <Input
              placeholder="Search duels..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-[300px]"
            />
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-5 flex-1">
            <label className="text-sm font-medium">Price Range</label>
            <div className="flex flex-col gap-2">
              <DualRangeSlider
                className="w-[400px]"
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                min={0}
                max={10000}
                step={50}
              />
              <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                <span>{priceRange[0]}€</span>
                <span>{priceRange[1]}€</span>
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end ">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="h-10"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
      {/* Duels Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-primary w-12 h-12" />
        </div>
      ) : duels.length ? (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Duel game</TableHead>
                <TableHead className="text-center">Created</TableHead>
                <TableHead>Duel Creator</TableHead>
                <TableHead>Round</TableHead>
                <TableHead>Stake</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {duels.map((duel) => (
                <TableRow key={duel.duelId} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={duel.game?.logo || "/placeholder.png"}
                          alt={duel.game?.title || "Game"}
                          width={48}
                          height={48}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <span>{duel.game?.title || "Unknown Game"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {duel.createdAt &&
                      formatDistanceToNow(new Date(duel.createdAt), {
                        addSuffix: true,
                      })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative">
                        <Image
                          src={duel.player1?.image || userImage}
                          alt={duel.player1?.username || "User"}
                          width={40}
                          height={40}
                          className="object-cover rounded-full"
                        />
                      </div>
                      <span>{duel.player1?.username || "Anonymous"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{duel.rounds}</TableCell>
                  <TableCell>
                    {duel.type === "snap"
                      ? `${duel.value} Snap Points`
                      : `${duel.value} Points`}
                  </TableCell>
                  <TableCell>
                    {userID === duel.player1?._id &&
                    (!duel.player1Score.score || !duel.player1Score.time) ? (
                      <Button className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-6">
                        <Link href={`/duel-arena/play/${duel._id}`}>Play</Link>
                      </Button>
                    ) : userID === duel.player1?._id &&
                      (duel.player1Score.score || duel.player1Score.time) ? (
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                        <Link href={`/duel-arena/duel/${duel._id}`}>
                          TO THE DUEL
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setDuelId(duel._id);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6"
                      >
                        {/* <Link href={`/duel-arena/play/${duel._id}`}>JOIN</Link> */}
                        JOIN
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">
            No duels found that match your filters.
          </p>
          <Button onClick={handleClearFilters} variant="link" className="mt-2">
            Clear filters and try again
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-4"
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-4"
          >
            Next
          </Button>
        </div>
      )}
      <JoinDuelModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        duelId={duelId}
      />
    </div>
  );
};

export default CurrentDuels;
