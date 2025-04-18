import React from 'react';
import { MoreVertical, FileText, Plus } from 'lucide-react';

const ActivityTimelineCard = () => {
  return (
 
      <>
        {/* Activity Timeline Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[500px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Activity Timeline</h2>
          
          <div className="space-y-8">
            {/* Invoices Activity */}
            <div className="relative pl-8 border-l-2 border-blue-100">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">12 Invoices have been paid</h3>
                <span className="text-sm text-gray-500">12 min ago</span>
              </div>
              <p className="text-gray-600 mb-3">Invoices have been paid to the company</p>
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={16} className="text-red-500" />
                <span>invoices.pdf</span>
              </div>
            </div>

            {/* Client Meeting Activity */}
            <div className="relative pl-8 border-l-2 border-green-100">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">Client Meeting</h3>
                <span className="text-sm text-gray-500">45 min ago</span>
              </div>
              <p className="text-gray-600 mb-3">Project meeting with john @10:15am</p>
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50&h=50" 
                  alt="Lester McCarthy" 
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">Lester McCarthy (Client)</p>
                  <p className="text-sm text-gray-600">CEO of ThemeSelection</p>
                </div>
              </div>
            </div>

            {/* New Project Activity */}
            <div className="relative pl-8 border-l-2 border-cyan-100">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">Create a new project for client</h3>
                <span className="text-sm text-gray-500">2 Day Ago</span>
              </div>
              <p className="text-gray-600 mb-3">6 team members in a project</p>
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50&h=50" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=50&h=50" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=50&h=50" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                  <span className="text-sm text-gray-600">+3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Referral Sources Card */}
       </>
  

  );
}

export default ActivityTimelineCard;