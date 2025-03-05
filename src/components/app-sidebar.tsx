import * as React from "react"
import { VersionSwitcher } from "@/components/version-switcher"
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
} from "@/components/ui/sidebar"
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
  Newspaper
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

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
    title: "Filters",
    url: "/admin/filters",
    icon: <Filter className="h-4 w-4" />,
  },
  {
    title: "Newsletter",
    url: "/admin/newsletter",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setOpenItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border h-20 flex items-center justify-center">
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem className="mb-5" key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openItems.includes(item.title)}
                      onOpenChange={() => toggleItem(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full flex items-center justify-between"
                          tooltip={item.title}
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openItems.includes(item.title) ? 'transform rotate-180' : ''}`} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-8 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <SidebarMenuButton
                            key={subItem.title}
                            asChild
                            isActive={pathname === subItem.url}
                            tooltip={subItem.title}
                          >
                            <a href={subItem.url} className="flex items-center gap-3">
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
                      className="text-xl"
                    >
                      <a href={item.url} className="flex items-center gap-3">
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
  )
}
