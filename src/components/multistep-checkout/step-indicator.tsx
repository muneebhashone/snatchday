"use client"

import { CheckCircle, ChevronRight, CreditCard, MapPin, ShoppingCart } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { title: "Cart", icon: <ShoppingCart className="h-8 w-8" /> },
    { title: "Address", icon: <MapPin className="h-8 w-8" /> },
    { title: "Confirmation", icon: <CheckCircle className="h-8 w-8" /> },
  ]

  return (
    <div className="flex justify-center items-center mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-6">
          <div className={`flex flex-col items-center ${index <= currentStep ? "text-[#F37835]" : "text-gray-400"}`}>
            <div className="flex justify-center items-center mb-2">{step.icon}</div>
            <span className="text-lg font-medium">{step.title}</span>
          </div>

          {index < steps.length - 1 && (
            <div className="mx-4">
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
