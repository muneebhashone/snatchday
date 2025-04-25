"use client"

import { MsgIcon } from "../icons/icon";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubscriptIcon } from "../icons/icon";
import Image from "next/image";
import earlyformimage from "@/app/images/earlyformimage.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubscribeNewsletter } from "@/hooks/api";
import { toast } from "sonner";
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const EarlyAccess = () => {
  const { mutate: subscribeNewsletter, isPending } = useSubscribeNewsletter();
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    subscribeNewsletter(data.email, {
      onSuccess: () => {
        form.reset();
        toast.success("Successfully subscribed to newsletter");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to subscribe to newsletter");
        console.error(error);
      },
    } 
  );
  };

  return (
    // max-w-[1440px]
    // <div className="absolute -top-20 left-0 w-full">
    <div className="overflow-visible lg:overflow-hidden xl:overflow-visible bg-[#F6E9E1] shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl py-7 lg:py-10 px-8 sm:px-10 md:px-16 lg:px-10 xl:px-24 md:max-w-[95%] lg:max-w-[80%] mx-auto relative z-20 -top-28">
      <div className="absolute  -right-24 xl:right-0 bottom-0">
        <Image
          className="hidden lg:block w-full h-full object-contain object-right-bottom"
          src={earlyformimage}
          alt="early-access"
        />
      </div>
      <div className="flex xl:flex-row flex-row lg:flex-col xl:items-center justify-start gap-8 lg:gap-4 xl:gap-10">
        <div className="rounded-full bg-primary lg:w-16 lg:h-16 w-16 md:w-20 xl:w-24 h-16 md:h-20 xl:h-24 flex items-center justify-center">
          <MsgIcon />
        </div>
        <div className="w-[85%] lg:w-[75%]">
          <h2 className="text-md md:text-[32px] text-foreground">
            Subscribe to our newsletter to{" "}
            <span className="text-primary font-bold">win tournaments.</span>
          </h2>
          <p className="text-sm sm:text-lg text-foreground mt-2">
            Be the first to know about our new tournaments by subscribing to our
            newsletter.
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative xl:max-w-[730px]">
            <Input
              {...form.register("email")}
              placeholder="Enter Email Address"
              className="w-full border text-sm text-black md:text-lg border-primary rounded-lg md:h-16 pl-4 md:pl-12 mt-5"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 mt-1">{form.formState.errors.email.message}</p>
            )}
            <Button 
              type="submit"
              disabled={isPending}
              className="bg-white border border-primary absolute top-0 right-0 text-primary rounded-lg w-16 md:h-16 hover:bg-white hover:text-primary"
            >
              <SubscriptIcon />
            </Button>
          </form>
        </div>
      </div>

    </div>
    // </div>
  );
};
export default EarlyAccess;
