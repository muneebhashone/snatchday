import React, { useState } from "react";
import { useReturnOrder } from "@/hooks/api";
import { toast } from "sonner";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReturnOrderTypes } from "@/types/admin";
import { useRouter } from "next/navigation";

const schema = (selectedQuantity: number) =>
  z.object({
    quantity: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => !isNaN(val), { message: "Quantity must be a number" })
      .refine((val) => val >= 1, { message: "Quantity is required" }) // Equivalent to .min(1)
      .refine((val) => val <= selectedQuantity, {
        message: `Quantity cannot exceed ${selectedQuantity}`,
      }), // Equivalent to .max()
    reason: z.string().min(1, "Reason is required"),
    demand: z.enum(["refund", "exchange"], { message: "Demand is required" }),
    description: z.string().optional(),
  });

const ReturnOrderModal = ({
  isOpen,
  onClose,
  orderNumber,
  productId,
  selectedQuantity,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  productId: string;
  selectedQuantity: number;
  refetch: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema(selectedQuantity)),
  });
  const router = useRouter();
  const { mutate: returnOrder, isPending } = useReturnOrder();

  const onSubmit = (data) => {
    const payload: ReturnOrderTypes = {
      orderNumber,
      productsData: [
        {
          product: productId,
          quantity: data.quantity,
          reason: data.reason,
          demand: data.demand,
          description: data.description,
        },
      ],
    };
    console.log(payload,"payload");
    returnOrder(payload, {
      onSuccess: () => {
        toast.success("Return request submitted successfully");
        onClose();
        refetch();
        router.push(`/my-account/returns`);
      },
      onError: (error) => {
        toast.error("Failed to submit return request: " + error.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Return Order</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Please provide details for your return request
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason" className="text-xs text-muted-foreground">
                Reason for Return
              </Label>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <Input
                    id="reason"
                    placeholder="Why are you returning?"
                    {...field}
                  />
                )}
              />
              {errors.reason && (
                <p className="text-red-500 text-xs">{errors.reason.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="demand" className="text-xs text-muted-foreground">
                Return Demand
              </Label>
              <Controller
                name="demand"
                control={control}
                render={({ field }) => (
                  <select id="demand" {...field} className="border rounded p-2">
                    <option value="" disabled selected  >Select an option</option>
                    <option value="refund">Refund</option>
                    <option value="exchange">Exchange</option>
                  </select>
                )}
              />
              {errors.demand && (
                <p className="text-red-500 text-xs">{errors.demand.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="quantity"
                className="text-xs text-muted-foreground"
              >
                Quantity to Return
              </Label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Number of items"
                    {...field}
                    min={1}
                    onKeyDown={(e) => {
                      if (e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                  />
                )}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className="text-xs text-muted-foreground"
              >
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    placeholder="Additional details"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Return"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnOrderModal;
