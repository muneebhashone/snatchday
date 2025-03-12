import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, CreditCard, Users, Eye } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => (
  <Card className="border border-primary text-primary">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <span className="text-white bg-primary p-[4px] rounded-full ">{icon}</span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs ">
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
      icon: <ShoppingCart className="h-5 w-5 text-white" />
    },
    {
      title: "SALES TOTAL",
      value: "45K",
      subtitle: "+0% from last month",
      icon: <CreditCard className="h-5 w-5 text-white" />
    },
    {
      title: "ALL CUSTOMERS",
      value: "8",
      subtitle: "+0% from last month",
      icon: <Users className="h-5 w-5 text-white" />
    },
    {
      title: "VISITORS ONLINE",
      value: "1",
      subtitle: "Current active users",
      icon: <Eye className="h-5 w-5 text-white" />
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