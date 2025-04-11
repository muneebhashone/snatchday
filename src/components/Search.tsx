import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";

interface SearchProps {
  placeholder: string;
  onSearch: (value: string) => void;
  value: string;
}

const Search = ({ placeholder, onSearch, value }: SearchProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleButtonClick = () => {
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    onSearch("");
  };

  useEffect(() => {
    if (localSearchTerm === "") {
      onSearch("");
    }
  }, [localSearchTerm, onSearch]);

  return (
    <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md">
      <div className="relative w-full">
        <Input
          type="search"
          onChange={handleInputChange}
          placeholder={placeholder}
          value={localSearchTerm}
          className="w-full min-w-[200px] h-[48px] rounded-full pr-10 pl-12 border-gray-300 focus:border-primary text-foreground !ring-offset-0 !ring-0 pt-3"
        />

        {/* Left icon: changes based on input */}
        {localSearchTerm ? (
          <XIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A5A5] cursor-pointer hover:text-red-500"
            size={18}
            onClick={handleClear}
          />
        ) : (
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A5A5]"
            size={18}
          />
        )}

        {/* Search Button */}
        <Button
          variant="default"
          size="sm"
          onClick={handleButtonClick}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white py-3 px-4 hover:bg-primary"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
