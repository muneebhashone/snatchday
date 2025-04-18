'use client'

import React, { useState } from 'react';
import { TrendingUp, Tv, Camera, Speaker, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import card1 from "@/app/images/card-ratings-illustration.png"

const SlideProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  return (
    
      <div className="w-full max-w-3xl">
        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Weekly Sales</h2>
              <div className="flex items-center gap-2">
                <span className="text-white/90">Total $23.5k Earning</span>
                <span className="text-green-400 flex items-center text-sm">
                  <TrendingUp size={16} className="mr-1" />
                  +82%
                </span>
              </div>
            </div>
            
            {/* Slider Navigation Dots */}
            <div className="flex gap-1">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h3 className="text-xl mb-6">Appliances & Electronics</h3>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Tv className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">16</p>
                  <p className="text-white/70">TV&apos;s</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">9</p>
                  <p className="text-white/70">Cameras</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Speaker className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">40</p>
                  <p className="text-white/70">Speakers</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">18</p>
                  <p className="text-white/70">Consoles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Image */}
          <Image
            src={card1.src}
            alt="Game Controller"
            width={100}
            height={100}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 object-contain opacity-90"
          />
        </div>
      </div>

  );
}

export default SlideProducts;