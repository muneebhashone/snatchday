import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgetPassword } from "@/hooks/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AtSign, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OtpModal from "@/otpmodal";

const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

interface ForgotPasswordProps {
  onSuccess?: () => void;
  //   setIsOpenModal?: (isOpen: boolean) => void;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const ForgotPassword = ({
  onSuccess,
  setIsOpen,
  isOpen,
}: ForgotPasswordProps) => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate: forgetPassword, isPending } = useForgetPassword();
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof schema>) => {
    forgetPassword(data.email as string, {
      onSuccess: () => {
        toast.success("Email sent successfully");
        setUserEmail(data.email);
        setIsOpen(false);
        setShowOtpModal(true);
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Email not found");
      },
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <DialogTrigger asChild>
          <Button
            variant="link"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
          >
            Forgot password?
          </Button>
        </DialogTrigger> */}
        <DialogContent className="max-w-[682px] p-0">
          <DialogHeader className="text-left relative px-24 pt-10">
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              className="absolute -right-5 -top-5 z-30 h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[48px] font-extrabold">
                Forgot Password
              </DialogTitle>
            </div>
            <p className="text-gray-600 mt-2">
              Enter the email address associated with your account and we'll
              send you a verification code.
            </p>
          </DialogHeader>

          <div className="mt-5 px-24 pb-16">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
            >
              <div>
                <Label
                  htmlFor="email"
                  className="text-lg font-medium mb-2 block"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full min-h-[60px] text-lg border-2 border-gray-200 focus:border-primary rounded-xl px-4"
                />
                {errors.email && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full mt-10"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <OtpModal
        open={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={userEmail}
        isOpenLogin={() => setShowOtpModal(false)}
      />
    </>
  );
};

export default ForgotPassword;
