"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ClientLayout from "@/components/landing-page/ClientLayout";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import {
  useApplyVoucher,
  useCheckout,
  useGetCart,
  useGetMyProfile,
  useGetPoints,
  useUpdateCart,
} from "@/hooks/api";
import { DeleteIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// Define the Zod schema for the checkout payload
const checkoutSchema = z
  .object({
    snapPoints: z.string().optional(),
    discountPoints: z.string().optional(),
    voucherCode: z.string().nonempty({ message: "Voucher Code is required" }),
  })
  .refine((data) => data.snapPoints || data.discountPoints, {
    message: "required",
    path: ["snapPoints"], // You can specify the path to show the error on snapPoints
  });

// Define a new Zod schema for the voucher code
const voucherSchema = z.object({
  voucherCode: z.string().nonempty({ message: "Voucher Code is required" }),
});

const CartTable = () => {
  const { data: cart, isLoading, refetch } = useGetCart();

  const [applyvocherResponse, setApplyvocherResponse] = useState(null);

  console.log(applyvocherResponse, "applyvocherResponse");

  const { mutateAsync: updateCart, isPending } = useUpdateCart();
  const { data: points, isLoading: isPointsLoading } = useGetPoints();
  const { data: myprofile, isLoading: isMyProfileLoading } = useGetMyProfile();
  const { mutateAsync: checkout, isPending: isCheckoutPending } = useCheckout();
  const router = useRouter();
  const { setCartData } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      snapPoints: "",
      discountPoints: "",
      voucherCode: "",
    },
  });

  const { mutate: applyVoucher, isPending: isApplyVoucherPending } =
    useApplyVoucher();

  // Use the new schema for the voucher code form
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
        onError: () => {
          toast.error("Failed to update cart", {
            position: "top-right",
            style: { backgroundColor: "red", color: "white" },
          });
        },
      }
    );
  };

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

    const payload = {
      cartId: cart?.data?._id,
      snapPoints: snapPoints,
      discountPoints: discountPoints,
      voucherCode: Number(data.voucherCode) || "",
    };

    checkout(payload, {
      onSuccess: () => {
        setCartData(cart?.data);
        router.push(`/checkout`);
        toast.success("Checkout process started", {
          position: "top-right",
          style: { backgroundColor: "green", color: "white" },
        });
      },
      onError: (error) => {
        toast.error("Failed to checkout" + error.response.data.message, {
          position: "top-right",
          style: { backgroundColor: "red", color: "white" },
        });
      },
    });
  };

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
        onError: (error) => {
          console.log("Failed to apply voucher", error);
          toast.error("Failed to apply voucher", {
            position: "top-right",
            style: { backgroundColor: "red", color: "white" },
          });
        },
      }
    );
  };
  const removeItem = async (item) => {
    await updateCart(
      { id: item.product._id, quantity: 0 },
      {
        onSuccess: () => {
          toast.success(`${item?.product?.name} removed from cart`);
          refetch();
        },
        onError: (error) => {
          console.log(error);
          toast.error("Error occured see in console");
        },
      }
    );
  };

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] my-20  mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={logo}
                alt="Snatch Day Logo"
                width={70}
                height={40}
                priority
              />
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
            </div>
            {!cart ||
            !cart.data ||
            !cart.data.cart ||
            cart.data.cart.length === 0 ? (
              <p className="text-center my-5 text-gray-500">
                Your cart is empty
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Picture</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead className="text-right">Sum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart?.data?.cart?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Image
                            src={item?.product?.images[0]}
                            alt={item.name}
                            width={30}
                            height={30}
                          />
                        </TableCell>
                        <TableCell>{item?.product?.name}</TableCell>
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
                          {item?.product?.price.toFixed(2)}€
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {(item?.product?.price * item?.quantity).toFixed(2)}€
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
            <form onSubmit={handleVoucherSubmit(handleApplyVoucher)}>
              <div className="mt-2">
                <label className="block"> Voucher Code:</label>
                <input
                  type="text"
                  {...registerVoucher("voucherCode")}
                  placeholder="Enter Voucher Code"
                  className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none w-full my-2 focus:ring-2 focus:ring-[#F37835]"
                />
                {voucherErrors.voucherCode && (
                  <p className="text-red-500">
                    {voucherErrors.voucherCode.message}
                  </p>
                )}
                <div className="mt-2 flex justify-end">
                  <Button
                    disabled={
                      isApplyVoucherPending || !watchVoucher("voucherCode")
                    }
                    type="submit"
                  >
                    {isApplyVoucherPending ? "Applying..." : "Apply Voucher"}
                  </Button>
                </div>
              </div>
            </form>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              {/* Snap Points Input */}

              <div className="mt-2">
                <label className="block my-2">Use Snap Points:</label>
                <input
                  type="number"
                  {...register("snapPoints")}
                  placeholder="Points"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F37835]"
                />
                {errors.snapPoints && (
                  <p className="text-red-500 ml-2">
                    {errors.snapPoints.message}
                  </p>
                )}
              </div>

              {/* Discount Points Input */}
              <div className="mt-2">
                <label className="block my-2">Use Discount Points:</label>
                <input
                  type="number"
                  {...register("discountPoints")}
                  placeholder="Points"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F37835]"
                />
                {errors.discountPoints && (
                  <p className="text-red-500 ml-2">
                    {errors.discountPoints.message}
                  </p>
                )}
              </div>

              <div className="mt-2">
                <label className="block my-2">Voucher Code:</label>
                <input
                  type="text"
                  {...register("voucherCode")}
                  placeholder="Enter Voucher Code"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F37835]"
                />
                {errors.voucherCode && (
                  <p className="text-red-500 ml-2 mt-2">
                    {errors.voucherCode.message}
                  </p>
                )}
              </div>

              {/* Summary Section */}
              <div className="mt-6 p-4 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span>{cart?.data?.subTotal.toFixed(2)}€</span>
                </div>
                {cart?.data?.appliedDiscount > 0 && (
                  <div className="flex justify-between text-lg font-semibold text-green-600">
                    <span>Product Discount:</span>
                    <span>-{cart?.data?.appliedDiscount.toFixed(2)}€</span>
                  </div>
                )}
                {watchVoucher("voucherCode") && (
                  <div className="flex justify-between text-lg font-semibold text-green-600">
                    <span>Voucher Discount:</span>
                    <span>
                      -{applyvocherResponse?.data?.voucherDiscount || 0}€
                    </span>
                  </div>
                )}
                {watch("snapPoints") && (
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Snap Points:</span>
                    <span>{watch("snapPoints") / 10}€</span>
                  </div>
                )}
                {watch("discountPoints") && (
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Discount Points:</span>
                    <span>{watch("discountPoints") / 10}€</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold">
                  <span>19% VAT:</span>
                  <span>
                    {(
                      ((cart?.data?.subTotal || 0) * (cart?.data?.vat || 0)) /
                      100
                    ).toFixed(2)}
                    €
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-2 border-t pt-2">
                  <span>Total:</span>
                  <span>{cart?.data?.total.toFixed(2)}€</span>
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
                  className="bg-[#F37835] text-white px-5 py-2 rounded-md hover:bg-[#FF9900]"
                >
                  {isCheckoutPending ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default CartTable;
