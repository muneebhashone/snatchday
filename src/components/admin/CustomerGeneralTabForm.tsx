"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Loader,
  MapPin,
  Save,
  Search,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetCustomerById, useUpdateCustomer } from "@/hooks/api";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { useLoadScript } from "@react-google-maps/api";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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

const formSchema = z.object({
  salutation: z.string().optional(),
  title: z.string().optional(),
  // name: z.string().min(1, "Name is required"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  street: z.string().optional(),
  zip: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().optional(),
  username: z.string().optional(),
  approved: z.boolean().optional(),
  phone: z.string().optional(),
  dob: z.date().optional(),
});

type IForm = z.infer<typeof formSchema>;

export default function CustomerForm({
  onClose,
}: {
  onClose: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const params = useParams();
  const paramsId = params.id;
  const { data: customer } = useGetCustomerById(paramsId);
  const customerData = customer?.data.customer;
  const { mutate: updateCustomer, isPending } = useUpdateCustomer(paramsId);

  // Google Maps integration states
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

  console.log(customerData, "datacustomer");

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salutation: customerData?.salutation || "Mr",
      title: customerData?.title || "Dr",
      // name: customerData?.username || "",
      firstName: customerData?.firstName || "",
      lastName: customerData?.lastName || "",
      street: customerData?.street || "",
      zip: customerData?.zip || "",
      location: customerData?.location || "",
      country: customerData?.country || "Germany",
      email: customerData?.email || "",
      phoneNumber: customerData?.phoneNumber || "",
      username: customerData?.username || "",
      approved: customerData?.approved || false,
      phone: customerData?.phone || "",
      dob: customerData?.dob || "",
    },
  });

  useEffect(() => {
    if (customerData) {
      form.reset({
        salutation: customerData?.salutation || "Mr",
        title: customerData?.title || "Dr",
        // name: customerData?.name || "",
        firstName: customerData?.firstName || "",
        lastName: customerData?.lastName || "",
        street: customerData?.street || "",
        zip: customerData?.zip || "",
        location: customerData?.location || "",
        country: customerData?.country || "Germany",
        email: customerData?.email || "",
        phoneNumber: customerData?.phoneNumber || "",
        username: customerData?.username || "",
        approved: customerData?.approved || false,
        dob: new Date(customerData?.dob) || "",
      });
    }
  }, [customerData, form]);

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

        // Format predictions for the dropdown
        const options = predictions.map((prediction) => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText: prediction.structured_formatting.main_text,
          secondaryText: prediction.structured_formatting.secondary_text,
        }));

        setAddressOptions(options);
        setIsDropdownVisible(true);
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
        form.setValue("location", formattedAddress, {
          shouldValidate: true,
          shouldDirty: true,
        });

        if (formattedStreet) {
          form.setValue("street", formattedStreet, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        if (zip) {
          form.setValue("zip", zip, {
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
      form.setValue("location", selectedLocation.value, {
        shouldValidate: true,
        shouldDirty: true,
      });

      form.setValue("street", selectedLocation.street, {
        shouldValidate: true,
        shouldDirty: true,
      });

      form.setValue("zip", selectedLocation.zip, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setLocationSelected(true);
    }
  };

  const onSubmitted = (values: any) => {
    const cleanedValues = JSON.parse(
      JSON.stringify(values, (key, value) => {
        return value === "" || value === null ? undefined : value;
      })
    );
    const sendValues = {
      ...cleanedValues,
      name: `${cleanedValues.username}`,
    };
    updateCustomer(sendValues, {
      onSuccess: () => {
        toast.success("customer updated successfully");
        onClose(false);
        window.location.reload();
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to update customer"
        );
        console.log(error, "error on customer update");
      },
    });
  };

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Update Customer</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/customers")}
          >
            Cancel
          </Button>
          <Button type="submit" form="customer-form" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Customer
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="customer-form"
          onSubmit={form.handleSubmit(onSubmitted)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Personal Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="salutation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salutation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Salutation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mr">Mister</SelectItem>
                            <SelectItem value="Mrs">Miss</SelectItem>
                            <SelectItem value="Dr">Doctor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Title" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dr">Dr.</SelectItem>
                            <SelectItem value="Prof">Prof.</SelectItem>
                            <SelectItem value="Mr">Mr.</SelectItem>
                            <SelectItem value="Mrs">Ms.</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter first name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter last name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Enter email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(day) => {
                                if (day) {
                                  field.onChange(day);
                                }
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Address Information
              </h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter street address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter ZIP code"
                          readOnly={locationSelected}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <div className="relative">
                        {/* Hidden div for PlacesService */}
                        <div ref={mapRef} style={{ display: "none" }}></div>

                        {isLoaded && !usingFallback ? (
                          <div>
                            <div className="relative">
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    className="pl-10"
                                    type="text"
                                    placeholder="Search for an address"
                                    value={searchTerm}
                                    onChange={(e) => {
                                      setSearchTerm(e.target.value);
                                      setIsDropdownVisible(true);
                                    }}
                                    onFocus={() => setIsDropdownVisible(true)}
                                  />
                                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                              </FormControl>

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
                                    <div className="font-medium">
                                      {option.mainText}
                                    </div>
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
                                <span className="font-medium">
                                  Selected address:
                                </span>{" "}
                                {field.value}
                              </div>
                            )}
                          </div>
                        ) : (
                          // Fallback select when API fails
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleFallbackSelect(value);
                              }}
                              value={field.value || ""}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Location" />
                              </SelectTrigger>
                              <SelectContent>
                                {fallbackLocations.map((location) => (
                                  <SelectItem
                                    key={location.value}
                                    value={location.value}
                                  >
                                    {location.value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="approved"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Approval Status
                        </FormLabel>
                        <FormDescription>
                          Approve or reject this customer
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
