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
}

const DuelTable = ({ duels }: DuelTableProps) => {
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
        return <Badge className="bg-yellow-400 text-black">No opponent</Badge>;
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "closed":
        return <Badge variant="outline">closed</Badge>;
      case "loss":
        return <Badge className="bg-red-500">Loss</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Game</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Start date</TableHead>
            <TableHead>End date</TableHead>
            <TableHead>Participant</TableHead>
            <TableHead className="text-right">status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {duels.map((duel) => (
            <TableRow key={duel._id}>
              <TableCell className="font-medium">
                <Link href={`/admin/duel/${duel._id}`}>
                  <Button variant="link" className="p-0 h-auto text-blue-500">
                    #{duel.duelId}
                  </Button>
                </Link>
              </TableCell>
              <TableCell>{duel.game.title}</TableCell>
              <TableCell>
                {duel.value} {duel.type === "snap" ? "Snap Points" : "Discount Points"}
              </TableCell>
              <TableCell>{formatDate(duel.createdAt)}</TableCell>
              <TableCell>{formatDate(duel.duelEndTime)}</TableCell>
              <TableCell>
                <div>
                  <div className="font-semibold">
                    Duel Creator: {duel.player1.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>Round: {duel.rounds}</div>
                    <div>
                      Try: {duel.player1Score.score || 0}
                    </div>
                    <div>
                      Time: {formatTime(duel.player1Score.time || 0)}
                    </div>
                  </div>
                </div>
                
                {duel.player2 ? (
                  <div className="mt-2 pt-2 border-t">
                    <div className="font-semibold">
                      Opponent: {duel.player2.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>Try: {duel.player2Score.score || 0}</div>
                      <div>
                        Time: {formatTime(duel.player2Score.time || 0)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 pt-2 border-t">
                    <div className="font-semibold">Opponent -</div>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                {getStatusBadge(duel.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DuelTable; 