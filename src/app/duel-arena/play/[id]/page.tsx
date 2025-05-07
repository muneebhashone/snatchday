"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useGetDuelGameById, useGetDuelScore } from "@/hooks/api";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import { Home } from "lucide-react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { useUserContext } from "@/context/userContext";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: duelGame } = useGetDuelGameById(id as string);
  console.log(duelGame);
  const dummyDataDraw = {
    score: 110,
    time: 10,
  };
  const dummyDataWin = {
    score: 120,
    time: 10,
  };
  const dummyDatalose = {
    score: 100,
    time: 10,
  };
  const { mutate: getDuelScore } = useGetDuelScore(id as string);
  const user = useUserContext();
  const userID = user?.user?.user?._id;

  useEffect(() => {
    if (duelGame?.data) {
      const hasPlayed =
        (userID === duelGame.data.player1?._id &&
          (duelGame.data.player1Score?.score ||
            duelGame.data.player1Score?.time)) ||
        (userID === duelGame.data.player2?._id &&
          (duelGame.data.player2Score?.score ||
            duelGame.data.player2Score?.time));

      if (hasPlayed) {
        toast.error("You have already played this duel");
        router.push(`/duel-arena`);
        return;
      }
    }
  }, [duelGame, id, router]);
  useEffect(() => {
    const timer = setTimeout(() => {
      getDuelScore(dummyDataDraw, {
        onSuccess: () => {
          toast.success("Score submitted successfully");
          router.push(`/duel-arena/play?id=${id}`);
        },
        onError: (error) => {
          console.log(error, "error");
        },
      });
    }, 10000);
    return () => clearTimeout(timer);
  }, [duelGame]);

  const pathName = usePathname();

  useEffect(() => {
    // if (pathName !== `/duel-arena/play/${id}`) {
    //   alert("You are about to leave the page");
    // }
    console.log(window.location.pathname, `/duel-arena/play/${id}`);
  }, [router]);

  return (
    <ClientLayout>
      <div className="mt-44 mb-52">
        <div className="mb-4 w-full flex items-center justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home size={20} className="text-primary font-bold" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/duel-arena"
                  className="text-primary font-bold hover:text-primary"
                >
                  Duel Arena
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/duel-arena/create"
                  className="text-primary font-bold hover:text-primary"
                >
                  Create Duel
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-bold capitalize">
                  {duelGame?.data?.game?.game}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-4 items-center justify-end  mx-auto">
          <div className="flex gap-4 items-center justify-between w-[60%] pr-10">
            <div className="flex gap-4 items-center justify-center">
              <Image
                src={duelGame?.data?.game?.logo}
                alt={duelGame?.data?.game?.game}
                width={50}
                height={50}
              />
              <h1 className="text-4xl font-bold">
                {duelGame?.data?.game?.game}
              </h1>
            </div>
            <div className="">
              {duelGame?.data?.player1 &&
                duelGame?.data?.playe1Score?.score &&
                duelGame?.data?.playe1Score?.time && (
                  <div className="border border-black rounded-md p-2">
                    <p>Player 1: {duelGame?.data?.player1Score?.score || 0}</p>
                    <p>
                      Player 1: {duelGame?.data?.player1Score?.time || 0}sec
                    </p>
                  </div>
                )}
              {duelGame?.data?.player2 &&
                duelGame?.data?.playe2Score?.score &&
                duelGame?.data?.playe2Score?.time && (
                  <div className="border border-black rounded-md p-2">
                    <p>Player 2: {duelGame?.data?.player2Score?.score || 0}</p>
                    <p>
                      Player 2: {duelGame?.data?.player2Score?.time || 0}sec
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
        <iframe
          className="mx-auto mt-20"
          src={duelGame?.data?.game?.path}
          style={{
            height: `${duelGame?.data?.game?.height}px`,
            width: `${duelGame?.data?.game?.width}px`,
          }}
        />
      </div>
    </ClientLayout>
  );
};

export default Page;
