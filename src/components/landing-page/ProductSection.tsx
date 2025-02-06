import React from "react";
import ProductCard from "../ProductCard";
import laptop from "@/app/images/laptop.png";

const ProductSection = () => {
  const products = [
    {
      image: laptop,
      title: "Dicota SmartSkin Laptop Sleeve 14.1 - Notebook-Tasche - 35.8",
      price: "29,32",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1074ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.152,76",
      rating: 5,
      isSale: true,
      isNew: false,
    },

    {
      image: laptop,
      title: "HP ENVY Laptop 15-ep1077ng - Intel Core i7 11800H / 2.3 GHz",
      price: "2.382,92",
      rating: 5,
      isNew: true,
      isSale: false,
    },

    {
      image: laptop,
      title: "HP Laptop 15-dw3424ng - Intel Pentium Gold 7505 - FreeDOS 3.0",
      price: "468,06",
      rating: 5,
      isNew: true,
      isSale: false,
    },

  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-[1920px] mx-auto px-12">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-4xl font-bold flex items-center gap-3">
            Current{" "}
            <span className="bg-primary text-white px-4 py-2 rounded-full">
              Offers
            </span>
          </h3>

          <button className="text-gray-600 hover:text-orange-500 font-medium">
            View All
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
