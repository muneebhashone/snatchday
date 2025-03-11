import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

interface ActivityItem {
  name: string
  action: string
  date: string
  time: string
}

const activities: ActivityItem[] = [
  {
    name: "Faraz Hashone",
    action: "has registered",
    date: "28.02.2025",
    time: "15:34:50"
  },
  {
    name: "Tester Test",
    action: "has registered",
    date: "28.02.2025",
    time: "11:30:55"
  },
  {
    name: "Sven Hofrichter",
    action: "has registered",
    date: "27.02.2025",
    time: "17:54:04"
  },
  {
    name: "Tester Test",
    action: "has registered",
    date: "27.02.2025",
    time: "17:44:28"
  },
  {
    name: "Tester Test",
    action: "has registered",
    date: "27.02.2025",
    time: "17:23:34"
  }
]

export function LatestActivity() {
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Latest Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <div className="flex-1">
                <span className="font-medium text-primary">{activity.name}</span>
                <span className="ml-1">{activity.action}</span>
              </div>
              <div className="text-muted-foreground">
                {activity.date} {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 