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
import { useUserContext } from "@/context/userContext";

const AccountSidebar = () => {
  const pathname = usePathname();
  const {user}=useUserContext()

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

  return (
    <div className="lg:col-span-3 rounded-3xl relative">
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        {/* User Profile */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
            <UserCircle className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user?.user?.username || user?.user?.name}</h2>
          <p className="text-gray-500">{user?.user?.email}</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navigationLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-card-foreground font-medium hover:bg-primary hover:text-white"
                  }`}
              >
                <span
                  className={`${
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
