// import { X } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";
import bg from "@/app/images/visittournamentmodal.png";

export function VisitTournamentModal({
  openModal,
  title,
  date,

}: {
 
  openModal?: boolean;
  title: string;
  date: string;
}) {
  // <DialogContent className="bg-transparent border-none max-w-[780px] left-[83%]">
  //   <div
  //     style={{ backgroundImage: `url(${bg.src})` }}
  //     className={`min-w-[40%] bg-black min-h-[623px] absolute top-[50vh] -right-6 z-50 object-cover object-center ${
  //       !openModal ? "hidden" : "block"
  //     }`}
  //   >
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: "center", // Centers the image
        height: "600px", // Fixed height for the modal
        width: "650px", // Fixed width for the modal
        position: "absolute", // Absolute positioning relative to the parent
        transform: "translateY(42%)", // This ensures the modal is truly centered vertically
      }}
      className={`z-50 bg-fill rounded-3xl -right-5 ${
        !openModal ? "hidden" : "block"
      }`}
    >
      <div className="relative w-full h-full">
        {/* <X
          onClick={() => {
            closeModal && closeModal(true);
          }}
          className="text-white focus:outline-none w-9 h-9 absolute top-8 right-7"
        /> */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start py-6 px-8 pr-12 mt-12">
          <h2 className="text-5xl font-extrabold text-white text-center">
            {title}
          </h2>
          <p className="text-white text-2xl mt-4 text-center font-extralight mb-2">
            Tournament starts on
            <span className="text-primary font-bold"> {date}</span>
          </p>
          <Button className="text-lg text-[#3a094a] mt-6 font-semibold bg-white rounded-full w-[211px] h-[57px] shadow-[0px_4px_20px_rgba(255,255,255,0.5)] focus-visible:ring-0">
            <Link className="focus-visible:outline-none" href="/tournament">
              Visit Tournament
            </Link>
          </Button>
        </div>
      </div>
    </div>
    // </DialogContent>
  );
}
