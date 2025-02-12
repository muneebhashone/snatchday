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
    
        <div className=" flex flex-col lg:flex-row items-center justify-start gap-6 shadow-xl py-3 lg:py-12 px-8 lg:px-16 rounded-lg hover:shadow-xl hover: border-2 hover:border-primary">
          <Image src={image} alt="ticket" />

          <div>
            <p className="text-gray-500 text-xl">{categorytext}</p>
            <h3 className="text-black text-2xl font-bold mt-3">
              {categorytitle}
            </h3>

          </div>
        </div>
    
  );
};

export default CreateTicket;
