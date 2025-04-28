"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactRating from "react-rating";
import { Loader, Star } from "lucide-react";
import { z } from "zod";
import { useCreateReview } from "@/hooks/api";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const reviewFormSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  product: z.string().min(1, "Product is required"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(1, "Comment is required"),
  userName: z.string().min(1, "Username is required"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const ReviewModal = ({
  orderId,
  product,
  userName,
  refetch,
}: {
  orderId: string;
  product: string;
  userName?: string;
  refetch: () => void;
}) => {
  const { mutate: createReview, isPending } = useCreateReview();
  const Rating = ReactRating as any;
  const [open, setOpen] = useState(false);
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      orderId: orderId,
      product: product,
      rating: 0,
      comment: "",
      userName: userName,
    },
  });

  const onSubmit = (values: ReviewFormValues) => {
    createReview(values, {
      onSuccess: () => {
        toast.success("Review created successfully");
        form.reset();
        setOpen(false);
        refetch();
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to create review");
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 transition-colors cursor-pointer capitalize text-white text-xs px-4 py-1.5 rounded-md">
                <Star className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Review</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-center">
            Product Review
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Share your experience with this product
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-medium">Order ID</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        value={orderId}
                        defaultValue={orderId}
                        className="bg-muted"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-medium">Product</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        value={product}
                        defaultValue={product}
                        className="bg-muted"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Your Name</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={true}
                      value={userName}
                      defaultValue={userName}
                      className="bg-muted"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Rating</FormLabel>
                  <div className="flex justify-center py-2">
                    <FormControl>
                      <Rating
                        emptySymbol={
                          <Star className="text-gray-300 w-8 h-8 transition-all hover:scale-110" />
                        }
                        fullSymbol={
                          <Star
                            className="text-yellow-400 w-8 h-8 transition-all hover:scale-110"
                            fill="#facc15"
                          />
                        }
                        initialRating={field.value}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this product..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-orange-500 hover:bg-orange-600 transition-colors py-2 text-white font-medium"
              >
                {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Submit Review"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
