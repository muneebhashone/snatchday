import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
  value: string;
}

const Search = ({ placeholder, onSearch, value   }: SearchProps) => {
  return (
    <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md">
      <div className="relative w-full">
        <Input
          type="search"
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          value={value}
          className="w-full min-w-[200px] h-[48px] rounded-full pr-10 pl-12 border-gray-300 focus:border-primary text-foreground !ring-offset-0 !ring-0"
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-[#A5A5A5]" />
        <Button
          variant="default"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white py-3 px-4 hover:bg-primary"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
