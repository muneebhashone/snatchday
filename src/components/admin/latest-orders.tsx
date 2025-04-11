import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, ExternalLink } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn, formatCurrency } from "@/lib/utils"

interface Order {
  orderNumber: string
  customer: string
  status: "In Progress" | "Complete" | "Paid"
  created: string
  total: number
}

const orders: Order[] = [
  {
    orderNumber: "1400",
    customer: "Florian Zander",
    status: "In Progress",
    created: "February 28, 2025",
    total: 35.04
  },
  {
    orderNumber: "1399",
    customer: "Florian Zander",
    status: "In Progress",
    created: "February 28, 2025",
    total: 35.04
  },
  {
    orderNumber: "1398",
    customer: "Tester Test",
    status: "Complete",
    created: "January 30, 2025",
    total: 5.00
  },
  {
    orderNumber: "1396",
    customer: "Tester Test",
    status: "Paid",
    created: "January 23, 2025",
    total: 15.69
  },
  {
    orderNumber: "1395",
    customer: "Sven Hofrichter",
    status: "Complete",
    created: "January 15, 2025",
    total: 10.00
  }
]

export function LatestOrders() {
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
            <ShoppingCart className="h-4 w-4" />
          </div>
          <span>Latest Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="rounded-lg overflow-hidden border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-medium">Order number</TableHead>
                <TableHead className="font-medium">Customer</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Created</TableHead>
                <TableHead className="text-right font-medium">In total</TableHead>
                <TableHead className="font-medium">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderNumber} className="group hover:bg-muted/50">
                  <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      "transition-colors",
                      order.status === "In Progress" ? "bg-blue-100 text-blue-900" : 
                      order.status === "Complete" ? "bg-green-100 text-green-900" : 
                      "bg-gray-100 text-gray-900"
                    )}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full mr-1.5",
                        order.status === "In Progress" ? "bg-blue-400" : 
                        order.status === "Complete" ? "bg-green-400" : 
                        "bg-gray-400"
                      )} />
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.created}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn(
                        "h-8 w-8 opacity-0 group-hover:opacity-100",
                        "transition-all duration-200",
                        "hover:bg-primary hover:text-white"
                      )}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 