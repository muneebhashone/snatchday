import Image, { StaticImageData } from "next/image";
import React from "react";

const CreateTicket = ({
  image,
  categorytext,
  categorytitle,
}: {
  image: StaticImageData;
  categorytext: string;
  categorytitle: string;
}) => {
  return (
    
        <div className=" flex flex-col lg:flex-row items-center bg-white justify-start gap-6 shadow-lg py-3 lg:py-12 px-5 lg:pl-16 rounded-xl hover:shadow-xl hover:border hover:border-orange-500">
          <Image src={image} alt="ticket" />

          <div>
            <p className="text-gray-500 text-xl">{categorytext}</p>
            <h3 className="text-[#1C1B1D] text-3xl font-extrabold">
              {categorytitle}
            </h3>

          </div>
        </div>
    
  );
};

export default CreateTicket;
