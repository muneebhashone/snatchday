import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import recommend from "@/app/images/recommend.png";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useParams } from "next/navigation";
import { useRecommendProduct } from "@/hooks/api";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const formSchema = z.object({
  name: z.string().nonempty("*name i required*"),
  email: z.string().email("*email must be valid*"),
  friendEmail: z.string().email("*email must be valid*"),
});

export interface IRecommendProduct {
  name: string;
  email: string;
  friendEmail: string;
  productId: string;
}

type IForm = z.infer<typeof formSchema>;

const RecommendProductModal = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const params = useParams();
  const { isPending, mutate: RecommendProduct } = useRecommendProduct();
  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      friendEmail: "",
    },
  });

  const handleSubmit = (data: IForm) => {
    const formData = {
      ...data,
      productId: params.id as string,
    };
    RecommendProduct(formData as IRecommendProduct, {
      onSuccess: () => {
        toast.success(
          "you are successfully recommended that product to your friend"
        );
        setIsOpen(false);
        form.reset();
      },
      onError: (error) => {
        toast.error("failed to recommend the product");
        console.log(error);
      },
    });
  };
  return (
    <DialogContent className="sm:max-w-[625px] p-0">
      <DialogHeader>
        <DialogTitle className="bg-primary p-5 rounded-t-3xl flex items-center justify-center gap-3 text-white">
          Recommend Product To Your Friend
          <div className="p-2 rounded-full bg-white">
            <Image src={recommend} alt="recommend" width={30} height={30} />
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4 px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="name...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email...." {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="friendEmail"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Friend Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your friend's email...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-5 w-full flex items-center justify-center">
              <Button
                className="w-40 font-bold border border-primary bg-white text-primary hover:bg-primary hover:text-white"
                type="submit"
              >
                {isPending ? (
                  <Loader2Icon className="animate-spin" size={20} />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default RecommendProductModal;
