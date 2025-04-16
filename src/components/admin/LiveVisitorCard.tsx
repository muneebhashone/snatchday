import { ArrowUp } from 'lucide-react'
import { CardContent, CardHeader, CardTitle } from '../ui/card'
import React from 'react'
import { Card } from '../ui/card'

const LiveVisitorCard = () => {
  return (
    <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">
        Live Visitors
        <div className="flex items-center mt-1">
          <span className="text-sm font-normal">Total 890 Visitors Are Live</span>
          <span className="ml-2 text-green-500 flex items-center text-sm">
            <ArrowUp className="h-3 w-3 mr-1" />
            78.2%
          </span>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex items-end justify-between h-24 px-2">
        {[65, 85, 65, 45, 25, 50, 25, 75, 30, 60, 75, 80].map((height, i) => (
          <div key={i} className="w-3 bg-green-400 rounded-full" style={{ height: `${height}%` }} />
        ))}
      </div>
    </CardContent>
  </Card>
  )
}

export default LiveVisitorCard