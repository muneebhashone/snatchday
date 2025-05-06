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
      const timer = setInterval(() => {
        const endDate = new Date(duelEndTime);
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();

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
      <div className="container mx-auto px-4 py-8 mt-44 mb-52">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Game Logo/Title */}
          <div className="lg:w-1/4">
            <div className="flex flex-col items-center">
              <Image
                src={game?.logo || "/images/fast-typer-logo.png"}
                alt="Fast Typer"
                width={200}
                height={200}
                className="mb-4"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/200?text=FastTyper";
                }}
              />
              <h1 className="text-3xl font-bold mb-4">
                {game?.title || "FastTyper"}
              </h1>

              {/* Timer */}
              <div className="flex flex-col items-center mt-4">
                {timeLeft.seconds > 0 ? (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-md text-center">
                      <div className="font-bold">{timeLeft.hours}</div>
                      <div className="text-xs">Hours</div>
                    </div>
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-md text-center">
                      <div className="font-bold">{timeLeft.minutes}</div>
                      <div className="text-xs">Min.</div>
                    </div>
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-md text-center">
                      <div className="font-bold">{timeLeft.seconds}</div>
                      <div className="text-xs">Sec</div>
                    </div>
                  </div>
                ) : !data?.data?.player2 ? (
                  <div className="text-red-500 text-2xl font-bold">
                    Time&apos;s up! No opponent found
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full">
                    {data?.data?.player2 &&
                      userID === data?.data?.player2?._id &&
                      !data?.data?.player2Score?.score &&
                      !data?.data?.player2Score?.time &&(
                        <Link className="" href={`/duel-arena/play/${id}`}>
                          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                            JOIN
                          </Button>
                        </Link>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center - Game Instructions */}
          <div className="lg:w-2/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-orange-500 mb-4">
                {game?.game}
              </h2>

              <p className="text-gray-600 mb-6">{game?.content}</p>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Stakes:</p>
                    <p>{game?.metaDescription || "100 Snap Points"}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Number of laps:</p>
                    <p>{game?.levels || 1}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Duel Creator:</p>
                    <p>{data?.data?.player1?.username}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Duel ID:</p>
                    <p>{id || data?.data?.duelId || "1476"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - User Results */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Your result</h2>

              <div className="mb-4">
                <p className="font-semibold">Round:</p>
                <p>{round}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Attempts/Score:</p>
                <p>{data?.data?.player1Score?.score}</p>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Time:</p>
                <p>{formatTime(data?.data?.player1Score?.time * 1000 || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
