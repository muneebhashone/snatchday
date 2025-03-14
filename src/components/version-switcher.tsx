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
    <div className="bg-black text-primary hover:bg-primary hover:text-white rounded-lg">
    {/* <Image src={logo} alt="logo" width={200} height={200} className="w-full h-full"/> */}
    <p className="text-2xl font-bold">Snatch Day</p>
    <p className="text-sm text-gray-500">Admin</p>
  </div>
  )
}
