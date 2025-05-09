"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { useGetDuelGameById, useGetGameById } from "@/hooks/api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Trophy, Gamepad2 } from "lucide-react";
import { useUserContext } from "@/context/userContext";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useGetDuelGameById(id as string);
  console.log(data, "data");
  const player1 = data?.data?.player1;
  const player1Score = data?.data?.player1Score;
  const player2 = data?.data?.player2;
  const player2Score = data?.data?.player2Score;
  const duelEndTime = data?.data?.duelEndTime;
  const user = useUserContext();
  const userID = user?.user?.user?._id;

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-16 py-52">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* Game Info Section */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Game Information
                </h2>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex flex-col items-center">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                    <Image
                      src={data?.data?.game?.logo}
                      alt="game"
                      width={200}
                      height={200}
                      className="rounded-lg transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mt-6">
                    {data?.data?.game?.name}
                  </h1>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      About the Game
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {data?.data?.game?.content}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-8">
                {data?.data?.winner && userID === data?.data?.winner ? (
                  <p className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl animate-bounce">
                    🏆 You Won! 🏆
                  </p>
                ) : data?.data?.isDraw ? (
                  <p className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl animate-bounce">
                    🤷‍♂️ Draw 🤷‍♂️
                  </p>
                ) : data?.data?.winner && userID !== data?.data?.winner ? (
                  <p className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl animate-bounce">
                    😢 You Lost 😢
                  </p>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-xl font-bold ">
                    Waiting for the opponent score...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Score Section */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Duel Results
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Score
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    <div className="flex items-center gap-5 justify-between">
                      <p>
                        {player1Score?.score && player1Score?.time ? (
                          `Player 1: ${player1Score?.score || 0}`
                        ) : (
                          <p className="text-sm">Player 1 not played yet</p>
                        )}
                      </p>
                      {player2 && player2Score?.score && player2Score?.time ? (
                        <p>Player 2: {player2Score?.score || 0}</p>
                      ) : (
                        <p className="text-sm">player 2 not played yet</p>
                      )}
                    </div>
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Time
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    <div className="flex items-center gap-5 justify-between">
                      <p>
                        {player1Score?.score && player1Score?.time ? (
                          `Player 1: ${player1Score?.time || 0} sec`
                        ) : (
                          <p className="text-sm">Player 1 is not played yet</p>
                        )}
                      </p>
                      {player2 && player2Score.score && player2Score.time ? (
                        <p>Player 2: {player2Score?.time || 0}sec</p>
                      ) : (
                        <p className="text-sm">Player 2 is not played yet</p>
                      )}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
