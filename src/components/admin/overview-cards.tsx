import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, CreditCard, Users, Eye } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {subtitle}
      </p>
    </CardContent>
  </Card>
)

export function OverviewCards() {
  const stats = [
    {
      title: "TOTAL ORDERS",
      value: "864",
      subtitle: "+0% from last month",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "SALES TOTAL",
      value: "45K",
      subtitle: "+0% from last month",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "ALL CUSTOMERS",
      value: "8",
      subtitle: "+0% from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: "VISITORS ONLINE",
      value: "1",
      subtitle: "Current active users",
      icon: <Eye className="h-4 w-4 text-muted-foreground" />
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