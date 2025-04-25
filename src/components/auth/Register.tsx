"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { FacebookIcon } from "../icons/icon";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import OtpModal from "@/otpmodal";
import { toast } from "sonner";
import { useAuthApi, useCheckEmail, useGetMyProfile } from "@/hooks/api";
import AccountStep from "@/components/multistepRegister/AccountStep";
import PersonalStep from "@/components/multistepRegister/PersonalStep";
import StepIndicator from "@/components/multistepRegister/StepIndicator";

interface RegisterProps {
  onBack: () => void;
}

// Define separate schemas for each step
const accountStepSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const personalStepSchema = z.object({
  personalInfo: z.object({
    salutation: z.string().min(1, "Salutation is required"),
    title: z.string().optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(100, "Last name cannot exceed 50 characters"),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),
    dob: z
      .date({
        required_error: "Date of birth is required",
      })
      .refine(
        (date) => {
          const today = new Date();
          const birthDate = new Date(date);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          return age >= 18;
        },
        { message: "You must be at least 18 years old to register" }
      ),
    street: z
      .string()
      .min(5, "Street must be at least 5 characters")
      .max(100, "Street cannot exceed 100 characters"),
    zip: z
      .string()
      .min(2, "ZIP code must be at least 3 characters")
      .max(10, "ZIP code cannot exceed 10 characters"),
    location: z
      .string()
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location cannot exceed 50 characters"),
    phoneNumber: z
      .string()
      .min(5, "Phone number must be at least 5 characters")
      .max(20, "Phone number cannot exceed 15 characters"),
  }),
});

// Define types for each step
export type AccountStepData = z.infer<typeof accountStepSchema>;
export type PersonalStepData = z.infer<typeof personalStepSchema>;

// Combined type for the full form
export type FormData = AccountStepData & PersonalStepData;

