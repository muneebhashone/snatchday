import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ProductCategoryFilter = () => {
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
    <div className="space-y-6 h-[150vh] overflow-y-auto sticky top-32 pr-4">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      {Object.entries(filters).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h4 className="font-medium text-gray-900">{category}</h4>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox id={`${category}-${index}`} />
                  <label
                    htmlFor={`${category}-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                  >
                    {item.name}
                  </label>
                </div>
                <span className="text-sm text-gray-500">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategoryFilter;
