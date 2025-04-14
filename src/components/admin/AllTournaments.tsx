"use client";

import React, { useState } from "react";
import {
  useCancelTournament,
  useGetGames,
  useGetProducts,
  useGetTournaments,
} from "@/hooks/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import { EditTournamentDialog } from "./EditTournamentDialog";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FilterParams {
  limit?: string;
  offset?: string;
  sort_attr?: string;
  sort?: string;
  name?: string;
  from?: string;
  until?: string;
  game?: string;
  fee?: string;
  vip?: string;
  product?: string;
  startingPrice?: string;
  category?: string;
  status?: string;
}

interface Game {
  _id: string;
  title: string;
}

interface Tournament {
  _id: string;
  name: string;
  title: string;
  textForBanner: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  startingPrice: number;
  priceReduction: number;
  numberOfPieces: number;
  game: Game;
  start: string;
  length: number;
  fee: number;
  numberOfParticipants: number;
  vip: boolean;
  resubmissions: number;
  image: string;
  productId: string;
  end: string;
  status: "active" | "cancelled";
  participants: { _id: string }[];
}

interface TournamentResponse {
  data: {
    tournaments: Tournament[];
    total: number;
  };
}

const ITEMS_PER_PAGE = 10;

const AllTournaments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterParams>({
    limit: ITEMS_PER_PAGE.toString(),
    offset: "0",
  });

  const { data: getGames } = useGetGames(0, 100);
  const queryClient = useQueryClient();
  const { data: getProducts } = useGetProducts({ limit: `100000` });
  const products = getProducts?.data?.products || [];

  const { data: getTournaments, isLoading } = useGetTournaments({
    ...filters,
    limit: ITEMS_PER_PAGE.toString(),
    offset: ((currentPage - 1) * ITEMS_PER_PAGE).toString(),
  }) as { data: TournamentResponse; isLoading: boolean };

  const { mutate: cancelTournament } = useCancelTournament();

  const tournaments = getTournaments?.data?.tournaments || [];
  const totalItems = getTournaments?.data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCancel = (id: string) => {
    cancelTournament(id, {
      onSuccess: () => {
        toast.success("Tournament cancelled successfully");
        queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      },
      onError: () => {
        toast.error("Failed to cancel tournament");
      },
    });
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        Loading tournaments...
      </div>
    );
  }

  return (
    <div className="py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Tournaments</h1>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Search by Name
          </label>
          <Input
            placeholder="Tournament name"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Game</label>
          <Select
            value={filters.game}
            onValueChange={(value) => handleFilterChange("game", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select game" />
            </SelectTrigger>
            <SelectContent>
              {getGames?.data?.games?.map((game) => (
                <SelectItem key={game._id} value={game._id}>
                  {game.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">VIP Status</label>
          <Select
            value={filters.vip}
            onValueChange={(value) => handleFilterChange("vip", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="VIP status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">VIP</SelectItem>
              <SelectItem value="false">Regular</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end items-center mt-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button>
                  <Link href="/admin/tournament/create-tournament">
                    Create Tournament
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new tournament</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="border border-primary">
          <TableHeader>
            <TableRow className="border-b border-primary">
              <TableHead className="text-primary font-bold">Image</TableHead>
              <TableHead className="text-primary font-bold">Tournament Title</TableHead>
              <TableHead className="text-primary font-bold">Game</TableHead>
              <TableHead className="text-primary font-bold">Starting Price</TableHead>
              <TableHead className="text-primary font-bold">Calculated Amount</TableHead>
              <TableHead className="text-primary font-bold">Participants</TableHead>
              <TableHead className="text-primary font-bold">Start Date</TableHead>
              <TableHead className="text-primary font-bold">Length (min)</TableHead>
              <TableHead className="text-primary font-bold">VIP</TableHead>
              <TableHead className="text-primary font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow key={tournament._id}>
                <TableCell>
                  {tournament.image && (
                    <div className="relative h-16 w-16">
                      <Image
                        width={64}
                        height={64}
                        src={tournament.image}
                        alt={tournament.name}
                        className="rounded-md object-contain w-full h-full"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>{tournament.title}</TableCell>
                <TableCell>{tournament.game?.title}</TableCell>
                <TableCell>{formatCurrency(tournament.startingPrice)}</TableCell>
                <TableCell>
                  {formatCurrency(tournament.priceReduction * tournament.participants?.length)}
                </TableCell>
                <TableCell>
                  <p>
                    {tournament.participants?.length} /{" "}
                    {tournament.numberOfParticipants}
                  </p>
                </TableCell>
                <TableCell>
                  {new Date(tournament.start).toLocaleDateString()}
                </TableCell>
                <TableCell>{tournament.length}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tournament.vip
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tournament.vip ? "VIP" : "BASIC"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <EditTournamentDialog
                              products={products}
                              tournament={tournament}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit tournament details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCancel(tournament._id)}
                          >
                            {tournament.status === "cancelled" ? (
                              <p>Cancelled</p>
                            ) : (
                              <p>Active</p>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Toggle tournament status</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/admin/tournament/${tournament._id}`}>
                            <Button variant="ghost" size="icon">
                              <Users className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View tournament participants</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!tournaments.length && (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-8 text-gray-500"
                >
                  No tournaments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="text-sm text-gray-500">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} entries
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

export default AllTournaments;
