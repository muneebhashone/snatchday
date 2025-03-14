import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FacebookIcon } from "../icons/icon";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthApi } from "@/hooks/api";
import { toast } from "sonner";
interface RegisterProps {
  onBack: () => void;
}

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),    confirmPassword: z.string().min(6, "Confirm Password is required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "required",
    }),
    newsletter: z.boolean().refine((val) => val === true, {
      message: "required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Path to the error
  });

const Register = ({ onBack }: RegisterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Initialize useForm with zodResolver
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      newsletter:false,
      terms:false
    } // Use Zod schema for validation
  });

  const { mutate: register, isPending } = useAuthApi()


  const handleClose = () => {
    setIsOpen(false);
    onBack();
  };

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    const { name, email, password } = data
    register({ data: { name, email, password }, type: "register" }, {
      onSuccess: ({ data }) => {
        toast.success("Registration successfull")
        handleClose()
      },
      onError: (error: any) => {
        toast.error(error.response.data.message)
      },
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[1170px] p-0">
        <DialogHeader className="text-left relative px-24 pt-10">
          <button
            onClick={handleClose}
            className="absolute -right-5 -top-5 z-30 h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[48px] font-extrabold">
              Register
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="mt-5 px-24 pb-16">
          {/* Form Inputs */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
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
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="E-Mail Address"
                      className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
                    />
                  )}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
              <div>
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
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>
              <div>
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
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            {/* Terms and Newsletter Checkbox */}
            <div className="mt-10">
              <div className="flex items-start space-x-3">
                <Controller
                  name="newsletter"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} id="newsletter" className="mt-1 rounded-full" checked={field.value}            onCheckedChange={field.onChange} />
                  )}
                />
                <label htmlFor="newsletter" className="text-foreground">
                  Yes, I would like to be informed about tournaments, special
                  offers and news and receive newsletters from Snatch Day
                </label>
                {errors.newsletter && <span className="text-red-500">{errors.newsletter.message}</span>}
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-2">
              <div className="flex items-start space-x-3 mt-2">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-start space-x-3 mt-2">
                      <Checkbox
                        id="terms"
                        className="mt-1 rounded-full"
                        checked={field.value}
                        onCheckedChange={field.onChange} 
                        />
                      <label htmlFor="terms" className="text-foreground">
                        I agree to the{" "}
                        <Link href="#" className="text-[#FF6B3D] hover:underline">
                          privacy policy
                        </Link>{" "}
                        and the{" "}
                        <Link href="#" className="text-[#FF6B3D] hover:underline">
                          terms and conditions
                        </Link>
                      </label>
                      {errors.terms && <span className="text-red-500">{errors.terms.message}</span>}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-8 px-11"
            >
              {isPending ? "Registering..." : "Register Your Account"}
            </Button>
          </form>
          <Separator className="mt-16 mb-6" />

          {/* Social Register */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <p className="text-gray-600">Or Register with Social Media</p>
              <FacebookIcon />
            </div>

            {/* Login Link */}
            <div className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleClose}
                className="text-[#FF6B3D] hover:underline"
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