const Register = ({ onBack }: RegisterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isotpOpen, setIsotpOpen] = useState(false);
  const [accountData, setAccountData] = useState<AccountStepData | null>(null);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const { mutate: checkEmail, isPending: isEmailCheckingApi } = useCheckEmail();

  const router = useRouter();

  const { data: myprofile, refetch: checkProfileWithEmail } = useGetMyProfile();
  const { mutate: register, isPending } = useAuthApi();

  // Create separate form instances for each step
  const accountStepMethods = useForm<AccountStepData>({
    resolver: zodResolver(accountStepSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",

      terms: false,
    },
    mode: "onChange",
  });

  const personalStepMethods = useForm<PersonalStepData>({
    resolver: zodResolver(personalStepSchema),
    defaultValues: {
      personalInfo: {
        salutation: "",
        title: "",
        username: "",
        firstName: "",
        lastName: "",
        dob: undefined,
        street: "",
        zip: "",
        location: "",
        phoneNumber: "",
      },
    },
    mode: "onChange",
  });

  const handleClose = () => {
    setIsOpen(false);
    onBack();
  };

  const goToNextStep = async () => {
    if (currentStep === 1) {
      // Run full validation on the form
      const isValid = await accountStepMethods.trigger(undefined, {
        shouldFocus: true,
      });

      if (isValid) {
        const data = accountStepMethods.getValues();

        try {
          // If all checks pass, proceed to next step
          checkEmail(
            { email: data.email },
            {
              onSuccess: (response) => {
                // Save all the account data, not just the API response
                setAccountData(data);
                setCurrentStep(2);
                toast.success("Account information validated successfully");
              },
              onError: (error: any) => {
                toast.dismiss();
                toast.error(
                  error.response?.data?.message ||
                    "Registration failed. Please try again.",

                  {
                    style: {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }
                );
              },
            }
          );
        } catch (error) {
          console.error("Error during validation:", error);
        }
      } else {
        // Focus on the first field with an error
        const errorFields = Object.keys(accountStepMethods.formState.errors);
        if (errorFields.length > 0) {
          accountStepMethods.setFocus(errorFields[0] as any);
        }
      }
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async () => {
    // For the final step, validate the current step first
    const isValid = await personalStepMethods.trigger(undefined, {
      shouldFocus: true,
    });

    if (!isValid || !accountData) {
      // Show error toast if validation fails
      if (!accountData) {
        toast.error(
          "Account information is missing. Please go back to step 1."
        );
        return goToPreviousStep();
      }

      // Focus on the first field with an error
      const errorFields = Object.keys(
        personalStepMethods.formState.errors.personalInfo || {}
      );
      if (errorFields.length > 0) {
        personalStepMethods.setFocus(`personalInfo.${errorFields[0]}` as any);
      }
      if (personalStepMethods.getValues().personalInfo.title === "") {
        personalStepMethods.setValue("personalInfo", {
          ...personalStepMethods.getValues().personalInfo,
          title: undefined,
        });
      }
      return;
    }

    // Log account data to verify it's available
    console.log("Account data being used for submission:", accountData);

    // Prepare the registration data in the format expected by the API
    const { email, name, password } = accountData;
    const { personalInfo } = personalStepMethods.getValues();

    // Show loading state
    toast.loading("Registering your account...");

    // Format data in the structure expected by the API
    const registrationData = {
      data: {
        // Account step data
        email,
        name,
        password,

        // Personal info step data
        salutation: personalInfo.salutation,
        ...(personalInfo.title ? { title: personalInfo.title } : {}),
        username: personalInfo.username,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        dob: personalInfo.dob
          ? typeof personalInfo.dob === "string"
            ? personalInfo.dob
            : personalInfo.dob.toISOString()
          : undefined,
        street: personalInfo.street,
        zip: personalInfo.zip,
        location: personalInfo.location,
        phoneNumber: personalInfo.phoneNumber,
        country: "Germany", // Static value as requested
      },
      type: "register",
    };

    // Log all data for debugging
    console.log("Final registration data:", registrationData);
    console.log("Account data:", accountData);
    console.log("Personal info data:", personalInfo);

    // Call the registration API with the proper format
    register(registrationData, {
      onSuccess: (data) => {
        // After successful registration, update the user profile with the additional personal info
        toast.dismiss();
        setEmail(data?.email);
        setIsotpOpen(true);
        console.log(data, "res");
        toast.success("Registration successful! Please verify your email.");
      },
      onError: (error: any) => {
        toast.dismiss();
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep formMethods={accountStepMethods} onClose={handleClose} />
        );
      case 2:
        return <PersonalStep formMethods={personalStepMethods} />;
      default:
        return null;
    }
  };

  if (isotpOpen) {
    return (
      <OtpModal
        open={isotpOpen}
        onClose={() => setIsotpOpen(false)}
        isOpenLogin={handleClose}
        email={email}
      />
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Custom Modal Implementation */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto">
        <div
          id="register-modal-content"
          className="bg-white rounded-lg w-full max-w-[1280px] relative "
        >
          <div className="text-left px-24 pt-8 ">
            <button
              onClick={handleClose}
              className="absolute -right-5 -top-5 z-10 h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="h-6 w-6 " />
            </button>
            <div className="flex items-center justify-between">
              <h2 className="text-[48px] font-extrabold">Register</h2>
            </div>
          </div>

          <div className="mt-5 px-24 pb-6">
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} />

            {/* Form Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full px-11"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div></div> // Empty div to maintain layout
              )}

              {currentStep < 2 ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={isEmailCheckingApi}
                  className="min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full px-11"
                >
                  {isEmailCheckingApi ? "Processing..." : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isPending}
                  className="min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full px-11"
                >
                  {isPending ? "Registering..." : "Register Your Account"}
                </Button>
              )}
            </div>

            {currentStep === 1 && (
              <>
                <Separator className="mt-8 mb-4" />

                {/* Social Register */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-gray-600">
                      Or Register with Social Media
                    </p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
