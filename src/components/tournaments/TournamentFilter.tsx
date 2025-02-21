"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TournamentFilter = () => {
  const [priceRange, setPriceRange] = useState([0.0]);
  const [participationFee, setParticipationFee] = useState([0.0]);

  return (
    <div className="bg-[#F9F9F9] p-8 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        {/* Period */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">Period</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="from"
              className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary"
            />
            <Input
              placeholder="until"
              className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary"
            />
          </div>
        </div>

        {/* Product Price */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">product price</p>
          <div className="px-2">
            <Slider
              defaultValue={[0.0]}
              max={1000}
              min={0}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
              <span>{priceRange[0].toFixed(2)}€</span>
              <span>1,000.00€</span>
            </div>
          </div>
        </div>

        {/* Game Name */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">game name</p>
          <Select>
            <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="powerblocks">PowerBlocks</SelectItem>
              <SelectItem value="game2">Game 2</SelectItem>
              <SelectItem value="game3">Game 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">products</p>
          <Select>
            <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product1">Product 1</SelectItem>
              <SelectItem value="product2">Product 2</SelectItem>
              <SelectItem value="product3">Product 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Participation Fee */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">participation fee</p>
          <div className="px-2">
            <Slider
              defaultValue={[0.0]}
              max={100}
              min={0}
              step={1}
              value={participationFee}
              onValueChange={setParticipationFee}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
              <span>{participationFee[0].toFixed(2)}€</span>
              <span>100.00€</span>
            </div>
          </div>
        </div>

        {/* Show only VIP tournaments */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">
            Show only VIP tournaments
          </p>
          <RadioGroup defaultValue="no" className="flex gap-8">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">category</p>
          <Select>
            <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="category1">Category 1</SelectItem>
              <SelectItem value="category2">Category 2</SelectItem>
              <SelectItem value="category3">Category 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Button */}
        <div className="flex items-center justify-center md:justify-end">
          <Button className="gradient-primary text-white rounded-full px-10 sm:px-12 h-10 sm:h-12 text-base font-medium hover:opacity-90">
            FILTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentFilter;
