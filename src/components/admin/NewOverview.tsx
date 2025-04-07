"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  HelpCircle,
  Home,
  LayoutGrid,
  MessageSquare,
  Phone,
  ShoppingBag,
  Users,
  Zap,
  Bell,
  Calendar,
  FileText,
  Mail,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import ProductPerformance from "./ProductPerformance"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
   
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

const NewOverview = () => {
    const [dateRange, setDateRange] = useState("Last 7 days")
    const [compareRange, setCompareRange] = useState("Previous 7 days")
  return (
    
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px] border rounded-md">
                    <SelectValue>{dateRange}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                    <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                    <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <div className="border rounded-md px-3 py-2 flex items-center gap-2 text-sm">
                  <span>Oct 10 - Oct 16</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Compare with</span>
                <Select value={compareRange} onValueChange={setCompareRange}>
                  <SelectTrigger className="w-[180px] border rounded-md">
                    <SelectValue>{compareRange}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Previous 7 days">Previous 7 days</SelectItem>
                    <SelectItem value="Previous 30 days">Previous 30 days</SelectItem>
                    <SelectItem value="Previous 90 days">Previous 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <div className="border rounded-md px-3 py-2 flex items-center gap-2 text-sm">
                  <span>Oct 3 - Oct 9</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Revenue Card */}
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-gray-600">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold">€9,964.05</div>
                    <div className="flex items-center text-sm text-emerald-600 font-medium mt-1">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>15% up from previous period</span>
                    </div>
                  </div>
                  <div className="h-24">
                    {/* <RevenueChart /> */}
                    <Card>
     
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown Card */}
            <Card className="col-span-1">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                      <span className="text-sm text-gray-600">From new customers</span>
                    </div>
                    <div className="text-2xl font-bold">€8,150.17</div>
                    <div className="text-sm text-gray-600">82% of all revenue</div>
                    <div className="text-sm text-gray-600">30 orders</div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm text-gray-600">From returning customers</span>
                    </div>
                    <div className="text-2xl font-bold">€1,813.88</div>
                    <div className="text-sm text-gray-600">18% of all revenue</div>
                    <div className="text-sm text-gray-600">7 orders</div>
                  </div>
                </div>
              </CardContent>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>
            </Card>

            {/* Orders and New Customers */}
            <div className="col-span-1 grid grid-rows-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-gray-600">Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <div className="text-4xl font-bold">37</div>
                    <div className="flex items-center text-sm text-red-500 font-medium mt-1">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span>3% down from previous period</span>
                    </div>
                    <div className="h-16 mt-2">
                      <OrdersChart />
             
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-gray-600">New customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <div className="text-4xl font-bold">30</div>
                    <div className="flex items-center text-sm text-emerald-600 font-medium mt-1">
                      <ArrowUpDown className="h-4 w-4 mr-1" />
                      <span>0% up from previous period</span>
                    </div>
                    <div className="h-16 mt-2">
                      <CustomersChart />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products and Live Feed */}
          <div className="grid grid-cols-2 gap-6">
            {/* Popular Products */}
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Popular products</CardTitle>
                <Link href="#" className="text-sm text-gray-600 underline">
                  See all
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex justify-between items-center px-6 py-3 border-b">
                  <Select defaultValue="revenue">
                    <SelectTrigger className="w-[180px] border">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="divide-y">
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Brown sweatshirt"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Brown sweatshirt</div>
                        <div className="text-sm text-gray-500">
                          €395.00 · <span className="text-gray-300">••••••••••••</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">€838.21</div>
                      <div className="text-sm text-gray-500">2 ordered</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                        <Image
                          src="/placeholder.svg?height=64&width=64"
                          alt="Navy sweatshirt"
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Navy sweatshirt</div>
                        <div className="text-sm text-gray-500">
                          €465.00 · <span className="text-gray-300">••••••••••••</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">€418.50</div>
                      <div className="text-sm text-gray-500">1 ordered</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Feed */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Live feed</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                        <span className="text-xs">jh</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400">
                          <span className="text-gray-300">••••••••••••</span> placed an order with 3 products.
                        </div>
                        <div className="text-xs text-gray-500 mt-1">about 3 hours ago</div>
                        <div className="flex mt-3 gap-2">
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Product"
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Product"
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Product"
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-emerald-500 font-medium">€165.00</div>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                        <span className="text-xs">jh</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-400">
                          <span className="text-gray-300">••••••••••••</span> has 3 products in their shopping cart.
                        </div>
                        <div className="text-xs text-gray-500 mt-1">about 3 hours ago</div>
                      </div>
                      <div className="text-emerald-500 font-medium">€165.00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <ProductPerformance />
        </main>
  
  )
}

function RevenueChart() {
  return (
    <div className="w-full h-full flex items-end">
      <div className="w-1/7 h-[40%] bg-pink-500 rounded-sm mx-1"></div>
      <div className="w-1/7 h-[30%] bg-pink-500 rounded-sm mx-1"></div>
      <div className="w-1/7 h-[60%] bg-pink-500 rounded-sm mx-1"></div>
      <div className="w-1/7 h-[40%] bg-pink-500 rounded-sm mx-1"></div>
      <div className="w-1/7 h-[80%] bg-pink-500 rounded-sm mx-1"></div>
      <div className="w-1/7 h-[60%] bg-pink-500 rounded-sm mx-1"></div>
      <div className="w-1/7 h-[20%] bg-gray-200 rounded-sm mx-1"></div>
    </div>
  )
}

function OrdersChart() {
  return (
    <svg viewBox="0 0 300 80" className="w-full h-full">
      <path
        d="M0,60 L30,50 L60,55 L90,45 L120,50 L150,40 L180,30 L210,45 L240,35 L270,40 L300,60"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <circle cx="30" cy="50" r="3" fill="#3b82f6" />
      <circle cx="60" cy="55" r="3" fill="#3b82f6" />
      <circle cx="90" cy="45" r="3" fill="#3b82f6" />
      <circle cx="120" cy="50" r="3" fill="#3b82f6" />
      <circle cx="150" cy="40" r="3" fill="#3b82f6" />
      <circle cx="180" cy="30" r="3" fill="#3b82f6" />
      <circle cx="210" cy="45" r="3" fill="#3b82f6" />
      <circle cx="240" cy="35" r="3" fill="#3b82f6" />
      <circle cx="270" cy="40" r="3" fill="#3b82f6" />
      <circle cx="300" cy="60" r="3" fill="#3b82f6" />
    </svg>
  )
}

function CustomersChart() {
  return (
    <svg viewBox="0 0 300 80" className="w-full h-full">
      <path
        d="M0,50 L30,40 L60,30 L90,45 L120,35 L150,25 L180,40 L210,20 L240,30 L270,40 L300,60"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <circle cx="30" cy="40" r="3" fill="#3b82f6" />
      <circle cx="60" cy="30" r="3" fill="#3b82f6" />
      <circle cx="90" cy="45" r="3" fill="#3b82f6" />
      <circle cx="120" cy="35" r="3" fill="#3b82f6" />
      <circle cx="150" cy="25" r="3" fill="#3b82f6" />
      <circle cx="180" cy="40" r="3" fill="#3b82f6" />
      <circle cx="210" cy="20" r="3" fill="#3b82f6" />
      <circle cx="240" cy="30" r="3" fill="#3b82f6" />
      <circle cx="270" cy="40" r="3" fill="#3b82f6" />
      <circle cx="300" cy="60" r="3" fill="#3b82f6" />
    </svg>
  )
}


export default NewOverview