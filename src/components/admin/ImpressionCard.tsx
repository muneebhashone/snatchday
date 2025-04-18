import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Laptop, ArrowDown } from 'lucide-react'
import { RadialChart } from '@/components/ui/charts/radial-chart'

const ImpressionCard = () => {
  return (
    <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div className='flex items-center space-x-4'>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Laptop className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <div className="flex items-center">
                
                  <span className="text-2xl font-bold">84k</span>
                  <span className="ml-2 text-red-500 flex items-center text-sm">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    24%
                  </span>
                </div>
                <p className="text-muted-foreground">Total Impression</p>
                </div>
              </div>
              <div>
            <RadialChart 
              value={76} 
              label="Growth"
              color="#6366f1"
              size={100}
              thickness={10}
            />
          </div>
            </div>
          </CardContent>
        </Card>
  )
}

export default ImpressionCard