"use client"

import * as React from "react"
import logo from "@/app/images/logo.png"


import {
  DropdownMenu,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function VersionSwitcher() {


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              // size="3xl"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <Image src={logo} alt="logo" width={90} height={90} className="w-full h-full"/>
              </div>
              {/* <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Snatch Day</span>
              
              </div> */}
              {/* <ChevronsUpDown className="ml-auto" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
         
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
