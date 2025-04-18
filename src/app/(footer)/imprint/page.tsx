"use client";

import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BubblesIcon, BubblesIcon1 } from "@/components/icons/icon";
import { useGetContent } from "@/hooks/api";

const ImprintPage = () => {

  const {data: webSetting} = useGetContent();
  console.log(webSetting);

  const imprintContent = webSetting?.data.find(
    (item) => item.name === "Imprint"
  )?.content || "";
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          {webSetting?.data.find((item) => item.name === "Imprint")?.name}
        </h1>
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BubblesIcon className="absolute top-[10%] left-[5%] animate-bubble-1" />
          <BubblesIcon1 className="absolute top-[15%] right-[15%] animate-bubble-5" />
          <BubblesIcon1 className="absolute top-[35%] right-[40%] animate-bubble-4" />
          <BubblesIcon className="absolute top-[65%] left-[12%] animate-bubble-3" />
          <BubblesIcon className="absolute top-[75%] left-[65%] animate-bubble-5" />
          <BubblesIcon1 className="absolute -bottom-[5%] right-[95%] animate-bubble-2" />
          <BubblesIcon className="absolute bottom-[40%] left-[85%] animate-bubble-3" />
          <BubblesIcon1 className="absolute top-[40%] right-[90%] animate-bubble-4" />
        </div>
        <Separator className="mb-5" />

        <div className="max-w-5xl font-medium mx-auto space-y-8 text-card-foreground">
          <div dangerouslySetInnerHTML={{ __html: imprintContent }} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default ImprintPage;



