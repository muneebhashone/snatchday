"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// import { DualRangeSlider } from "@/components/ui/dual-range-slider";

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
import { DualRangeSlider } from "./dualSlider";
import { useGetCategories, useGetGames, useGetProducts } from "@/hooks/api";

interface TournamentFilterProps {
  onPeriodChange: (from: string, until: string) => void;
  onPriceChange: (price: string) => void;
  onGameChange: (game: string) => void;
  onProductChange: (product: string) => void;
  onFeeChange: (fee: string) => void;
  onVipChange: (vip: string) => void;
  onCategoryChange: (category: string) => void;
}

const TournamentFilter = ({
  onPeriodChange,
  onPriceChange,
  onGameChange,
  onProductChange,
  onFeeChange,
  onVipChange,
  onCategoryChange,
}: TournamentFilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [participationFee, setParticipationFee] = useState([0, 100]);
  const [period, setPeriod] = useState({ from: "", until: "" });
  const [game, setGame] = useState("");
  const [product, setProduct] = useState("");
  const [vip, setVip] = useState("no");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data: games, isLoading: isGamesLoader } = useGetGames(page);
  const { data: categories, isLoading: isCategLoding } = useGetCategories();
  const { data: Products, isLoading: isProductLoding } = useGetProducts();

  // console.log(Products,"alllll")

  const handleApplyFilters = () => {
    onPeriodChange(period.from, period.until);
    onPriceChange(`[${priceRange[0]},${priceRange[1]}]`);
    onGameChange(game);
    onProductChange(product);
    onFeeChange(`[${participationFee[0]},${participationFee[1]}]`);
    onVipChange(vip);
    onCategoryChange(category);
  };

  const handleClearFilters = () => {
    // Reset local state
    setPriceRange([0, 100]);
    setParticipationFee([0, 100]);
    setPeriod({ from: "", until: "" });
    setGame("");
    setProduct("");
    setVip("no");
    setCategory("");
    
    // Reset API filters
    onPeriodChange("", "");
    onPriceChange("");
    onGameChange("");
    onProductChange("");
    onFeeChange("");
    onVipChange("no");
    onCategoryChange("");
  };

  // Helper function to check if any filter is active
  const isAnyFilterActive = () => {
    return (
      period.from !== "" ||
      period.until !== "" ||
      priceRange[0] !== 0 ||
      priceRange[1] !== 100 ||
      participationFee[0] !== 0 ||
      participationFee[1] !== 100 ||
      game !== "" ||
      product !== "" ||
      vip !== "no" ||
      category !== ""
    );
  };
console.log(isAnyFilterActive(),"isAnyFilterActive")
  // Handle period change
  const handlePeriodChange = (from: string, until: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setPeriod((prev) => {
      // Validate from date
      if (from && from < today) {
        from = today;
      }
      
      // Validate until date
      if (until && from && until < from) {
        until = from;
      }
      
      return {
        from: from || prev.from,
        until: until || prev.until,
      };
    });
  };

  const handleGameChange = (gameId: string) => {
    setGame(gameId);
  };

  const handleProductChange = (productId: string) => {
    setProduct(productId);
  };

  const handleVipChange = (vip: string) => {
    setVip(vip);
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategory(categoryId);
  };

  return (
    <div className="bg-[#F9F9F9] p-8 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
        {/* Period */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">Period</p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={period.from}
              min={new Date().toISOString().split('T')[0]}
              placeholder="from"
              onChange={(e) => handlePeriodChange(e.target.value, "")}
              className="h-12 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-0 focus:border-red-500"
            />
            <Input
              type="date"
              value={period.until || ""}
              min={period.from || new Date().toISOString().split('T')[0]}
              placeholder="until"
              onChange={(e) => handlePeriodChange("", e.target.value)}
              className="h-12 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-0 focus:border-red-500"
            />
          </div>
        </div>

        {/* Product Price */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-8">Product price</p>
          <div className="px-2">
            <DualRangeSlider
              label={(value) => value}
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
              <span>{priceRange[0].toFixed(2)}€</span>
              <span>1,000.00€</span>
            </div>
          </div>
        </div>

        {/* Game Name */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-2">Game name</p>
          <Select onValueChange={(value) => handleGameChange(value)}>
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
          <p className="text-sm text-gray-600 mb-2">Products</p>
          <Select value={product} onValueChange={(value) => handleProductChange(value)}>
            <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {isProductLoding ?(
                <SelectItem>....loading</SelectItem>
              ) : (
                Products?.data?.products?.map((product) => (
                  <SelectItem key={product._id} value={product._id}>
                    {product.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Participation Fee */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-8">Participation fee</p>
          <div className="px-2">
            <DualRangeSlider
              label={(value) => value}
              value={participationFee}
              onValueChange={setParticipationFee}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
              <span>{participationFee[0].toFixed(2)}€</span>
              <span>100.00€</span>
            </div>
          </div>
        </div>

        {/* Show only VIP tournaments */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 mb-6">
            Show only VIP tournaments
          </p>
          <RadioGroup
            value={vip}
            onValueChange={(value) => handleVipChange(value)}
            className="flex gap-8"
          >
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
          <p className="text-sm text-gray-600 mb-2">Category</p>
          <Select value={category} onValueChange={(value) => handleCategoryChange(value)}>
            <SelectTrigger className="h-12 rounded-xl bg-white border-gray-200 focus:border-primary">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {categories?.data?.categories?.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Button */}
        <div className="flex items-center justify-center md:justify-end gap-4">
          {isAnyFilterActive() && (
            <Button
              onClick={handleClearFilters}
              className="text-gray-700 bg-white border border-gray-300 rounded-full px-10 sm:px-12 h-10 sm:h-12 text-base font-medium hover:bg-gray-50"
            >
              CLEAR
            </Button>
          )}
          <Button
            onClick={handleApplyFilters}
            className="gradient-primary text-white rounded-full px-10 sm:px-12 h-10 sm:h-12 text-base font-medium hover:opacity-90"
          >
            FILTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentFilter;
