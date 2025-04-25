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
import { LucideShieldQuestion, Mic, Ticket, Video } from "lucide-react";

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
              <TabsList className="w-full h-max mb-20 flex justify-between bg-transparent border-2 border-gray-100 rounded-xl p-2 shadow-md">
                <TabsTrigger
                  value="ticket"
                  className="group flex-1 flex flex-col items-center gap-3 py-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg transition-all duration-300 text-lg font-medium data-[state=active]:font-bold text-foreground hover:bg-gray-50"
                >
                  <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gray-50 group-data-[state=active]:bg-primary/10 group-data-[state=active]:border-primary border-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Ticket className="w-8 h-8 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  Create ticket
                </TabsTrigger>

                <TabsTrigger
                  value="videos"
                  className="group flex-1 flex flex-col items-center gap-3 py-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg transition-all duration-300 text-lg font-medium data-[state=active]:font-bold text-foreground hover:bg-gray-50"
                >
                  <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gray-50 group-data-[state=active]:bg-primary/10 group-data-[state=active]:border-primary border-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Video className="w-8 h-8 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  Explanatory videos
                </TabsTrigger>

                <TabsTrigger
                  value="faq"
                  className="group flex-1 flex flex-col items-center gap-3 py-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg transition-all duration-300 text-lg font-medium data-[state=active]:font-bold text-foreground hover:bg-gray-50"
                >
                  <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gray-50 group-data-[state=active]:bg-primary/10 group-data-[state=active]:border-primary border-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <LucideShieldQuestion className="w-8 h-8 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  FAQ's
                </TabsTrigger>

                <TabsTrigger
                  value="contact"
                  className="group flex-1 flex flex-col items-center gap-3 py-4 bg-transparent data-[state=active]:bg-white data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-md rounded-lg transition-all duration-300 text-lg font-medium data-[state=active]:font-bold text-foreground hover:bg-gray-50"
                >
                  <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gray-50 group-data-[state=active]:bg-primary/10 group-data-[state=active]:border-primary border-2 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Mic className="w-8 h-8 text-foreground group-data-[state=active]:text-primary" />
                  </div>
                  Voice Assistant
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
              <TabsContent value="contact" className="mt-6">
                <h2 className="text-3xl lg:text-[48px] font-bold my-5 text-center mb-16">
                  Voice Assistant
                  <span className="bg-primary text-white px-4 py-1 rounded-lg ml-2">
                    Support
                  </span>
                </h2>

                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4">
                        Need immediate assistance?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Our voice support team is available to help you with any
                        questions or issues you might have. Call us directly for
                        the fastest response to your inquiries about orders,
                        tournaments, technical problems, or any other concerns.
                      </p>
                      {/* <p className="text-gray-600 mb-8">
                        Available Monday to Friday, 9:00 AM - 6:00 PM EST.
                      </p> */}
                    </div>

                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-gray-100">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Mic className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-lg font-medium text-gray-500 mb-2">
                        Call us at
                      </p>
                      <a
                        href="tel:0213213"
                        className="text-3xl font-bold text-primary mb-4 hover:underline"
                      >
                        021-3213
                      </a>
                      <Button
                        className="gradient-primary text-white rounded-full px-6 py-6 font-bold hover:shadow-lg transition-all duration-300"
                        onClick={() => (window.location.href = "tel:0213213")}
                      >
                        <Mic className="w-5 h-5 mr-2" /> Call Support
                      </Button>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-xl font-bold mb-4">Before you call</h4>
                    <p className="text-gray-600 mb-4">
                      To help us serve you better, please have the following
                      information ready:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Your account email or username</li>
                      <li>Order number (if applicable)</li>
                      <li>Brief description of your issue</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default SupportPage;
