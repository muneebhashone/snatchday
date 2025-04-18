import { ArrowUp, ShieldCheck } from 'lucide-react'
import React from 'react'
import { CardContent } from '../ui/card'
import { Card } from '../ui/card'
import { RadialChart } from '../ui/charts/radial-chart'

const OrdersCard = () => {
  return (
    <Card className="md:col-span-1">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-yellow-500" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">22k</span>
                  <span className="ml-2 text-green-500 flex items-center text-sm">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    15%
                  </span>
                </div>
                <p className="text-muted-foreground">Total Order</p>
              </div>
            </div>
            <div>
            <RadialChart 
              value={76} 
              label="Growth"
              color="#FFC107"
              size={100}
              thickness={10}
            />
            </div>
          </CardContent>
        </Card>

  )
}

export default OrdersCard