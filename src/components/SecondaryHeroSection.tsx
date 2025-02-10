import Image, { StaticImageData } from "next/image";
import PrimaryHeading from "./PrimaryHeading";
import { Button } from "./ui/button";
import crown from "@/app/images/crown.png";
import { Input } from "./ui/input";

const SecondaryHeroSection = ({
  title,
  rightimage,
  bg,
  description,
  support,
}: {
  title?: string;
  rightimage?: StaticImageData;
  bg: StaticImageData;
  description?: string;
  support?: boolean;
}) => {
  return (
    <div>
      <div className="container mx-auto max-w-[1920px] relative pt-20">
        <Image
          src={bg}
          alt="hero"
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start">
          <div className="container mx-auto px-4 grid grid-cols-2 gap-24">
            <div className="col-span-1 content-center">
              {title === "VIP Shop" ? (
                <>
                  <h4 className="text-white text-2xl font-bold mb-8">
                    VIP Shop
                  </h4>
                  <PrimaryHeading
                    highlightText="Exclusive"
                    remainingText="OFFERS FOR"
                    remainingHeading="VIP MEMBERS"
                    textColor="text-white"
                  />
                  <p className="text-white text-xl font-bold mt-4">
                    Take your chance to get a very special bargain.
                  </p>
               
                  <Button


                    style={{
                      background: `
                        linear-gradient(#330542, #330542) padding-box,
                        linear-gradient(116.76deg, #E4BD83 13.91%, #9C6727 28.84%, #FDF6AE 32.04%, #A06B2A 50.53%, #FDF6AE 53.15%, #BD8D42 71.14%) border-box
                      `,
                      border: "2px solid transparent",
                      borderRadius: "9999px",
                    }}
                    className="mt-4 px-12 py-7 flex items-center justify-center"
                  >
                    <Image
                      src={crown}
                      width={20}
                      height={20}
                      alt="crown"
                      className="w-5 h-5"
                    />
                    Register
                  </Button>
                  <p className="text-white text-xl mt-4">
                    Complete your{" "}
                    <span className="text-primary">ViP membership</span> now!
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-white text-8xl font-bold">{title}</h1>
                  <p className="text-white text-xl font-bold mt-4">
                    {description}
                  </p>
                  {support ? (
                  
                  <div className="relative mt-12">
                    <Input

                      type="search"
                      placeholder="Search products..."
                      className="w-full px-5 h-[60px] rounded-full pr-10 border-gray-300 focus:border-primary text-foreground !ring-offset-0 !ring-0"
                    />
                    <Button
                      variant="default"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white py-6 px-8"
                    >
                      Search
                    </Button>
                  </div>
                
                ):(<></>)}
                </>
              )}
            </div>
            <div className="col-span-1 content-center">
              {rightimage && (
                <Image
                  src={rightimage}
                  height={350}
                  width={450}
                  alt="tournament"
                  className="object-cover"

                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeroSection;
