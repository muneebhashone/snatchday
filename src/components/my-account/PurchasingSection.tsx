import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PurchasingSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Purchasing</h2>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="current" className="flex-1">
            Current
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">
            Pending
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium text-gray-500">
                    Item
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-500">
                    Bid Price
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-500">
                    Highest Bid
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-500">
                    Lowest Bid
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-gray-500">
                    Expires
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-4">2018 Hyundai Sonata</td>
                  <td className="py-4 px-4">$1,775.00</td>
                  <td className="py-4 px-4">$1,775.00</td>
                  <td className="py-4 px-4">$1,400.00</td>
                  <td className="py-4 px-4">7/2/2024</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-4">2018 Hyundai Sonata</td>
                  <td className="py-4 px-4">$1,775.00</td>
                  <td className="py-4 px-4">$1,775.00</td>
                  <td className="py-4 px-4">$1,400.00</td>
                  <td className="py-4 px-4">7/2/2024</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">2018 Hyundai Sonata</td>
                  <td className="py-4 px-4">$1,775.00</td>
                  <td className="py-4 px-4">$1,775.00</td>
                  <td className="py-4 px-4">$1,400.00</td>
                  <td className="py-4 px-4">7/2/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="text-center py-8 text-gray-500">
            No pending purchases
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="text-center py-8 text-gray-500">
            No purchase history
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurchasingSection;
