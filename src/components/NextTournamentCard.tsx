"use client ";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Heart } from "lucide-react";
import Link from "next/link";
import { ShareIcon } from "./icons/icon";
import gameIcon from "@/app/images/graphiccard.png";
import NotFoundImage from "@/app/images/notfoundProduct.jpg";
import { calculateCountdown } from "@/lib/utils";
import { start } from "repl";
import CountdownDisplay from "./CountdownProps";
import { ShareTournamentModal } from "./ShareTournamentModal";
interface NextTournamentCardProps {
  id?: string;
  // article: string;
  // category: string[];
  // createdAt: string;
  end: string;
  fee: number | string;
  game: string;
  image: string;
  length: number;
  // metaDescription: string;
  // metaKeywords: string;
  // metaTitle: string;
  name: string;
  numberOfParticipants: number;
  // numberOfPieces: number;
  // participants: any[];
  // priceReduction: number;
  // resubmissions: number;
  start: string;
  startingPrice: number;
  status: string;
  textForBanner: string;
  title: string;
  tournamentId: string;
  updatedAt: string;
  vip: boolean;
  __v: number;
  _id?: string;
  gameImage: string;
  priceReduction: number;
  participants: any;
}

const NextTournamentCard = ({
  _id,
  id,
  image,
  title,
  name,
  game,
  length,
  startingPrice,
  fee,
  numberOfParticipants,
  start,
  end,
  tournamentId,
  gameImage,
  priceReduction,
  participants,
}: NextTournamentCardProps) => {
  const countDown = calculateCountdown(start);
  const endDate = calculateCountdown(end);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleTournamentShare = () => {
    setShareModalOpen(true);
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary transition-all duration-300 items-center">
      {/* Left Column - Product Image */}
      <div className="relative border-gray-200 pt-10 xl:pt-16 px-8 flex flex-col items-center justify-around h-full">
        <Image
          src={
            image && (image.startsWith("/") || image.startsWith("http"))
              ? image
              : NotFoundImage.src
          }
          alt={title}
          width={349}
          height={200}
          className="rounded-t-xl rounded-b-none w-[349px] h-[200px] object-contain"
          objectFit="contain"
        />
        <CountdownDisplay countdown={countDown} endDate={endDate} />
      </div>

      {/* Right Column - Tournament Info */}

      <div className="xl:border-l pt-5 xl:pt-10 pb-5 xl:pb-12 px-5 sm:px-7 relative">
        {/* Tournament Badge */}
        <div className="mb-3">
          <h2 className="text-card-foreground font-semibold text-xs sm:text-sm xl:text-normal">
            Tournament ID :<span className="text-primary"> {tournamentId}</span>
          </h2>
        </div>
        <div className="inline-block bg-primary text-white text-xs xl:text-sm px-2 sm:px-3 py-1 rounded-full line-clamp-1">
          {title}
        </div>

        {/* Product Title */}
        <p className="text-lg xl:text-2xl font-semibold mt-2 text-[#2F190D] line-clamp-2">
          {name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex text-primary text-lg xl:text-2xl">
            {/* {"★".repeat(rating)} */}
            {"★".repeat(3)}
          </div>
          {/* <span className="text-sm text-gray-500">({reviews})</span> */}
          <span className="text-sm text-gray-500">({5})</span>
        </div>

        {/* Game Info */}
        {/* <div className="flex 2xl:flex-row flex-col 2xl:items-center justify-start gap-2 2xl:gap-12 mt-2 xl:mt-5"> */}
        <div className="flex flex-wrap 2xl:items-center justify-between gap-2 mt-2 xl:mt-5">
          <div className="flex items-center justify-start gap-2 w-max">
            <div className="w-12 xl:w-16 h-12 xl:h-16 bg-[#FFFFFF] rounded-full flex items-center justify-center drop-shadow-lg">
              <Image
                className=""
                src={gameImage}
                alt="Game Icon"
                width={40}
                height={37}
              />
              <Button className="flex items-center justify-center xl:hidden absolute top-3 right-3 w-10 xl:w-12 h-10 xl:h-12 bg-[#F5F5F5] hover:bg-gray-100 rounded-full">
                <Heart className="w-4 xl:w-6 h-4 xl:h-6 text-[#A5A5A5] " />
              </Button>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-lg xl:text-lg font-bold">Game:</p>
                <p className="text-primary text-lg xl:text-lg font-bold">
                  {game}
                </p>
              </div>
              <div className="flex w-max items-center gap-1 text-card-foreground ">
                <p className="text-sm">Duration:</p>
                <p className="text-sm">{length || "N/A"}</p>
              </div>
            </div>
          </div>
          {/* <div className="flex w-max xl:w-full justify-start xl:flex-col xl:gap-0 gap-3 xl:w-max"> */}
          <div className="flex w-max justify-start items-center xl:flex-col xl:gap-0 gap-3 ">
            <p className="text-sm sm:text-lg"> Participants</p>
            <p className="text-sm sm:text-normal">
              0 To {numberOfParticipants}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          {/* <div className="flex xl:flex-row flex-col justify-between w-full xl:items-center gap-2"> */}
          <div className="flex flex-wrap justify-between w-full xl:items-center gap-2">
            {/* Price Info */}
            <div>
              <div className="flex items-center gap-1">
                <p className="text-card-foreground text-lg font-semibold">
                  Current price:
                </p>
                <p className="text-primary text-xl font-bold">
                  {(
                    startingPrice -
                    (priceReduction > participants?.length * (fee / 100)
                      ? participants?.length * (fee / 100)
                      : priceReduction)
                  ).toFixed(2)}
                  €
                </p>
              </div>
              <p className="text-xs sm:text-sm text-card-foreground">
                incl. 19% VAT, plus shipping costs
              </p>
            </div>

            {/* Participation Fee */}
            <div className="flex items-center justify-between">
              {/* <div className=""> */}
              <div className="flex items-center xl:flex-col gap-4 xl:gap-0 xl:justify-center">
                <p className="text-sm sm:text-lg text-card-foreground font-normal">
                  Participation fee:
                </p>
                <p className="text-card-foreground font-normal text-sm xl:text-normal">
                  {fee * 100} points / {fee}€
                </p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap 3xl:gap-0 gap-4 items-start xl:items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="gradient-primary text-sm hover:gradient-primary/90 text-white rounded-full px-6 py-1 drop-shadow-lg max-h-[27px]">
              <Link href={`/tournament-detail?id=${id ? id : _id}`}>
                To The Tournament
              </Link>
            </Button>
            <div className="bg-orange-200 rounded-full h-6 w-6 flex items-center justify-center">
              <ShareIcon />
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleTournamentShare}
            className="text-gray-600 bg-gray-50 rounded-full px-6 py-1 drop-shadow-lg max-h-[27px]"
          >
            Share tournament
          </Button>

          <ShareTournamentModal
            tournamentId={_id}
            open={isShareModalOpen}
            onClose={() => setShareModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default NextTournamentCard;
