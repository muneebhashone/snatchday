"use client"

import { MoreVertical, TrendingUp } from "lucide-react"

import card1 from "@/app/images/card-ratings-illustration.png"
import card2 from "@/app/images/card-session-illustration.png"
import { ArrowRightLeft, Users, DollarSign } from "lucide-react"
import Image from "next/image"
import SlideProducts from "./SlideProducts"
import TopRefferalCard from "./TopRefferalCard"
import ActivityCards from "./ActivityTimelineCard"


const NewOverview = () => {

  return (
    <>
    <div className="bg-gray-100">
    <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sales Overview Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Sales Overview</h2>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Total 42.5k Sales</p>
              <span className="text-green-500 flex items-center text-sm">
                <TrendingUp size={16} className="mr-1" />
                +18%
              </span>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">8,458</h3>
              <p className="text-gray-600">New Customers</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">$28.5k</h3>
              <p className="text-gray-600">Total Profit</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-cyan-50 p-3 rounded-lg">
              <ArrowRightLeft className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">2,450k</h3>
              <p className="text-gray-600">New Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 col-span-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Ratings</p>
            <div className="mt-1">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                Year of 2021
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-800">8.14k</h3>
              <span className="text-green-500 text-sm">+15.6%</span>
            </div>
          </div>
          <Image 
            src={card1.src}
            width={100}
            height={100}
            alt="Profile" 
            className="w-16 h-full object-cover"
          />
        </div>
      </div>

      {/* Sessions Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 col-span-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Sessions</p>
            <div className="mt-1">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                Last Month
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-800">12.2k</h3>
              <span className="text-red-500 text-sm">-25.5%</span>
            </div>
          </div>
          <Image 
            src={card2.src}
            width={100}
            height={100}
            alt="Profile" 
            className="w-16 h-full object-cover"
          />
        </div>
      </div>
      <div className="col-span-4">
        <SlideProducts />
      </div>
      <div className="col-span-2 h-full">
        <ActivityCards />
      </div>
      <div className="col-span-2 h-full">
        <TopRefferalCard />
      </div>
    </div>
    
  </div>
    </>
  )

}


export default NewOverview