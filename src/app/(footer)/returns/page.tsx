import ClientLayout from "@/components/landing-page/ClientLayout";
import Image from "next/image";
import React from "react";
import box1 from "@/app/images/complianbox1.png";
import box2 from "@/app/images/complianbox2.png";
import { Separator } from "@/components/ui/separator";
import img1 from "@/app/images/complain1.png";
import img2 from "@/app/images/complain2.png";
import img3 from "@/app/images/complain3.png";
import img4 from "@/app/images/complain4.png";
import { Button } from "@/components/ui/button";

const ReturnsPage = () => {
  const content = [
    {
      heading: "Return / exchange items",
      img: img1,
      content: [
        "The product is in the original packaging and has not been opened",
        "You accidentally ordered the wrong item",
        "The product or packaging has no defects",
      ],
    },
    {
      heading: "Warranty / Item defective",
      img: img2,
      content: ["You received a defective product", "The product has a defect"],
    },
    {
      heading: "Error / Wrong article",
      img: img3,
      content: [
        "You received an incorrect product",
        "The product has a defective",
        "The product is incomplete",
      ],
    },
    {
      heading: "transport damage",
      img: img4,
      content: [
        "The package is damaged",
        "The product has transport-related damage",
      ],
    },
  ];

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-10">
        <div className="flex items-center justify-around pt-5">
          <Image src={box1} alt="box1" />
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
            Complaint & Return
          </h1>
          <Image src={box2} alt="" />
        </div>
        <Separator className="my-10" />
        <div className="px-[20%] flex flex-col gap-8 text-foreground">
          <div className="flex flex-col gap-3 font-medium">
            <p>
              We would like to offer you the opportunity to return goods to us
              easily and conveniently. If, contrary to expectations, an item
              does not meet your expectations, you can return it to us within 14
              days of receipt in addition to your legal right of cancellation.
            </p>
            <p>
              Below you can see how the different categories, such as
              cancellation, complaint, transport damage or incorrect delivery,
              are handled.
            </p>
            <p>
              Please note that in the event of a cancellation, you will have to
              bear the costs of returning the goods, whereas in the event of a
              complaint or an existing defect, you will not incur any shipping
              costs.
            </p>
            <p>
              For large components such as TV sets or large printers, you can
              save a lot of time by using the direct service (on-site exchange)
              of the respective manufacturer. You can find a corresponding list{" "}
              <a className="text-primary font-bold">
                {" "}
                <link rel="" href="#" /> here
              </a>
            </p>
            <p>Of course, you can also let us handle the process for you.</p>
          </div>
          <div className="flex flex-col gap-3  font-medium">
            <h1 className="font-extrabold text-foreground">
              Please note the following:
            </h1>
            <ol className="list-decimal list-inside pl-4">
              <li>
                The purchased goods must be returned undamaged and complete in
                the original packaging with all components.
              </li>
              <li>
                The purchased goods must be returned undamaged and complete in
                the original packaging with all components.
              </li>
              <li>
                The right of withdrawal does not apply to items that have been
                damaged through use.
              </li>
            </ol>
          </div>
          <div className="flex flex-col gap-10 font-medium mt-10">
            {content.map((item, index) => (
              <div className="grid grid-cols-2 items-center" key={index}>
                <Image
                  className={`self-center justify-self-center ${
                    index === content.length - 1 ? "mr-10" : "mr-0"
                  }`}
                  src={item.img}
                  alt=""
                />
                <div>
                  <h1 className="font-bold text-2xl">{item.heading}</h1>
                  <ul>
                    {item.content.map((li, index) => (
                      <li key={index}>{li}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-10 items-center justify-center text-center font-bold mt-5">
            <h1 className="">We need the following information:</h1>
            <p>
              With the help of our assistant, you can request a return with just
              a few clicks. Simply enter your order number. You will then be
              shown the products you purchased with this order.
            </p>
            <Button className="bg-primary text-white px-8 py-2 rounded-md text-md font-bold hover:border border-primary hover:bg-transparent hover:text-primary">
              Register
            </Button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ReturnsPage;
