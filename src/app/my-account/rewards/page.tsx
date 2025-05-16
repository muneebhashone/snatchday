"use client";
import MyAccountLayout from "@/components/my-account/MyAccountLayout";
import { useAddToCartReward, useGetCart, useGetMyProfile } from "@/hooks/api";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BaggageClaim } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

const Page = () => {
  const { data: myProfile } = useGetMyProfile();
  const { mutate: addToCartReward } = useAddToCartReward();
  const { data: getCart, refetch: refetchCart } = useGetCart();
  // const { mutate: removeFromCartReward } = useRemoveFromCartReward();
  const wonProducts = myProfile?.data?.rewards;
  console.log(wonProducts, "wonProducts");
  const handleAddToCartReward = (productRewardId: string) => {
    addToCartReward(productRewardId, {
      onSuccess: () => {
        toast.success("Reward added to cart");
        refetchCart();
      },
      onError: () => {
        toast.error("Failed to add reward to cart");
      },
    });
  };
  return (
    <MyAccountLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Rewards</h1>
        <div className="mt-4">
          {wonProducts?.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product </TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wonProducts?.map((product) => (
                    <TableRow key={product?.product?._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Image
                            src={product?.product?.images[0]}
                            alt={product?.product?.name}
                            width={50}
                            height={50}
                            objectFit="contain"
                          />
                          <p className="line-clamp-2">
                            {product?.product?.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(product?.product?.price)}
                      </TableCell>
                      <TableCell>{product?.quantity}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          Won
                        </span>
                      </TableCell>
                      <TableCell>
                        {!product?.claimed ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() =>
                                    handleAddToCartReward(product?._id)
                                  }
                                  variant="outline"
                                >
                                  <BaggageClaim className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Claim Reward</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            Claimed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-red-500">*No rewards found*</div>
          )}
        </div>
      </div>
    </MyAccountLayout>
  );
};

export default Page;
