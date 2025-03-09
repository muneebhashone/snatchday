"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../ui/slider";

interface ProductCategoryFilterProps {
  filters: Array<{
    name: string;
    values: string[];
    id: string;
  }>;
  selectedFilters: string[];
  onFilterChange: (value: string) => void;
  onPriceChange: (range: number[]) => void;
  isLoading?: boolean;
}

const ProductCategoryFilter = ({
  filters,
  selectedFilters,
  onFilterChange,
  onPriceChange,
  isLoading
}: ProductCategoryFilterProps) => {
  const [priceRange, setPriceRange] = React.useState([1000]);

    // const {data:filtersData, isLoading} = useGetFilters()
      
    // console.log(filtersData,"filtersData")
    
  const filtersData = {
    "Laptop Type": [
      { name: "Gaming", count: 24 },
      { name: "Working", count: 12 },
      { name: "Gaming", count: 24 },
      { name: "Working", count: 12 },
    ],
    "Laptop Brands": [
      { name: "Dell Laptops", count: 24 },
      { name: "Hp Laptops", count: 12 },
      { name: "Lenovo Laptops", count: 24 },
      { name: "Acer Laptops", count: 24 },
      { name: "Apple Laptops", count: 24 },
      { name: "Asus Laptops", count: 12 },
      { name: "MSI Laptops", count: 12 },
    ],
    Memory: [
      { name: "4GB", count: 24 },
      { name: "8GB", count: 24 },
      { name: "12GB", count: 24 },
      { name: "16GB", count: 12 },
      { name: "20GB", count: 12 },
      { name: "24GB", count: 12 },
      { name: "16GB", count: 12 },
      { name: "30GB", count: 12 },
      { name: "48GB", count: 24 },
    ],
    "Display Size": [
      { name: '13" - 13.9"', count: 24 },
      { name: '14" - 14.9"', count: 12 },
      { name: '15" - 15.6"', count: 24 },
      { name: '16" - 17"', count: 12 },
      { name: '17" - 18"', count: 24 },
    ],
    Processor: [
      { name: "Intel Core i3", count: 24 },
      { name: "Intel Core i3 13th", count: 12 },
      { name: "AMD Ryzen 5", count: 24 },
      { name: "Intel Core i5 12th", count: 24 },
      { name: "Intel Core i5 13th", count: 24 },
      { name: "Intel Core i5", count: 12 },
      { name: "Intel Core Ultra 5", count: 12 },
    ],
    "Touchscreen | x360": [
      { name: "Simple Touchscreen", count: 24 },
      { name: "x360", count: 12 },
      { name: "Non-Touch", count: 24 },
    ],
  };

  const handleFilterChange = (value: string) => {
    console.log('Filter clicked:', value); // Debug log for clicked value
    console.log('Current selectedFilters:', selectedFilters); // Debug log for current state
    onFilterChange(value);
  };

  // Debug log for props
  console.log('Filters prop:', filters);
  console.log('Selected filters prop:', selectedFilters);

  return (
    <div className="space-y-6 h-max pl-9 pr-10 border border-gray-200 pt-8 bg-white rounded-3xl">
      <p className="text-lg font-bold mb-4 text-card-foreground">Filters</p>

      {/* Dynamic Filters */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-5 w-3/4 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        filters.map((filter) => (
          <div key={filter.id} className="space-y-2">
            <h3 className="font-medium text-lg">{filter.name}</h3>
            <div className="space-y-2">
              {filter.values.map((value) => {
                console.log('Rendering checkbox for value:', value); // Debug log for each checkbox
                return (
                  <label key={value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(value)}
                      onChange={() => {
                        console.log('Checkbox clicked for value:', value); // Debug log for checkbox click
                        handleFilterChange(value);
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600">{value}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Price Range Filter */}
      <div className="space-y-4">
        <p className="font-medium text-gray-700">Price Range</p>
        <div className="space-y-4">
          <Slider
            defaultValue={[1000]}
            max={100000}
            min={1000}
            step={1000}
            value={priceRange}
            // onValueChange={handlePriceRangeChange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{priceRange[0].toFixed(3)}€</span>
            <span>100.000€</span>
          </div>
        </div>
      </div>
      {/* <VisitTournament
        title="January Tournament"
        date="January 30, 2025 at 3:00 p.m."
      /> */}
    </div>
  );
};

export default ProductCategoryFilter;
