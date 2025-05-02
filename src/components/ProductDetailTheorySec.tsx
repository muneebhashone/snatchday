import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";
import user from "@/app/images/avatarimage.svg";

const specifications = {
  para: [
    "By participating in our tournaments and duels, the participant expressly and bindingly accepts the following conditions of participation. Our platform offers you the opportunity to compete against other players in skill and logic games in the form of tournaments or duels.",

    "Each game has its own specific rules, which can be viewed in the announcement. To participate in the tournaments or duels, registration on our website is required. Each user can only register once. For more information on the registration process, please see our Terms and Conditions, Section 6.",

    "There is no entitlement to conclude a user agreement with us. We reserve the right to reject registration requests without giving reasons, and the user data provided will be deleted immediately. If a player wants to take part in paid tournaments or duels, they must first top up their credit, with various payment methods available. Topping up the credit is free of charge.",

    "To take part in a tournament, the entry fee specified in the announcement or the required Snap Points must be paid. The entry fee is debited from the player's virtual stake account after registration, which must have sufficient funds to cover the entry fee. The Snap Points are automatically converted into discount points, which cannot be paid out.",

    "The entry fee entitles players to participate, but is not directly related to the chance of winning (i.e. purchasing the product). With each additional participant, the price of the respective product decreases until the final price is €1. The number of participants is limited in each tournament to allow a higher chance of success. The winner(s) receive the right to purchase the corresponding product at the last offer price, but are not obliged to purchase it.",

    "Please note that the offer price is only valid for 24 hours, after which the claim expires. You can participate in a maximum of 3 tournaments within a month. Misuse of our website is strictly prohibited. If manipulation or attempted manipulation is detected, we reserve the right to exclude participants without giving reasons. We can also subsequently cancel a tournament or duel if manipulation or violations of section 9 of our terms and conditions are detected.",

    "In such a case, there is no entitlement to a prize. If misuse is proven, the participant is liable to Snatch Day for lost participation fees and the costs incurred for the verification. All other claims, in particular claims for damages, remain unaffected. Persons who are under 18 years of age or who otherwise have limited legal capacity are not permitted to register on our website. Employees and staff of Snatch Day and their relatives are not permitted to take part in tournaments and duels and cannot win any prizes for themselves or third parties.",

    "Snatch Day GmbH reserves the right to cancel the tournament/duel in whole or in part or to change the game rules/participation fees. In the event of cancellation, the points used will be credited. Snatch Day GmbH is not liable for the technical requirements being met or for timely participation in the tournament or duel.",
  ],
};
const gameInstructions = [
  "Each game has its own specific rules, which can be found in the announcement. To participate in tournaments or duels, registration on our website is required. Each user can only register once. For more information on the registration process, please see Section 6 of our Terms and Conditions.",

  "There is no entitlement to conclude a user agreement with us. We reserve the right to reject registration requests without stating reasons, and the provided user data will be deleted immediately. If a player wishes to participate in paid tournaments or duels, they must first top up their account. Various payment methods are available. Topping up the account is free of charge.",

  "To participate in a tournament, the entry fee specified in the announcement or the required Snap Points must be paid. The entry fee will be debited from the player's virtual stake account after registration, which must have sufficient funds to cover the entry fee. Snap Points are automatically converted into discount points, which cannot be cashed out.",

  "The entry fee entitles players to participate, but is not directly related to the chance of winning (i.e., purchasing the product). With each additional participant, the price of the respective product decreases until a final price of €1 is reached. The number of participants is limited in each tournament to increase the chance of success. The winner(s) receives the right to purchase the corresponding product at the final offer price, but is not obligated to purchase.",

  "Please note that the offer price is only valid for 24 hours, after which the claim expires. You can participate in a maximum of 3 tournaments within a month. Misuse of our website is strictly prohibited. If manipulation or attempted manipulation is detected, we reserve the right to exclude participants without giving reasons. We may also subsequently cancel a tournament or duel if manipulation or violations of Section 9 of our Terms and Conditions are detected.",

  "In such a case, there is no entitlement to a prize. If misuse is proven, the participant is liable to Snatch Day for lost participation fees and the costs incurred for the verification. All other claims, in particular claims for damages, remain unaffected. Persons under the age of 18 or who otherwise have limited legal capacity are not permitted to register on our website. Snatch Day employees and staff, as well as their dependents, are not permitted to participate in tournaments and duels and cannot earn any winnings for themselves or third parties.",

  "Snatch Day GmbH reserves the right to cancel the tournament/duel in whole or in part, or to change the game rules/participation fees. In the event of cancellation, the points used will be credited. Snatch Day GmbH assumes no liability for the technical requirements or timely participation in the tournament or duel.",
];

