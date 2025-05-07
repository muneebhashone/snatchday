"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { useGetDuelGameById } from "@/hooks/api";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { id } = useParams();
  const { data } = useGetDuelGameById(id as string);
  const duelEndTime = data?.data?.duelEndTime;
  const game = data?.data?.game;
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const user = useUserContext();
  const userID = user?.user?.user?._id;
  const [userScore, setUserScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [round, setRound] = useState(1);

  // Game state
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // List of words for the typing game
  const words = [
    "JavaScript",
    "React",
    "TypeScript",
    "NextJS",
    "Programming",
    "Developer",
    "Function",
    "Component",
    "State",
    "Effect",
    "Snatchday",
    "FastTyper",
    "Challenge",
    "Keyboard",
    "Speed",
    "Accuracy",
    "Game",
    "Contest",
    "Duel",
    "Arena",
  ];

  useEffect(() => {
    if (duelEndTime) {
      const duelEndTimeDate = new Date(duelEndTime);
      // console.log(duelEndTimeDate.getTime() - new Date().getTime(), "duelEndTime");
      // console.log(new Date().getTime(), "new Date");
      const timer = setInterval(() => {
        const endDate = new Date(duelEndTime);
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();
        console.log(endDate);
        console.log(now);
        console.log(diff / 60);

        if (diff <= 0) {
          clearInterval(timer);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        } else {
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeLeft({ hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [duelEndTime]);

  // Select a random word
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  // End the game
  const endGame = () => {
    setGameStarted(false);
    setGameFinished(true);
    setCurrentWord("");
    // Final score calculation
    const finalScore = Math.max(0, userScore - errorCount);
    setUserScore(finalScore);
  };

  // Format time as 00:00:00.000
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${ms.toString().padStart(3, "0")}`;
  };

  return (
    <ClientLayout>
      <div className="w-full flex flex-col items-center justify-center bg-white mt-44 mb-52">
        <div className="w-full max-w-[90%] mx-auto px-2">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretc rounded-2xl p-6 lg:p-10">
            {/* Left side - Game Logo/Title */}
            <div className="lg:w-1/4 flex-1 min-w-[280px] max-w-sm flex flex-col items-center justify-center">
              <div className="flex flex-col items-center bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                <div className="relative w-48 h-48 mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Image
                    src={game?.logo || "/images/fast-typer-logo.png"}
                    alt="Fast Typer"
                    fill
                    className="object-contain rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/200?text=FastTyper";
                    }}
                  />
                </div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                  {game?.title || "FastTyper"}
                </h1>

                {/* Timer */}
                <div className="flex flex-col items-center mt-4 w-full flex-grow">
                  {!data?.data?.player2 && timeLeft.seconds > 0 ? (
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <div className="font-bold text-3xl animate-pulse">
                          {timeLeft.hours}
                        </div>
                        <div className="text-sm font-medium">Hours</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <div className="font-bold text-3xl animate-pulse">
                          {timeLeft.minutes}
                        </div>
                        <div className="text-sm font-medium">Min.</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <div className="font-bold text-3xl animate-pulse">
                          {timeLeft.seconds}
                        </div>
                        <div className="text-sm font-medium">Sec</div>
                      </div>
                    </div>
                  ) : !data?.data?.player2 ? (
                    <div className="text-red-500 text-2xl font-bold bg-red-50 px-8 py-4 rounded-2xl border border-red-100 animate-pulse">
                      Time&apos;s up! No opponent found
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full flex-grow">
                      {data?.data?.player2 &&
                        userID === data?.data?.player2?._id &&
                        !data?.data?.player2Score?.score &&
                        !data?.data?.player2Score?.time && (
                          <Link
                            className="w-full"
                            href={`/duel-arena/play/${id}`}
                          >
                            <Button className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-2xl px-8 py-6 text-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ">
                              🎮 PLAY NOW
                            </Button>
                          </Link>
                        )}
                    </div>
                  )}
                </div>
                <div className="flex justify-center items-center mt-8">
                  {data?.data?.player1 &&
                    data?.data?.player2 &&
                    data?.data?.player1Score?.score &&
                    data?.data?.player1Score?.time &&
                    data?.data?.player2 &&
                    data?.data?.player2Score?.score &&
                    data?.data?.player2Score?.time && (
                      <div className="transform hover:scale-105 transition-all duration-300">
                        {userID === data?.data?.winner ? (
                          <p className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl animate-bounce">
                            🏆 You Won! 🏆
                          </p>
                        ) : !data?.data?.winner && data?.data?.isDraw ? (
                          <p className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl animate-pulse">
                            🤷‍♂️ Draw 🤷‍♂️
                          </p>
                        ) : (
                          <p className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-10 py-5 rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl animate-pulse">
                            😢 You Lost 😢
                          </p>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Center - Game Instructions */}
            <div className="lg:w-2/4 flex-1 min-w-[320px] max-w-xl flex flex-col">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text h-20 text-transparent animate-gradient mb-8">
                  {game?.game}
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                  {game?.content}
                </p>

                <div className="border-t border-gray-200 pt-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl h-28 flex flex-col justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <p className="font-semibold text-gray-700 mb-2">
                        Stakes:
                      </p>
                      <div className="flex items-center gap-2 text-lg">
                        <p className="font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          {data?.data?.value}
                        </p>
                        <p className="text-gray-600">
                          {data?.data?.type === "snap"
                            ? "Snap Points"
                            : "Discount"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl h-28 flex flex-col justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <p className="font-semibold text-gray-700 mb-2">
                        Number of laps:
                      </p>
                      <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {data?.data?.rounds || 1}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl h-28 flex flex-col justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <p className="font-semibold text-gray-700 mb-2">
                        Duel Creator:
                      </p>
                      <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {data?.data?.player1?.username}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl h-28 flex flex-col justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      <p className="font-semibold text-gray-700 mb-2">
                        Duel ID:
                      </p>
                      <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {data?.data?.duelId || "1476"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - User Results */}
            <div className="lg:w-1/4 flex-1 min-w-[280px] max-w-sm flex flex-col">
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent animate-gradient mb-8">
                  Duel Results
                </h2>

                <div className="space-y-6">
                  <div className="bg-white px-6 pt-2 rounded-2xl flex justify-between items-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <p className="font-semibold text-gray-700 mb-2">Round:</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                      {round}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <p className="font-semibold text-gray-700 mb-4">Score:</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                        <p className="text-sm font-medium">Player 1:</p>
                        <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          {data?.data?.player1Score?.score &&
                          data?.data?.player1Score?.time
                            ? data?.data?.player1Score?.score
                            : userID === data?.data?.player1?._id
                            ? "Not Played"
                            : "Waiting..."}
                        </p>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                        <p className="text-sm font-medium">Player 2:</p>
                        <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          {data?.data?.player2Score?.score &&
                          data?.data?.player2Score?.time
                            ? data?.data?.player2Score?.score
                            : userID === data?.data?.player2?._id
                            ? "Not Played"
                            : "Waiting..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <p className="font-semibold text-gray-700 mb-4">Time:</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                        <p className="text-sm font-medium">Player 1:</p>
                        <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          {data?.data?.player1Score?.score &&
                          data?.data?.player1Score?.time
                            ? formatTime(data?.data?.player1Score?.time * 1000)
                            : userID === data?.data?.player1?._id
                            ? "Not Played"
                            : "Waiting..."}
                        </p>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                        <p className="text-sm font-medium">Player 2:</p>
                        <p className="text-sm font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                          {data?.data?.player2Score?.score &&
                          data?.data?.player2Score?.time
                            ? formatTime(data?.data?.player2Score?.time * 1000)
                            : userID === data?.data?.player2?._id
                            ? "Not Played"
                            : "Waiting..."}
                        </p>
                      </div>
                    </div>
                  </div>
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
