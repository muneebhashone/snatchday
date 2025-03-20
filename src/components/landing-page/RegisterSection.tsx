import React from "react";
import GredientButton from "../GredientButton";
import PrimaryHeading from "../PrimaryHeading";
import Image from "next/image";
import registersectionimage from "@/app/images/registersectionimage.png";
import Login from "../auth/Login";
import { useUserContext } from "@/context/userContext";
const RegisterSection = () => {
  const { user } = useUserContext();
  return (
    <section className="px-4 bg-[radial-gradient(ellipse_at_center,_#FDF9F7,_#F9F2EE)] h-max 2xl:h-[700px]">
      <div className="container max-w-[1920px] ml-auto">
        <div className="flex lg:flex-row flex-col items-center text-center lg:text-start lg:items-end 2xl:items-center justify-between">
          {/* Left Content */}
          <div className="w-[100%] lg:w-[55%] h-full xl:pl-20 2xl:pl-40 mb-10 2xl:mb-0 m-10 2xl:m-0">
            <PrimaryHeading
              highlightText="Discover"
              remainingText="The New Way Of "
              remainingHeading="Online Shopping"
            />
            <p className="text-card-foreground text-[18px] sm:text-[21px] lg:text-[18px] 2xl:text-[23px] mt-8 lg:mt-6 mx-auto lg:mx-0">
              Unsere Vision für Snatch Day war lange Zeit in unseren Köpfen
              gereift, denn wir sind kein gewöhnlicher Onlineshop.
            </p>
            <p className="text-card-foreground text-[18px] sm:text-[21px] lg:text-[18px] 2xl:text-[23px] mt-4 xl:mt-8 mx-auto lg:mx-0">
              Du hast genug davon, dem Zufall die Entscheidung zu überlassen,
              und möchtest dich nicht nur auf dein Glück verlassen?
              <span className="text-primary">Read More</span>
            </p>
            <div className="mt-10">
               {!user && <Login type="Register"  />}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="w-[100%] lg:w-[45%] h-full">
            <Image
              src={registersectionimage}
              alt="Register section image"
              width={700}
              height={1000}
              className="w-full h-[300px] sm:h-[500px] lg:h-full 2xl:h-[700px] object-contain object-bottom 2xl-object-cover 2xl-object-left ml-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
