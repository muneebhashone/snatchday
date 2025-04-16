import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ArrowDown } from 'lucide-react'
import { ArrowUp } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const MarketingCarosel = () => {
    const [activeSlide, setActiveSlide] = useState(0)
    const slides = [
        {
          title: "Marketing & Sales",
          value: "245.8k",
          label: "Sales",
          change: "+25%",
          isPositive: true,
          icon: "A",
          iconBg: "bg-pink-100",
          metrics: [
            { label: "Billing", value: "18" },
            { label: "Sales", value: "28" },
            { label: "Leads", value: "30" },
            { label: "Impression", value: "80" },
          ],
          category: "Accounting",
        },
        {
          title: "Customer Support",
          value: "1.2k",
          label: "Tickets",
          change: "+12%",
          isPositive: true,
          icon: "C",
          iconBg: "bg-blue-100",
          metrics: [
            { label: "Open", value: "42" },
            { label: "Closed", value: "156" },
            { label: "Pending", value: "23" },
            { label: "Resolved", value: "89" },
          ],
          category: "Support",
        },
        {
          title: "Product Analytics",
          value: "56.7k",
          label: "Active Users",
          change: "+8%",
          isPositive: true,
          icon: "P",
          iconBg: "bg-purple-100",
          metrics: [
            { label: "New", value: "124" },
            { label: "Returning", value: "432" },
            { label: "Churn", value: "12" },
            { label: "Sessions", value: "2.3k" },
          ],
          category: "Analytics",
        },
      ]

      const nextSlide = () => {
        setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }
    
      const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
      }
  return (
    <Card className="md:col-span-1 relative">
    <CardHeader className="pb-0">
      <CardTitle className="text-lg font-medium">
        {slides[activeSlide].title}
        <div className="flex items-center mt-1">
          <span className="text-sm font-normal">
            Total {slides[activeSlide].value} {slides[activeSlide].label}
          </span>
          <span
            className={`ml-2 ${slides[activeSlide].isPositive ? "text-green-500" : "text-red-500"} flex items-center text-sm`}
          >
            {slides[activeSlide].isPositive ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {slides[activeSlide].change}
          </span>
        </div>
      </CardTitle>
      <div className="absolute top-4 right-4 flex space-x-1">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === activeSlide ? "bg-primary" : "bg-gray-200"}`}
          />
        ))}
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="flex items-start space-x-4">
        <div className={`w-16 h-16 rounded-lg ${slides[activeSlide].iconBg} flex items-center justify-center`}>
          <span className="text-2xl font-bold text-purple-700">{slides[activeSlide].icon}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 rounded-md px-2 py-1 text-sm">{slides[activeSlide].metrics[0].value}</div>
            <span className="text-muted-foreground text-sm">{slides[activeSlide].metrics[0].label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 rounded-md px-2 py-1 text-sm">{slides[activeSlide].metrics[2].value}</div>
            <span className="text-muted-foreground text-sm">{slides[activeSlide].metrics[2].label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 rounded-md px-2 py-1 text-sm">{slides[activeSlide].metrics[1].value}</div>
            <span className="text-muted-foreground text-sm">{slides[activeSlide].metrics[1].label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 rounded-md px-2 py-1 text-sm">{slides[activeSlide].metrics[3].value}</div>
            <span className="text-muted-foreground text-sm">{slides[activeSlide].metrics[3].label}</span>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="pt-0">
      <div className="flex space-x-2 w-full">
        <Button variant="outline" className="flex-1">
          <span className="mr-2">📋</span> Details
        </Button>
        <Button className="flex-1 bg-indigo-500 hover:bg-indigo-600">
          <span className="mr-2">📊</span> Report
        </Button>
      </div>
    </CardFooter>
    <Button
      variant="ghost"
      size="icon"
      className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 shadow-md"
      onClick={prevSlide}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 shadow-md"
      onClick={nextSlide}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  </Card>
  )
}

export default MarketingCarosel