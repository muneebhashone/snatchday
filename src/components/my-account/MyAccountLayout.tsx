"use client";

import React from "react";
import ClientLayout from "@/components/landing-page/ClientLayout";
import tournament from "@/app/images/tournament.png";
import Image from "next/image";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import { useGetMyProfile } from "@/hooks/api";


const MyAccountLayout = ({ children }: { children: React.ReactNode }) => {
  const {data:myProfile}=useGetMyProfile()
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 pt-28 pb-36">
        {/* <AccountBreadcrumb /> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative pt-40 px-24">
          <Image
            src={tournament}
            alt="tournament"
            className="absolute top-0 left-0 w-full h-[400px] object-cover"
            unoptimized
          />

          <AccountSidebar Userprofile={myProfile?.data?.user} />

          {/* Main Content */}
          <div className="lg:col-span-9 rounded-3xl relative bg-white shadow-xl mb-28">
            {/* <ActivityStats />
            <PurchasingSection /> */}
            {children}
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default MyAccountLayout