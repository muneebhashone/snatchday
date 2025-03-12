"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
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
                orders: Math.random() * 0.5, // Random data for demonstration
                customers: Math.random() * 0.5,
            })
            currentDate = addDays(currentDate, 1)
        }
        return data
    }

    const data = date?.from && date?.to ? generateData(date.from, date.to) : []

    return (
        <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <CardTitle className="flex items-center gap-2">
                    <span>Sales Statistics</span>
                </CardTitle>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal w-[300px]",
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
            <CardContent>
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
                            <XAxis
                                dataKey="day"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={true}
                                axisLine={true}
                                domain={[-1, 1]}
                                ticks={[-1, -0.5, 0, 0.5, 1]}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#F37835"
                                strokeWidth={2}
                                dot={false}
                                name="Orders"
                            />
                            <Line
                                type="monotone"
                                dataKey="customers"
                                stroke="#0ea5e9"
                                strokeWidth={2}
                                dot={false}
                                name="Customers"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
} 