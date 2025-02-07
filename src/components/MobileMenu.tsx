import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menu: {
    id: number;
    name: string;
    link: string;
  }[];
}

const MobileMenu = ({ isOpen, onClose, menu }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white h-full w-[80%] max-w-sm transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-600 hover:text-primary"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Mobile Search */}
          <div className="relative mb-6 mt-8">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full h-[48px] rounded-full pr-10 border-gray-300 focus:border-primary text-foreground"
            />
            <Button
              variant="default"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary text-white py-3 px-4"
            >
              Search
            </Button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="space-y-4">
            {menu.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="block text-lg text-foreground hover:text-primary py-2 border-b border-gray-100"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
