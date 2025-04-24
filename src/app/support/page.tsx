"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import SecondaryHeroSection from "@/components/SecondaryHeroSection";
import React, { useState } from "react";
import supportbg from "@/app/images/supportbg.png";
import supportimage from "@/app/images/supportrightimage.png";
import CreateTicket from "@/components/CreateTicket";
import ticket1 from "@/app/images/ticket1.svg";
import ticket2 from "@/app/images/ticket2.svg";
import ticket3 from "@/app/images/ticket3.svg";
import ticket4 from "@/app/images/ticket4.svg";
import ticket5 from "@/app/images/ticket5.svg";
import ticket6 from "@/app/images/ticket6.svg";
import { Button } from "@/components/ui/button";
import { BubblesIcon, BubblesIcon1 } from "@/components/icons/icon";
import { useRouter } from "next/navigation";
import { useGetFaq, useGetTutorial } from "@/hooks/api";
import Link from "next/link";
import { YouTubePlayer } from "@/components/admin/YouTubePlayer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideShieldQuestion, Ticket, Video } from "lucide-react";

const SupportPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: faq } = useGetFaq({
    category: selectedCategory,
    status: "ACTIVE",
  });
  console.log(faq, "faqData");

  const { data: Tutorial } = useGetTutorial({
    category: selectedCategory,
    status: "ACTIVE",
  });
  console.log(Tutorial, "Tutorial");
  const ticketdata = [
    {
      id: 1,
      image: ticket1,
      categorytext: "Category 01",
      categorytitle: "Orders",
    },
    {
      id: 2,
      image: ticket2,
      categorytext: "Category 02",
      categorytitle: "Miscellaneous",
    },
    {
      id: 3,
      image: ticket3,
      categorytext: "Category 03",
      categorytitle: "Technical problem",
    },
    {
      id: 4,
      image: ticket4,
      categorytext: "Category 04",
      categorytitle: "tournaments, duels",
    },
    {
      id: 5,
      image: ticket6,
      categorytext: "Category 05",
      categorytitle: "VIP membership",
    },
    {
      id: 6,
      image: ticket5,
      categorytext: "Category 06",
      categorytitle: "Shipping/exchange",
    },
  ];

  const videodata = [
    {
      id: 1,
      title: "Snatch Day explainer video",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Snatch Day explainer video",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Snatch Day explainer video",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Snatch Day explainer video",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];
  return (
    <ClientLayout>
      <SecondaryHeroSection
        bg={supportbg}
        rightimage={supportimage}
        title="Support"
        support={true}
        description="How can we help you?"
      />
      <div className="relative max-w-[1920px] mx-auto pt-20 pb-40 bg-[#F9F9F9]">
        {/* Content wrapper with bubbles */}
        <div className="relative min-h-[1000px]">
          {/* Bubbles background layer */}
          <div className="absolute inset-0 w-full overflow-hidden pointer-events-none">
            <BubblesIcon className="absolute top-[100px] left-[5%] animate-bubble-1" />
            <BubblesIcon1 className="absolute top-[150px] right-[5%] animate-bubble-2" />
            <BubblesIcon className="absolute top-[250px] left-[25%] animate-bubble-3" />
            <BubblesIcon1 className="absolute top-[300px] right-[35%] animate-bubble-4" />
            <BubblesIcon className="absolute top-[400px] left-[45%] animate-bubble-1" />
            <BubblesIcon1 className="absolute top-[450px] right-[10%] animate-bubble-2" />
            <BubblesIcon className="absolute top-[550px] left-[15%] animate-bubble-3" />
            <BubblesIcon1 className="absolute top-[600px] right-[25%] animate-bubble-4" />
            <BubblesIcon className="absolute top-[700px] left-[35%] animate-bubble-1" />
            <BubblesIcon1 className="absolute top-[750px] right-[45%] animate-bubble-2" />
            <BubblesIcon className="absolute top-[850px] left-[55%] animate-bubble-3" />
            <BubblesIcon1 className="absolute top-[900px] right-[65%] animate-bubble-4" />
          </div>

          {/* Content layer */}
          <div className="relative z-10 max-w-[1200px] mx-auto">
            <Tabs defaultValue="ticket" className="w-full">
              <TabsList className="w-full h-max mb-20 grid grid-cols-3 bg-transparent border-2 border-gray-100 bg-white">
                <TabsTrigger
                  value="ticket"
                  className="group flex flex-col items-center gap-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-primary data-[state=active]:border-2 data-[state=active]:text-primary text-xl data-[state=active]:font-bold data-[state=active]:text-2xl text-foreground"
                >
                  <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white border-2 border-foreground group-data-[state=active]:border-primary shadow-md group-data-[state=active]:bg-white">
                    <Ticket className="w-10 h-10 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  Create ticket
                </TabsTrigger>

                <TabsTrigger
                  value="videos"
                  className="group flex flex-col items-center gap-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-primary data-[state=active]:border-2 data-[state=active]:text-primary text-xl data-[state=active]:font-bold data-[state=active]:text-2xl text-foreground"
                >
                  <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white border-2 border-foreground group-data-[state=active]:border-primary shadow-md group-data-[state=active]:bg-white">
                    <Video className="w-10 h-10 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  Explanatory videos
                </TabsTrigger>

                <TabsTrigger
                  value="faq"
                  className="group flex flex-col items-center gap-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-primary data-[state=active]:border-2 data-[state=active]:text-primary text-xl data-[state=active]:font-bold data-[state=active]:text-2xl text-foreground"
                >
                  <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center bg-white border-2 border-foreground group-data-[state=active]:border-primary shadow-md group-data-[state=active]:bg-white">
                    <LucideShieldQuestion className="w-10 h-10 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  FAQ's
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ticket" className="mt-10">
                <h2 className="text-2xl lg:text-[48px] font-extrabold my-5 text-center mb-16">
                  Create
                  <span className="bg-primary text-white px-6 py-2 rounded-lg ml-2">
                    Ticket
                  </span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {ticketdata.map((item) => (
                    <CreateTicket
                      key={item.id}
                      image={item.image}
                      categorytext={item.categorytext}
                      categorytitle={item.categorytitle}
                      onClick={() => {
                        router.push(
                          `/support/create-ticket?category=${item.categorytitle}`
                        );
                      }}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-10">
                <h2 className="text-3xl lg:text-[48px] font-extrabold my-5 text-center mb-16">
                  Frequently Asked Questions{" "}
                  <span className="bg-primary text-white px-6 py-2 rounded-lg ml-2">
                    FAQ's
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {faq?.data?.map((item) => (
                    <Button
                      onClick={() => {
                        router.push(`/faq/${item._id}`);
                      }}
                      key={item._id}
                      className="w-full font-extrabold shadow-lg rounded-2xl transition-all duration-300 ease-in-out px-8 py-6 text-center text-2xl min-h-[167px] flex items-center justify-center
                      bg-white text-[#1C1B1D] hover:bg-primary hover:text-white hover:rounded-full"
                    >
                      {item.category}
                    </Button>
                  ))}
                </div>
                <div className="bg-white flex flex-col md:flex-row justify-between items-center shadow-xl py-8 mt-8 md:py-16 px-8 md:px-16 rounded-lg gap-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-center md:text-left">
                    OTHER QUESTIONS
                  </h3>
                  <Button
                    onClick={() => router.push("/support/create-ticket")}
                    className="gradient-primary text-white rounded-full text-xl font-bold px-6 min-h-16 hover:rounded-full w-[255px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                  >
                    Ask a question
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="videos" className="mt-6">
                <h2 className="text-3xl lg:text-[48px] font-bold my-5 text-center mb-16">
                  Explanatory
                  <span className="bg-primary text-white px-4 py-1 rounded-lg ml-2">
                    Videos
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {Tutorial?.data?.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white shadow-xl py-8 px-6 text-center rounded-lg hover:border-2 hover:border-primary"
                    >
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <YouTubePlayer youtubeUrl={item.videoUrl} />
                      </div>
                      <h2 className="text-2xl font-extrabold py-4">
                        {item.title}
                      </h2>
                      <Link href={item.videoUrl}>
                        <Button className="bg-white text-lg text-foreground rounded-full px-6 h-16 w-full md:w-72 hover:rounded-full hover:border border-foreground drop-shadow-2xl">
                          Watch Video
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* If no tutorials are available, show placeholder content */}
                {(!Tutorial?.data || Tutorial.data.length === 0) && (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">
                      No tutorial videos available at the moment.
                    </p>
                    <Button
                      onClick={() => router.push("/support/create-ticket")}
                      className="gradient-primary text-white rounded-full text-xl font-bold px-6 min-h-16 hover:rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    >
                      Contact Support
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default SupportPage;
