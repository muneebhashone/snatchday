"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import React, { useEffect } from "react";
import vipbg from "@/app/images/vipbg.png";
import vipheroimage from "@/app/images/vipheroimage.png";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import Testimonials from "@/components/landing-page/Testimonials";
import RatingsSection from "@/components/landing-page/RatingsSection";
import { useSocket } from "@/context/SocketContext";
import { useUserContext } from "@/context/userContext";
import { useGetMyProfile } from "@/hooks/api";
import VIPShop from "@/components/VIPShop";
import { Loader } from "lucide-react";
import Login from "@/components/auth/Login";
const VipShopPage = () => {
  const { socket } = useSocket();
  const { user } = useUserContext();
  const { data: myProfile, isLoading } = useGetMyProfile();
  const userId = user?.user?._id;
  console.log(user, "user");
  useEffect(() => {
    if (userId) {
      socket?.emit("join-room", userId);
    }
  }, [socket, userId]);
  return (
    <ClientLayout>
      <div>
        {myProfile?.data?.user?.group === "BASIC" ? (
          <>
            <SecondaryHeroSection
              title="VIP Shop"
              rightimage={vipheroimage}
              bg={vipbg}
            />
            <ExclusiveOffers />
            <Testimonials />
            <RatingsSection />
          </>
        ) : myProfile?.data?.user?.group === "VIP" ? (
          <VIPShop />
        ) : !myProfile ? (
          <div>
            <SecondaryHeroSection
              title="VIP Shop"
              rightimage={vipheroimage}
              bg={vipbg}
            />
            <h1>You Need To Login First</h1>
            <div>
              <ExclusiveOffers disabled={true} />
              <Testimonials />
              <RatingsSection />
            </div>
          </div>
        ) : (
          isLoading && (
            <div className="flex justify-center items-center h-screen">
              <Loader className="animate-spin text-primary h-10 w-10" />
            </div>
          )
        )}
      </div>
    </ClientLayout>
  );
};

export default VipShopPage;
