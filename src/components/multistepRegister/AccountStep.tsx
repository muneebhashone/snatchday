import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Controller } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"
import type { AccountStepData } from "@/components/auth/Register"
import { toast } from "sonner"
import { useUserContext } from "@/context/userContext"

interface AccountStepProps {
  formMethods: UseFormReturn<AccountStepData>
}

const AccountStep = ({ formMethods }: AccountStepProps) => {
  const {
    control,
    formState: { errors },
    watch,
  } = formMethods
  
  


  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
        <p className="text-gray-600">Enter Your Account Details</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-start">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="User Name"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          
          {errors.name && <span className="text-red-500  text-sm mt-2">{errors.name.message}</span>}
        </div>
        <div className="relative text-start">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="E-Mail Address"
                className={`h-20 rounded-full text-lg pl-10 text-[#A5A5A5]`}
              />
            )}
          />
        
          {errors.email && (
            <span className="text-red-500 text-sm block mt-2">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="text-start">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.password && <span className="text-red-500 text-sm mt-2">{errors.password.message}</span>}
        </div>
        <div className="text-start">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Repeat Password"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</span>}
        </div>
      </div>
      <div className="space-y-4 mt-6 text-start">
        <div className="flex items-start space-x-3">
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="newsletter"
                className="mt-1 rounded-full"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label htmlFor="newsletter" className="text-foreground">
            Yes, I would like to be informed about tournaments, special offers and news and receive newsletters from
            Snatch Day
          </label>
        </div>
        {errors.newsletter && <span className="text-red-500 block text-sm">{errors.newsletter.message}</span>}

        <div className="flex items-start text-start space-x-3 ">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                className="mt-1 rounded-full"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label htmlFor="terms" className="text-foreground">
            I agree to the{" "}
            
            <Link href="/terms-and-conditions" className="text-[#FF6B3D] hover:underline">
              terms and conditions
            </Link>
          </label>
        </div>
        {errors.terms && <span className="text-red-500 text-sm">{errors.terms.message}</span>}
      </div>
    </div>
  )
}

export default AccountStep
