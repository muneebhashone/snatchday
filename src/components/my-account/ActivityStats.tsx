import React from "react";

const ActivityStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <svg
              className="w-12 h-12 text-[#FF6B3D]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">80</h3>
          <p className="text-gray-500">Active Bids</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <svg
              className="w-12 h-12 text-[#FF6B3D]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">15</h3>
          <p className="text-gray-500">Items Won</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <svg
              className="w-12 h-12 text-[#FF6B3D]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21L10.55 19.7C5.4 15.1 2 12.1 2 8.5C2 5.5 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.5 22 8.5C22 12.1 18.6 15.1 13.45 19.7L12 21Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1">115</h3>
          <p className="text-gray-500">Favorites</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
