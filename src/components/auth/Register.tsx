"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  User2,
  NotebookIcon,
} from "lucide-react";
import { FacebookIcon } from "../icons/icon";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "../ui/separator";
import { z } from "zod";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthApi } from "@/hooks/api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import OtpModal from "@/otpmodal";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CaptionProps } from "react-day-picker";

// Extended CaptionProps interface with onMonthChange
interface ExtendedCaptionProps extends CaptionProps {
  onMonthChange: (date: Date) => void;
}

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
    newsletter: z.boolean().refine((val) => val === true, {
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
    title: z.string().min(1, "Title is required"),
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
      .max(50, "Last name cannot exceed 50 characters"),
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
      .min(3, "ZIP code must be at least 3 characters")
      .max(10, "ZIP code cannot exceed 10 characters"),
    location: z
      .string()
      .min(2, "Location must be at least 2 characters")
      .max(50, "Location cannot exceed 50 characters"),
    country: z.string().min(1, "Country is required"),
    federalState: z
      .string()
      .min(2, "State must be at least 2 characters")
      .max(50, "State cannot exceed 50 characters"),
  }),
});

// Define types for each step
type AccountStepData = z.infer<typeof accountStepSchema>;
type PersonalStepData = z.infer<typeof personalStepSchema>;

// Combined type for the full form
type FormData = AccountStepData & PersonalStepData;

// Step indicator component
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {/* Step 1 - Account */}
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full 
            ${currentStep >= 1 ? "gradient-primary" : "bg-gray-300"}
          `}
        >
          {currentStep > 1 ? (
            <Check className="h-6 w-6 text-white" />
          ) : (
            <User2 className="h-6 w-6 text-white" />
          )}
        </div>
        <div className="mt-2">
          <p
            className={`font-medium ${
              currentStep === 1
                ? "text-[#FF6B3D]"
                : currentStep > 1
                ? "text-[#FF6B3D]"
                : "text-gray-500"
            }`}
          >
            Account
          </p>
          <p
            className={`text-xs font-medium ${
              currentStep === 1
                ? "text-[#FF6B3D]"
                : currentStep > 1
                ? "text-[#FF6B3D]"
                : "text-gray-500"
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
          {currentStep > 2 ? (
            <Check className="h-6 w-6 text-white" />
          ) : (
            <NotebookIcon className="h-6 w-6 text-white" />
          )}
        </div>
        <div className="mt-2">
          <p
            className={`font-medium ${
              currentStep === 2
                ? "text-[#FF6B3D]"
                : currentStep > 2
                ? "text-[#FF6B3D]"
                : "text-gray-500"
            }`}
          >
            Personal
          </p>
          <p
            className={`text-xs font-medium ${
              currentStep === 2
                ? "text-[#FF6B3D]"
                : currentStep > 2
                ? "text-[#FF6B3D]"
                : "text-gray-500"
            }`}
          >
            Enter Information
          </p>
        </div>
      </div>
    </div>
  );
};

// Account Step Component
const AccountStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AccountStepData>();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Account Information
        </h2>
        <p className="text-gray-600">Enter Your Account Details</p>
      </div>

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
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
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
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
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
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
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
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
      <div className="space-y-4 mt-6">
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
            Yes, I would like to be informed about tournaments, special offers
            and news and receive newsletters from Snatch Day
          </label>
        </div>
        {errors.newsletter && (
          <span className="text-red-500 text-sm">
            {errors.newsletter.message}
          </span>
        )}

        <div className="flex items-start space-x-3 ">
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
            <Link href="#" className="text-[#FF6B3D] hover:underline">
              privacy policy
            </Link>{" "}
            and the{" "}
            <Link href="#" className="text-[#FF6B3D] hover:underline">
              terms and conditions
            </Link>
          </label>
        </div>
        {errors.terms && (
          <span className="text-red-500 text-sm">{errors.terms.message}</span>
        )}
      </div>
    </div>
  );
};

