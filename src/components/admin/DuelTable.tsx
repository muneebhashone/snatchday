"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, UserRoundIcon } from "lucide-react";
import Image from "next/image";

// Define the interface based on the data structure shown
interface DuelPlayer {
  username: string;
  firstName?: string;
  lastName?: string;
}

interface DuelScore {
  score: number;
  time: number;
}

interface DuelGame {
  _id: string;
  title: string;
}

interface DuelData {
  _id: string;
  duelId: string;
  game: DuelGame;
  player1: DuelPlayer;
  player2?: DuelPlayer;
  player1Score: DuelScore;
  player2Score: DuelScore;
  rounds: number;
  value: number;
  type: string;
  status: string;
  createdAt: string;
  duelEndTime: string;
}

interface DuelTableProps {
  duels: DuelData[];
  isLoading: boolean;
}

const DuelTable = ({ duels, isLoading }: DuelTableProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd.MM.yyyy HH:mm");
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
            No opponent
          </Badge>
        );
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 border border-green-200">
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
            Completed
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
            Closed
          </Badge>
        );
      case "loss":
        return (
          <Badge className="bg-red-100 text-red-800 border border-red-200">
            Loss
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>ID</TableHead>
            <TableHead className="text-center">GAME</TableHead>
            <TableHead className="">AMOUNT</TableHead>
            <TableHead className="">START DATE</TableHead>
            <TableHead className="">END DATE</TableHead>
            <TableHead className="">PLAYER 1</TableHead>
            <TableHead className="text-center">PLAYER 2</TableHead>
            <TableHead className="text-right">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <div className="flex justify-center items-center h-64">
                  <Loader className="h-6 w-6 animate-spin text-primary" />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            duels.map((duel) => (
              <TableRow key={duel._id} className="hover:bg-gray-50/50">
                <TableCell>
                  <Link href={`/admin/duel/${duel._id}`}>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700"
                    >
                      #{duel.duelId}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-start gap-3">
                    <div className="flex flex-col items-center justify-center gap-5 w-full">
                      <Image
                        src={duel?.game?.logo}
                        alt={duel?.game?.title}
                        width={32}
                        height={32}
                      />
                      <span className="font-medium">{duel?.game?.title}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-gray-900">
                    {duel.value}{" "}
                    {duel.type === "snap" ? "Snap Points" : "Discount Points"}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(duel.createdAt)}
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(duel.duelEndTime)}
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center gap-2">
                    {duel?.player1?.image ? (
                      <Image
                        src={duel?.player1?.image}
                        alt={duel?.player1?.username}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserRoundIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {duel.player1.username}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Score:</span>
                          <span>{duel.player1Score.score || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Time:</span>
                          <span>{formatTime(duel.player1Score.time || 0)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Round:</span>
                          <span>{duel.rounds}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {duel.player2 ? (
                    <div className="flex items-center gap-2">
                      {duel?.player2?.image ? (
                        <Image
                          src={duel?.player2?.image}
                          alt={duel?.player2?.username}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserRoundIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {duel.player2.username}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Score:</span>
                            <span>{duel.player2Score.score || 0}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Time:</span>
                            <span>
                              {formatTime(duel.player2Score.time || 0)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Round:</span>
                            <span>{duel.rounds}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">No opponent yet</div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(duel.status)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DuelTable;
