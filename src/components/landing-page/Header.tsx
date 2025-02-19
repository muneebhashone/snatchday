"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Heart, ShoppingCart } from "lucide-react";
import logo from "@/app/images/logo.png";
import Image from "next/image";
import { Hamburger } from "@/components/icons/icon";
import MobileMenu from "@/components/MobileMenu";

import Login from "../auth/Login";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { PromotionModal } from "@/components/PromotionModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";

const categories = [
  {
    name: "Audio, Video & HiFi",
    items: [
      "audio input/output devices",
      "DVD/BluRay players/recorders/set-top boxes",
      "hi-fi equipment",
      "MP3/video player",
    ],
  },
  {
    name: "Computer & Hardware",
    items: [],
  },
  {
    name: "Displays & Projectors",
    items: [
      "audio input/output devices",
      "DVD/BluRay players/recorders/set-top boxes",
      "hi-fi equipment",
      "MP3/video player",
    ],
  },
  {
    name: "Electrical & Installation",
    items: [],
  },
  {
    name: "Entertainment & Gaming",
    items: [],
  },
  {
    name: "Photo & Video",
    items: [],
  },
  {
    name: "Cell Phones & Communication",
    items: [],
  },
  {
    name: "House & Garden",
    items: [],
  },
  {
    name: "Notebook & Tablet",
    items: [],
  },
  {
    name: "PC components",
    items: [],
  },
  {
    name: "PC systems",
    items: [],
  },
  {
    name: "Service & Support",
    items: [],
  },
  {
    name: "software",
    items: [],
  },
  {
    name: "Games & Hobbies",
    items: [],
  },
  {
    name: "TV & Audio",
    items: [],
  },
  {
    name: "Accessories & Software",
    items: [],
  },
];

const menu = [
  {
    id: 1,
    name: "VIP Shop",
    link: "/vip-shop",
  },
  {
    id: 2,
    name: "Turniere",
    link: "/tournaments",
  },
  {
    id: 3,
    name: "Duellarena",
    link: "/duel-arena",
  },
  {
    id: 4,
    name: "Trainingscenter",
    link: "/trainings-center",
  },
  {
    id: 5,
    name: "Gewinnspiel im Januar",
    link: "/gewinnspiel-im-januar",
  },
  {
    id: 6,
    name: "Support",
    link: "/support",
  },
];

const Header = () => {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="container max-w-[1920px] mx-auto px-12 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={208} height={66} />
        </Link>

        {/* Desktop Hamburger - Only visible on desktop */}
        <div className="hidden lg:block relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="h-9 w-9 bg-primary rounded-md flex items-center justify-center transition-colors"
          >
            <Hamburger />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 top-full mt-10 w-[300px] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50">
              {categories.map((category, index) => (
                <div key={index} className="group relative hover:bg-gray-50/80">
                  <Link
                    href="#"
                    className="flex items-center justify-between px-4 py-2 text-lg text-card-foreground hover:text-primary"
                  >
                    {category.name}
                    {category.items.length > 0 && (
                      <span className="text-gray-400">›</span>
                    )}
                  </Link>

                  {category.items.length > 0 && (
                    <div className="hidden group-hover:block absolute left-full top-0 w-[300px] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-2">
                      {category.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href="#"
                          className="block px-4 py-2 text-lg text-card-foreground hover:bg-gray-50/80 hover:text-primary"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden h-9 w-9 bg-primary rounded-md flex items-center justify-center"
        >
          <Hamburger />
        </button>

        {/* Navigation */}
        {menu.map((items) => {
          return (
            <nav
              className="hidden lg:flex items-center justify-between"
              key={items.id}
            >
              <div className="group relative">
                {/* Dropdown can be added here */}
              </div>
              {items.name === "Gewinnspiel im Januar" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className={`flex hover:text-primary text-lg hover:underline hover:underline-offset-8 hover:decoration-2 ${
                        pathname === items.link
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {items.name}
                      <div
                        className={`w-2 h-2 bg-primary rounded-full ${
                          pathname === items.link ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                    </button>
                  </DialogTrigger>
                  <PromotionModal />
                </Dialog>
              ) : (
                <Link
                  href={items.link}
                  className={`flex items-start text-foreground hover:text-primary text-lg hover:underline hover:underline-offset-8 hover:decoration-2 ${
                    pathname === items.link ? "text-primary" : "text-foreground"
                  }`}
                >
                  {items.name}
                  <div
                    className={`w-2 h-2 bg-primary rounded-full ${
                      pathname === items.link ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </Link>
              )}
            </nav>
          );
        })}
        {/* Date Time Bar */}
        <div className="bg-primary py-1 px-4 flex items-center justify-end text-sm text-white rounded-full">
          <div className="flex items-center gap-2">
            <span className="border-r pr-2">{formatDate(currentDateTime)}</span>
            <span>{formatTime(currentDateTime)}</span>
          </div>
        </div>

        {/* Search Dialog */}
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 rounded-full bg-gray-200"
            >
              <SearchIcon className="h-6 w-6 text-[#A5A5A5]" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] p-0 rounded-3xl border-none bg-white/95 backdrop-blur-md shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Search Products
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="hover:bg-gray-100 rounded-full w-12 h-12"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search Duellarena, Turniere and more..."
                  className="w-full h-[60px] rounded-2xl pr-[140px] pl-14 border-2 border-gray-200 focus:border-primary text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                />
                <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Button
                  variant="default"
                  size="lg"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary text-white px-6 h-[48px] transition-colors hover:bg-primary"
                >
                  Search
                </Button>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Gaming Laptops
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Graphics Cards
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Monitors
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full text-sm hover:bg-primary hover:text-white border-gray-200"
                  >
                    Gaming Accessories
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center justify-between gap-5">
          <button className="hover:text-primary bg-transparent p-0 text-[#888888]">
            <Login />
          </button>
          <button className="hover:text-primary bg-transparent p-0 text-[#888888]">
            <Heart className="h-6 w-6 " />
          </button>
          <button className="hover:text-primary bg-transparent p-0 text-[#888888] relative flex items-center gap-4 cursor-pointer">
            <ShoppingCart className="h-6 w-6" />
            <div className="text-sm text-foreground text-start">
              <p className="font-bold">Your Shopping Cart</p>
              <p className="text-sm text-primary font-bold">0.00 €</p>
            </div>
            <span className="absolute -top-2 left-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center space-x-4">
          <button className="hover:text-primary text-[#888888]">
            <User className="h-6 w-6" />
          </button>
          <button className="hover:text-primary text-[#888888]">
            <Heart className="h-6 w-6" />
          </button>
          <button className="hover:text-primary text-[#888888] relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menu={menu}
      />
    </header>
  );
};

export default Header;
