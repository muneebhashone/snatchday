'use client';

import ClientLayout from "@/components/landing-page/ClientLayout";
import { useGetContent } from "@/hooks/api";
import React from "react";

const TermsAndConditions = () => {
  const {data: webSetting} = useGetContent();
  console.log(webSetting);

  const privacyPolicyContent = webSetting?.data.filter(
    (item) => item.name === "Terms And Condition"
  )[0]?.content || "";
  return (
    <ClientLayout>
      <div className="container max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          {webSetting?.data[0]?.name}
        </h1>

        <div className="text-lg text-[#475569]" dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
      
      </div>
    </ClientLayout>
  );
};

export default TermsAndConditions;
