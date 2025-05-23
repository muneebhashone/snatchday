"use client";

import ClientLayout from "@/components/landing-page/ClientLayout";
import React from "react";
import Link from "next/link";
import { useGetContent } from "@/hooks/api";
import { Loader2 } from "lucide-react";

const DataProtection = () => {
  const {data: webSetting,isLoading} = useGetContent();
  console.log(webSetting);

  const dataProtectionContent = webSetting?.data.find(
    (item) => item.name === "Data protection"
  )?.content || "";


  return (
    <ClientLayout>
      {isLoading ? <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div> :
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          {webSetting?.data.find((item) => item.name === "Data Protection")?.name}
        </h1>

        <div className="max-w-[1440px] mx-auto space-y-8 text-card-foreground">
          <div dangerouslySetInnerHTML={{ __html: dataProtectionContent }} /> 
        </div>
      </div>
      }
    </ClientLayout>
  );
};

export default DataProtection;
