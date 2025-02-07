import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import React from "react";
import vipbg from "@/app/images/vipbg.png";
import vipheroimage from "@/app/images/vipheroimage.png";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import Testimonials from "@/components/landing-page/Testimonials";
import RatingsSection from "@/components/landing-page/RatingsSection";

const page = () => {
  return (
    <ClientLayout>
      <div>
        <SecondaryHeroSection
          title="VIP Shop"
          rightimage={vipheroimage}
          bg={vipbg}
        />
        <ExclusiveOffers />
        <Testimonials />
        <RatingsSection />
      </div>
    </ClientLayout>

  );
};

export default page;
