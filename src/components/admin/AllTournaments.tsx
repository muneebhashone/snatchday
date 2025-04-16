"use client";

import React, { useState, useEffect } from "react";
import {
  useCancelTournament,
  useGetGames,
  useGetProducts,
  useGetTournaments,
} from "@/hooks/api";
import { useDebounce } from "@/hooks/useDebounce";
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
import { DynamicPagination } from "@/components/ui/dynamic-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader } from "lucide-react";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

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

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const debouncedFilters = useDebounce(filters, 1000);

  const { data: getGames } = useGetGames(0, 100);
  const queryClient = useQueryClient();
  const { data: getProducts } = useGetProducts({ limit: `100000` });
  const products = getProducts?.data?.products || [];

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      name: debouncedSearchTerm,
      offset: "0",
    }));
  }, [debouncedSearchTerm]);

  const { data: getTournaments, isLoading } = useGetTournaments(
    debouncedFilters
  ) as { data: TournamentResponse; isLoading: boolean };

  const { mutate: cancelTournament } = useCancelTournament();

  const tournaments = getTournaments?.data?.tournaments || [];
  const totalItems = getTournaments?.data?.total || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    string | null
  >(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      offset: "0",
    }));
  };

  const handleCancel = (id: string) => {
    setSelectedTournamentId(id);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedTournamentId) {
      setIsCancelling(true);
      cancelTournament(selectedTournamentId, {
        onSuccess: () => {
          toast.success("Tournament cancelled successfully");
          queryClient.invalidateQueries({ queryKey: ["tournaments"] });
          setShowCancelModal(false);
          setSelectedTournamentId(null);
          setIsCancelling(false);
        },
        onError: () => {
          toast.error("Failed to cancel tournament");
          setShowCancelModal(false);
          setSelectedTournamentId(null);
          setIsCancelling(false);
        },
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setFilters((prev) => ({
      ...prev,
      offset: ((newPage - 1) * ITEMS_PER_PAGE).toString(),
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      limit: ITEMS_PER_PAGE.toString(),
      offset: "0",
      name: "",
      game: "",
      vip: "",
    });
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Tournaments</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Search by Name
            </label>
            <Input
              placeholder="Tournament name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Game</label>
            <Select
              value={filters.game}
              onValueChange={(value) => handleFilterChange("game", value)}
            >
              <SelectTrigger className="bg-white">
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
              <SelectTrigger className="bg-white">
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
                  <Button className="bg-primary hover:bg-primary/90">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border border-primary text-primary hover:bg-primary/10"
            >
              Clear Filters
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={filters.limit}
              onValueChange={(value) => handleFilterChange("limit", value)}
            >
              <SelectTrigger className="w-[100px] bg-white">
                <SelectValue placeholder={ITEMS_PER_PAGE.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-md bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-500">IMAGE</TableHead>
                <TableHead className="text-gray-500">TOURNAMENT</TableHead>
                <TableHead className="text-gray-500">GAME</TableHead>
                <TableHead className="text-gray-500">STARTING PRICE</TableHead>
                <TableHead className="text-gray-500">
                  CALCULATED AMOUNT
                </TableHead>
                <TableHead className="text-gray-500">PARTICIPANTS</TableHead>
                <TableHead className="text-gray-500">START DATE</TableHead>
                <TableHead className="text-gray-500">LENGTH</TableHead>
                <TableHead className="text-gray-500">VIP</TableHead>
                <TableHead className="text-gray-500">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="h-44">
                  <TableCell colSpan={10} className="text-center">
                    <div className="flex items-center justify-center w-full">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : tournaments.length > 0 ? (
                tournaments.map((tournament) => (
                  <TableRow key={tournament._id} className="hover:bg-gray-50">
                    <TableCell>
                      {tournament.image && (
                        <div className="relative h-12 w-12">
                          <Image
                            src={tournament.image}
                            alt={tournament.name}
                            className="rounded-md object-contain"
                            fill
                            unoptimized
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {tournament.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {tournament.game?.title}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatCurrency(tournament.startingPrice)}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {formatCurrency(
                        tournament.priceReduction *
                          tournament.participants?.length
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">
                          {tournament.participants?.length} /{" "}
                          {tournament.numberOfParticipants}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(tournament.start).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {tournament.length} min
                    </TableCell>
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
                                className="hover:bg-gray-100"
                                disabled={
                                  isCancelling &&
                                  selectedTournamentId === tournament._id
                                }
                              >
                                {isCancelling &&
                                selectedTournamentId === tournament._id ? (
                                  <Loader className="h-4 w-4 animate-spin" />
                                ) : tournament.status === "cancelled" ? (
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
                              <Link
                                href={`/admin/tournament/${tournament._id}`}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="hover:bg-gray-100"
                                >
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-gray-500">
                    No tournaments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-gray-500">
            Displaying {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}{" "}
            entries
          </p>
          <DynamicPagination
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedTournamentId(null);
        }}
        onConfirm={handleConfirmCancel}
        title="Cancel Tournament?"
        description="Are you sure you want to cancel this tournament? This action cannot be undone."
        confirmText="Cancel Tournament"
        cancelText="Keep Active"
        isLoading={isCancelling}
      />
    </div>
  );
};

export default AllTournaments;
