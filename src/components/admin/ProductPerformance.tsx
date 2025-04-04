"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, Eye } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProductPerformance() {
  const [dateRange, setDateRange] = useState("Last 7 days")

  const products = [
    {
      id: 1,
      name: "Black t-shirt",
      price: "$25.00",
      sku: "••••••••",
      orders: 3,
      quantity: { value: 21, percent: 17.07 },
      quantitySold: { value: 21, percent: 15.33 },
      revenue: { value: "$519.38", percent: 29.63 },
      retention: { value: "2%", color: "orange" },
      average: "5m 14d",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "White t-shirt",
      price: "$10.00",
      sku: "••••••••",
      orders: 3,
      quantity: { value: 31, percent: 25.2 },
      quantitySold: { value: 37, percent: 27.01 },
      revenue: { value: "$370.00", percent: 21.11 },
      retention: { value: "2%", color: "red" },
      average: "3m 25d",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Green t-shirt",
      price: "$15.00",
      sku: "••••••••",
      orders: 3,
      quantity: { value: 22, percent: 17.89 },
      quantitySold: { value: 24, percent: 17.52 },
      revenue: { value: "$352.12", percent: 20.09 },
      retention: { value: "2%", color: "green" },
      average: "2m 18d",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Shorts",
      price: "$15.00",
      sku: "••••••••",
      orders: 3,
      quantity: { value: 9, percent: 7.32 },
      quantitySold: { value: 9, percent: 6.57 },
      revenue: { value: "$126.00", percent: 7.19 },
      retention: { value: "0%", color: "red" },
      average: "12d",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "Sunglasses",
      price: "$8.00",
      sku: "••••••••",
      orders: 2,
      quantity: { value: 8, percent: 6.5 },
      quantitySold: { value: 9, percent: 6.57 },
      revenue: { value: "$72.00", percent: 4.11 },
      retention: { value: "3%", color: "green" },
      average: "3m 23d",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Product performance</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <div className="relative">
            <div className="flex items-center border rounded-md px-4 py-2 gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">Last 7 days</span>
              <span className="text-xs text-gray-500">Jun 7 - Jun 13</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6 font-medium text-gray-600">Product</th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">Orders</th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">Quantity</th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">
                  <div className="flex items-center justify-center">
                    Revenue
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">
                  <div className="flex items-center justify-center">
                    Retention
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Percentage of customers who made repeat purchases</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-medium text-gray-600">
                  <div className="flex items-center justify-center">
                    Average...
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Average time between purchases</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.price} · SKU: {product.sku}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{product.orders}</span>
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-center">
                      <div>{product.quantity.value}</div>
                      <div className="text-xs text-gray-500">{product.quantity.percent}% of all</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-center">
                      <div>{product.revenue.value}</div>
                      <div className="text-xs text-gray-500">{product.revenue.percent}% of all</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col items-center">
                      <div>{product.retention.value}</div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            product.retention.color === "green"
                              ? "bg-green-500"
                              : product.retention.color === "orange"
                                ? "bg-orange-500"
                                : "bg-red-500"
                          }`}
                          style={{
                            width:
                              product.retention.value === "0%"
                                ? "2%"
                                : product.retention.value === "2%"
                                  ? "30%"
                                  : "50%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center items-center">
                      <div>{product.average}</div>
                      <div className="w-16 h-2 bg-gray-200 rounded-full ml-2">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: product.average.includes("5m")
                              ? "90%"
                              : product.average.includes("3m")
                                ? "70%"
                                : product.average.includes("2m")
                                  ? "50%"
                                  : "20%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

