"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateDuel, useGetPoints } from "@/hooks/api";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

interface DuelCardsProps {
  gameId: string;
  gameTitle: string;
  gameIcon: string;
  onSuccess?: (data: any) => void;
}

const DuelCards = ({
  gameId,
  gameTitle,
  gameIcon,
  onSuccess,
}: DuelCardsProps) => {
  const { data: getPoints } = useGetPoints();
  const { mutate: createDuel, isPending } = useCreateDuel();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState<z.infer<
    typeof duelFormSchema
  > | null>(null);

  const duelFormSchema = z
    .object({
      stake: z.string().min(1, "Stake is required"),
      points_type: z
        .string({
          required_error: "Please select points type",
        })
        .refine((val) => val === "snap" || val === "discount", {
          message: "Points type must be either snap points or discount points",
        }),
      rounds: z.string({
        required_error: "Please select number of rounds",
      }),
    })
    .refine(
      (data) => {
        const minStake = getPoints?.data?.minDuelStake;
        if (!minStake) return true;
        return Number(data.stake) >= minStake;
      },
      {
        message: `Stake must be greater than or equal to ${getPoints?.data?.minDuelStake}`,
        path: ["stake"],
      }
    );

  const form = useForm<z.infer<typeof duelFormSchema>>({
    resolver: zodResolver(duelFormSchema),
    defaultValues: {
      stake: "0",
      points_type: "snap",
      rounds: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof duelFormSchema>) => {
    setFormValues(values);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (!formValues) return;

    createDuel(
      {
        game: gameId,
        amount: Number(formValues.stake),
        rounds: Number(formValues.rounds),
        value: formValues.points_type === "snap" ? 1 : 2,
        type: formValues.points_type === "snap" ? "snap" : "discount",
      },
      {
        onSuccess: (data: any) => {
          toast.success("Duel created successfully!");
          onSuccess(data);
          setShowConfirmation(false);
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to create duel");
          setShowConfirmation(false);
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-lg max-w-sm w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="stake"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="w-full rounded-md"
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="points_type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select points type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="snap">Snap points</SelectItem>
                      <SelectItem value="discount">Discount points</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormField
              control={form.control}
              name="rounds"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select round" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-max gradient-primary text-white py-1 rounded-full text-sm mt-8 font-medium hover:opacity-90 transition-opacity"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="animate-spin text-white w-4 h-4" />
              ) : (
                "Register"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        title="Confirm Duel Creation"
        description={`Are you sure you want to create a duel with stake ${
          formValues?.stake
        } + fee ${getPoints?.data?.duelFee} total ${
          formValues?.points_type === "snap" ? "snap" : "discount"
        } points ${
          Number(formValues?.stake) + Number(getPoints?.data?.duelFee)
        } for ${formValues?.rounds} round(s)?`}
        confirmText="Create Duel"
        cancelText="Cancel"
        isLoading={isPending}
      />
    </div>
  );
};

export default DuelCards;
