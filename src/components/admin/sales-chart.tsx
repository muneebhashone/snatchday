"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg p-4">
        <p className="text-sm font-medium mb-2">{`Day ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.stroke }}>
            {`${entry.name}: ${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SalesChart() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    })

    const generateData = (startDate: Date, endDate: Date) => {
        const data = []
        let currentDate = new Date(startDate)
        
        while (currentDate <= endDate) {
            data.push({
                day: format(currentDate, "dd"),
                orders: Math.random() * 0.5,
                customers: Math.random() * 0.5,
            })
            currentDate = addDays(currentDate, 1)
        }
        return data
    }

    const data = date?.from && date?.to ? generateData(date.from, date.to) : []

    return (
        <Card className={cn(
          "border-border/50 relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg",
          "bg-gradient-to-br from-card to-background"
        )}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between pb-8 relative">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <span>Sales Statistics</span>
                </CardTitle>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal",
                                "bg-background/60 backdrop-blur-sm",
                                "hover:bg-background/80 transition-colors",
                                "border-border/50 hover:border-border",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </CardHeader>
            <CardContent className="relative pb-4">
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F37835" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#F37835" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="customersGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                                tickMargin={8}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                                domain={[-1, 1]}
                                ticks={[-1, -0.5, 0, 0.5, 1]}
                                tickMargin={8}
                            />
                            <Tooltip 
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#666', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Legend 
                                verticalAlign="top" 
                                height={36}
                                iconType="circle"
                                iconSize={8}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#F37835"
                                strokeWidth={2.5}
                                dot={false}
                                name="Orders"
                                activeDot={{ r: 6, strokeWidth: 2 }}
                                fill="url(#ordersGradient)"
                            />
                            <Line
                                type="monotone"
                                dataKey="customers"
                                stroke="#0ea5e9"
                                strokeWidth={2.5}
                                dot={false}
                                name="Customers"
                                activeDot={{ r: 6, strokeWidth: 2 }}
                                fill="url(#customersGradient)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
} 