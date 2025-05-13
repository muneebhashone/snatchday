"use client";
import modalImage from "@/app/images/promoitonModalImage.png";
import imageBg from "@/app/images/promotionalBg.png";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  useGetCompetitions,
  useGetPoints,
  useParticipantInCompetition,
} from "@/hooks/api";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { toast } from "sonner";
import { IError } from "@/app/admin/games/create/page";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function PromotionModal() {
  const currentMonth = (new Date().getMonth() + 1).toString();
  const { data: competition, isLoading } = useGetCompetitions({
    month: currentMonth,
    status: "active",
  });
  const competitionData = competition?.data[0];
  const [answer, setAnswer] = useState("");
  const [acceptTerms, setAcceptTerms] = useState("");
  const { data: getPoints } = useGetPoints();
  const { mutate: participate, isPending } = useParticipantInCompetition(
    competitionData?._id
  );
  const snapPointsRatio = getPoints?.data?.snapPointsRatio;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const currentMonthName = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toLocaleString("default", { month: "long" });

  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Set target date to last day of current month at 17:55 (5:55 PM)
    const targetDate = new Date(currentYear, currentMonth + 1, 0, 17, 55, 0);

    const difference = targetDate.getTime() - now.getTime();
    // const endOfMonth = new Date(
    //   new Date().getFullYear(),
    //   new Date().getMonth() + 1,
    //   0
    // );
    // const diff2 = endOfMonth - now.getTime() ;
    // console.log(diff2, "difference");

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    } else {
      // If we're past the deadline, show all zeros
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(currentMonth);
    console.log(competition);
    console.log(getPoints);
  }, [competition, getPoints]);

  const time = [
    {
      timer: timeLeft.days,
      timerText: "Days",
    },
    {
      timer: timeLeft.hours,
      timerText: "Hours",
    },
    {
      timer: timeLeft.minutes.toString().padStart(2, "0"),
      timerText: "Minutes",
    },
    {
      timer: timeLeft.seconds.toString().padStart(2, "0"),
      timerText: "Seconds",
    },
  ];
  const handleParticipate = () => {
    if (acceptTerms === "accept" && answer !== "") {
      participate(
        { answer: answer },
        {
          onSuccess: (data) => {
            toast.success(
              "you have been participated successfully result will be announced at the end of the month"
            );
          },
          onError: (error) => {
            toast.error(
              `${(error as unknown as IError)?.response?.data?.message}` ||
                "Something went wrong"
            );
          },
        }
      );
    } else if (answer === "") {
      toast.error("Please select an answer");
    } else if (acceptTerms !== "accept") {
      toast.error("Please accept the terms and conditions");
    }
  };
  return (
    <div className="">
      <DialogContent className="max-w-[1504px] max-h-[90vh] p-0 border-none flex flex-col items-center gap-0">
        <DialogClose className="p-5 absolute z-50 bg-white rounded-full -right-5 -top-5">
          <X />
        </DialogClose>
        <DialogHeader
          style={{ backgroundImage: `url(${imageBg.src})` }}
          className="w-full object-contain min-h-[226px] bg-no-repeat bg-center rounded-t-3xl flex items-center justify-center sticky top-0 z-40"
        >
          <DialogTitle className="flex flex-col gap-3 lg:gap-7 items-center">
            <h1 className="text-white text-xl md:text-3xl lg:text-[48px] font-extrabold">
              Competition In{" "}
              <span className="bg-[#FF6B3D] py-1 px-2 rounded-lg">
                &quot;{currentMonthName}&quot;
              </span>
            </h1>
            <p className="text-white text-xs sm:text-sm lg:text-[24px] font-normal bg-[#D9AEE7] bg-opacity-10  py-4 px-14 rounded-full">
              Participation costs{" "}
              <span className="text-primary font-bold">{`${
                competitionData?.fee / snapPointsRatio
              }€ / ${competitionData?.fee}`}</span>{" "}
              {/* competitionData?.fee
              }€ / ${competitionData?.fee * snapPointsRatio}`}</span>{" "} */}
              snap points
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-hidden ">
          <div className="grid grid-cols-1 sm:grid-cols-2 pb-2 sm:pb-16 mx-auto gap-4">
            {/* Left side section */}
            <div className="sm:w-max flex flex-col justify-between items-center py-16 border-r pr-10 pl-20 ">
              <Image
                className="xl:w-[580px] lg:w-[420px] md:w-[320px] sm:w-[250px] w-[180px] h-[350px] object-contain"
                src={competitionData?.product?.images[0]}
                width={580}
                height={350}
                alt="PromationModal"
              />
              <div className="flex items-center justify-between gap-1 md:gap-4 relative z-10 mt-10">
                {time?.map((item) => (
                  <div
                    key={item.timer}
                    className="text-center flex flex-col items-center text-xs lg:text-lg"
                  >
                    <div className="bg-opacity-50 text-md sm:w-max lg:text-4xl border px-2 lg:px-7 py-1 lg:py-2">
                      <h1 className="font-light">{item.timer}</h1>
                    </div>
                    <p className="text-sm">{item.timerText}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right side content */}
            <div className="flex flex-col gap-3 md:gap-5 sm:items-start items-center pt-10 pr-16">
              <div className="flex flex-col gap-4 sm:items-start justify-start">
                <p className="text-lg">This month you can get the product</p>
                <h1 className="text-[#1C1B1D] text-lg sm:text-3xl md:text-5xl font-extrabold line-clamp-2 capitalize">
                  {competitionData?.product?.name}
                </h1>
                <p className="md:text-lg text-sm">
                  The winner will be drawn on the 5th of each month at 6 p.m.
                  You can find further information in the terms and conditions.
                  The closing date for entries is 5:55 p.m.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:w-max">
                <p className="font-bold text-lg md:text-xl">
                  {competitionData?.question}
                </p>
                <RadioGroup
                  className="flex justify-between"
                  defaultValue="i"
                  onValueChange={(value) => setAnswer(value)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      className="focus-visible:ring-transparent "
                      value={competitionData?.wrongAnswer}
                      id="r2"
                    />
                    <Label
                      className="font-bold capitalize text-lg"
                      htmlFor="r2"
                    >
                      {competitionData?.wrongAnswer}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={competitionData?.rightAnswer}
                      id="r1"
                    />
                    <Label
                      className="font-bold capitalize text-lg"
                      htmlFor="r1"
                    >
                      {competitionData?.rightAnswer}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-4 md:gap-5">
                <RadioGroup
                  className="flex justify-between"
                  defaultValue="i"
                  onValueChange={(value) => setAcceptTerms(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      className="h-7 w-7 focus-visible:ring-transparent"
                      value="accept"
                      id="r2"
                    />
                    <Label className="text-lg font-normal" htmlFor="r2">
                      I accept the conditions of participation.
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-2">
                  <button
                    disabled={isPending}
                    onClick={handleParticipate}
                    className="md:text-xl text-xs h-[60px] w-[270px] rounded-full gradient-primary text-white"
                  >
                    {isPending ? "Participating..." : "Participate For A Fee"}
                  </button>
                </div>
                <p className="text-lg">
                  Participation fee{" "}
                  <span className="font-semibold">
                    {/* {competitionData?.fee * snapPointsRatio} */}
                    {competitionData?.fee}
                  </span>{" "}
                  snap points /{" "}
                  <span className="font-semibold">
                    {/* {competitionData?.fee}€ */}
                    {competitionData?.fee / snapPointsRatio}€
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  );
}
