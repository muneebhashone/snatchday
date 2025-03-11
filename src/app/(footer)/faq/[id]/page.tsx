"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HomeIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const faqData = [
  {
    category: "ABOUT SNATCH DAY",
    items: [
      {
        question: "What is Snatch Day?",
        answer: `The new online shop with "Bargain or Discount" tournaments
  
  
  
  Snatch Day is an online shop with a platform for skill games with the possibility of winning.
  
  At Snatch Day you can buy various products at the usual market price. In comparison to a normal online shop, users at Snatch Day have the opportunity to take part in daily bargain or discount tournaments and play against each other. To do this, you top up your credit, which can also be used in the online shop. In the paid tournaments, thinking and logic games are played, and skill, thinking ability and experience alone determine the outcome of the game. With each additional participant, the purchase price of the product drops to a final price of €1. Depending on the number of items, the members who completed the game the fastest or most successfully according to the given rules have the opportunity to purchase the product at the respective price; there is no obligation to purchase.
  
  Participants who were unable to win a tournament can still redeem their credit in the online shop from the respective purchase price. The credit is retained but can no longer be paid out, but can be used in the online shop.
  
  In return, the customer had the chance to purchase a product at a much lower price and lost nothing even if the purchase was unsuccessful.`,
      },
      {
        question: "How does Snatch Day work?",
        answer: `In short:
  
  recharge credit
  Select a desired tournament and participate 
  Grab a bargain with your skill
  Or collect discount points and redeem them in the online shop
  The best thing to do is to watch our short explanatory videos, where you can get a better overview.`,
      },
    ],
  },
  {
    category: "REGISTER",
    items: [
      {
        question: "How can I participate in Snatch Day?",
        answer: `Simply register, top up your account, and join a tournament.`,
      },
      {
        question: "Is registration free?",
        answer: `Yes, registration is free!`,
      },
    ],
  },
  {
    category: "MY ACCOUNT",
    items: [
      {
        question: "What do I do if I forget my password?",
        answer: `Under "Log in", click on the link "Forgot password". You will then receive a new password at the email address you provided.Simply register, top up your account, and join a tournament.`,
      },
      {
        type: "list",
        question: "How do I deposit money into my account?",
        answer: `To buy snap points you must have successfully registered. You can then purchase snap points conveniently and easily using our secure payment methods. These will be credited to your account immediately after successful payment. And this is how it works:`,
        li: [
          "Log in with your login details.",
          'Click on the "Top up credit" button in the "My account" area or on the "€" symbol at the top right.',
          "Select an amount of money.",
          "Then choose one of the secure payment methods offered: PayPal, Sofortüberweisung, Giropay, Klarna or credit card (Visa, MasterCard).",
          "Enter your payment details and confirm the purchase.",
        ],
        remainingAnswer:
          "The points will be credited to you immediately after successful payment.",
      },
      {
        question: "Where can I see how much money/points I have in my account?",
        answer: `Your balance is always displayed at the top right or in your My Account area.`,
      },
      {
        question: "Where can I find an overview of my participation fees?",
        answer: `In "My Account" under the menu item "Points History" you get a precise insight into when and where you used points. Under the menu item "Tournaments" you can see exactly which tournaments you have taken part in.`,
      },
      {
        question: "How can I change personal information?",
        answer: `You can find your personal data under the menu item "My Account" under "Profile". If you have moved or your data has changed, you can simply make and save changes here.`,
      },
      {
        question: "How can I change my username?",
        answer: `You can also change your user name under the menu item "My Account" under "Profile".`,
      },
      {
        question: "How can I change my password?",
        answer: `To change your password, you must first be logged in. You can then go to the menu item "My Account" under "Profile", "Change Password" and enter your old password to change your password.`,
      },
    ],
  },
  {
    category: "POINT SYSTEM",
    items: [
      {
        question: "How does the points system work?",
        answer: `1 point equals 1 cent.
Accordingly, 500 points = 5€

To create or accept a duel, 25 points/0.25€ are required.
Deposited funds can be withdrawn at any time.
Snap Points used in a tournament can no longer be paid out, but can still be used in the online shop.`,
      },
      {
        question: "What types of points are there?",
        answer: `There are 2 types of points, snap points and discount points, which differ in their payout capability.

Snap points can be cashed out.

Discount points can be used in our online shop starting from the respective purchase values.`,
      },
      {
        question: "What are snap points?",
        answer: `By topping up your credit using one of our secure payment options, you can top up your Snap Points. These also serve as full currency in our online shop and can be redeemed in the shopping cart if required. Snap Points can be paid out again and credited back using your selected payment option.`,
      },
      {
        type: "list2",
        question: "What are discount points?",
        answer: `Snap points used are automatically converted into discount points. If you join a tournament, you can redeem your snap points in full in the form of a discount in the online shop. These are valid for 12 months and a maximum of 5000 snap points/€50 can be used at a time.
Please note that discount points can only be redeemed for the respective purchase value/value of goods.

The following grading applies:`,

        listLeft: [
          "500 points 5 €",
          "1000 points 10€",
          "1500 points 15€",
          "2000 points 20 €",
          "2500 points 25 €",
          "3000 points 30 €",
          "3500 points 35 €",
          "4000 points 40 €",
          "4500 points 45 €",
          "5000 points 50 €",
        ],
        listRight: [
          "from 99 € purchase value",
          "from 199 € purchase value",
          "from 299 € purchase value",
          "from 399 € purchase value",
          "from 499 € purchase value",
          "from 599 € purchase value",
          "from 699 € purchase value",
          "from 799 € purchase value",
          "from 899 € purchase value",
          "from 999 € purchase value",
        ],
      },
      {
        question: "Can I cash out discount points?",
        answer: `No, the discount points cannot be paid out, but they can be redeemed in our online shop based on the respective purchase value.`,
      },
      {
        question: "Can I cash out snap points?",
        answer: `Yes, you can withdraw Snap Points at any time. Please note that a withdrawal fee of €1 will be charged.`,
      },
      {
        question: "How can I collect points?",
        answer: `50 points Facebook Like
100 points Share page
100 points Refer a friend
Further promotions will be announced`,
      },
      {
        question: "How long are the discount points valid?",
        answer: `These are valid indefinitely until further notice.`,
      },
      {
        question: "Are there any costs for a payout?",
        answer: `Yes, there is a withdrawal fee of €1 per withdrawal.`,
      },
    ],
  },
];

const FaqDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [openSubAccordion, setOpenSubAccordion] = useState<string>("");

  useEffect(() => {
    if (id) {
      setOpenAccordion(`section-${Number(id) - 1}`);
    } else {
      router.push("/support");
    }
  }, [id, router]);
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 mt-12">
          Frequently Asked Questions
        </h1>
        <Separator className="my-10" />
        <div className="px-24 flex flex-col gap-10">
          <div className="bg-[#f5f5f5] w-full h-10  flex items-center pl-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <HomeIcon size={20} className="text-primary font-bold" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/support"
                    className="text-primary font-bold hover:text-primary"
                  >
                    Support
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground font-bold">
                    Frequently Asked Questions
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex justify-end">
            <Input
              className="w-[450px] rounded-r-none font-extrabold focus-visible:ring-transparent focus-visible:outline-none"
              placeholder="Find In FAQ/Help (min. 3 characters)"
            />
            <Button className="rounded-l-none bg-primary text-white h-10 w-10">
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div className="max-w-[89%] mx-auto p-4 mt-10">
          {faqData.map((section, sectionIdx) => (
            <Accordion
              key={sectionIdx}
              type="single"
              collapsible
              value={openAccordion}
              onValueChange={(value: string) => setOpenAccordion(value)}
              className="w-full border-none"
            >
              <AccordionItem
                className="border-none mb-1"
                value={`section-${sectionIdx}`}
              >
                <AccordionTrigger
                  className={`text-white bg-primary font-bold border px-2`}
                >
                  {section.category}
                </AccordionTrigger>
                <AccordionContent className="">
                  {section.items.map((faq, faqIdx) => (
                    <Accordion
                      key={faqIdx}
                      type="single"
                      collapsible
                      value={openSubAccordion}
                      onValueChange={(value: string) =>
                        setOpenSubAccordion(value)
                      }
                      className="w-full border-none"
                    >
                      <AccordionItem
                        className="border-none"
                        value={`faq-${sectionIdx}-${faqIdx}`}
                      >
                        <AccordionTrigger className="font-bold px-2 border-x border-b ">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-2 border-x border-b pt-2">
                          {faq.type === "list" ? (
                            <div className="flex flex-col gap-4">
                              <p>{faq.answer}</p>
                              <ol className="list-disc pl-4">
                                {"li" in faq &&
                                  faq.li.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                              </ol>
                              {"remainingAnswer" in faq && (
                                <p>{faq.remainingAnswer}</p>
                              )}
                            </div>
                          ) : faq.type === "list2" ? (
                            <div>
                              <p className="font-medium">{faq.answer}</p>
                              <div className="flex mt-10 mb-5">
                                {/* left */}
                                <div className="flex flex-col gap-2 items-start w-max">
                                  {"listLeft" in faq &&
                                    faq.listLeft.map((item, idx) => (
                                      <div
                                        className="border-t w-full pr-10 py-2 font-bold"
                                        key={idx}
                                      >
                                        {item}
                                      </div>
                                    ))}
                                </div>
                                {/* right */}
                                <div className="flex flex-col gap-2 place-items-start w-[500px]">
                                  {"listRight" in faq &&
                                    faq.listRight.map((item, idx) => (
                                      <div
                                        className="border-t w-full py-2 font-bold"
                                        key={idx}
                                      >
                                        {item}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            faq.answer
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
};

export default FaqDetailPage;
