"use client";

import ClientLayout from "@/components/landing-page/ClientLayout";
import { Separator } from "@/components/ui/separator";
import { BubblesIcon, BubblesIcon1 } from "@/components/icons/icon";
import { useGetContent } from "@/hooks/api";

const AboutUs = () => {
  const {data: webSetting} = useGetContent();
  console.log(webSetting);

  const aboutUsContent = webSetting?.data.filter(
    (item) => item.name === "About Us"
  )[0]?.content || "";
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-10">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BubblesIcon className="absolute top-[10%] left-[5%] animate-bubble-1" />
          <BubblesIcon1 className="absolute top-[15%] right-[15%] animate-bubble-2" />
          <BubblesIcon1 className="absolute top-[35%] right-[5%] animate-bubble-4" />
          <BubblesIcon className="absolute top-[65%] left-[12%] animate-bubble-3" />
          <BubblesIcon className="absolute top-[85%] left-[80%] animate-bubble-1" />
          <BubblesIcon1 className="absolute bottom-[5%] right-[95%] animate-bubble-2" />
          <BubblesIcon className="absolute bottom-[25%] left-[85%] animate-bubble-3" />
          <BubblesIcon1 className="absolute top-[40%] right-[85%] animate-bubble-4" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          {webSetting?.data.find((item) => item.name === "About Us")?.name}
        </h1>
        <Separator className="mb-5" />

        <div className="max-w-5xl font-medium mx-auto space-y-8 text-card-foreground">
          <div dangerouslySetInnerHTML={{ __html: aboutUsContent }} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default AboutUs;
