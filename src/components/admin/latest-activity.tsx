import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <Card className={cn(
      "border-border/50 relative overflow-hidden transition-all duration-300",
      "hover:shadow-lg",
      "bg-gradient-to-br from-card to-background"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <CalendarDays className="h-4 w-4" />
          </div>
          <span>Latest Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className={cn(
                "group relative pl-6 py-4 flex items-start gap-4",
                "hover:bg-muted/50 transition-colors",
                index !== activities.length - 1 && "border-b border-border/50"
              )}
            >
              <div className="absolute left-0 top-0 bottom-0 flex items-center">
                <Circle className="h-2 w-2 text-primary fill-primary" />
                {index !== activities.length - 1 && (
                  <div className="absolute top-4 left-[3.5px] bottom-0 w-[1px] bg-border" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-medium text-primary truncate">{activity.name}</span>
                  <span className="text-muted-foreground truncate">{activity.action}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.date}</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-border" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 