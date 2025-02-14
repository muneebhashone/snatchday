import { DialogContent } from "@/components/ui/dialog";
import VisitTournament from "./VisitTournament";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import bg from "@/app/images/visittournamentmodal.png";

export function VisitTournamentModal({
  openModal,
  title,
  date,
  closeModal,
}: {
  closeModal?: (value: boolean) => void;
  openModal?: boolean;
  title: string;
  date: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: "center",
        height: "600px",
        width: "650px",
        position: "absolute",
        transform: "translateY(42%)",
      }}
      className={`z-50 bg-fill rounded-3xl -right-5 ${
        !openModal ? "hidden" : "block"
      }`}
    >
      <div className="relative w-full h-full">
        <X
          onClick={() => {
            closeModal && closeModal(false);
          }}
          className="text-white focus:outline-none w-9 h-9 absolute top-8 right-7 cursor-pointer"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start py-6 px-8 pr-12 mt-12">
          <h2 className="text-5xl font-extrabold text-white text-center">
            {title}
          </h2>
          <p className="text-white text-2xl mt-4 text-center font-extralight mb-2">
            Tournament starts on
            <span className="text-primary font-bold"> {date}</span>
          </p>
          <Button className="text-lg text-[#3a094a] mt-6 font-semibold hover:bg-white hover:text-[#3a094a] bg-white rounded-full w-[211px] h-[57px] shadow-[0px_4px_20px_rgba(255,255,255,0.5)] focus-visible:ring-0">
            <Link className="focus-visible:outline-none" href="/tournaments">
              Visit Tournament
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
