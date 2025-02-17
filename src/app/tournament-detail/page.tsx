import ClientLayout from "@/components/landing-page/ClientLayout";
import TrainingCenter from "@/components/landing-page/TrainingCenter";
import ProductDetailTheorySec from "@/components/ProductDetailTheorySec";
import TournamentDetailHero from "@/components/TournamentDetailHero";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import bg from "@/app/images/productDetailSecondSecBg.png";
import bg3 from "@/app/images/productDetailSecThreeBg.png";
import ProductDetailSecFour from "@/components/productDetailSecFour";

const page = () => {
  return (
    <ClientLayout>
      <main className="mb-56">
        <div className="h-11 w-full mt-[115px] flex flex-col pb-1 text-sm">
          <Separator className="mb-5" />
          <Breadcrumb className="ml-10 pb-2 bg-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Computer & Hardware Displays & Projectors
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Acer B277 Dbmiprczx - LED monitor - 68.6 cm (27`) -
                  (4710886045649)
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Separator className="" />
        </div>
        <TournamentDetailHero />
        {/* <div className="relative py-16 h-[1113px] border-b">
          <Image className="absolute top-0 left-0 z-[-1] object-contain object-center opacity-100" alt="" src={bg} />
          <ProductDetailTheorySec />
        </div> */}
        <div
          style={{ backgroundImage: `url(${bg.src})` }}
          className="bg-cover bg-center relative py-16 pb-20 h-max border-b"
        >
          <ProductDetailTheorySec />
        </div>
        <div className="bg-cover bg-center relative h-[900px] w-[100%]">
          <Image
            className="absolute -top-[23px] right-0 z-[-1] w-[100%] object-contain"
            src={bg3}
            alt="bg3"
          />
          <ProductDetailSecFour />
        </div>
        {/* <div
          style={{ backgroundImage: `url(${bg3.src})` }}
          className="bg-cover bg-center relative h-[900px] z-100"
        >
          <ProductDetailSecFour/>
        </div> */}
        <TrainingCenter />
      </main>
    </ClientLayout>
  );
};

export default page;
