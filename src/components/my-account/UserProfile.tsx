import React from "react";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import VipMembershipModal from "./VipMembershipModal";
import CollectPointsModal from "./CollectPointsModal";

const UserProfile = () => {
  return (
    <div className="bg-white rounded-3xl p-8">
      <h2 className="text-2xl font-bold mb-6">MY PROFILE</h2>

      <div className="flex flex-col items-start justify-between mb-8 gap-8">
        {/* Profile Information */}
        <div className="w-full flex items-start justify-between gap-12 p-6 bg-gray-50 rounded-xl">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-gray-100 shadow-sm flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <button className="text-primary hover:text-primary mt-3 text-sm font-medium">
              Change Profile Picture
            </button>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">tester</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.62 8.49C5.59 -0.169998 18.42 -0.159998 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Teststr.10, 121671 Berlin</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Customer number:</span>
                  <span className="text-gray-900">387</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Verified:</span>
                  <svg
                    className="w-5 h-5 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Registered on:</span>
                  <span className="text-gray-900">August 31, 2023</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Snap points:</span>
                  <span className="text-gray-900">4,875</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Discount points:</span>
                  <span className="text-gray-900">750</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 font-medium">Last online:</span>
                  <span className="text-gray-900">2022-02-19 13:26:38</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <VipMembershipModal />
              <CollectPointsModal />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="game-statistics" className="w-full mt-8">
          <TabsList className="w-full">
            <TabsTrigger value="game-statistics" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              GAME STATISTICS
            </TabsTrigger>
            <TabsTrigger value="top-up" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              TOP UP/WITHDRAW CREDIT
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              PROFILE
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
              MY TICKETS
            </TabsTrigger>
          </TabsList>

          {/* Game Statistics Content */}
          <TabsContent value="game-statistics" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  GRAB YOUR BARGAIN
                </h3>
                <p className="text-card-foreground mb-4 font-medium">
                  You can purchase your winning product at the reduced price
                  within 24 hours of the tournament. After that, the claim
                  expires and the product will be offered at the regular price
                  again.
                </p>
                <p className="text-xl font-semibold mb-6">
                  You have not won any items yet
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="font-medium text-card-foreground">Tournaments played: 6</p>
                  <p className="font-medium text-card-foreground">Duels played: 2</p>
                  <p className="font-medium text-card-foreground">You have 4875 snap points</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-card-foreground">Tournaments won: 2</p>
                  <p className="font-medium text-card-foreground">Duels won: 1</p>
                  <p className="font-medium text-card-foreground">You have 750 discount points</p>
                </div>
              <div className="text-start space-y-2 col-span-2">
                <p className="font-medium text-card-foreground">Games played in the training center: 7</p>
                <p className="font-medium text-card-foreground">Tournaments won in the current month: 0 out of 3</p>
              </div>
              </div>

            </div>
          </TabsContent>

          {/* Top Up/Withdraw Credit Content */}
          <TabsContent value="top-up" className="mt-6">
            <div className="space-y-8">
              {/* Recharge Credit Section */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Recharge Credit</h3>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label htmlFor="recharge-amount" className="text-card-foreground font-medium">Amount *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="5.00" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5.00 €</SelectItem>
                        <SelectItem value="10">10.00 €</SelectItem>
                        <SelectItem value="20">20.00 €</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-primary">CHECKOUT</Button>
                </div>
              </div>

              {/* Payout Credit Section */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Payout credit</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div>
                      <Label htmlFor="payout-amount" className="text-card-foreground font-medium">Amount *</Label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          id="payout-amount"
                          defaultValue="5.00"
                        />
                        <span className="flex items-center font-bold">€</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label className="text-foreground font-medium">Choose a payment method:</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-card-foreground font-medium">Withdrawal fee:</span>
                    <span className="text-card-foreground font-medium">1.00 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground font-medium">The amount to be deducted from your balance:</span>
                    <span className="text-card-foreground font-medium">6.00 €</span>
                  </div>

                  <div className="flex justify-end">
                    <Button>OK</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Profile Content */}
          <TabsContent value="profile" className="mt-6 mb-12">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Salutation *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Mister" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Mister</SelectItem>
                      <SelectItem value="mrs">Mrs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Title</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="-- Please select --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr">Dr.</SelectItem>
                      <SelectItem value="prof">Prof.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium text-lg">Username *</Label>
                <Input defaultValue="Tester" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Last name *</Label>
                  <Input defaultValue="Test" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">First name *</Label>
                  <Input defaultValue="Tester" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium text-lg">Street *</Label>
                <Input defaultValue="Teststr.10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Zip code *</Label>
                  <Input defaultValue="121671" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Location *</Label>
                  <Input defaultValue="Berlin" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Country *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Germany" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="at">Austria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Federal State *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Berlin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="berlin">Berlin</SelectItem>
                      <SelectItem value="hamburg">Hamburg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium text-lg">E-mail *</Label>
                <Input defaultValue="testen@tester.de" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <label htmlFor="newsletter" className="text-card-foreground font-medium">
                  Yes, I would like to be informed about tournaments, special
                  offers and news and subscribe to the newsletter
                </label>
              </div>

              <div className="flex items-center justify-end gap-4 mt-6">
                <Button className="bg-primary">SAVE</Button>
                <Button variant="outline">CHANGE PASSWORD</Button>
                <Button variant="destructive">DELETE ACCOUNT</Button>
              </div>
            </form>
          </TabsContent>

          {/* My Tickets Content */}
          <TabsContent value="tickets" className="mt-6">
            <div className="text-center text-gray-500">
              No tickets available
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
