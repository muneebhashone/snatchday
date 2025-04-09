"use client";
import Login from "@/components/auth/Login";
import ClientLayout from "@/components/landing-page/ClientLayout";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userContext";
import { useGetGameById } from "@/hooks/api";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const { user } = useUserContext();
  const { data: trainingCenterById } = useGetGameById(params.id);
  const trainingCenter = trainingCenterById?.data;
  

  return (
    <ClientLayout>
      <div className="mt-40 mb-52 flex flex-col items-center w-full">
        <div className="mb-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon size={20} className="text-primary font-bold" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-primary font-bold"
                  href="/trainings-center"
                >
                  Training Center
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-bold capitalize">
                  {trainingCenter?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-[70%] flex items-center justify-center">
          <Image
            src={trainingCenter?.logo}
            alt={trainingCenter?.title}
            width={200}
            height={200}
          />
          <div className="flex flex-col items-center justify-center px-16">
            <h1 className="text-2xl capitalize font-bold text-primary">
              {trainingCenter?.title}
            </h1>
            <p>{trainingCenter?.content}</p>
          </div>
          {user ? (
            <Button
              className="hover:bg-primary"
              onClick={() => {
                window.location.href = `/trainings-center/play-game/${params.id}`;
              }}
            >
              Play
            </Button>
          ) : (
            <Button className="bg-transparent">
              <Login
                useForTournament={true}
                addToCart={true}
                smallAddtoCart={true}
              />
            </Button>
          )}
        </div>
        <div className="w-full px-10 mt-14">
          <TrainingCenter />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
