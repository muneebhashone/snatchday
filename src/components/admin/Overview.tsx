import React from 'react'
import { Users, DollarSign, Package, Monitor, Smartphone, MoreVertical, TrendingUp } from 'lucide-react'

const OverviewPage = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-primary transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <Users className="h-6 w-6 text-primary group-hover:text-white" />
            </div>
            <div>
              <p className="text-gray-500 mb-1 group-hover:text-white/70 transition-colors duration-300">New Customers</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">8,458</h3>
                <span className="text-green-600 group-hover:text-green-400 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4" /> +12%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-primary transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <DollarSign className="h-6 w-6 text-primary group-hover:text-white" />
            </div>
            <div>
              <p className="text-gray-500 mb-1 group-hover:text-white/70 transition-colors duration-300">Total Revenue</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">$28.5k</h3>
                <span className="text-green-600 group-hover:text-green-400 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4" /> +18%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-primary transition-all duration-300 group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
              <Package className="h-6 w-6 text-primary group-hover:text-white" />
            </div>
            <div>
              <p className="text-gray-500 mb-1 group-hover:text-white/70 transition-colors duration-300">Total Orders</p>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">2,450</h3>
                <span className="text-green-600 group-hover:text-green-400 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4" /> +8%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Weekly Sales */}
        <div className="col-span-8 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 mb-1">Weekly Sales</h3>
              <div className="flex items-center gap-2 text-gray-500">
                <p>Total $23.5k Earning</p>
                <span className="text-green-600 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4" /> +62%
                </span>
              </div>
            </div>
            <button className="p-2 text-gray-400 rounded-lg transition-colors duration-300">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 transition-colors duration-300">
                <span className="text-gray-500 transition-colors duration-300">TV&apos;s</span>
                <span className="font-semibold text-gray-900 transition-colors duration-300">16</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 transition-colors duration-300 ">
                <span className="text-gray-500 transition-colors duration-300">Speakers</span>
                <span className="font-semibold text-gray-900 transition-colors duration-300">40</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 group-hover:bg-white/10 rounded-xl p-4 transition-colors duration-300 group/item">
                <span className="text-gray-500 transition-colors duration-300">Shoes</span>
                <span className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">43</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 group-hover:bg-white/10 rounded-xl p-4 transition-colors duration-300 group/item">
                <span className="text-gray-500 group-hover:text-white/70 transition-colors duration-300">Sun Glasses</span>
                <span className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device Stats */}
        <div className="col-span-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300">Device Stats</h3>
            <button className="p-2 text-gray-400 rounded-lg transition-colors duration-300">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl transition-colors duration-300">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 transition-colors duration-300">Mobile</p>
                  <p className="text-gray-500">2,890 Users</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900 transition-colors duration-300">23.5%</p>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-xl transition-colors duration-300">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 transition-colors duration-300">Desktop</p>
                  <p className="text-gray-500">22,465 Users</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-gray-900 transition-colors duration-300">76.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300">Top Products</h3>
          <button className="p-2 text-gray-400 rounded-lg transition-colors duration-300">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-4">PRODUCT</th>
              <th className="pb-4">STATUS</th>
              <th className="pb-4">REVENUE</th>
              <th className="pb-4">PROFIT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="group/row">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-xl transition-colors duration-300">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-gray-900 transition-colors duration-300">Samsung s22</span>
                </div>
              </td>
              <td>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  Out of Stock
                </span>
              </td>
              <td className="text-gray-900 transition-colors duration-300">$12.5k</td>
              <td className="text-green-600">+24%</td>
            </tr>
            <tr className="group/row">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-xl transition-colors duration-300">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-gray-900 transition-colors duration-300">iPhone 14 Pro</span>
                </div>
              </td>
              <td>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  In Stock
                </span>
              </td>
              <td className="text-gray-900 transition-colors duration-300">$45k</td>
              <td className="text-red-600">-18%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OverviewPage