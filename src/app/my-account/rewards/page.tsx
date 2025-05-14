"use client";
import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import { useGetMyProfile } from "@/hooks/api";
import React from "react";

const Page = () => {
  const { data: myProfile } = useGetMyProfile();
  console.log(myProfile);
  return (
    <MyAccountLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Rewards</h1>
      </div>
    </MyAccountLayout>
  );
};

export default Page;
