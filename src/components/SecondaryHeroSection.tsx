import Image, { StaticImageData } from "next/image";
import PrimaryHeading from "./PrimaryHeading";
import { Button } from "./ui/button";
import crown from "@/app/images/crown.png";

import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

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
    <div className="">
      <div className="container mx-auto max-w-[1920px] relative">
        <Image
          src={bg}
          alt="hero"
          priority
          unoptimized
          className={
            title === "VIP Shop"
              ? "w-full h-[700px] sm:h-[600px] xl:h-[680px] object-cover object-end"
              : "w-full h-[350px] lg:h-[600px] xl:h-[600px] object-cover"
          }
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center mt-6 pb-10">
          <div className="lg:container text-center sm:text-start mx-auto px-0 sm:px-10 lg:px-10 flex flex-col-reverse sm:grid sm:grid-cols-2 lg:text-start">
            <div className="content-center">
              {title === "VIP Shop" ? (
                <div className="flex flex-col items-center sm:items-start justify-center">
                  <h2 className="text-white text-2xl font-bold mb-4 sm:mb-8 mt-8 sm:mt-10">
                    VIP Shop
                  </h2>
                  <PrimaryHeading
                    highlightText="Exclusive"
                    remainingText="Offers For"
                    remainingHeading="VIP Members"
                    textColor="text-white"
                  />
                  <p className="text-white mt-3 text-xl lg:text-2xl font-bold">
                    Take your chance to get a very special bargain.
                  </p>
                  <Button
                    style={{
                      background: `
                        linear-gradient(#330542, #330542) padding-box,
                        linear-gradient(116.76deg, #E4BD83 13.91%, #9C6727 28.84%, #FDF6AE 32.04%, #A06B2A 50.53%, #FDF6AE 53.15%, #BD8D42 71.14%) border-box
                      `,
                      border: "5px solid transparent",
                      borderRadius: "9999px",
                    }}
                    className="mt-7 w-[220px] lg:w-[312px] h-[70px] lg:h-[83px] text-xl lg:text-2xl font-bold flex items-center justify-center"
                  >
                    <Image
                      src={crown}
                      width={36}
                      height={36}
                      alt="crown"
                      className="w-[28px] h-[28px]"
                    />
                    Register
                  </Button>
                  <p className="text-white text-lg lg:text-xl mt-4">
                    Complete your{" "}
                    <span className="text-primary">ViP membership</span> now!
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="text-white text-3xl lg:text-5xl mb-10 lg:mb-0 text-center lg:text-start lg:text-[84px] font-bold capitalize">
                    {title}
                  </h1>
                  {support && (
                    <>
                      <p className="text-white text-xl mt-6 mb-14">
                        {description}
                      </p>
                      <div className="relative">
                        <Input
                          type="search"
                          placeholder="Search Duellarena, Turniere and more..."
                          className="w-full min-w-[741px] font-normal h-[78px] rounded-full pr-10 pl-16 border-gray-300 focus:border-primary text-foreground !ring-offset-0 !ring-0"
                        />
                        <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A5A5A5]" />
                        <Button
                          variant="default"
                          size="sm"
                          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white h-[60px] w-[132px] hover:bg-primary"
                        >
                          Search
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="col-span-1 m-auto">
              {rightimage && (
                <Image
                  src={rightimage}
                  alt="tournament"
                  className="w-full object-contain max-h-[180px] sm:max-h-[200px] lg:max-h-[260px] xl:max-h-[500px]"
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
// import Image, { StaticImageData } from "next/image";
// import PrimaryHeading from "./PrimaryHeading";
// import { Button } from "./ui/button";
// import crown from "@/app/images/crown.png";
// import Search from "./Search";

// const SecondaryHeroSection = ({
//   title,
//   rightimage,
//   bg,
//   description,
//   support,
// }: {
//   title?: string;
//   rightimage?: StaticImageData;
//   bg: StaticImageData;
//   description?: string;
//   support?: boolean;
// }) => {
//   return (
//     <div className="">
//       <div className="container mx-auto max-w-[1920px] relative">
//         <Image
//           src={bg}
//           alt="hero"
//           priority
//           className={
//             title === "VIP Shop"
//               ? "w-full h-[700px] lg:h-[600px] xl:h-[600px] object-cover"
//               : "w-full h-[700px] lg:h-[600px] xl:h-[600px] object-cover"
//           }
//         />
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pt-32 pb-10">
//           <div className="container mx-auto px-4 lg:grid lg:grid-cols-2 lg:text-start">
//             <div className="content-center">
//               {title === "VIP Shop" ? (
//                 <div className="flex flex-col items-start justify-center">
//                   <h2 className="text-white text-2xl font-bold mb-8">
//                     VIP Shop
//                   </h2>
//                   <PrimaryHeading
//                     highlightText="Exclusive"
//                     remainingText="OFFERS FOR"
//                     remainingHeading="VIP MEMBERS"
//                     textColor="text-white"
//                   />
//                   <p className="text-white text-2xl font-bold mt-4">
//                     Take your chance to get a very special bargain.
//                   </p>
//                   <Button
//                     style={{
//                       background: `
//                         linear-gradient(#330542, #330542) padding-box,
//                         linear-gradient(116.76deg, #E4BD83 13.91%, #9C6727 28.84%, #FDF6AE 32.04%, #A06B2A 50.53%, #FDF6AE 53.15%, #BD8D42 71.14%) border-box
//                       `,
//                       border: "8px solid transparent",
//                       borderRadius: "9999px",
//                     }}
//                     className="mt-10 w-[280px] h-[83px] text-2xl font-bold flex items-center justify-center"
//                   >
//                     <Image
//                       src={crown}
//                       width={36}
//                       height={36}
//                       alt="crown"
//                       className=""
//                     />
//                     Register
//                   </Button>
//                   <p className="text-white text-xl mt-4">
//                     Complete your{" "}
//                     <span className="text-primary">ViP membership</span> now!
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                 <h1 className="text-white text-5xl mb-10 lg:mb-0 text-center lg:text-start lg:text-7xl font-bold capitalize">
//                   {title}
//                 </h1>
//                 {support && (
//                   <>
//                     <p className="text-white text-xl mt-4 mb-10">
//                       {description}
//                     </p>
//                     <Search />
//                   </>
//                 )}
//                 </>
//               )}
//             </div>
//             <div className="col-span-1 mr-auto">
//               {rightimage && (
//                 <Image
//                   src={rightimage}

//                   alt="tournament"
//                   className="w-full h-full object-cover max-h-[500px]"

//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecondaryHeroSection;
