"use client";

import React from "react";
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
import { useCreateDuel } from "@/hooks/api";
import { toast } from "sonner";

const duelFormSchema = z.object({
  stake: z.string().min(1, "Stake is required"),
  points_type: z.string({
    required_error: "Please select points type",
  }).refine((val) => val === "snap" || val === "discount", {
    message: "Points type must be either snap points or discount points"
  }),
  rounds: z.string({
    required_error: "Please select number of rounds",
  }),
});

interface DuelCardsProps {
  gameId: string;
  gameTitle: string;
  gameIcon: string;
  onSuccess?: () => void;
}

const DuelCards = ({ gameId, gameTitle, gameIcon, onSuccess }: DuelCardsProps) => {
  const { mutate: createDuel, isPending } = useCreateDuel();

  const form = useForm<z.infer<typeof duelFormSchema>>({
    resolver: zodResolver(duelFormSchema),
    defaultValues: {
      stake: "0",
      points_type: "snap",
      rounds: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof duelFormSchema>) => {
    createDuel(
      {
        game: gameId,
        amount: Number(values.stake),
        rounds: Number(values.rounds),
        value: values.points_type === "snap" ? 1 : 2, // Adjust value based on your requirements
        type: values.points_type === "snap" ? "snap" : "discount",
      },
      {
        onSuccess: () => {
          toast.success("Duel created successfully!");
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to create duel");
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
      {gameIcon && gameTitle && (
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 relative">
            <Image
              src={gameIcon}
              alt={gameTitle}
              width={64}
              height={64}
              className="rounded-lg"
            />
          </div>
          <h2 className="text-xl font-bold">{gameTitle}</h2>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="stake"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stake:</FormLabel>
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

          <FormField
            control={form.control}
            name="points_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points Type:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

          <FormField
            control={form.control}
            name="rounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Round:</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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

          <Button
            type="submit"
            className="w-full gradient-primary text-white py-6 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DuelCards; 