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
import { useGetFaq } from "@/hooks/api";
import Link from "next/link";

const FaqPage = () => {
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [processedFaqData, setProcessedFaqData] = useState<any[]>([]);
  
  const { data: faqResponse } = useGetFaq({
    status: "ACTIVE",
  });

  // Process the FAQ data when it's loaded
  useEffect(() => {
    if (faqResponse?.data && Array.isArray(faqResponse.data)) {
      // Sort the data by order if needed
      const sortedData = [...faqResponse.data].sort((a, b) => a.order - b.order);
      setProcessedFaqData(sortedData);
    }
  }, [faqResponse]);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFaqData = processedFaqData.map(category => {
    if (!searchTerm || searchTerm.length < 3) return category;
    
    return {
      ...category,
      qa: category.qa.filter((item: any) => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    };
  });

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 mt-12">
          Frequently Asked Questions
        </h1>
        <Separator className="my-10" />
        <div className="px-24 flex flex-col gap-10">
          <div className="bg-[#f5f5f5] w-full h-10 flex items-center pl-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <HomeIcon size={20} className="text-primary font-bold" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary font-bold">
                    Support
                  </BreadcrumbPage>
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
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button className="rounded-l-none bg-primary text-white h-10 w-10">
              <SearchIcon />
            </Button>
          </div>
        </div>
        <div className="max-w-[89%] mx-auto p-4 mt-10">
          {!processedFaqData.length && (
            <div className="text-center py-10">
              <p>Loading FAQ data...</p>
            </div>
          )}
          
          {filteredFaqData.map((section, sectionIdx) => (
            <Accordion
              key={section._id}
              type="single"
              collapsible
              className="w-full border-none"
            >
              <AccordionItem
                className="border-none mb-1"
                value={`section-${section._id}`}
              >
                <AccordionTrigger
                  className="text-white bg-primary font-bold border px-2"
                >
                  <Link href={`/faq/${section._id}`} className="w-full text-left">
                  {section.category}
                  </Link>
                </AccordionTrigger>
                <AccordionContent>
                  {section.qa && section.qa.length > 0 ? (
                    section.qa.map((faq: any) => (
                    <Accordion
                        key={faq._id}
                      type="single"
                      collapsible
                        value={openAccordion}
                        onValueChange={setOpenAccordion}
                      className="w-full border-none"
                    >
                      <AccordionItem
                        className="border-none"
                          value={`faq-${section._id}-${faq._id}`}
                      >
                          <AccordionTrigger className="font-bold px-2 border-x border-b">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-2 border-x border-b pt-2">
                            {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    ))
                  ) : (
                    <div className="p-4 border-x border-b">
                      No FAQ items found in this category.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
};

export default FaqPage;
