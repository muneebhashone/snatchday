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
  Gamepad,
  Heart,
  Ticket,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { AnnouncementIcon, ReturnIcon } from "./icons/icon";
import { cn } from "@/lib/utils";

const navItems = [

  {
    title: "Overview",
    url: "/admin/overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },

  {
    title: "Customers",
    url: "/admin/customers",
    icon: <Users className="h-4 w-4" />,
  },

  {
    title: "Filters",
    url: "/admin/filters",
    icon: <Filter className="h-4 w-4" />,
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
    title: "Newsletters",
    url: "/admin/newsletters",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: <AnnouncementIcon />,
  },


  {
    title: "Web Settings",

    icon: <Settings className="h-4 w-4" />,
    subItems: [
      {
        title: "All Web Settings",
        url: "/admin/web-settings",
        icon: <List className="h-4 w-4" />,
      },
      {
        title: "Create Web Setting",
        url: "/admin/web-settings/create",
        icon: <Plus className="h-4 w-4" />,
      },
      // {
      //   title: "Edit Web Setting",
      //   url: "/admin/web-settings/edit",
      //   icon: <List className="h-4 w-4" />,
      // },
    ],
  },
  {
    title: "Tickets",
    url: "/admin/tickets",
    icon: <Ticket className="h-4 w-4" />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar 
      {...props} 
      className={cn(
        "border-none shadow-2xl transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
       
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarHeader className="bg-gray-100 text-primary">
        <div className={cn("text-primary rounded-lg", 
          isExpanded ? "px-4 py-2" : "py-1 flex justify-center"
        )}>
          {isExpanded ? (
            <>
              <p className="text-2xl font-bold">Snatch Day</p>
              <p className="text-sm text-primary">Admin</p>
            </>
          ) : (
            <p className="text-xl font-bold">SD</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="py-6 bg-gray-100 text-primary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openItems.includes(item.title) && isExpanded}
                      onOpenChange={() => isExpanded && toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "w-full text-xl py-3 flex items-center hover:bg-gray-100 hover:text-primary rounded-md",
                            isExpanded ? "justify-between px-4" : "justify-center"
                          )}
                          tooltip={!isExpanded ? item.title : undefined}
                        >
                          <div className={cn("flex items-center", isExpanded ? "gap-3" : "")}>
                            {item.icon}
                            {isExpanded && <span>{item.title}</span>}
                          </div>
                          {isExpanded && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                openItems.includes(item.title) ? "transform rotate-180" : ""
                              }`}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {isExpanded && (
                        <CollapsibleContent className="pl-8 mt-2 space-y-2">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuButton
                              key={subItem.title}
                              asChild
                              isActive={pathname === subItem.url}
                              tooltip={!isExpanded ? subItem.title : undefined}
                              className="[&[data-active]]:bg-gray-100 [&[data-active]]:text-primary text-primary rounded-md m-0"
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
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={!isExpanded ? item.title : undefined}
                      className={cn(
                        "text-xl text-primary py-3 hover:bg-gray-100 hover:text-primary rounded-md",
                        isExpanded ? "px-4" : "justify-center",
                        pathname === item.url
                          ? "data-[active]:bg-primary data-[active]:text-white"
                          : "text-foreground bg-transparent"
                      )}
                    >
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center text-primary",
                          isExpanded ? "gap-3" : "justify-center"
                        )}
                      >
                        {item.icon}
                        {isExpanded && <span>{item.title}</span>}
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
