import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, CreditCard, Users, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
}

const StatCard = ({ title, value, subtitle, icon, trend }: StatCardProps) => {
  const trendColor = trend === "up" 
    ? "text-green-600" 
    : trend === "down" 
    ? "text-red-600" 
    : "text-muted-foreground";

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 group",
      "hover:shadow-lg hover:-translate-y-1",
      "bg-foreground hover:from-primary hover:to-primary",
      "border border-border/50",
      "hover:text-white"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-white/10" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-semibold tracking-wide text-white group-hover:text-white">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-full transition-colors",
          "bg-primary text-white",
          "group-hover:bg-white/20 group-hover:text-white"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold tracking-tight text-primary">{value}</div>
          <div className={cn(
            "text-xs font-medium",
            trendColor,
            "group-hover:text-white/90"
          )}>
            {subtitle}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/30 to-transparent group-hover:from-white/20 group-hover:via-white/30" />
      </CardContent>
    </Card>
  )
}

export function OverviewCards() {
  const stats = [
    {
      title: "TOTAL ORDERS",
      value: "864",
      subtitle: "+12% from last month",
      icon: <ShoppingCart className="h-4 w-4" />,
      trend: "up" as const
    },
    {
      title: "SALES TOTAL",
      value: "₹45K",
      subtitle: "+8% from last month",
      icon: <CreditCard className="h-4 w-4" />,
      trend: "up" as const
    },
    {
      title: "ALL CUSTOMERS",
      value: "8",
      subtitle: "-2% from last month",
      icon: <Users className="h-4 w-4" />,
      trend: "down" as const
    },
    {
      title: "VISITORS ONLINE",
      value: "1",
      subtitle: "Current active users",
      icon: <Eye className="h-4 w-4" />,
      trend: "neutral" as const
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
} 