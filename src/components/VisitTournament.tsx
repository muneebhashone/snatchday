"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import bg from "@/app/images/visittournament.png";
import Image from "next/image";
import { useUpComingTournament } from "@/hooks/api";
import { formatDate } from "@/lib/utils";
const VisitTournament = ({
  title,
  date,
}: {
  title?: string;
  date?: string;
}) => {
  const { data: UpcomingTournament } = useUpComingTournament();
  console.log(UpcomingTournament);
  return (
    <div className="relative mt-10 ">
      <Image
        src={bg}
        alt="tournament"
        className="w-full h-full object-cover rounded-3xl"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start py-6 px-8">
        <h2 className="text-4xl font-extrabold text-white text-center">
          {UpcomingTournament?.data[0]?.title}
        </h2>
        <p className="text-white text-2xl mt-4 text-center font-extralight">
          Tournament starts on
          <span className="text-primary font-bold">
            {" "}
            {UpcomingTournament?.data[0]?.start
              ? formatDate(UpcomingTournament.data[0].start)
              : ""}
          </span>
        </p>
        <Button className="text-lg text-[#3a094a] mt-6 font-semibold bg-white rounded-full px-6 py-5 ">
          <Link
            href={`/tournament-detail?id=${UpcomingTournament?.data[0]?._id}`}
          >
            Visit Tournament
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default VisitTournament;
