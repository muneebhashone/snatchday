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
import { Pagination } from "../ui/pagination";

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
  game: object;
  start: string;
  length: number;
  fee: number;
  numberOfParticipants: number;
  vip: boolean;
  resubmissions: number;
  image: string;
  productId: string;
  end: string;
}

const AllTournaments = () => {
  const [filters, setFilters] = useState<FilterParams>({
    limit: "10",
    offset: "0",
  });

  const { data: getGames } = useGetGames(0, 100)
  const queryClient = useQueryClient();
  const { data: getProducts } = useGetProducts({ limit: `100000` });
  const products = getProducts?.data?.products || [];

  const { data: getTournaments, isLoading } = useGetTournaments(filters);
  //   const { mutate: deleteTournament } = useDeleteTournament();
  const { mutate: cancelTournament } = useCancelTournament();

  const tournaments = getTournaments?.data?.tournaments || [];

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        Loading tournaments...
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      offset: ((page - 1) * parseInt(filters.limit || "10")).toString(),
    }));
  };

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
              {getGames
                ?.data?.games?.map((game) =>
                  <SelectItem key={game._id} value={game?._id}>{game.title}</SelectItem>
                )}
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
          <Button>
            <Link href="/admin/tournament/create-tournament">
              Create Tournament
            </Link>
          </Button>
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
            {tournaments.map((tournament: Tournament) => (
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
                <TableCell>{tournament?.game?.title}</TableCell>
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
                    className={`px-2 py-1 rounded-full text-xs ${tournament.vip
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {tournament.vip ? "VIP" : "BASIC"}
                  </span>
                </TableCell>
                <TableCell>
                  <>
                    <div className="flex gap-2">
                      <EditTournamentDialog
                        products={products}
                        tournament={tournament}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        // onClick={() => {
                        //   console.log(tournament);
                        // }}
                        onClick={() => handleCancel(tournament._id)}
                      >
                        {tournament.status === "cancelled" ? (
                          <p>Cancelled</p>
                        ) : (
                          <p>Active</p>
                        )}
                      </Button>
                      <Link href={`/admin/tournament/${tournament._id}`}>
                        <Button variant="ghost" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </>
                </TableCell>
              </TableRow>
            ))}
            {!tournaments.length && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-8 text-gray-500"
                >
                  No tournaments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end mt-5 mr-2">
        <Pagination
          totalItems={getTournaments?.data?.total || 0}
          itemsPerPage={parseInt(filters.limit || "10")}
          onPageChange={handlePageChange}
          currentPage={
            Math.floor(
              parseInt(filters.offset || "0") / parseInt(filters.limit || "10")
            ) + 1
          }
        />
      </div>
    </div>
  );
};

export default AllTournaments;
