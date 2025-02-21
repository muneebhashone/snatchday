"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Heart, ShoppingCart, ChevronDown, Headphones, Monitor, Smartphone, Gamepad, Computer, LucideIcon } from "lucide-react";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import iphone from '@/app/images/iphone.png'
import laptop1 from '@/app/images/laptop.png'
import laptop2 from '@/app/images/laptopv2.png'
import { StaticImageData } from "next/image";

type ICatogory = {
  id: number,
  name: string,
  path: string,
  icon: LucideIcon,
  image: StaticImageData,
  subcategories: ISub[]
}

type ISub = {
  name: string,
  path: string,
  image: StaticImageData
}

const categoryData: ICatogory[] = [
  {
    id: 1,
    name: "Audio, Video & HiFi",
    path: "/audio-video-hifi",
    icon: Headphones,
    image: iphone,
    subcategories: [
      { name: "Home Theater Systems", path: "/category/home-theater", image: iphone },
      { name: "Speakers", path: "/category/speakers", image: laptop1 },
      { name: "Amplifiers", path: "/category/amplifiers", image: laptop2 },
      { name: "Receivers", path: "/category/receivers", image: iphone },
    ]
  },
  {
    id: 2,
    name: "Computer & Hardware",
    path: "/computer-hardware",
    icon: Monitor,
    image: laptop1,
    subcategories: [
      { name: "Processors", path: "/category/processors", image: iphone },
      { name: "Motherboards", path: "/category/motherboards", image: iphone },
      { name: "Memory", path: "/category/memory", image: iphone },
      { name: "Storage", path: "/category/storage", image: iphone },
    ]
  },
  {
    id: 3,
    name: "Cell Phones & Communication",
    path: "/phones-communication",
    icon: Smartphone,
    image: laptop2,
    subcategories: [
      { name: "Smartphones", path: "/category/smartphones", image: iphone },
      { name: "Phone Accessories", path: "/category/accessories", image: iphone },
      { name: "Cases & Protection", path: "/category/cases", image: iphone },
      { name: "Chargers & Cables", path: "/category/chargers", image: iphone },
    ]
  },
  {
    id: 4,
    name: "Entertainment & Gaming",
    path: "/entertainment-gaming",
    icon: Gamepad,
    image: iphone,
    subcategories: [
      { name: "Gaming Consoles", path: "/category/consoles", image: iphone },
      { name: "Video Games", path: "/category/games", image: iphone },
      { name: "Gaming Accessories", path: "/category/accessories", image: iphone },
      { name: "Virtual Reality", path: "/category/vr", image: iphone },
    ]
  },
  {
    id: 5,
    name: "PC Systems",
    path: "/pc-systems",
    icon: Computer,
    image: laptop1,
    subcategories: [
      { name: "Desktop Computers", path: "/category/desktop", image: iphone },
      { name: "Workstations", path: "/category/workstations", image: iphone },
      { name: "All-in-One PCs", path: "/category/all-in-one", image: iphone },
      { name: "Mini PCs", path: "/category/mini-pcs", image: iphone },
    ]
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

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [userPoints] = useState({
    snapPoints: 4875,
    discountPoints: 750,
  });

  const [categoryImage, setCategoryImage] = useState(categoryData[0].image);

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
        <Link
          href="/"
          className="flex items-center space-x-2 border-r border-gray-200 pr-6"
        >
          <Image src={logo} alt="Logo" width={208} height={66} unoptimized />
        </Link>

        {/* {/ Desktop Hamburger - Only visible on desktop /} */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="">
              <NavigationMenuItem className="">
                <NavigationMenuTrigger className="bg-primary hover:bg-primary data-[state=open]:bg-primary">
                  <Hamburger />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border-t border-gray-100">
                  <div className="max-w-[1920px] mx-auto p-8">
                    <div className="grid grid-cols-12 gap-8 w-screen">
                      {/* Categories List */}
                      <div className="col-span-8">
                        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                          {categoryData.map((category) => {
                            const Icon = category.icon;
                            return (
                              <div
                                key={category.id}
                                className="group"
                              >
                                <Link
                                  href={category.path}
                                  className="inline-flex items-center gap-2 text-base font-medium text-foreground group-hover:text-primary transition-colors mb-3"
                                >
                                  <Icon className="w-4 h-4" />
                                  {category.name}
                                </Link>
                                <ul className="space-y-2">
                                  {category.subcategories.map((subcategory) => (
                                    <li
                                      key={subcategory.path}
                                      onMouseEnter={() => setCategoryImage(subcategory.image)}
                                    >
                                      <Link
                                        href={subcategory.path}
                                        className="text-gray-500 hover:text-primary transition-colors block text-sm"
                                      >
                                        {subcategory.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Category Image */}
                      <div className="col-span-4">
                        {categoryImage && (
                          <div className="relative h-full w-full">
                            <Image
                              src={categoryImage}
                              alt="Category preview"
                              fill
                              className="object-contain w-10 h-10"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* {/ Mobile Menu Button - Only visible on mobile /} */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden h-9 w-9 bg-primary rounded-md flex items-center justify-center"
        >
          <Hamburger />
        </button>

        {/* {/ Navigation /} */}
        {menu.map((items) => {
          return (
            <nav
              className="hidden lg:flex items-center justify-between"
              key={items.id}
            >
              {items.name === "Gewinnspiel im Januar" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className={`flex items-center font-medium hover:text-primary hover:underline hover:underline-offset-8 hover:decoration-2 ${pathname === items.link
                        ? "text-primary"
                        : "text-foreground"
                        }`}
                    >
                      {items.name}
                      <ChevronDown className="text-primary w-5 h-5" />
                      <div
                        className={`w-2 h-2 bg-primary rounded-full ${pathname === items.link ? "opacity-100" : "opacity-0"
                          }`}
                      ></div>
                    </button>
                  </DialogTrigger>
                  <PromotionModal />
                </Dialog>
              ) : (
                <Link
                  href={items.link}
                  className={`relative flex items-center font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-8 hover:decoration-2 ${pathname === items.link
                    ? "text-primary underline underline-offset-8 decoration-2"
                    : "text-foreground"
                    }`}
                >
                  {items.name}
                  <ChevronDown
                    className={`w-5 h-5 ${pathname === items.link ? "text-white" : "text-primary"
                      }`}
                  />
                  <div
                    className={`absolute right-0 top-0 w-2 h-2 bg-primary rounded-full ${pathname === items.link ? "opacity-100" : "opacity-0"
                      }`}
                  ></div>
                </Link>
              )}
            </nav>
          );
        })}
        {/* {/ Date Time Bar /} */}
        <div className="bg-primary py-1 px-4 flex items-center justify-end text-sm text-white rounded-full">
          <div className="flex items-center gap-2">
            <span className="border-r pr-2">{formatDate(currentDateTime)}</span>
            <span>{formatTime(currentDateTime)}</span>
          </div>
        </div>

        {/* {/ Search Dialog /} */}
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

        {/* {/ Right Icons /} */}
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

        {/* {/ Mobile Icons /} */}
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

        {/* Replace the User Points Display with this new dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary bg-primary px-2 rounded-md py-1">
            <div className="text-right">
              <div className="flex items-center gap-2 text-white ">
                <span className="font-medium ">My Points</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-80 p-6 bg-white shadow-lg border-2 border-gray-100"
            align="start"
            sideOffset={42}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Snap Points</span>
                  <span className="text-primary font-bold">{userPoints.snapPoints}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Equivalent Value</span>
                  <span className="text-primary font-medium">{userPoints.snapPoints / 100}€</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Discount Points</span>
                  <span className="text-primary font-bold">{userPoints.discountPoints}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Equivalent Value</span>
                  <span className="text-primary font-medium">{userPoints.discountPoints / 100}€</span>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* {/ Mobile Menu /} */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menu={menu}
      />
    </header>
  );
};

export default Header;
