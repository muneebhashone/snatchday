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
    
        <div className=" flex flex-col lg:flex-row items-center border-0 border-gray-100 justify-start gap-6 shadow-xl py-3 lg:py-12 px-5 lg:px-10 rounded-lg hover:shadow-xl hover:border hover:border-orange-500">
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
