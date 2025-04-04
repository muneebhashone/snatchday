"use client";
import * as React from "react";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  Layers,
  Package,
  Filter,
  ChevronDown,
  Plus,
  List,
  Newspaper,
  Trophy,
  Gift,
  ListOrdered,
<<<<<<< HEAD
  Gamepad,
=======
  Heart,
>>>>>>> 709949b72f613a21d88e5eff2791cd05a4a721da
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ReturnIcon } from "./icons/icon";

const navItems = [
  {
    title: "Overview",
    url: "/admin/overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    title: "Products",
    icon: <Package className="h-4 w-4" />,
    subItems: [
      {
        title: "All Products",
        url: "/admin/products",
        icon: <List className="h-4 w-4" />,
      },
      {
        title: "Create Product",
        url: "/admin/products/create",
        icon: <Plus className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Tournaments",
    icon: <Trophy className="h-4 w-4" />,
    subItems: [
      {
        title: "All Tournaments",
        url: "/admin/tournament",
        icon: <List className="h-4 w-4" />,
      },
      {
        title: "Create Tournament",
        url: "/admin/tournament/create-tournament",
        icon: <Plus className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Filters",
    url: "/admin/filters",
    icon: <Filter className="h-4 w-4" />,
  },

  {
    title: "Sale",
    url: "/admin/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
    subItems: [
      {
        title: "Orders",
        url: "/admin/orders",
        icon: <ListOrdered className="h-4 w-4" />,
      },
      {
        title: "Returns",
        url: "/admin/orders/returns",
        icon: <ReturnIcon />,
      },
    ],
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    title: "Wishlist",
    url: "/admin/wishlist",
    icon: <Heart className="h-4 w-4" />,
  },
  {
    title: "Newsletters",
    url: "/admin/newsletters",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    title: "Voucher",

    icon: <Gift className="h-4 w-4" />,
    subItems: [
      {
        title: "All Vouchers",
        url: "/admin/voucher",
        icon: <List className="h-4 w-4" />,
      },
      {
        title: "Create Voucher",
        url: "/admin/voucher/create",
        icon: <Plus className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Games",

    icon: <Gamepad className="h-4 w-4" />,
    subItems: [
      {
        title: "All Games",
        url: "/admin/games",
        icon: <List className="h-4 w-4" />,
      },
      {
        title: "Create Games",
        url: "/admin/games/create",
        icon: <Plus className="h-4 w-4" />,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar {...props} className="border-none shadow-2xl">
      <SidebarHeader className=" bg-black text-primary">
        {/* <VersionSwitcher /> */}
        <div className="bg-black text-primaryrounded-lg">
          {/* <Image src={logo} alt="logo" width={200} height={200} className="w-full h-full"/> */}
          <p className="text-2xl font-bold">Snatch Day</p>
          <p className="text-sm text-gray-500">Admin</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-6 bg-black text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full text-xl py-7 flex items-center justify-between hover:bg-primary hover:text-white rounded-md"
                          tooltip={item.title}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openItems.includes(item.title)
                                ? "transform rotate-180"
                                : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-8 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuButton
                            key={subItem.title}
                            asChild
                            isActive={pathname === subItem.url}
                            tooltip={subItem.title}
                            className="[&[data-active]]:bg-primary [&[data-active]]:text-white text-white rounded-md m-0"
                          >
                            <a
                              href={subItem.url}
                              className="flex items-center gap-3"
                            >
                              {subItem.icon}
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuButton>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      className={`text-xl text-white py-7 ${
                        pathname === item.url
                          ? "data-[active]:bg-primary data-[active]:text-white"
                          : "text-foreground bg-transparent"
                      } hover:bg-primary hover:text-white rounded-md`}
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 text-white"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
