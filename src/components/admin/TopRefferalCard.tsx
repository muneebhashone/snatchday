import { Plus } from 'lucide-react'
import { MoreVertical } from 'lucide-react'
import React from 'react'

const TopRefferalCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[500px]">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Top Referral Sources</h2>
        <p className="text-gray-600">Number of Sales</p>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={20} />
      </button>
    </div>

    {/* Product Icons */}
    <div className="flex gap-4 mb-8">
      <div className="w-20 h-20 rounded-xl border-2 border-blue-500 flex items-center justify-center p-2">
        <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=60&h=60" alt="Smartphone" className="w-full h-full object-contain" />
      </div>
      <div className="w-20 h-20 rounded-xl border-2 border-gray-200 border-dashed flex items-center justify-center p-2">
        <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=60&h=60" alt="Laptop" className="w-full h-full object-contain opacity-40" />
      </div>
      <div className="w-20 h-20 rounded-xl border-2 border-gray-200 border-dashed flex items-center justify-center p-2">
        <img src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=60&h=60" alt="Controller" className="w-full h-full object-contain opacity-40" />
      </div>
      <div className="w-20 h-20 rounded-xl border-2 border-gray-200 border-dashed flex items-center justify-center">
        <Plus size={24} className="text-gray-400" />
      </div>
    </div>

    {/* Products Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-4 text-gray-600 font-medium">IMAGE</th>
            <th className="pb-4 text-gray-600 font-medium">NAME</th>
            <th className="pb-4 text-gray-600 font-medium">STATUS</th>
            <th className="pb-4 text-gray-600 font-medium">REVENUE</th>
            <th className="pb-4 text-gray-600 font-medium">PROFIT</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr>
            <td className="py-3">
              <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=40&h=40" alt="Samsung s22" className="w-10 h-10 rounded-lg object-contain bg-gray-50" />
            </td>
            <td className="py-3 text-gray-800">Samsung s22</td>
            <td className="py-3"><span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">Out of Stock</span></td>
            <td className="py-3 text-gray-800">$12.5k</td>
            <td className="py-3"><span className="text-green-500">+24%</span></td>
          </tr>
          <tr>
            <td className="py-3">
              <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=40&h=40" alt="iPhone 14 Pro" className="w-10 h-10 rounded-lg object-contain bg-gray-50" />
            </td>
            <td className="py-3 text-gray-800">iPhone 14 Pro</td>
            <td className="py-3"><span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">In Stock</span></td>
            <td className="py-3 text-gray-800">$45k</td>
            <td className="py-3"><span className="text-red-500">-18%</span></td>
          </tr>
          <tr>
            <td className="py-3">
              <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=40&h=40" alt="Oneplus 9 Pro" className="w-10 h-10 rounded-lg object-contain bg-gray-50" />
            </td>
            <td className="py-3 text-gray-800">Oneplus 9 Pro</td>
            <td className="py-3"><span className="px-3 py-1 rounded-full text-sm bg-yellow-50 text-yellow-600">Upcoming</span></td>
            <td className="py-3 text-gray-800">$98.2k</td>
            <td className="py-3"><span className="text-green-500">+55%</span></td>
          </tr>
          <tr>
            <td className="py-3">
              <img src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=40&h=40" alt="Google Pixel 6" className="w-10 h-10 rounded-lg object-contain bg-gray-50" />
            </td>
            <td className="py-3 text-gray-800">Google Pixel 6</td>
            <td className="py-3"><span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">In Stock</span></td>
            <td className="py-3 text-gray-800">$210k</td>
            <td className="py-3"><span className="text-green-500">+8%</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default TopRefferalCard