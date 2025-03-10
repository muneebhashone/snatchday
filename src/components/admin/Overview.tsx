import React from 'react'

import { OverviewCards } from './overview-cards'
import { SalesChart } from './sales-chart'
import { LatestActivity } from './latest-activity'
import { LatestOrders } from './latest-orders'

const OverviewPage = () => {
  return (
    <div className="space-y-8 p-8">
      <OverviewCards />
      <SalesChart />
      <div className="grid gap-8 md:grid-cols-2">
        <LatestActivity />
        <LatestOrders />
      </div>
    </div>
  )
}

export default OverviewPage