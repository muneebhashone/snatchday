import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = () => {
  return (
    <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md">
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full h-[48px] rounded-full pr-10 border-gray-300 focus:border-primary text-foreground !ring-offset-0 !ring-0"
        />
        <Button
          variant="default"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white py-3 px-4"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