const technicalData = [
  "Each game has its own specific rules, which can be found in the announcement. To participate in tournaments or duels, registration on our website is required. Each user can only register once. For more information on the registration process, please see Section 6 of our Terms and Conditions.",

  "There is no entitlement to conclude a user agreement with us. We reserve the right to reject registration requests without stating reasons, and the provided user data will be deleted immediately. If a player wishes to participate in paid tournaments or duels, they must first top up their account. Various payment methods are available. Topping up the account is free of charge.",

  "To participate in a tournament, the entry fee specified in the announcement or the required Snap Points must be paid. The entry fee will be debited from the player's virtual stake account after registration, which must have sufficient funds to cover the entry fee. Snap Points are automatically converted into discount points, which cannot be cashed out.",

  "The entry fee entitles players to participate, but is not directly related to the chance of winning (i.e., purchasing the product). With each additional participant, the price of the respective product decreases until a final price of €1 is reached. The number of participants is limited in each tournament to increase the chance of success. The winner(s) receives the right to purchase the corresponding product at the final offer price, but is not obligated to purchase.",

  "Please note that the offer price is only valid for 24 hours, after which the claim expires. You can participate in a maximum of 3 tournaments within a month. Misuse of our website is strictly prohibited. If manipulation or attempted manipulation is detected, we reserve the right to exclude participants without giving reasons. We may also subsequently cancel a tournament or duel if manipulation or violations of Section 9 of our Terms and Conditions are detected.",

  "In such a case, there is no entitlement to a prize. If misuse is proven, the participant is liable to Snatch Day for lost participation fees and the costs incurred for the verification. All other claims, in particular claims for damages, remain unaffected. Persons under the age of 18 or who otherwise have limited legal capacity are not permitted to register on our website. Snatch Day employees and staff, as well as their dependents, are not permitted to participate in tournaments and duels and cannot earn any winnings for themselves or third parties.",

  "Snatch Day GmbH reserves the right to cancel the tournament/duel in whole or in part, or to change the game rules/participation fees. In the event of cancellation, the points used will be credited. Snatch Day GmbH assumes no liability for the technical requirements or timely participation in the tournament or duel.",

  "Proin auctor felis nec arcu cursus eget dapibus mauris faucibus. Nullam auctor, ipsum sed tincidunt varius, lectus risus fermentum libero, in imperdiet nulla sapien sed urna. Sed non sagittis nibh. Integer aliquet diam nec lectus dignissim sagittis. Suspendisse sagittis suscipit laoreet. Suspendisse eu tempus leo. Phasellus neque velit, fringilla a venenatis sed, varius ut lectus. Cras in posere nisi. Phasellus ligula tortor, porta et dapibus vel, blandit sit amet magna.",
];
const ProductDescription = [
  "Each game has its own specific rules, which can be found in the announcement. To participate in tournaments or duels, registration on our website is required. Each user can only register once. For more information on the registration process, please see Section 6 of our Terms and Conditions.",

  "There is no entitlement to conclude a user agreement with us. We reserve the right to reject registration requests without stating reasons, and the provided user data will be deleted immediately. If a player wishes to participate in paid tournaments or duels, they must first top up their account. Various payment methods are available. Topping up the account is free of charge.",

  "To participate in a tournament, the entry fee specified in the announcement or the required Snap Points must be paid. The entry fee will be debited from the player's virtual stake account after registration, which must have sufficient funds to cover the entry fee. Snap Points are automatically converted into discount points, which cannot be cashed out.",

  "The entry fee entitles players to participate, but is not directly related to the chance of winning (i.e., purchasing the product). With each additional participant, the price of the respective product decreases until a final price of €1 is reached. The number of participants is limited in each tournament to increase the chance of success. The winner(s) receives the right to purchase the corresponding product at the final offer price, but is not obligated to purchase.",

  "Please note that the offer price is only valid for 24 hours, after which the claim expires. You can participate in a maximum of 3 tournaments within a month. Misuse of our website is strictly prohibited. If manipulation or attempted manipulation is detected, we reserve the right to exclude participants without giving reasons. We may also subsequently cancel a tournament or duel if manipulation or violations of Section 9 of our Terms and Conditions are detected.",

  "In such a case, there is no entitlement to a prize. If misuse is proven, the participant is liable to Snatch Day for lost participation fees and the costs incurred for the verification. All other claims, in particular claims for damages, remain unaffected. Persons under the age of 18 or who otherwise have limited legal capacity are not permitted to register on our website. Snatch Day employees and staff, as well as their dependents, are not permitted to participate in tournaments and duels and cannot earn any winnings for themselves or third parties.",

  "Snatch Day GmbH reserves the right to cancel the tournament/duel in whole or in part, or to change the game rules/participation fees. In the event of cancellation, the points used will be credited. Snatch Day GmbH assumes no liability for the technical requirements or timely participation in the tournament or duel.",

  "Acer Aspire 3 A315-35 - Intel Pentium Silver N6000 / 1.1 GHz - Win 11 Home - UHD Graphics - 8 GB RAM - 512 GB SSD QLC - 39.62 cm (15.6`) IPS 1920 x 1080 (Full HD) - Wi-Fi 5 - Pure Silver - kbd: German",
];

