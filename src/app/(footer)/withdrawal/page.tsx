"use client";

import ClientLayout from "@/components/landing-page/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetContent } from "@/hooks/api";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const {data: webSetting} = useGetContent();

  const withdrawalContent = webSetting?.data.find(
    (item) => item.name === "Right Of Withdrawal"
  )?.content || "";

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-12">
          {webSetting?.data.find((item) => item.name === "Right Of Withdrawal")?.name}
        </h1>

        <div className="max-w-[1440px] mx-auto">
          {/* Address Information */}
          <div className="text-lg mb-8">
            <p className="mb-4">
              You can cancel the contract by completing the online form or
              downloading it and sending us the completed cancellation form to
              the following address:
            </p>
            <div className="font-medium">
              <p>Snatch Day GmbH</p>
              <p>Tetramundweg 6</p>
              <p>12167 Berlin</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-lg text-lg"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Hide Form" : "Fill Out Online"}
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-lg text-lg"
            >
              Download Form
            </Button>
          </div>

          {/* Withdrawal Form */}
          {showForm && (
            <form className="space-y-6 mb-12">
              <div className="space-y-4">
                <label className="block text-gray-600">
                  I/we hereby revoke the contract concluded by me/us for the
                  purchase of the following goods/the provision of the following
                  service:
                </label>
                <Input className="w-full h-32 rounded-lg bg-gray-50" />
                <p className="text-sm text-gray-500">
                  (Name of the product, if applicable order number and price)
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">Goods ordered on:</label>
                <Input className="w-full rounded-lg bg-gray-50" />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">
                  Date of goods received on:
                </label>
                <Input className="w-full rounded-lg bg-gray-50" />
              </div>

              <div className="space-y-4">
                <label className="block text-gray-600">
                  Date Name and address of the consumer:
                </label>
                <Input className="w-full h-32 rounded-lg bg-gray-50" />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-lg text-lg"
              >
                SUBMIT
              </Button>
            </form>
          )}

          {/* Policy Information */}
          <div className="space-y-6 text-card-foreground">
            <div dangerouslySetInnerHTML={{ __html: withdrawalContent }} />
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
