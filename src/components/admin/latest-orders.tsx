import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Order {
  orderNumber: string
  customer: string
  status: "In Progress" | "Complete" | "Paid"
  created: string
  total: string
}

const orders: Order[] = [
  {
    orderNumber: "1400",
    customer: "Florian Zander",
    status: "In Progress",
    created: "February 28, 2025",
    total: "35.04€"
  },
  {
    orderNumber: "1399",
    customer: "Florian Zander",
    status: "In Progress",
    created: "February 28, 2025",
    total: "35.04€"
  },
  {
    orderNumber: "1398",
    customer: "Tester Test",
    status: "Complete",
    created: "January 30, 2025",
    total: "5.00€"
  },
  {
    orderNumber: "1396",
    customer: "Tester Test",
    status: "Paid",
    created: "January 23, 2025",
    total: "15.69€"
  },
  {
    orderNumber: "1395",
    customer: "Sven Hofrichter",
    status: "Complete",
    created: "January 15, 2025",
    total: "10.00€"
  }
]

export function LatestOrders() {
  return (
    <Card className="border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Latest Orders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">In total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs
                    ${order.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                      order.status === "Complete" ? "bg-green-100 text-green-800" : 
                      "bg-gray-100 text-gray-800"}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.created}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 