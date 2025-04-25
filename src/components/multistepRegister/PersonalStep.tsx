"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { PersonalStepData } from "@/components/auth/Register";
import { CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Search } from "lucide-react";
import { useLoadScript } from "@react-google-maps/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GoogleAddressInput from "./googleaddressInput";

// Google Maps Places API libraries
const libraries: "places"[] = ["places"];

// Fallback locations in case Google API fails
const fallbackLocations = [
  { value: "Berlin, Germany", street: "Unter den Linden 77", zip: "10117" },
  { value: "Hamburg, Germany", street: "Jungfernstieg 30", zip: "20354" },
  { value: "Munich, Germany", street: "Marienplatz 8", zip: "80331" },
  { value: "Cologne, Germany", street: "Hohe Straße 52", zip: "50667" },
  { value: "Frankfurt, Germany", street: "Römerberg 26", zip: "60311" },
];

type AddressOption = {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
};

interface PersonalStepProps {
  formMethods: UseFormReturn<PersonalStepData>;
}

const PersonalStep = ({ formMethods }: PersonalStepProps) => {
  const {
    control,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = formMethods;

  const [locationSelected, setLocationSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addressOptions, setAddressOptions] = useState<AddressOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Initialize Google Places services
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps failed to load:", loadError);
      setUsingFallback(true);
      return;
    }

    if (isLoaded) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();

      // Create a hidden map element for PlacesService (required by Google API)
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current);
        placesService.current = new google.maps.places.PlacesService(map);
      }
    }
  }, [isLoaded, loadError]);

  // Fetch address predictions from Google
  const fetchAddressPredictions = async (input: string) => {
    if (!input || input.length < 2 || !autocompleteService.current) {
      setAddressOptions([]);
      return;
    }

    setIsLoadingOptions(true);

    autocompleteService.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: ["de", "at"] },
        types: ["address"],
      },
      (predictions, status) => {
        setIsLoadingOptions(false);

        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          console.error("Error fetching place predictions:", status);
          setAddressOptions([]);
          return;
        }

        console.log("Google Places predictions:", predictions);

        // Format predictions for the dropdown
        const options = predictions.map((prediction) => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText: prediction.structured_formatting.main_text,
          secondaryText: prediction.structured_formatting.secondary_text,
        }));

        setAddressOptions(options);
      }
    );
  };

  // Debounce search input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        fetchAddressPredictions(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  // Get place details when a place is selected
  const handlePlaceSelect = (placeId: string) => {
    if (!placesService.current) return;

    setIsDropdownVisible(false); // Close dropdown after selection
    setSearchTerm(""); // Clear search term

    placesService.current.getDetails(
      {
        placeId: placeId,
        fields: ["address_components", "formatted_address", "geometry"],
      },
      (place, status) => {
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !place ||
          !place.address_components
        ) {
          console.error("Error fetching place details:", status);
          return;
        }

        console.log("Selected place details:", place);

        // Extract address components
        let street = "";
        let streetNumber = "";
        let zip = "";
        let city = "";

        place.address_components?.forEach((component) => {
          const types = component.types;

          if (types.includes("route")) {
            street = component.long_name;
          } else if (types.includes("street_number")) {
            streetNumber = component.long_name;
          } else if (types.includes("postal_code")) {
            zip = component.long_name;
          } else if (types.includes("locality")) {
            city = component.long_name;
          }
        });

        // Format street address
        const formattedStreet = street
          ? streetNumber
            ? `${street} ${streetNumber}`
            : street
          : "";
        const formattedAddress = place.formatted_address || "";

        // Update form fields
        setValue("personalInfo.location", formattedAddress, {
          shouldValidate: true,
          shouldDirty: true,
        });

        if (formattedStreet) {
          setValue("personalInfo.street", formattedStreet, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        if (zip) {
          setValue("personalInfo.zip", zip, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        setLocationSelected(true);
        setSearchTerm("");
        setAddressOptions([]);
      }
    );
  };

  // When using fallback locations
  const handleFallbackSelect = (locationValue: string) => {
    const selectedLocation = fallbackLocations.find(
      (loc) => loc.value === locationValue
    );

    if (selectedLocation) {
      setValue("personalInfo.location", selectedLocation.value, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("personalInfo.street", selectedLocation.street, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("personalInfo.zip", selectedLocation.zip, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setLocationSelected(true);
    }
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
                  <SelectItem value="Mr">Mister</SelectItem>
                  <SelectItem value="Mrs">Miss</SelectItem>
                  <SelectItem value="Dr">Doctor</SelectItem>
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
              <div className="relative">
                {/* Hidden div for PlacesService */}
                <div ref={mapRef} style={{ display: "none" }}></div>

                {isLoaded && !usingFallback ? (
                  <div>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search for an address"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setIsDropdownVisible(true); // Show dropdown when typing
                        }}
                        onFocus={() => setIsDropdownVisible(true)}
                        className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                          errors.personalInfo?.location ? "border-red-500" : ""
                        }`}
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                      {/* Hidden input for form value */}
                      <input type="hidden" {...field} />
                    </div>

                    {/* Show search results in a dropdown */}
                    {isDropdownVisible && addressOptions.length > 0 && (
                      <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto border border-gray-200">
                        {addressOptions.map((option) => (
                          <div
                            key={option.placeId}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                            onClick={() => {
                              handlePlaceSelect(option.placeId);
                              field.onChange(option.description);
                            }}
                          >
                            <div className="font-medium">{option.mainText}</div>
                            <div className="text-sm text-gray-500">
                              {option.secondaryText}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isLoadingOptions && (
                      <div className="mt-2 text-sm text-gray-500">
                        Loading address suggestions...
                      </div>
                    )}

                    {field.value && !searchTerm && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Selected address:</span>{" "}
                        {field.value}
                      </div>
                    )}
                  </div>
                ) : (
                  // Fallback select when API fails
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleFallbackSelect(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger
                      className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                        errors.personalInfo?.location ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {fallbackLocations.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
          />
          {errors.personalInfo?.location && (
            <span className="text-red-500 text-sm">
              {errors.personalInfo.location.message}
            </span>
          )}
          {/* {locationSelected && (
            <div className="text-green-500 text-sm mt-1">
              Address selected successfully
            </div>
          )} */}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                    errors.personalInfo?.title ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr">Dr.</SelectItem>
                  <SelectItem value="Prof">Prof.</SelectItem>
                  <SelectItem value="Mr">Mr.</SelectItem>
                  <SelectItem value="Mrs">Ms.</SelectItem>
                </SelectContent>
              </Select>
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
        <div>
          <Controller
            name="personalInfo.phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder="Phone Number"
                className={`h-20 rounded-full text-lg text-[#A5A5A5] pl-10 ${
                  errors.personalInfo?.phoneNumber ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.personalInfo?.phoneNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.personalInfo.phoneNumber.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalStep;
