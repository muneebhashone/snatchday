import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { useGetDuels } from "@/hooks/api";
import { Loader } from "lucide-react";
import { useUserContext } from "@/context/userContext";

const DuelHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: duelHistory, isLoading } = useGetDuels({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  const user = useUserContext();
  console.log(user);
  const userID = user?.user?.user?._id;

  const duels = duelHistory?.data?.duels;
  const totalPages = Math.ceil((duelHistory?.data?.total || 0) / itemsPerPage);

  if (isLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 mt-8">
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-primary w-12 h-12" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 mt-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-4 px-2">Duel game</th>
              <th className="py-4 px-2">countdown</th>
              <th className="py-4 px-2">Duel Creator</th>
              <th className="py-4 px-2">Round</th>
              <th className="py-4 px-2">stake</th>
              <th className="py-4 px-2">action</th>
            </tr>
          </thead>
          <tbody>
            {duels?.map((duel, index) => (
              <tr key={duel.duelId} className="border-b hover:bg-gray-50">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={duel.game.logo || "/placeholder.png"}
                        alt={duel.game.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <span>{duel.game.title}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  {formatDistanceToNow(new Date(duel.duelEndTime), {
                    addSuffix: true,
                  })}
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={duel.player1.image || "/placeholder.png"}
                        alt={duel.player1.username}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span>{duel.player1.username}</span>
                  </div>
                </td>
                <td className="py-4 px-2">{duel.rounds}</td>
                <td className="py-4 px-2">
                  {duel.type === "snap"
                    ? `${duel.value} Snap Points`
                    : `${duel.value} Points`}
                </td>
                <td className="py-4 px-2">
                  {userID === duel.player1._id &&
                  (!duel.player1Score.score || !duel.player1Score.time) ? (
                    <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6">
                      PLAY
                    </Button>
                  ) : userID === duel.player1?._id &&
                    (duel.player1Score.score || duel.player1Score.time) ? (
                    <Button className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-6">
                      TO THE DUEL
                    </Button>
                  ) : !duel.player2 ? (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                      JOIN
                    </Button>
                  ) : (
                    <Button className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-6">
                      TO THE DUEL
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isLoading}
          className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-4"
        >
          Previous
        </Button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || isLoading}
          className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-4"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DuelHistory;
