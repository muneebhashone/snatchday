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
import { useParams, useRouter } from "next/navigation";
import { useGetFaq } from "@/hooks/api";

const FaqDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [openAccordion, setOpenAccordion] = useState<string>("");
  const [openSubAccordion, setOpenSubAccordion] = useState<string>("");
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
      
      // For the category page, we need to filter by the selected category
      if (id) {
        // Find the matching category by index or id if available
        const categoryIndex = Number(id) - 1;
        if (categoryIndex >= 0 && categoryIndex < sortedData.length) {
          setProcessedFaqData([sortedData[categoryIndex]]);
          setOpenAccordion(`section-${sortedData[categoryIndex]._id}`);
        } else {
          // Try to find by category name
          const targetCategory = sortedData.find(item => 
            item._id === id || 
            item.category.toLowerCase() === String(id).toLowerCase()
          );
          
          if (targetCategory) {
            setProcessedFaqData([targetCategory]);
            setOpenAccordion(`section-${targetCategory._id}`);
          } else {
            // If no matching category, redirect to main FAQ
            router.push("/faq");
          }
        }
      } else {
        router.push("/faq");
      }
    }
  }, [faqResponse, id, router]);

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
                  <BreadcrumbLink
                    href="/faq"
                    className="text-primary font-bold hover:text-primary"
                  >
                    FAQ
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground font-bold">
                    {processedFaqData[0]?.category || "Category"}
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
          
          {filteredFaqData.map((section) => (
            <Accordion
              key={section._id}
              type="single"
              collapsible
              value={openAccordion}
              onValueChange={(value) => setOpenAccordion(value)}
              className="w-full border-none"
            >
              <AccordionItem
                className="border-none mb-1"
                value={`section-${section._id}`}
              >
                <AccordionTrigger
                  className="text-white bg-primary font-bold border px-2"
                >
                  {section.category}
                </AccordionTrigger>
                <AccordionContent>
                  {section.qa && section.qa.length > 0 ? (
                    section.qa.map((faq: any) => (
                      <Accordion
                        key={faq._id}
                        type="single"
                        collapsible
                        value={openSubAccordion}
                        onValueChange={(value) => setOpenSubAccordion(value)}
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

export default FaqDetailPage;