// Personal Step Component
const PersonalStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PersonalStepData>();

  const handleMonthChange = (date: Date) => {
    console.log(date, "date");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>
        <p className="text-gray-600">Enter Your Personal Details</p>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <Controller
            name="personalInfo.salutation"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10">
                  <SelectValue placeholder="Select Salutation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.personalInfo?.salutation && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.salutation.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Title"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.title && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.title.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Username"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.username && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.username.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="First Name"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.firstName && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.firstName.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Last Name"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.lastName && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.lastName.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.dob"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`h-20 w-full rounded-full text-lg pl-10 text-left justify-start ${
                      field.value ? "text-foreground" : "text-[#A5A5A5]"
                    }`}
                  >
                    {field.value
                      ? format(field.value, "PPP")
                      : "Select Date of Birth"}
                    <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 min-w-[360px]"
                  align="start"
                >
                  <Calendar
  mode="single"
  selected={field.value}
  onSelect={field.onChange}
  captionLayout="dropdown"
  fromYear={1920}
  toYear={new Date().getFullYear() - 18}
  initialFocus
  styles={{
    caption_dropdowns: {
      display: 'flex',
      gap: '8px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '8px',
    },
    dropdown: {
      padding: '6px 10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      outline: 'none',
    },
  }}
/>

                </PopoverContent>
              </Popover>
            )}
          />
          {errors.personalInfo?.dob && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.dob.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.street"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Street"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.street && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.street.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.zip"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="ZIP Code"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.zip && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.zip.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Location"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.location && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.location.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.personalInfo?.country && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.country.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.federalState"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Federal State"
                className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
              />
            )}
          />
          {errors.personalInfo?.federalState && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.federalState.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// function CustomCaption(props: CaptionProps) {
//   const month = props.displayMonth.getMonth();
//   const year = props.displayMonth.getFullYear();

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         gap: "8px",
//         marginBottom: "8px",
//       }}
//     >
//       <select
//         value={month}
//         onChange={(e) => {
//           const newMonth = Number(e.target.value);
//           const updatedDate = new Date(year, newMonth, 1); // ✅ new date instead of mutating
//           props.onMonthChange(updatedDate);
//         }}
//         style={{
//           padding: "6px 8px",
//           borderRadius: "6px",
//           border: "1px solid #ccc",
//         }}
//       >
//         {Array.from({ length: 12 }, (_, i) => (
//           <option key={i} value={i}>
//             {new Date(0, i).toLocaleString("default", { month: "long" })}
//           </option>
//         ))}
//       </select>

//       <select
//         value={year}
//         onChange={(e) => {
//           const newYear = Number(e.target.value);
//           const updatedDate = new Date(newYear, month, 1); // ✅ new date instead of mutating
//           props.onMonthChange(updatedDate);
//         }}
//         style={{
//           padding: "6px 8px",
//           borderRadius: "6px",
//           border: "1px solid #ccc",
//         }}
//       >
//         {Array.from(
//           { length: new Date().getFullYear() - 1920 - 18 + 1 },
//           (_, i) => {
//             const y = 1920 + i;
//             return (
//               <option key={y} value={y}>
//                 {y}
//               </option>
//             );
//           }
//         )}
//       </select>
//     </div>
//   );
// }


const Register = ({ onBack }: RegisterProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isotpOpen, setIsotpOpen] = useState(false);

  const router = useRouter();

  // Create separate form instances for each step
  const accountStepMethods = useForm<AccountStepData>({
    resolver: zodResolver(accountStepSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      newsletter: false,
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
        country: "",
        federalState: "",
      },
    },
    mode: "onChange",
  });

  const { mutate: register, isPending } = useAuthApi();

  const handleClose = () => {
    setIsOpen(false);
    onBack();
  };

  const goToNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await accountStepMethods.trigger();
      if (isValid) {
        setCurrentStep(2);
      }
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async () => {
    // For the final step, validate the current step first
    const isValid = await personalStepMethods.trigger();

    if (!isValid) return;

    // Combine data from both steps
    const accountData = accountStepMethods.getValues();
    const personalData = personalStepMethods.getValues();

    const formData = {
      ...accountData,
      ...personalData,
    };

    const { confirmPassword, terms, newsletter, personalInfo, ...rest } =
      formData;

    const registrationData = {
      ...rest,
      ...personalInfo,
    };
    console.log(registrationData, "registrationData");

    register(
      { data: registrationData, type: "register" },
      {
        onSuccess: ({ data }) => {
          setEmail(data?.email);
          setIsotpOpen(true);
          console.log(data, "res");
          toast.success("Registration successful");
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
        },
      }
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormProvider {...accountStepMethods}>
            <AccountStep />
          </FormProvider>
        );
      case 2:
        return (
          <FormProvider {...personalStepMethods}>
            <PersonalStep />
          </FormProvider>
        );
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[1280px] p-0" hideCloseButton={true}>
          <DialogHeader className="text-left relative px-24 ">
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
                  className="min-h-[60px] text-lg font-semibold gradient-primary text-white rounded-full px-11"
                >
                  Next
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
