"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { PersonalStepData } from "@/components/auth/Register";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoogleAddressInput from "./googleaddressInput";

interface PersonalStepProps {
  formMethods: UseFormReturn<PersonalStepData>;
}

// Define the Google Maps Places Autocomplete type
declare global {
  interface Window {
    google: typeof google;
    initAutocomplete: () => void;
  }
}

const PersonalStep = ({ formMethods }: PersonalStepProps) => {
  const {
    control,
    setValue,
    formState: { errors },
    getValues,
    watch
  } = formMethods;

  const [locationSelected, setLocationSelected] = useState(false);
  
  // Log form values when they change for debugging
  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form values updated:", value);
    });
    
    return () => subscription.unsubscribe();
  }, [watch]);

  // Get maximum date (18 years ago)
  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h2>
        <p className="text-gray-600">Enter Your Personal Details</p>
      </div>

      <div className="grid grid-cols-3 gap-4 items-start">
        <div>
          <Controller
            name="personalInfo.salutation"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                    errors.personalInfo?.salutation ? "border-red-500" : ""
                  }`}
                >
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
            <span className="text-red-500 text-sm mt-1">
              {errors.personalInfo.salutation.message}
            </span>
          )}
        </div>
     
        <div className="relative z-20">
          <Controller
            name="personalInfo.location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <GoogleAddressInput
                value={field.value}
                onChange={(value, addressComponents) => {
                  // Always update the location field
                  field.onChange(value);
                  setLocationSelected(!!addressComponents);
                  
                  // Log the address components for debugging
                  console.log("Address Components received in PersonalStep:", addressComponents);
                  
                  // Only attempt to update fields if addressComponents exists
                  if (addressComponents) {
                    // Update street if available
                    if (addressComponents.street) {
                      console.log("Setting street to:", addressComponents.street);
                      setValue("personalInfo.street", addressComponents.street, { 
                        shouldValidate: true,
                        shouldDirty: true
                      });
                    }
                    
                    // Update zip if available
                    if (addressComponents.zip) {
                      console.log("Setting zip to:", addressComponents.zip);
                      setValue("personalInfo.zip", addressComponents.zip, {
                        shouldValidate: true,
                        shouldDirty: true
                      });
                    }
                    
                    // Log all form data after update
                    setTimeout(() => {
                      const currentValues = getValues();
                      console.log("Current form data after address selection:", currentValues);
                      console.log("Street value:", currentValues.personalInfo.street);
                      console.log("Zip value:", currentValues.personalInfo.zip);
                    }, 100);
                  }
                }}
              />
            )}
          />
          {errors.personalInfo?.location && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.location.message}
            </span>
          )}
          {locationSelected && (
            <div className="text-green-500 text-sm mt-1">
              Address selected successfully
            </div>
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
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.username ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalInfo?.username && (
            <span className="text-red-500 text-sm mt-1">
              {errors.personalInfo.username.message}
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
                placeholder="title"
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.title ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalInfo?.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.personalInfo.title.message}
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
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.firstName ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalInfo?.firstName && (
            <span className="text-red-500 text-sm mt-1">
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
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.lastName ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalInfo?.lastName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.personalInfo.lastName.message}
            </span>
          )}
        </div>
        <div>
          <Controller
            name="personalInfo.dob"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col w-full">
                <Input
                  type="date"
                  placeholder="Date of Birth"
                  value={
                    field.value
                      ? format(new Date(field.value), "yyyy-MM-dd")
                      : ""
                  }
                  className="h-20 rounded-full text-lg text-[#A5A5A5] pl-10"
                  max={format(getMaxDate(), "yyyy-MM-dd")}
                  onChange={(e) => {
                    if (e.target.value) {
                      field.onChange(new Date(e.target.value));
                    }
                  }}
                />

                {errors.personalInfo?.dob && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.personalInfo.dob.message}
                  </span>
                )}
              </div>
            )}
          />
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
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.street ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalInfo?.street && (
            <span className="text-red-500 text-sm mt-1">
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
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.zip ? "border-red-500" : ""
                }`}
                readOnly={locationSelected}
              />
            )}
          />
          {errors.personalInfo?.zip && (
            <span className="text-red-500 text-sm mt-1">
              {errors.personalInfo.zip.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalStep;
