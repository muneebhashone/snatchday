import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerGeneralTabForm from "./CustomerGeneralTabForm";
import { Edit2 } from "lucide-react";
import CustomerTournaments from "./CustomerTournaments";
import CustomerIPAdresses from "./CustomerIPAdresses";
import CustomerOrdersDataList from "./CustomerOrdersDataList";

export function CustomerdEdit() {
  return (
    <div className="w-full border">
      <div className="w-full border-y pl-4 text-gray-500 bg-gray-50 flex gap-1 items-center">
        <Edit2 size={15} /> Edit
      </div>
      <Tabs defaultValue="generally" className="w-full px-1">
        <TabsList className="grid w-full grid-cols-8 gap-1">
          <TabsTrigger value="generally">Generally</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payment-history">Payment history</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="duels">Duels</TabsTrigger>
          <TabsTrigger value="points-history">Points history</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="ip-adresses">IP adresses</TabsTrigger>
        </TabsList>
        <TabsContent value="generally">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="mt-10">
                <h1 className="text-primary font-bold text-2xl text-center">
                  Customer Data
                </h1>
                <CustomerGeneralTabForm />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <div className="mt-10">
            <h1 className="text-primary font-bold text-2xl text-center mb-5">
              Customer Data
            </h1>
            <CustomerOrdersDataList />
          </div>
        </TabsContent>
        <TabsContent value="payment-history">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="text-center mt-10">
                <h1 className="text-center font-bold text-2xl text-primary">
                  Customer Payment History
                </h1>
                coming soon....
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tournaments">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="mt-10">
                <h1 className="text-primary font-bold text-2xl text-center mb-5">
                  Customer Tournaments
                </h1>
                <CustomerTournaments />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="duels">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="text-center mt-10">
                <h1 className="text-center font-bold text-2xl text-primary">
                  Customer Duels
                </h1>
                coming soon....
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="points-history">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="text-center mt-10">
                <h1 className="text-center font-bold text-2xl text-primary">
                  Customer Points History
                </h1>
                coming soon....
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="returns">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="text-center mt-10">
                <h1 className="text-center font-bold text-2xl text-primary">
                  Customer Orders
                </h1>
                coming soon....
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ip-adresses">
          <Card className="border-none">
            <CardContent className="space-y-2">
              <div className="mt-10">
                <h1 className="text-center font-bold text-2xl text-primary">
                  Customer IP Addresses
                </h1>
                <CustomerIPAdresses />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
