import { Check, User2, NotebookIcon } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full 
            ${currentStep >= 1 ? "gradient-primary" : "bg-gray-300"}
          `}
        >
          {currentStep > 1 ? <Check className="h-6 w-6 text-white" /> : <User2 className="h-6 w-6 text-white" />}
        </div>
        <div className="mt-2">
          <p
            className={`font-medium ${
              currentStep === 1 ? "text-[#FF6B3D]" : currentStep > 1 ? "text-[#FF6B3D]" : "text-gray-500"
            }`}
          >
            Account
          </p>
          <p
            className={`text-xs font-medium ${
              currentStep === 1 ? "text-[#FF6B3D]" : currentStep > 1 ? "text-[#FF6B3D]" : "text-gray-500"
            }`}
          >
            Account Details
          </p>
        </div>
      </div>

      {/* Connector */}
      <div className="w-24 h-[1px] bg-gray-200 mx-2"></div>

      {/* Step 2 - Personal */}
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full 
            ${currentStep >= 2 ? "gradient-primary" : "bg-gray-300"}
          `}
        >
          {currentStep > 2 ? <Check className="h-6 w-6 text-white" /> : <NotebookIcon className="h-6 w-6 text-white" />}
        </div>
        <div className="mt-2">
          <p
            className={`font-medium ${
              currentStep === 2 ? "text-[#FF6B3D]" : currentStep > 2 ? "text-[#FF6B3D]" : "text-gray-500"
            }`}
          >
            Personal
          </p>
          <p
            className={`text-xs font-medium ${
              currentStep === 2 ? "text-[#FF6B3D]" : currentStep > 2 ? "text-[#FF6B3D]" : "text-gray-500"
            }`}
          >
            Enter Information
          </p>
        </div>
      </div>
    </div>
  )
}

export default StepIndicator
