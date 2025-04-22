// "use client";
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
  RefreshCw,
  FileQuestionIcon,
  Star,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
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
        icon: <RefreshCw className="h-4 w-4" />,
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
  {
    title: "FAQ",

    icon: <FileQuestionIcon className="h-4 w-4" />,
    subItems: [
      {
        title: "All FAQ",
        url: "/admin/faq",
      },
      {
        title: "Create FAQ",
        url: "/admin/faq/create",
        icon: <Plus className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: <Star className="h-4 w-4" />,
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
        "border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarHeader className="bg-white border-b border-gray-200">
        <div
          className={cn(
            "flex flex-col items-center",
            isExpanded ? "px-4 py-4" : "py-3"
          )}
        >
          {isExpanded ? (
            <>
              <p className="text-2xl font-bold text-gray-800">Snatch Day</p>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </>
          ) : (
            <p className="text-xl font-bold text-gray-800">SD</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4 bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
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
                            "w-full py-2.5 flex items-center transition-colors duration-200",
                            "hover:bg-gray-50 hover:text-primary rounded-md",
                            isExpanded
                              ? "justify-between px-4"
                              : "justify-center",
                            openItems.includes(item.title)
                              ? "text-primary"
                              : "text-gray-600"
                          )}
                          tooltip={!isExpanded ? item.title : undefined}
                        >
                          <div
                            className={cn(
                              "flex items-center",
                              isExpanded ? "gap-3" : ""
                            )}
                          >
                            {item.icon}
                            {isExpanded && (
                              <span className="text-sm font-medium">
                                {item.title}
                              </span>
                            )}
                          </div>
                          {isExpanded && (
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                openItems.includes(item.title)
                                  ? "transform rotate-180"
                                  : ""
                              )}
                            />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {isExpanded && (
                        <CollapsibleContent className="pl-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuButton
                              key={subItem.title}
                              asChild
                              isActive={pathname === subItem.url}
                              tooltip={!isExpanded ? subItem.title : undefined}
                              className={cn(
                                "w-full py-2 px-4 text-sm font-medium transition-colors duration-200",
                                "hover:bg-gray-50 hover:text-primary rounded-md",
                                pathname === subItem.url
                                  ? "bg-primary/10 text-primary"
                                  : "text-gray-600"
                              )}
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
                        "w-full py-2.5 flex items-center transition-colors duration-200",
                        "hover:bg-gray-50 hover:text-primary rounded-md",
                        isExpanded ? "px-4" : "justify-center",
                        pathname === item.url
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600"
                      )}
                    >
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center",
                          isExpanded ? "gap-3" : "justify-center"
                        )}
                      >
                        {item.icon}
                        {isExpanded && (
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        )}
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
