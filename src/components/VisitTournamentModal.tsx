import { DialogContent } from "@/components/ui/dialog";
import VisitTournament from "./VisitTournament";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import bg from "@/app/images/visittournament.png";

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
  // <DialogContent className="bg-transparent border-none max-w-[780px] left-[83%]">
  return (
    <div
      className={`min-w-[650px] min-h-[623px] absolute top-[30vh] -right-6 z-50 ${
        !openModal ? "hidden" : "block"
      }`}
    >
      {/* <DialogClose className="max-w-[780px] absolute right-8 top-16 z-50 focus-visible:outline-none"> */}
      {/* </DialogClose>  */}
      <div className=" top-10 right-0 mt-10">
        <X
          onClick={() => { closeModal && closeModal(true) }}
          className="text-white focus:outline-none w-9 h-9 absolute top-16 right-7"
        />
        <Image
          src={bg}
          alt="tournament"
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start py-6 px-8 pr-12 mt-24">
          <h2 className="text-5xl font-extrabold text-white text-center">
            {title}
          </h2>
          <p className="text-white text-2xl mt-4 text-center font-extralight">
            Tournament starts on
            <span className="text-primary font-bold"> {date}</span>
          </p>
          <Button className="text-lg text-[#3a094a] mt-6 font-semibold bg-white rounded-full w-[211px] h-[57px] shadow-[0px_4px_20px_rgba(255,255,255,0.5)] focus-visible:ring-0               ">
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