const dummyParticipants = [
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
    {
      name: "John Doe",
      image: user,
    },
];

const ProductDetailTheorySec = ({
  description,
  participants,
}: {
  description: string;
  participants: {
    name: string;
    image: string;
  }[];
}) => {
  return (
    <div className="bg-white mt-8 max-w-[1440px] mx-auto">
      <Tabs defaultValue="description1" className="w-full">
        <TabsList className="border-gray-200 w-full justify-start h-auto p-0 bg-transparent gap-2">
          <TabsTrigger
            value="description1"
            className="text-[16px] shadow-[-1px_-1px_5px_#e9f0ff] text-[#444444] capitalize  font-medium px-6 py-2 rounded-none rounded-t-sm  data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            conditions of participation
          </TabsTrigger>
          <TabsTrigger
            value="description2"
            className="text-[16px] shadow-[-1px_-1px_5px_#e9f0ff] text-[#444444] capitalize  font-medium px-6 py-2 rounded-none rounded-t-sm  data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            game instructions
          </TabsTrigger>
          <TabsTrigger
            value="description3"
            className="text-[16px] shadow-[-1px_-1px_5px_#e9f0ff] text-[#444444] capitalize font-medium px-6 py-2 rounded-none rounded-t-sm  data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            Technical data
          </TabsTrigger>
          <TabsTrigger
            value="description4"
            className="text-[16px] shadow-[-1px_-1px_5px_#e9f0ff] text-[#444444] capitalize font-medium px-6 py-2 rounded-none rounded-t-sm  data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            product description
          </TabsTrigger>
          <TabsTrigger
            value="participants"
            className="text-[16px] shadow-[-1px_-1px_5px_#e9f0ff] text-[#444444] capitalize font-medium px-6 py-2 rounded-none rounded-t-sm  data-[state=active]:bg-[#FF6B3D] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            participants
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="description1"
          className="py-8 mt-0 border border-gray-300"
        >
          <div className="grid grid-cols-1 px-10 space-y-4">
            {specifications.para.map((spec, index) => (
              <p key={index} className="space-y-4 text-lg">
                {spec}
              </p>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="description2" className="py-8 mt-0">
          <div className="grid grid-cols-1 gap-x-32">
            <div className="text-sm text-gray-600">
              <div className="grid grid-cols-1 px-10 space-y-4">
                {gameInstructions.map((instruction, index) => (
                  <p className="space-y-4 text-lg" key={index}>
                    {instruction}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="description3" className="py-8 mt-0">
          <div className="grid grid-cols-1 px-10 space-y-4">
            {technicalData.map((spec, index) => (
              <p key={index} className="space-y-4 text-lg">
                {spec}
              </p>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="description4" className="py-8 mt-0">
          <div className="grid grid-cols-1 px-10 space-y-4">
            {ProductDescription.map((spec, index) => (
              <p key={index} className="space-y-4 text-lg">
                {description}
              </p>
            ))}
          </div>
        </TabsContent>
        <TabsContent
          value="participants"
          className="py-8 mt-0 max-h-[300px] overflow-y-auto "
        >
          <div className="flex flex-wrap gap-10 px-10 space-y-4 w-full items-center justify-start ">
            {dummyParticipants.map((participant, index) => (
              <p
                key={index}
                className="space-y-4 text-lg flex items-center gap-2 "
              >
                <Image
                  src={participant.image || user}
                  alt={participant.name}
                  width={50}
                  height={50}
                  className="rounded-full object-fill object-center"
                />
                {participant.name}
              </p>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetailTheorySec;
