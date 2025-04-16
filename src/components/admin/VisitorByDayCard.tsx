import React from 'react'
import { CardTitle } from '../ui/card'
import { CardHeader } from '../ui/card'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { MoreVertical } from 'lucide-react'
import { CardContent } from '../ui/card'
import { AreaChart } from '../ui/charts/area-chart'


const VisitorByDayCard = () => {
  // Sample data for the chart
  const chartData = [
    { day: 'Sun', visits: 4200 },
    { day: 'Mon', visits: 6800, highlight: true },
    { day: 'Tue', visits: 4800 },
    { day: 'Wed', visits: 7800, highlight: true },
    { day: 'Thu', visits: 9100, highlight: true },
    { day: 'Fri', visits: 5200 },
    { day: 'Sat', visits: 3800 },
  ]

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">
          Visits by Day
          <div className="flex items-center mt-1">
            <span className="text-sm font-normal">Total 248.5k Visits</span>
          </div>
        </CardTitle>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[230px]">
          <AreaChart 
            data={chartData}
            xAxisKey="day"
            series={[
              {
                key: "visits",
                name: "Visits"
              }
            ]}
            colors={["#6366f1"]}
            showGrid={true}
            fillOpacity={0.2}
            height={200}
            curveType="monotone"
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Most Visited Day</p>
            <p className="text-xs text-gray-500">Total 62.4k Visits on Thursday</p>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VisitorByDayCard