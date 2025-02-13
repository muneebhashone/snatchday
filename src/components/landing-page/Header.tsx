"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Heart, ShoppingCart } from "lucide-react";
import logo from "@/app/images/logo.png";
import Image from "next/image";
import { Hamburger } from "@/components/icons/icon";
import MobileMenu from "@/components/MobileMenu";
import Search from "@/components/Search";
import Login from "../auth/Login";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PromotionModal } from "@/components/PromotionModal";

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
  const [openModal, setOpenModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="container max-w-[1920px] mx-auto px-12 py-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={208} height={66} />
        </Link>

        {/* Desktop Hamburger - Only visible on desktop */}
        {/* <div className="hidden lg:flex h-9 w-9 bg-primary rounded-md items-center justify-center">
          <Hamburger />
        </div> */}

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
                      onClick={() => {
                        setOpenModal(true);
                      }}
                      className="text-foreground hover:text-primary text-lg hover:underline hover:underline-offset-8 hover:decoration-2"
                    >
                      {items.name}
                    </button>
                  </DialogTrigger>
                  <PromotionModal openModal={openModal} />
                </Dialog>
              ) : (
                <Link
                  href={items.link}
                  className="text-foreground hover:text-primary text-lg hover:underline hover:underline-offset-8 hover:decoration-2"
                >
                  {items.name}
                </Link>
              )}
            </nav>
          );
        })}

        {/* Search Bar */}
        <Search />

        {/* Right Icons */}
        <div className="hidden lg:flex items-center justify-between gap-5">
          <button className="hover:text-primary bg-transparent p-0 text-[#888888]">
            <Login />
          </button>
          <button className="hover:text-primary bg-transparent p-0 text-[#888888]">
            <Heart className="h-6 w-6 " />
          </button>
          <button className="hover:text-primary bg-transparent p-0 text-[#888888] relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
