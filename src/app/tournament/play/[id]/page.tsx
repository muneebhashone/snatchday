"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import {
  useGetDuelGameById,
  useGetTournamentById,
  usePostTournamentScore,
} from "@/hooks/api";
import Breadcrumb from "antd/es/breadcrumb";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log(id, "id");
  const { data: tournamentGame } = useGetTournamentById(id as string);
  console.log(tournamentGame, "tournamentGame");
  const { mutate: postTournamentScore } = usePostTournamentScore(id as string);

  const dummyDataWin = {
    score: 140,
    time: 10,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      postTournamentScore(dummyDataWin, {
        onSuccess: () => {
          toast.success("Score submitted successfully");
          router.push(`/tournament/${id}`);
        },
        onError: (error) => {
          console.log(error, "error");
        },
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [tournamentGame]);
  return (
    <ClientLayout>
      <div className="mt-44 mb-56">
        <div className="flex items-center px-20">
          <Breadcrumb
            items={[
              {
                title: "Home",
                href: "/",
              },
              {
                title: "Tournaments",
                href: "/tournaments",
              },
              {
                title: "Play",
              },
            ]}
          />
        </div>
        <div>
          <Image
            className="mx-auto mt-10"
            src={tournamentGame?.data?.game?.logo}
            alt="tournament game logo"
            width={100}
            height={100}
          />
          <p className="text-center text-2xl font-bold mt-5">
            {tournamentGame?.data?.game?.title}
          </p>
          <iframe
            className="mx-auto mt-10"
            src={tournamentGame?.data?.game?.path}
            style={{
              height: `${tournamentGame?.data?.game?.height}px`,
              width: `${tournamentGame?.data?.game?.width}px`,
            }}
          />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
