"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { MailIcon, UserIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  valueButton: z.string().nonempty("*Please select a value*"),
  recipientName: z.string().nonempty("*Please enter a name*"),
  recipientEmail: z.string().email("*Please enter a valid email*"),
  myName: z.string().nonempty("*Please enter a name*"),
  myEmail: z.string().email("*Please enter a valid email*"),
  eventButton: z.string().nonempty("*Please select an event*"),
  news: z.string(),
  checked: z.boolean().refine((val) => val === true, {
    message: "*Note: the conditions for vouchers (no return) must be agreed*",
  }),
});

type FormSchemaVlues = z.infer<typeof formSchema>;

const Page = () => {
  const data = ["10", "15", "20", "25", "30", "40", "50", "75", "100", "150"];
  const events = ["Generally", "Birthday", "Easter", "Christmas"];
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const onSubmit = (data: FormSchemaVlues) => {
    console.log(data);
  };
  const form = useForm<FormSchemaVlues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valueButton: "",
      recipientEmail: "",
      recipientName: "",
      myEmail: "",
      myName: "",
      eventButton: "",
      news: "",
      checked: false,
    },
  });
  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 mt-12">
          Contact
        </h1>
        <Separator className="my-10" />
        <div className="flex flex-col items-center justify-center text-center w-full px-[20%] gap-5">
          <h1 className="font-extrabold text-foreground text-2xl">
            Snatch Day Gift Voucher - A gift that will delight everyone!
          </h1>
          <div className="w-[92%]">
            <p className="font-medium text-foreground text-lg">
              Are you looking for a gift where the lucky recipient can choose
              his or her favorite product?
            </p>
            <p className="text-foreground text-lg font-medium">
              Then a voucher from Snatch Day is the perfect choice! You are
              guaranteed to hit the mark and give the recipient great joy. You
              will receive the voucher with free shipping.
            </p>
            <p className="text-foreground text-lg font-medium">
              It is also possible to send the voucher directly to the gift
              recipient.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center w-full px-[20%] gap-5 mt-10">
          <h1 className="font-extrabold text-foreground text-2xl">
            It&apos;s that easy:
          </h1>
          <div className="w-[92%]">
            <p className="font-medium text-foreground text-lg">
              First select the desired value for your voucher and then click on
              &quot;Add to cart&quot;.
            </p>
            <p className="font-medium text-foreground text-lg">
              With a Snatch Day gift voucher you can put a smile on
              someone&apos;s face and give the recipient the opportunity to
              choose something special for themselves. Make someone happy and
              surprise them with a voucher from Snatch Day!
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-10"
            >
              <FormField
                control={form.control}
                name="valueButton"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <RadioGroup
                          className="flex items-center space-x-2"
                          value={field.value.toString()}
                          onValueChange={field.onChange}
                        >
                          {data.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                              onClick={() => setSelectedValue(item)}
                            >
                              <RadioGroupItem value={item} id={item} hidden />
                              <Label
                                className={`cursor-pointer rounded-sm px-5 font-bold text-lg bg-white text-primary border-primary border hover:bg-primary hover:text-white ${
                                  selectedValue === item &&
                                  "bg-primary text-white hover:bg-primary hover:text-white"
                                }`}
                                htmlFor={item}
                              >
                                {item}€{" "}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-10">
                <div className="w-full flex items-end">
                  <FormField
                    control={form.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg text-foreground">
                          Recipient Name:
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="relative rounded-l-none font-bold w-[450px] h-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                              placeholder="recipient name*"
                              {...field}
                            />
                            <div className="bg-primary p-2 w-max rounded-l-md h-10 mb-2 absolute top-0 -left-10 text-white">
                              <UserIcon size={25} />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-center font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="relative w-full flex items-end">
                  <FormField
                    control={form.control}
                    name="recipientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg text-foreground">
                          Recipient Email:
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="email"
                              className="font-bold w-[450px] h-10 rounded-r-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                              placeholder="recipient email*"
                              {...field}
                            />
                            <div className="bg-primary p-2 w-max rounded-r-md h-10 mb-2 absolute top-0 -right-10 text-white">
                              <MailIcon size={25} />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-center font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="relative w-full flex items-end ">
                  <FormField
                    control={form.control}
                    name="myName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg text-foreground">
                          My Name:
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              className="font-bold w-[450px] rounded-l-none h-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                              placeholder="my name*"
                              {...field}
                            />
                            <div className="bg-primary p-2 w-max rounded-l-md h-10 mb-2 absolute top-0 -left-10 text-white">
                              <UserIcon size={25} />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-center font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="relative w-full flex items-end">
                  <FormField
                    control={form.control}
                    name="myEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg text-foreground">
                          My Email:
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="email"
                              className="font-bold w-[450px] h-10 rounded-r-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                              placeholder="my email*"
                              {...field}
                            />
                            <div className="bg-primary p-2 w-max rounded-r-md h-10 mb-2 absolute top-0 -right-10 text-white">
                              <MailIcon size={25} />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-center font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="eventButton"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <RadioGroup
                          className="flex items-center space-x-2"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          {events.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                              onClick={() => setSelectedEvent(item)}
                            >
                              <RadioGroupItem value={item} id={item} hidden />
                              <Label
                                className={`cursor-pointer rounded-sm px-7 font-bold text-lg bg-white py-1 text-[#3a662b] border-[#3a662b] border hover:bg-[#3a662b] hover:text-white ${
                                  selectedEvent === item &&
                                  "bg-[#3a662b] text-white hover:bg-[#3a662b] hover:text-white"
                                }`}
                                htmlFor={item}
                              >
                                {item}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="news"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg text-foreground">
                      News:
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="font-bold w-[950px] h-40 rounded-r-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
              <Button
                className="font-bold text-lg px-6 hover:bg-primary text-white"
                type="submit"
              >
                Add To Cart
              </Button>

              <FormField
                control={form.control}
                name="checked"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="terms"
                          className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I understand that gift vouchers cannot be returned.
                        </label>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="shadow-[0px_0px_20px_#ebe8e8] h-[562px] w-[1000px] self-center justify-self-center mt-20 overflow-y-scroll custom-scrollbar-2">
          <div className="px-5 py-8 flex flex-col gap-6">
            <div className="text-foreground  flex flex-col gap-3">
              <h1 className="font-extrabold text-3xl text-foreground">
                voucher conditions
              </h1>
              <p>
                Our general terms and conditions and data protection regulations
                apply to the purchase of vouchers. In addition, the following
                voucher conditions apply:
              </p>
            </div>
            <div className="text-foreground  flex flex-col gap-3">
              <h1 className="font-extrabold text-3xl text-foreground">
                1st subject
              </h1>
              <p>
                The Snatch Day voucher can be used in accordance with these
                terms and conditions when making purchases at the Snatch Day
                online shop. The voucher will be sent to you in the form of an
                email with a voucher code after payment of the voucher amount
                has been received. You can pass the voucher on to third parties.
                If you pass it on, you agree not to use the voucher code any
                more or to disclose it to third parties.
              </p>
              <p>
                By sending the voucher to you, Snatch Day undertakes to pay the
                purchase price (up to the maximum value of the voucher) directly
                to the seller if the voucher code is entered when making a
                purchase from Snatch Day as a third party. By paying the seller,
                Snatch Day has fulfilled its obligation to provide the voucher
                (partially if applicable).
              </p>
            </div>
            <div className="text-foreground  flex flex-col gap-3">
              <h1 className="font-extrabold text-3xl text-foreground">
                2. Redeem the voucher
              </h1>
              <p>
                The voucher can be used to purchase a product offered via the
                online shop www.snatchday.de. It is redeemed by entering the
                voucher code in the field provided when purchasing an item on
                www.snatchday.de
              </p>
              <p>Prerequisites for redemption are,</p>
              <ol className="list-disc pl-10">
                <li>
                  that the offer in question provides for the acceptance of
                  vouchers
                </li>
                <li>
                  that the offer in question also includes payment by bank
                  transfer or
                </li>
                <li>PayPal provides and this is agreed</li>
                <li>no advance payment by the seller is required</li>
              </ol>
              <p>
                Any remaining credit will be retained and can be used for
                further purchases by re-entering the voucher code.
              </p>
              <p>
                If the purchase price of the offer for which the voucher is used
                exceeds the value of the voucher, the remaining amount must be
                paid by the buyer directly to the seller in accordance with the
                respective terms and conditions of the offer.
              </p>
              <p>
                Cash payment of the (remaining) value of the voucher is
                excluded.
              </p>
            </div>
            <div className="text-foreground  flex flex-col gap-3">
              <h1 className="font-extrabold text-3xl text-foreground">
                3. Period of validity
              </h1>
              <p>
                Vouchers must be redeemed no later than the end of the third
                year after the voucher code has been sent; after this time they
                lose their validity.
              </p>
            </div>
            <div className="text-foreground  flex flex-col gap-3">
              <h1 className="font-extrabold text-3xl text-foreground">
                4. Liability
              </h1>
              <p>
                You agree to keep the voucher code secret and only disclose it
                to the person you want to give the voucher to. Be particularly
                careful when entering your email address when ordering and when
                forwarding it. Snatch Day accepts no liability for typos when
                entering the email address. Snatch Day accepts no liability for
                the loss, theft or misuse or delayed transmission (e.g. due to
                technical difficulties) of the voucher code.
              </p>
            </div>
            <div className="text-foreground  flex flex-col gap-3">
              <h1 className="font-extrabold text-3xl text-foreground">
                5. Fraud
              </h1>
              <p>
                If Snatch Day discovers fraud or an attempt at deception in
                connection with the purchase or redemption of vouchers, Snatch
                Day is entitled to block the member accounts concerned and/or to
                request an alternative payment directly to the seller when the
                voucher is used. There is no right to redemption or payment of
                affected vouchers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Page;
