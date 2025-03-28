"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { useCart } from "@/context/CartContext";
import { usePlaceOrder } from "@/hooks/api";
import { toast } from "sonner";
import { PlaceOrder } from "@/types";
import { useRouter } from "next/navigation";
const checkoutSchema = z.object({
  billingDetails: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    vatId: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    street: z.string().nonempty("Street is required"),
    city: z.string().nonempty("City is required"),
    zip: z.string().nonempty("Zip is required"),
    country: z.string().nonempty("Country is required"),
    federalState: z.string().nonempty("Federal state is required"),
  }),
  shippingDetails: z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    vatId: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    street: z.string().nonempty("Street is required"),
    city: z.string().nonempty("City is required"),
    zip: z.string().nonempty("Zip is required"),
    country: z.string().nonempty("Country is required"),
    federalState: z.string().nonempty("Federal state is required"),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const router = useRouter();
  const { cartData, setCartData, setCartCount } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });
  const { mutate: PlaceOrderMutation, isPending } = usePlaceOrder();

  const onSubmit = (data: CheckoutFormData) => {
    const payload: PlaceOrder = {
      cartObjectFromCheckout: cartData,
      billingDetails: data.billingDetails,
      shippingDetails: data.shippingDetails,
    };

    PlaceOrderMutation(payload, {
      onSuccess: () => {
        toast.success("Order placed successfully", {
          style: { backgroundColor: "green", color: "white" },
        });
        router.push("/my-account/my-orders");
        setCartData(null);
        setCartCount(0);
      },
      onError: (error: any) => {
        console.log(error);
        toast.error("Failed to place order " + error.response.data.message, {
          style: { backgroundColor: "red", color: "white" },
        });
      },
    });
  };
  console.log(errors, "errors11");

  return (
    <ClientLayout>
      <div className=" max-w-[1920px] my-20  mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Billing Details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">Billing Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    {...register("billingDetails.firstName")}
                    placeholder="First Name"
                  />
                  {errors.billingDetails?.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <Input
                    {...register("billingDetails.lastName")}
                    placeholder="Last Name"
                  />
                  {errors.billingDetails?.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Input
                    {...register("billingDetails.email")}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.billingDetails?.email && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Street</label>
                  <Input
                    {...register("billingDetails.street")}
                    placeholder="Street Address"
                  />
                  {errors.billingDetails?.street && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.street.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <Input
                    {...register("billingDetails.city")}
                    placeholder="City"
                  />
                  {errors.billingDetails?.city && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <Input
                    {...register("billingDetails.zip")}
                    placeholder="ZIP Code"
                  />
                  {errors.billingDetails?.zip && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.zip.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <Input
                    {...register("billingDetails.country")}
                    placeholder="Country"
                  />
                  {errors.billingDetails?.country && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">VAT ID</label>
                  <Input
                    {...register("billingDetails.vatId")}
                    placeholder="VAT ID"
                  />
                  {errors.billingDetails?.vatId && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.vatId.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Federal State
                  </label>
                  <Input
                    {...register("billingDetails.federalState")}
                    placeholder="Federal State"
                  />
                  {errors.billingDetails?.federalState && (
                    <p className="text-red-500 text-xs">
                      {errors.billingDetails.federalState.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    {...register("shippingDetails.firstName")}
                    placeholder="First Name"
                  />
                  {errors.shippingDetails?.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <Input
                    {...register("shippingDetails.lastName")}
                    placeholder="Last Name"
                  />
                  {errors.shippingDetails?.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Input
                    {...register("shippingDetails.email")}
                    type="email"
                    placeholder="Email"
                  />
                  {errors.shippingDetails?.email && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Street</label>
                  <Input
                    {...register("shippingDetails.street")}
                    placeholder="Street Address"
                  />
                  {errors.shippingDetails?.street && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.street.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <Input
                    {...register("shippingDetails.city")}
                    placeholder="City"
                  />
                  {errors.shippingDetails?.city && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <Input
                    {...register("shippingDetails.zip")}
                    placeholder="ZIP Code"
                  />
                  {errors.shippingDetails?.zip && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.zip.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <Input
                    {...register("shippingDetails.country")}
                    placeholder="Country"
                  />
                  {errors.shippingDetails?.country && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">VAT ID</label>
                  <Input
                    {...register("shippingDetails.vatId")}
                    placeholder="VAT ID"
                  />
                  {errors.shippingDetails?.vatId && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.vatId.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Federal State
                  </label>
                  <Input
                    {...register("shippingDetails.federalState")}
                    placeholder="Federal State"
                  />
                  {errors.shippingDetails?.federalState && (
                    <p className="text-red-500 text-xs">
                      {errors.shippingDetails.federalState.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full w-1/4 mx-auto text-xl bg-green-500 text-white py-2"
          >
            {" "}
            {isPending ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </div>
    </ClientLayout>
  );
};

export default CheckoutForm;
