"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { DeleteIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/CartContext";
import { useCheckout as useCheckoutContext } from "@/context/isCheckout";
import {
  useGetCart,
  useUpdateCart,
  useGetPoints,
  useGetMyProfile,
  useApplyVoucher,
  useCheckout,
} from "@/hooks/api";
import Logo from "../../app/images/logo.png";
import { useUserContext } from "@/context/userContext";
// Define the Zod schema for the checkout payload
const checkoutSchema = z.object({
  snapPoints: z
    .string()
    .optional()
    .refine((val) => !val || Number.parseFloat(val) > 0, {
      message: "snapPoints must be a positive number",
    }),
  discountPoints: z
    .string()
    .optional()
    .refine((val) => !val || Number.parseFloat(val) > 0, {
      message: "discountPoints must be a positive number",
    }),
});

// Define a new Zod schema for the voucher code
const voucherSchema = z.object({
  voucherCode: z.string().nonempty({ message: "Voucher Code is required" }),
});

interface CartStepProps {
  onNextStep: () => void;
  setCheckoutResponse: (response: any) => void;
}

export function CartStep({ onNextStep, setCheckoutResponse }: CartStepProps) {
  const { setIsCheckout } = useCheckoutContext();
  const { data: cart, isLoading, refetch } = useGetCart();
  const { user } = useUserContext();

  const [applyvocherResponse, setApplyvocherResponse] = useState(null);

  const { mutateAsync: updateCart, isPending } = useUpdateCart();
  const { data: points, isLoading: isPointsLoading } = useGetPoints();
  const { data: myprofile, isLoading: isMyProfileLoading } = useGetMyProfile();
  const { mutateAsync: checkout, isPending: isCheckoutPending } = useCheckout();
  const { setCartData } = useCart();
  const { data: cartItems } = useGetCart();
  const { mutate: applyVoucher, isPending: isApplyVoucherPending } =
    useApplyVoucher();

  // Form handling for checkout
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      snapPoints: cartItems?.data?.snapPoints || "",
      discountPoints: cartItems?.data?.discountPoints || "",
    },
  });

  useEffect(() => {
    setValue("snapPoints", cartItems?.data?.snapPoints.toString() || "");
    setValue(
      "discountPoints",
      cartItems?.data?.discountPoints.toString() || ""
    );
  }, [cartItems]);

  // Form handling for voucher
  const {
    register: registerVoucher,
    handleSubmit: handleVoucherSubmit,
    formState: { errors: voucherErrors },
    watch: watchVoucher,
  } = useForm({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      voucherCode: "",
    },
  });

  // Calculate adjusted subtotal based on points and vouchers
  const calculateAdjustedSubtotal = () => {
    return (
      (cart?.data?.subTotal || 0) -
      (cart?.data?.appliedDiscount || 0) -
      (applyvocherResponse?.data?.voucherDiscount || 0) -
      Number(watch("snapPoints") || 0) / 100 -
      Number(watch("discountPoints") || 0) / 100
    );
  };

  // Calculate final total
  const calculateTotal = () => {
    return calculateAdjustedSubtotal();
  };

  // Handle cart quantity update
  const handleUpdateCart = async (id: string, quantity: number) => {
    await updateCart(
      { id: id, quantity: quantity },
      {
        onSuccess: () => {
          toast.success("Cart updated successfully", {
            position: "top-right",
            style: { backgroundColor: "green", color: "white" },
          });
          refetch();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update cart",
            {
              position: "top-right",
              style: { backgroundColor: "red", color: "white" },
            }
          );
        },
      }
    );
  };

  // Handle checkout submission
  const onSubmit = async (data: any) => {
    // Check for maximum limits and wallet balance
    const maxSnapPoints = points?.data?.maxSnapPoints || 0;
    const maxDiscountPoints = points?.data?.maxDiscountPoints || 0;
    const userWalletBalance = myprofile?.data?.wallet || 0;

    const snapPoints = Number(data.snapPoints) || 0;
    const discountPoints = Number(data.discountPoints) || 0;

    if (snapPoints > maxSnapPoints) {
      toast.error(`Exceeds maximum snap points limit of ${maxSnapPoints}`, {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    if (discountPoints > maxDiscountPoints) {
      toast.error(
        `Exceeds maximum discount points limit of ${maxDiscountPoints}`,
        {
          position: "top-right",
          style: { backgroundColor: "red", color: "white" },
        }
      );
      return;
    }

    if (
      snapPoints > userWalletBalance?.snapPoints ||
      discountPoints > userWalletBalance?.discountPoints
    ) {
      toast.error("You have insufficient balance", {
        position: "top-right",
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    const voucherCodeValue = watchVoucher("voucherCode");

    const payload = {
      cartId: cart?.data?._id,
      snapPoints: snapPoints,
      discountPoints: discountPoints,
      voucherCode: voucherCodeValue || "",
    };

    checkout(payload, {
      onSuccess: (data) => {
        setCartData(cart?.data);
        setCheckoutResponse(data);
        onNextStep();
        setIsCheckout(true);

        toast.success("Checkout process started", {
          position: "top-right",
          style: { backgroundColor: "green", color: "white" },
        });
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to checkout", {
          position: "top-right",
          style: { backgroundColor: "red", color: "white" },
        });
      },
    });
  };

  // Apply voucher
  const handleApplyVoucher = (data: { voucherCode: string }) => {
    console.log("Applying voucher:", data.voucherCode);
    applyVoucher(
      { code: data.voucherCode },
      {
        onSuccess: (response) => {
          setApplyvocherResponse(response);
          toast.success("Voucher applied successfully", {
            position: "top-right",
            style: { backgroundColor: "green", color: "white" },
          });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to apply voucher",
            {
              position: "top-right",
              style: { backgroundColor: "red", color: "white" },
            }
          );
        },
      }
    );
  };

  // Handle cart item removal
  const removeItem = async (item) => {
    await updateCart(
      { id: item.product._id, quantity: 0 },
      {
        onSuccess: () => {
          toast.success(`${item?.product?.name} removed from cart`);
          refetch();
        },
        onError: (error: any) => {
          console.log(error);
          toast.error(
            error.response?.data?.message ||
              "Error occurred while removing item"
          );
        },
      }
    );
  };

  return (
    <div className="">
      {isLoading ? (
        <div className="flex w-[100%] justify-center items-center h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#F37835]" />
        </div>
      ) : (
        <div className="max-w-[1480px] mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={Logo}
              alt="Snatch Day Logo"
              width={150}
              height={100}
              priority
            />
            <h2 className="text-3xl font-bold">Shopping Cart</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-4">
              {!cart ||
              !cart.data ||
              !cart.data.cart ||
              cart.data.cart.length === 0 ? (
                <p className="text-center my-5 text-gray-500">
                  Your cart is empty
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="w-full text-lg">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Picture</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead className="text-right">Sum</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart?.data?.cart?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Image
                              src={
                                item?.product?.images[0] || "/placeholder.svg"
                              }
                              alt={item.product.name}
                              width={30}
                              height={30}
                            />
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {item?.product?.name}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              onClick={() =>
                                handleUpdateCart(
                                  item?.product?._id,
                                  item.quantity - 1
                                )
                              }
                              variant="outline"
                              size="sm"
                              disabled={item.quantity <= 1 || isPending}
                            >
                              -
                            </Button>
                            <span className="mx-2">{item.quantity}</span>
                            <Button
                              onClick={() =>
                                handleUpdateCart(
                                  item?.product?._id,
                                  item.quantity + 1
                                )
                              }
                              variant="outline"
                              size="sm"
                              disabled={isPending}
                            >
                              +
                            </Button>
                          </TableCell>
                          <TableCell>
                            {item?.unitPrice?.toFixed(2) || 0}€
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {item?.totalPrice?.toFixed(2) || 0}€
                          </TableCell>
                          <TableCell>
                            <DeleteIcon
                              size={30}
                              onClick={() => removeItem(item)}
                              className="cursor-pointer text-red-600 hover:bg-red-600 hover:text-white p-1 rounded"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              {/* Voucher Code Input Form */}
              <form
                onSubmit={handleVoucherSubmit(handleApplyVoucher)}
                className="mt-4"
              >
                <div className="mt-2">
                  <label className="block text-lg"> Voucher Code:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      {...registerVoucher("voucherCode")}
                      placeholder="Enter Voucher Code"
                      className="mt-2 px-2 h-[55px] border border-gray-300 rounded-md focus:outline-none w-full my-2 focus:ring-2 focus:ring-[#F37835]"
                    />
                    <Button
                      disabled={
                        isApplyVoucherPending || !watchVoucher("voucherCode")
                      }
                      type="submit"
                      className="mt-2 h-[55px]"
                    >
                      {isApplyVoucherPending ? "Applying..." : "Apply Voucher"}
                    </Button>
                  </div>
                  {voucherErrors.voucherCode && (
                    <p className="text-red-500">
                      {voucherErrors.voucherCode.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                {/* Snap Points Input */}
                <div className="mt-2">
                  <label className="block my-2 text-lg">Use Snap Points:</label>
                  <input
                    type="number"
                    {...register("snapPoints")}
                    placeholder="Points"
                    disabled={!user}
                    className="w-full h-[55px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F37835]"
                  />
                  {errors.snapPoints && (
                    <p className="text-red-500 ml-2">
                      {errors.snapPoints.message}
                    </p>
                  )}
                </div>

                {/* Discount Points Input */}
                <div className="mt-6">
                  <label className="block my-2">Use Discount Points:</label>
                  <input
                    type="number"
                    {...register("discountPoints")}
                    placeholder="Points"
                    disabled={!user}
                    className="w-full h-[55px]  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F37835]"
                  />
                  {errors.discountPoints && (
                    <p className="text-red-500 ml-2">
                      {errors.discountPoints.message}
                    </p>
                  )}
                </div>

                {/* Summary Section */}
                <div className="mt-6 p-4 border-t">
                  <h3 className="text-lg font-semibold  mb-4">Order Summary</h3>

                  <div className="flex justify-between text-lg">
                    <span>Subtotal:</span>
                    <span>{cart?.data?.subTotal.toFixed(2) || 0}€</span>
                  </div>

                  {cart?.data?.appliedDiscount > 0 && (
                    <div className="flex justify-between text-lg text-green-600">
                      <span>Product Discount:</span>
                      <span>
                        -{cart?.data?.appliedDiscount.toFixed(2) || 0}€
                      </span>
                    </div>
                  )}

                  {watchVoucher("voucherCode") &&
                    applyvocherResponse?.data?.voucherDiscount > 0 && (
                      <div className="flex justify-between text-lg text-green-600">
                        <span>Voucher Discount:</span>
                        <span>
                          -
                          {applyvocherResponse?.data?.voucherDiscount.toFixed(
                            2
                          )}
                          €
                        </span>
                      </div>
                    )}

                  {watch("snapPoints") && Number(watch("snapPoints")) > 0 && (
                    <div className="flex justify-between text-lg text-green-600">
                      <span>Snap Points:</span>
                      <span>
                        -{(Number(watch("snapPoints")) / 100).toFixed(2)}€
                      </span>
                    </div>
                  )}

                  {watch("discountPoints") &&
                    Number(watch("discountPoints")) > 0 && (
                      <div className="flex justify-between text-lg text-green-600">
                        <span>Discount Points:</span>
                        <span>
                          -{(Number(watch("discountPoints")) / 100).toFixed(2)}€
                        </span>
                      </div>
                    )}

                  <div className="flex text-lg justify-between mt-2">
                    <span>VAT:</span>
                    <span>19%</span>
                  </div>

                  <div className="flex text-lg justify-between font-semibold pt-2 border-t mt-2">
                    <span>Total</span>
                    <span>{calculateTotal().toFixed(2)}€</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-end w-full">
                  <Button
                    type="submit"
                    disabled={
                      isCheckoutPending ||
                      !cart ||
                      !cart.data ||
                      !cart.data.cart ||
                      cart.data.cart.length === 0
                    }
                    className="bg-[#F37835] text-lg text-white px-5 py-2 rounded-md hover:bg-[#FF9900]"
                  >
                    {isCheckoutPending
                      ? "Processing..."
                      : "Proceed to Checkout"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
