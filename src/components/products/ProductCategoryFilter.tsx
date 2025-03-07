"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../ui/slider";
import { useGetFilters } from "@/hooks/api";


const ProductCategoryFilter = (filtersdata: any) => {
  const [priceRange, setPriceRange] = React.useState([1000]);

    // const {data:filtersData, isLoading} = useGetFilters()
      
    // console.log(filtersData,"filtersData")
    
  const filters = {
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

  return (
    // <div className="space-y-6 h-[190vh] overflow-y-auto sticky top-32 pr-4 border border-gray-200 bg-white p-4 rounded-xl">
    <div className="space-y-6 h-max pl-9 pr-10 border border-gray-200 pt-8 bg-white rounded-3xl">
      <p className="text-lg font-bold mb-4 text-card-foreground">Filters</p>

      {/* Price Range Filter */}

      {/* Other Filters */}
      {Object.entries(filters).map(([category, items]) => (
        <div key={category} className="space-y-3 ">
          <p className="text-card-foreground font-medium text-lg">{category}</p>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${index}`}
                    className="border-gray-300 border-2"
                  />
                  <label
                    htmlFor={`${category}-${index}`}
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-card-foreground"
                  >
                    {item.name}
                  </label>
                </div>
                <span className="text-card-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="space-y-4">
        <p className="font-medium text-gray-700">Price Range</p>
        <div className="space-y-4">
          <Slider
            defaultValue={[1000]}
            max={100000}
            min={1000}
            step={1000}
            value={priceRange}
            onValueChange={setPriceRange}
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
