"use client";

import React, { useState } from "react";
import { useCancelTournament, useGetTournaments } from "@/hooks/api";
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
import {  Users } from "lucide-react";
import { EditTournamentDialog } from "./EditTournamentDialog";
import Link from "next/link";

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
  game: string;
  start: string;
  length: number;
  fee: number;
  numberOfParticipants: number;
  vip: boolean;
  resubmissions: number;
  image: string;
  productId: string;
}

const AllTournaments = () => {
  const [filters, setFilters] = useState<FilterParams>({
    limit: "10",
    offset: "0",
  });
  const queryClient = useQueryClient();

  const { data: getTournaments, isLoading } = useGetTournaments(filters);
  //   const { mutate: deleteTournament } = useDeleteTournament();
  const { mutate: cancelTournament } = useCancelTournament();

  const tournaments = getTournaments?.data || [];

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = (id: string) => {
    cancelTournament(id, {
      onSuccess: () => {
        toast.success('Tournament cancelled successfully');
        queryClient.invalidateQueries({ queryKey: ['tournaments'] });
      },
      onError: () => {
        toast.error('Failed to cancel tournament');
      } 
    });
  };

  //   const handleDelete = async (id: string) => {
  //     try {
  //       await deleteTournament(id, {
  //         onSuccess: () => {
  //           toast.success('Tournament deleted successfully');
  //         },
  //         onError: (error) => {
  //           toast.error('Failed to delete tournament');
  //           console.error(error);
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error deleting tournament:', error);
  //       toast.error('Failed to delete tournament');
  //     }
  //   };

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
            Items per page
          </label>
          <Input
            type="number"
            placeholder="Limit"
            value={filters.limit}
            onChange={(e) => handleFilterChange("limit", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Page Offset</label>
          <Input
            type="number"
            placeholder="Offset"
            value={filters.offset}
            onChange={(e) => handleFilterChange("offset", e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Sort Order</label>
          <Select
            value={filters.sort}
            onValueChange={(value) => handleFilterChange("sort", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
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
              <SelectItem value="powerblocks">PowerBlocks</SelectItem>
              <SelectItem value="pushit">Push It</SelectItem>
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
      </div>
      <div className="flex justify-end my-2">
        <Button>
          <Link href="/admin/tournament/create-tournament">Create Tournament</Link>
        </Button>
      </div>
    
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Starting Price</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Length (min)</TableHead>
              <TableHead>VIP</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tournaments.map((tournament: Tournament) => (
              <TableRow key={tournament._id}>
                <TableCell>
                  {tournament.image && (
                    <div className="relative h-16 w-16">
                      <img
                        src={tournament.image}
                        alt={tournament.name}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>{tournament.name}</TableCell>
                <TableCell>{tournament.game}</TableCell>
                <TableCell>${tournament.startingPrice}</TableCell>
                <TableCell>{tournament.numberOfParticipants}</TableCell>
                <TableCell>
                  {new Date(tournament.start).toLocaleDateString()}
                </TableCell>
                <TableCell>{tournament.length}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tournament.vip
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tournament.vip ? "VIP" : "Regular"}
                  </span>
                </TableCell>
                <TableCell>
                  <>
                  <div className="flex gap-2">
                    <EditTournamentDialog tournament={tournament} />
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
    </div>
  );
};

export default AllTournaments;
