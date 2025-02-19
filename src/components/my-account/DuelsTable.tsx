import React from "react";
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

const duels: Duel[] = [
  {
    id: "1465",
    gameIcon: "fill",
    gameTitle: "Fill",
    date: "2024-07-10 20:06:10",
    opponent: {
      avatar: defaultAvatar,
      round: 1,
      attempts: 1,
      time: "00:00:20.983",
    },
    yourResult: {
      round: 1,
      attempts: 1,
      time: "00:00:17.196",
    },
    stakeAmount: "+100 SP",
    status: "Won",
  },
  {
    id: "1464",
    gameIcon: "memorized",
    gameTitle: "Memorized",
    date: "2024-07-03 20:12:08",
    opponent: {
      avatar: defaultAvatar,
      round: 0,
      attempts: 0,
      time: "00:00:00.000",
    },
    yourResult: {
      round: 0,
      attempts: 0,
      time: "00:00:00.000",
    },
    stakeAmount: "0 SP",
    status: "No opponent",
  },
];

const DuelsTable = () => {
  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-10">My Duels</h2>
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
            {duels.map((duel) => (
              <TableRow key={duel.id}>
                <TableCell>{duel.id}</TableCell>
                <TableCell>
                  <div
                    className={`w-16 h-16 rounded-lg ${
                      duel.gameIcon === "fill" ? "bg-blue-200" : "bg-gray-200"
                    } flex items-center justify-center`}
                  >
                    {duel.gameIcon === "fill" ? (
                      <div className="w-8 h-8 bg-blue-500 rounded" />
                    ) : (
                      <div className="w-8 h-8">🧠</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium text-primary">
                    {duel.gameTitle}
                  </div>
                  <div className="text-sm text-foreground">
                    {new Date(duel.date).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <Image
                      src={duel.opponent.avatar}
                      alt="Opponent"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>Round: {duel.opponent.round}</div>
                  <div>Attempts: {duel.opponent.attempts}</div>
                  <div>Time: {duel.opponent.time}</div>
                </TableCell>
                <TableCell>
                  <div>Round: {duel.yourResult.round}</div>
                  <div>Attempts: {duel.yourResult.attempts}</div>
                  <div>Time: {duel.yourResult.time}</div>
                </TableCell>
                <TableCell className="text-right font-medium text-primary">
                  {duel.stakeAmount}
                </TableCell>
                <TableCell>
                  <div
                    className={`text-center rounded-md py-1 px-4 
                    ${
                      duel.status === "Won"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {duel.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t">
          <p className="text-sm text-foreground">
            Showing 1 to 2 of 2 (1 page(s))
          </p>
        </div>
      </div>
    </div>
  );
};

export default DuelsTable;
