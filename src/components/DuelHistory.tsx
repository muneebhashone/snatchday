import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { useGetDuels } from "@/hooks/api";
import { Loader } from "lucide-react";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import userImage from "../app/images/avatarimage.svg";
import { DynamicPagination } from "./ui/dynamic-pagination";

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
              <th className="text-xs md:text-sm xl:text-md py-4 px-2">
                Duel game
              </th>
              {/* <th className="py-4 px-2 text-center">Countdown</th> */}
              <th className="text-xs md:text-sm xl:text-md py-4 px-2">
                Duel Creator
              </th>
              <th className="text-xs md:text-sm xl:text-md py-4 px-2">
                Opponent
              </th>
              <th className="text-xs md:text-sm xl:text-md py-4 px-2 text-center">
                Round
              </th>
              <th className="text-xs md:text-sm xl:text-md py-4 px-2 text-center">
                Stake
              </th>
              <th className="text-xs md:text-sm xl:text-md py-4 px-2 text-center">
                Result
              </th>
              <th className="text-xs md:text-sm xl:text-md py-4 px-2 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {duels?.map((duel, index) => (
              <tr
                key={duel.duelId + index}
                className="border-b hover:bg-gray-50"
              >
                <td className="text-xs md:text-sm xl:text-md py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 md:w-9 xl:w-12 md:h-9 xl:h-12  relative">
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
                {/* <td className="py-4 px-2">
                  {formatDistanceToNow(new Date(duel.duelEndTime), {
                    addSuffix: true,
                  })}
                </td> */}
                <td className="py-4 px-2 text-xs md:text-sm xl:text-md">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 md:w-8 xl:w-10 md:h-8 xl:h-10 relative">
                      <Image
                        src={duel?.player1?.image || userImage}
                        alt={duel?.player1?.username}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span>{duel?.player1?.username}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-xs md:text-sm xl:text-md">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 md:w-8 xl:w-10 md:h-8 xl:h-10 relative ${
                        !duel.player2 && "hidden"
                      }`}
                    >
                      <Image
                        src={duel?.player2?.image || userImage}
                        alt={duel?.player2?.username}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span>{duel?.player2?.username || "No Opponent Yet"}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-xs md:text-sm xl:text-md">
                  {duel.rounds}
                </td>
                <td className="py-4 px-2 text-xs md:text-sm xl:text-md">
                  {duel.type === "snap"
                    ? `${duel.value} Snap Points`
                    : `${duel.value} Points`}
                </td>
                <td className="py-4 px-2 text-xs md:text-sm xl:text-md">
                  <div className="flex justify-center items-center">
                    {duel?.winner && duel?.winner !== userID ? (
                      <p className="capitalize w-max px-2 bg-red-500 rounded-full text-white font-bold text-xs md:text-sm">
                        You Lose
                      </p>
                    ) : duel?.isDraw ? (
                      <p className="capitalize w-max px-2 bg-primary rounded-full text-white font-bold text-xs md:text-sm">
                        Draw
                      </p>
                    ) : duel?.winner && duel?.winner === userID ? (
                      <p className="capitalize w-max px-2 bg-green-500 rounded-full text-white font-bold text-xs md:text-sm">
                        You Won
                      </p>
                    ) : (userID === duel?.player1?._id &&
                        !duel?.player1Score?.score &&
                        !duel?.player1Score?.time) ||
                      (duel?.player2 &&
                        duel?.status !== "cancelled" &&
                        userID === duel?.player2?._id &&
                        !duel?.player2Score?.score &&
                        !duel?.player2Score?.time) ? (
                      <p className="capitalize w-max px-2 bg-gray-300 text-white rounded-full text-sm font-bold">
                        you haven&apos;t played yet
                      </p>
                    ) : duel?.status === "cancelled" ? (
                      <p className="capitalize w-max px-2 bg-amber-500 text-white rounded-full text-sm font-bold">
                        cancelled
                      </p>
                    ) : (
                      <p className="capitalize w-max px-2 bg-gray-500 text-white rounded-full text-sm font-bold">
                        waiting for the opponent
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-2 text-xs md:text-sm xl:text-md">
                  {userID === duel.player1._id &&
                  (!duel.player1Score.score || !duel.player1Score.time) ? (
                    <Button
                      onClick={() => console.log(duel._id)}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6"
                    >
                      <Link href={`/duel-arena/play/${duel._id}`}>PLAY</Link>
                    </Button>
                  ) : userID === duel.player1?._id &&
                    (duel.player1Score.score || duel.player1Score.time) ? (
                    <Button className="bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-2 md:px-4 xl:px-6">
                      <Link
                        className="text-xs md:text-sm xl:text-md"
                        href={`/duel-arena/duel/${duel._id}`}
                      >
                        TO THE DUEL
                      </Link>
                    </Button>
                  ) : !duel.player2 && duel.status !== "cancelled" ? (
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                      <Link href={`/duel-arena/play/${duel._id}`}>JOIN</Link>
                    </Button>
                  ) : (
                    <Button className="text-xs md:text-sm xl:text-md bg-[#F26E21] hover:bg-[#d85d12] text-white rounded-full px-2 md:px-4 xl:px-6">
                      <Link href={`/duel-arena/duel/${duel._id}`}>
                        TO THE DUEL
                      </Link>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {duelHistory?.data?.total < 1 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-xs md:text-sm xl:text-md"
                >
                  No duels found
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  <DynamicPagination
                    totalItems={duelHistory?.data?.total || 0}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {/* <div className="flex justify-center items-center gap-2 mt-4">
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
      </div> */}
      {/* {duelHistory?.data?.total > 0 && (
        <DynamicPagination
          totalItems={duelHistory?.data?.total || 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}{" "} */}
    </div>
  );
};

export default DuelHistory;
