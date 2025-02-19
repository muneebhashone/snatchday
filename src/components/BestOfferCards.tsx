import React from "react";
import Image, { StaticImageData } from "next/image";

interface BestOfferCardProps {
  tag: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: StaticImageData;
  bgimage: StaticImageData;
  buttonTextcolor: string;
}

const BestOfferCard = ({
  tag,
  title,
  subtitle,
  buttonText,
  image,
  bgimage,
  buttonTextcolor,
}: BestOfferCardProps) => {
  return (
    <div style={{ backgroundImage: `url(${bgimage.src})` }} className="bg-cover bg-center rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-300 lg:w-[880px] w-[500px] md:min-w-[600px] min-h-[320px] h-[450px] md:h-[420px] flex items-center justify-center">
      {/* Content */}
      <div className="inset-0 p-4 md:p-6 lg:p-10 flex flex-col md:flex-row items-center md:items-center justify-between">
        <div className="md:w-[40%] space-y-3 md:space-y-4 md:mt-0 mt-2 md:block flex flex-col items-center md:items-start text-center md:text-start">
          {/* Tag Badge */}
          <h2 className="inline-flex items-center px-6 py-2 text-sm md:text-lg border border-white rounded-lg text-white font-extrabold">
            {tag}
          </h2>

          {/* Title Section */}
          <div className="space-y-1 md:space-y-3">
            <h3 className="text-xl md:text-2xl lg:text-[28px] text-white font-normal">
              {title}
            </h3>
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white">
              {subtitle}
            </h2>
          </div>

          {/* Button */}
          <button
            className={`w-max bg-white px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium hover:bg-white/90 transition-all`}
            style={{ color: buttonTextcolor }}
          >
            {buttonText}
          </button>
        </div>

        {/* Product Image */}
        <div className="w-[82%] md:w-[60%] mt-2 md:mt-0">
          <div className="flex justify-center md:justify-end">
            <Image
              src={image}
              alt="Product"
              width={468}
              height={300}
              className="md:w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOfferCard;
// import React from "react";
// import Image, { StaticImageData } from "next/image";

// interface BestOfferCardProps {
//   tag: string;
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   image: StaticImageData;
//   bgimage: StaticImageData;
//   buttonTextcolor: string;
// }

// const BestOfferCard = ({
//   tag,
//   title,
//   subtitle,
//   buttonText,
//   image,
//   bgimage,
//   buttonTextcolor,
// }: BestOfferCardProps) => {
//   return (
//     <div style={{backgroundImage:`url(${bgimage.src})`}} className="bg-cover bg-center rounded-3xl overflow-hidden group hover:shadow-lg transition-all duration-300 lg:w-[850px] w-[800px] md:min-w-[600px] min-h-[320px] h-[450px]">
//       {/* Background Image */}
//       {/* <div className="w-full h-full">
//         <Image
//           src={bgimage}
//           alt="Background"
//           width={892}
//           height={500}
//           className="w-full h-full object-cover "
//           priority
//         />
//       </div> */}

//       {/* Content */}
//       <div className="inset-0 p-4 md:p-6 lg:pl-16 lg:pt-14 lg:pb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between">
//         <div className="space-y-3 md:space-y-7 w-full mt-5 sm:mt-0 ml-10 sm:ml-0">
//           {/* Tag Badge */}
//           <h2 className="inline-flex items-center px-6 py-2 text-sm md:text-lg border border-white rounded-lg text-white font-extrabold">
//             {tag}
//           </h2>

//           {/* Title Section */}
//           <div className="space-y-1 md:space-y-5 ">
//             <h3 className="text-2xl lg:text-[28px] text-white font-normal">
//               {title}
//             </h3>
//             <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-white">
//               {subtitle}
//             </h2>
//           </div>

//           {/* Button */}
//           <button
//             className={`w-max bg-white px-4 md:px-7 py-2 md:py-4 rounded-full font-bold text-[18px] md:text-base hover:bg-white/90 transition-all`}
//             style={{ color: buttonTextcolor }}
//           >
//             {buttonText}
//           </button>
//         </div>

//         {/* Product Image */}
//         <div className="h-full w-full mt-2 sm:mt-4 md:mt-0">
//           {/* <div className="flex items-center"> */}
//             <Image
//               src={image}
//               alt="Product"
//               width={468}
//               height={300}
//               className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
//             />
//           {/* </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BestOfferCard;
