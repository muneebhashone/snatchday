"use client";
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
import { useGetGameById, useTrainingCenterById } from "@/hooks/api";
import { HomeIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  useTrainingCenterById(params.id);
  const { data: getGame } = useGetGameById(params.id);
  return (
    <ClientLayout>
      <div className="mt-40 mb-52 flex flex-col items-center w-full">
        <div>
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
                <BreadcrumbPage className="text-foreground font-bold">
                  Play Game
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-bold capitalize">
                  {getGame?.data?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="w-full flex items-center justify-center">
            <h1 className="text-5xl font-bold text-primary capitalize text-center mt-5 mb-5 bg-primary text-white px-2 py-1 w-max rounded-lg">
              {getGame?.data?.title}
            </h1>
          </div>
          <iframe
            className={`w-[${getGame?.data?.width}px] h-[${getGame?.data?.height}px]`}
            src={getGame?.data?.path}
          ></iframe>
        </div>
        <div className="w-full px-10 mt-14">
          <TrainingCenter />
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
