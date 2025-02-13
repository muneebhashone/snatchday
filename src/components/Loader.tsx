import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-[#FF6B3D] rounded-full animate-spin border-t-transparent"></div>
        <div className="w-20 h-20 border-4 border-[#8D4CC4] rounded-full animate-spin border-t-transparent absolute inset-0 rotate-45"></div>
      </div>
    </div>
  );
};

export default Loader;
