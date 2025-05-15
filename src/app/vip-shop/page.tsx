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
const VipShopPage = () => {
  const { socket } = useSocket();
  const { user } = useUserContext();
  const { data: myProfile } = useGetMyProfile();
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
        {myProfile?.data?.user?.group !== "VIP" ? (
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
        ) : (
          <VIPShop />
        )}
      </div>
    </ClientLayout>
  );
};

export default VipShopPage;
