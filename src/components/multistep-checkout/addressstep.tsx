"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Building, Loader2, PenLine, Trash2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useCreateAddress,
  useDeleteAddress,
  useGetAddresses,
  usePlaceOrder,
} from "@/hooks/api";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

// Define types
interface Address {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state?: string;
  federalState?: string;
  zip: string;
  country: string;
  vatId?: string;
  addressType: "Home" | "Office";
  isDefault?: boolean;
}

// Validation schema
const addressSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  street: z.string().min(5, { message: "Street address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  federalState: z.string().min(2, { message: "State is required" }),
  zip: z.string().min(4, { message: "ZIP code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  vatId: z.string().optional(),
  addressType: z.enum(["Home", "Office"]),
  isDefault: z.boolean().default(false),
});

interface AddressStepProps {
  onNextStep: () => void;
  onPrevStep: () => void;
  selectedAddress: Address | null;
  checkoutResponse:any
  setOrderId: (orderId: string) => void;
  setSelectedAddress: (address: Address | null) => void;
}

export function AddressStep({
  onNextStep,
  onPrevStep,
  selectedAddress,
  checkoutResponse,
   setOrderId ,
  setSelectedAddress,
}: AddressStepProps) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { user } = useUserContext();
  const router = useRouter();

  const {
    data: addressesData,
    isLoading: isLoadingAddresses,
    refetch: refetchAddresses,
  } = useGetAddresses();

  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const { mutate: PlaceOrderMutation, isPending } = usePlaceOrder();

  const addresses = addressesData?.data || [];
  const isLoggedIn = !!user;

  // Form handling for address
  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddressForm,
    setValue,
    getValues,
    watch,
  } = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressType: "Home",
      isDefault: false,
    },
  });
  console.log("checkoutResponse",checkoutResponse)
  // Watch the isDefault value for debugging
  const isDefaultValue = watch("isDefault");
  console.log("isDefault watched value:", isDefaultValue);

  // Select first address as default if there's any and none selected
  useEffect(() => {
    if (isLoggedIn && addresses?.length > 0 && !selectedAddress) {
      const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress, setSelectedAddress, isLoggedIn]);

  // Handle address form submission for logged in users
  const onAddressSubmit = (data: z.infer<typeof addressSchema>) => {
    console.log("Form data on submit:", data);
    console.log("isDefault value:", data.isDefault);

    if (!isLoggedIn) {
      // For guest users, just create a temporary address
      const tempAddress = {
        id: `temp_${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        street: data.street,
        city: data.city,
        zip: data.zip,
        country: data.country,
        federalState: data.federalState,
        vatId: data.vatId,
        addressType: data.addressType,
        isDefault: data.isDefault,
      } as Address;

      setSelectedAddress(tempAddress);
      return;
    }

    // For logged in users, save the address to their account
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      vatId: data.vatId || "",
      email: data.email,
      street: data.street,
      city: data.city,
      zip: data.zip,
      country: data.country,
      federalState: data.federalState,
      isDefault: data.isDefault,
      addressType: data.addressType,
    };

    createAddress(payload, {
      onSuccess: (newAddress) => {
        toast.success("Address added successfully");
        refetchAddresses();
        if (!selectedAddress || data.isDefault) {
          setSelectedAddress(newAddress);
        }
        setShowAddressForm(false);
      },
      onError: (error) => {
        toast.error(`Failed to add address: ${error.message}`);
      },
    });

    resetAddressForm();
  };

  // Delete address
  const handleDeleteAddress = (addressId: string) => {
    deleteAddress(addressId, {
      onSuccess: () => {
        if (selectedAddress?.id === addressId) {
          setSelectedAddress(null);
        }
        toast.success("Address removed successfully");
        refetchAddresses();
      },
      onError: (error) => {
        toast.error(`Failed to delete address: ${error.message}`);
      },
    });
  };

  // Add new address button click handler
  const handleAddNewAddress = () => {
    resetAddressForm({
      addressType: "Home",
      isDefault: false,
    });
    setShowAddressForm(true);
  };

  const handlePlaceOrder = () => {
    let addressToUse = selectedAddress;

    // If user is not logged in and there's no selected address, use the form values
    if (!isLoggedIn && !selectedAddress) {
      const formValues = getValues();
      addressToUse = {
        id: `temp_${Date.now()}`,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        street: formValues.street,
        city: formValues.city,
        zip: formValues.zip,
        country: formValues.country,
        federalState: formValues.federalState,
        vatId: formValues.vatId,
        addressType: formValues.addressType,
      } as Address;
    }

    if (addressToUse && checkoutResponse?.data?.cart) {
      PlaceOrderMutation(
        {
          cartObjectFromCheckout: checkoutResponse?.data?.cart,
          billingDetails: {
            firstName: addressToUse.firstName,
            lastName: addressToUse.lastName,
            email: addressToUse.email,
            street: addressToUse.street,
            city: addressToUse.city,
            federalState: addressToUse.federalState,
            zip: addressToUse.zip,
            country: addressToUse.country,
            vatId: addressToUse.vatId,
          },
          shippingDetails: {
            firstName: addressToUse.firstName,
            lastName: addressToUse.lastName,
            email: addressToUse.email,
            street: addressToUse.street,
            city: addressToUse.city,
            federalState: addressToUse.federalState,
            zip: addressToUse.zip,
            country: addressToUse.country,
            vatId: addressToUse.vatId,
          },
        },
        {
          onSuccess: (data) => {
            console.log(data,"data from 2 step")
            // setOrderId(data?.data?.order?._id);
            toast.success("Order placed successfully");
            router.push(data?.data?.order?.paymentObject?._links?.checkout?.href);
            // onNextStep();

          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || "Something went wrong"
            );
          },
        }
      );
    }
  };

  return (
      
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoadingAddresses ? 
         <div className="flex text-[#F37835]  col-span-3 justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div> :  
        <>
      <div className="md:col-span-2">
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isLoggedIn
                ? "Select your preferable address"
                : "Enter your delivery address"}
            </h2>

            {isLoggedIn ? (
              // Logged in user view
              <>
                {!showAddressForm && addresses?.length > 0 ? (
                  // Show saved addresses
                  <>
                    <RadioGroup
                      value={selectedAddress?._id || ""}
                      onValueChange={(value) => {
                        const address = addresses.find((a) => a._id === value);
                        if (address) setSelectedAddress(address);
                      }}
                      className="space-y-4"
                    >
                      {addresses.map((address) => (
                        <div key={address._id} className="border rounded-lg p-4">
                          <div className="flex items-start">
                            <RadioGroupItem
                              value={address._id}
                              id={`address-${address.id}`}
                              className="mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex justify-between">
                                <div className="capitalize">
                                  <Label
                                    htmlFor={`address-${address._id}`}
                                    className="font-medium text-lg"
                                  >
                                    {address.firstName} {address.lastName}
                                    {address.isDefault && (
                                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        Default
                                      </span>
                                    )}
                                  </Label>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {address.street}, {address.city},{" "}
                                    {address.federalState}, {address.zip}
                                    <br />
                                    {address.country}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 flex space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 flex items-center"
                                  onClick={() =>
                                    handleDeleteAddress(address.id)
                                  }
                                  disabled={isDeleting}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleAddNewAddress}
                    >
                      Add New Address
                    </Button>
                  </>
                ) : (
                  // Show address form for logged-in user
                  <form
                    onSubmit={handleAddressSubmit(onAddressSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          {...registerAddress("firstName")}
                        />
                        {addressErrors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" {...registerAddress("lastName")} />
                        {addressErrors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...registerAddress("email")}
                        />
                        {addressErrors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input id="street" {...registerAddress("street")} />
                        {addressErrors.street && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.street.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" {...registerAddress("city")} />
                        {addressErrors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="federalState">State</Label>
                        <Input
                          id="federalState"
                          {...registerAddress("federalState")}
                        />
                        {addressErrors.federalState && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.federalState.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" {...registerAddress("zip")} />
                        {addressErrors.zip && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.zip.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" {...registerAddress("country")} />
                        {addressErrors.country && (
                          <p className="text-red-500 text-xs mt-1">
                            {addressErrors.country.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="vatId">VAT ID (Optional)</Label>
                        <Input id="vatId" {...registerAddress("vatId")} />
                      </div>
                      <div className="md:col-span-2 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          {...registerAddress("isDefault")}
                          className="h-4 w-4 text-blue-600"
                          onChange={(e) => {
                            setValue("isDefault", e.target.checked);
                          }}
                          disabled={!isLoggedIn}
                        />
                        <Label htmlFor="isDefault">
                          Set as default address {!isLoggedIn && "(Login required)"}
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      {addresses.length > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAddressForm(false)}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button type="submit" disabled={isCreating}>
                        Save Address
                      </Button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              // Guest user - just show the form without save/cancel buttons
              <form className="space-y-4" onSubmit={handleAddressSubmit(onAddressSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...registerAddress("firstName")} />
                    {addressErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...registerAddress("lastName")} />
                    {addressErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...registerAddress("email")}
                    />
                    {addressErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input id="street" {...registerAddress("street")} />
                    {addressErrors.street && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.street.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...registerAddress("city")} />
                    {addressErrors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="federalState">State</Label>
                    <Input
                      id="federalState"
                      {...registerAddress("federalState")}
                    />
                    {addressErrors.federalState && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.federalState.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" {...registerAddress("zip")} />
                    {addressErrors.zip && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.zip.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" {...registerAddress("country")} />
                    {addressErrors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {addressErrors.country.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="vatId">VAT ID (Optional)</Label>
                    <Input id="vatId" {...registerAddress("vatId")} />
                  </div>
                  {user?.user &&
                  <div className="md:col-span-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isDefault"
                      {...registerAddress("isDefault")}
                      className="h-4 w-4 text-blue-600"
                      onChange={(e) => {
                        setValue("isDefault", e.target.checked);
                      }}
                    />
                    <Label htmlFor="isDefault">
                      Set as default address 
                    </Label>
                  </div>
                }
                </div>
                {user?.user &&
                <div className="flex justify-end space-x-2 mt-4">
                  <Button type="submit" disabled={isCreating}>
                    Save Address
                  </Button>
                </div>}
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card className="bg-white shadow-md rounded-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2">
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Sub Total</span>
              <span>{checkoutResponse?.data?.cart?.subTotal.toFixed(2)}€</span>
            </div>

               
              {
                  checkoutResponse?.data?.cart?.appliedDiscount ? 
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                   <span>Applied Discount</span>
                   <span>{checkoutResponse?.data?.cart?.appliedDiscount}€</span>
                 </div>
              :""
              }
           
                   <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                   <span>DiscountPoints</span>
                   <span>{checkoutResponse?.data?.cart?.discountPoints}€</span>
                 </div>
             
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>SnapPoints</span>
              <span>{checkoutResponse?.data?.cart?.snapPoints}€</span>
            </div>
            
            {
                  checkoutResponse?.data?.cart?.voucherDiscount ? 
                  <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                   <span>Voucher Discount</span>
                   <span>{checkoutResponse?.data?.cart?.voucherDiscount}€</span>
                 </div>
              :""
              }
              
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>VAT</span>
              <span>19%</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t mt-2">
              <span>Total</span>
              <span>{checkoutResponse?.data?.cart?.total.toFixed(2)}€</span>
            </div>
            
          </div>
        

            <div className="mt-6 flex flex-col space-y-2">
              <Button
                onClick={handlePlaceOrder}
                disabled={isPending || (isLoggedIn ? !selectedAddress : false)}
                className="w-full bg-[#F37835] hover:bg-[#FF9900] text-white"
              >
                {isPending ? "Processing..." : "Proceed to Payment"}
              </Button>
              <Button onClick={onPrevStep} variant="outline" className="w-full">
                Back to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </>
      }
    </div>
  );
}
