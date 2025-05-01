import React from "react";
import {
  UserCircle,
  ShoppingBag,
  Receipt,
  Trophy,
  Swords,
  TrendingUp,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, useUserContext } from "@/context/userContext";
import Image from "next/image";

const AccountSidebar = ({ Userprofile }: { Userprofile: User }) => {
  const pathname = usePathname();
  const { user } = useUserContext();

  const navigationLinks = [
    {
      icon: <UserCircle className="w-5 h-5" />,
      text: "My Profile",
      href: "/my-account/my-profile",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      text: "Orders",
      href: "/my-account/my-orders",
    },
    {
      icon: <Receipt className="w-5 h-5" />,
      text: "Payment History",
      href: "/my-account/payment-history",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      text: "Tournaments",
      href: "/my-account/my-tournaments",
    },
    {
      icon: <Swords className="w-5 h-5" />,
      text: "Duels",
      href: "/my-account/my-duels",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Points Trends",
      href: "/my-account/points-trends",
    },
    {
      icon: <ArrowLeftRight className="w-5 h-5" />,
      text: "Returns",
      href: "/my-account/returns",
    },
  ];

  const disbaleTabs = ["Duels", "Points Trends"];

  return (
    <div className="lg:col-span-3 rounded-3xl relative">
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        {/* User Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="rounded-full overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
            {Userprofile?.image ? (
              <Image
                src={Userprofile?.image}
                alt="avatar"
                width={100}
                height={100}
                unoptimized
                objectFit="contain"
              />
            ) : (
              <UserCircle className="w-16 h-16 text-gray-400" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {Userprofile?.username || Userprofile?.data?.user?.name}
          </h2>
          <p className="text-gray-500">{Userprofile?.email}</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navigationLinks.map((link, index) => {
            const isActive = pathname === link.href;
            const isDisabled = disbaleTabs.includes(link.text); // Check if the tab should be disabled
            return (
              <Link
                key={index}
                href={isDisabled ? "#" : link.href}
                className={`group flex items-center gap-3 p-3 rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-card-foreground font-medium hover:bg-primary hover:text-white"
                } ${
                  isDisabled
                    ? "pointer-events-none cursor-not-allowed text-gray-400"
                    : ""
                }`}
              >
                <span
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-white"
                      : "text-primary group-hover:text-white"
                  }`}
                >
                  {link.icon}
                </span>
                {link.text}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AccountSidebar;
