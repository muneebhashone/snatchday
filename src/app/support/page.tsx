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

const SupportPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const handleFaqClick = (id: number) => {
    setSelectedFaq(selectedFaq === id ? null : id);
  };

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

  const faqdata = [
    { id: 1, title: "About Snatch Day" },
    { id: 2, title: "Register" },
    { id: 3, title: "My Account" },
    { id: 4, title: "Point System" },
    { id: 5, title: "Bargain OR Discount Tournaments" },
    { id: 6, title: "Duerllarena" },
    { id: 7, title: "VIP Membership & VIP Shop" },
    { id: 8, title: "Games & Rules" },
    { id: 9, title: "Payment & Shipping" },
    { id: 10, title: "Complaints & Returns" },
    { id: 11, title: "Technical Requierments" },
    { id: 12, title: "My Account" },
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
      <div className="max-w-[1920px] mx-auto pt-20 pb-40 relative inset-1 bg-[#F9F9F9]">
        <div className="absolute inset-0 w-full h-[2700px] lg:h-full">
          <BubblesIcon className="absolute top-0 left-0" />
          <BubblesIcon1 className="absolute top-0 right-0" />
          <BubblesIcon className=" absolute bottom-0 left-0" />
          <BubblesIcon1 className=" absolute bottom-0 right-0" />
          <BubblesIcon className="lg:block hidden absolute top-1/2 left-0" />
          <BubblesIcon1 className="lg:block hidden absolute top-1/3 right-0" />
          <BubblesIcon className="lg:block hiddenabsolute bottom-1/4 left-0" />
          <BubblesIcon1 className="lg:block hidden absolute bottom-1/1 right-0" />
        </div>
        <h2 className="text-2xl lg:text-6xl font-bold my-5 text-center mb-16">
          Create
          <span className="bg-primary text-white px-6 py-2 rounded-lg ml-1">
            Ticket
          </span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
          {ticketdata.map((item) => (
            <CreateTicket
              key={item.id}
              image={item.image}
              categorytext={item.categorytext}
              categorytitle={item.categorytitle}
            />
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto py-20">
          <h2 className="text-3xl lg:text-6xl font-bold my-5 text-center mb-16">
            Häufige
            <span className="bg-primary text-white px-6 py-2 rounded-lg ml-1">
              Fragen
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {faqdata.map((item) => (
              <h1
                key={item.id}
                onClick={() => handleFaqClick(item.id)}
                className={`w-full font-extrabold shadow-lg rounded-2xl px-8 py-6 transition-all duration-300 ease-in-out text-center bg-white text-2xl min-h-[167px] flex items-center justify-center cursor-pointer ${
                  selectedFaq === item.id
                    ? "bg-primary text-white rounded-full"
                    : "bg-white text-[#1C1B1D] hover:bg-primary hover:text-white hover:rounded-full"
                }`}
              >
                {item.title}
              </h1>
            ))}
            <div className="bg-white col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row justify-between items-center shadow-xl py-8 md:py-16 px-8 md:px-16 rounded-lg gap-4">
              <h3 className="text-xl md:text-2xl font-bold text-center md:text-left">
                OTHER QUESTIONS
              </h3>
              <Button className="gradient-primary text-white rounded-full text-xl font-bold px-6 min-h-16 hover:rounded-full w-full md:w-auto shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                Ask a question
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto py-20">
          <h2 className="text-3xl lg:text-6xl font-bold my-5 text-center mb-16">
            Explanatory
            <span className="bg-primary text-white px-4 py-1 rounded-lg ml-2">
              Videos
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {videodata.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-xl py-16 px-16 text-center rounded-lg"
              >
                <iframe
                  className="rounded-lg"
                  width="100%"
                  height="300"
                  src={item.src}
                  title="Explanatory Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <h2 className="text-3xl font-extrabold py-9">{item.title}</h2>
                <Button className="bg-white text-foreground rounded-full text-sm px-6 py-6 hover:rounded-full drop-shadow-2xl">
                  Play Video
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default SupportPage;
