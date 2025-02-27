"use client";
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { CalendarIcon, MailIcon, PhoneCallIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GenderIcon } from "./icons/icon";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import dayjs from "dayjs";
import { Textarea } from "./ui/textarea";
import ReactSlider from "react-slider";

const formSchema = z.object({
  firstName: z.string().nonempty("*Please enter a name*"),
  name: z.string().nonempty("*Please enter a name*"),
  email: z.string().email("*Please enter a valid email*"),
  gender: z.string().nonempty("*Please Select any one of them*"),
  date: z.string(),
  phone: z
    .string()
    .min(11, "please input valid phone number with your country code"),
  comment: z.string(),
  desiredTime: z.number().array(),
});

type FormSchemaVlues = z.infer<typeof formSchema>;

const CallBackServicesModal = () => {
  const convertToTime = (value: number) => {
    const hours = Math.floor(value);
    const minutes = (value % 1) * 60;
    const formattedMinutes = minutes === 0 ? "00" : "30";
    return `${hours}:${formattedMinutes}`;
  };

  const onSubmit = (data: FormSchemaVlues) => {
    console.log(data);
  };
  const form = useForm<FormSchemaVlues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      name: "",
      email: "",
      gender: "",
      date: "",
      phone: "",
      comment: "",
      desiredTime: [9, 10.5],
    },
  });

  return (
    <DialogContent className="sm:max-w-[425px] p-0 min-w-[700px]">
      <DialogHeader className="bg-[#3a672b] rounded-t-lg flex flex-col items-center justify-center py-4">
        <DialogTitle className="text-3xl text-white m-0 px-2 font-extrabold">
          Callback Service
        </DialogTitle>
        <DialogDescription className="text-white font-semibold p-2 text-center">
          <p>
            Do you have a question? No problem, we&apos;ll be happy to answer
            it.
          </p>
          <p>
            Simply fill out the callback form. We will then call you back at
            your preferred time.
          </p>
          <p>This service is free for you!</p>
        </DialogDescription>
      </DialogHeader>
      <div className="w-full overflow-y-scroll custom-scrollbar h-[700px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-5 w-full"
          >
            <div className="w-full flex items-center justify-center">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[450px] rounded-l-none font-bold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent text-foreground">
                            <SelectValue placeholder="--Gender--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>--gender--</SelectLabel>
                              <SelectItem value="man">Mister</SelectItem>
                              <SelectItem value="women">Women</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <div className="bg-primary p-2 w-max rounded-l-md h-10 mb-2 absolute top-0 -left-10 text-white">
                          <GenderIcon className="w-6 h-6" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="relative rounded-l-none font-bold w-[450px] h-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          placeholder="First Name*"
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
            <div className="relative w-full flex items-center justify-center ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="font-bold w-[450px] rounded-l-none h-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          placeholder="Name*"
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
            <div className="relative min-w-full flex items-center justify-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          className="font-bold w-[450px] h-10 rounded-l-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          placeholder="E-mail*"
                          {...field}
                        />
                        <div className="bg-primary p-2 w-max rounded-l-md h-10 mb-2 absolute top-0 -left-10 text-white">
                          <MailIcon size={25} />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative min-w-full flex items-center justify-center">
              <FormField
                control={form.control}
                name="date"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "relative w-[450px] justify-start text-left font-normal",
                                !form.getValues("date") &&
                                  "text-muted-foreground"
                              )}
                            >
                              <div className="bg-primary p-3 w-max rounded-l-md h-10 mb-2 absolute top-0 -left-10">
                                <CalendarIcon
                                  className="text-white"
                                  size={25}
                                />
                              </div>
                              {dayjs(
                                form.getValues("date") ||
                                  new Date().toISOString()
                              ).format("DD/MM/YYYY")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 " align="start">
                            <Calendar
                              className=" rounded-l-none"
                              mode="single"
                              selected={new Date(form.watch("date"))}
                              onSelect={(value) => {
                                form.setValue(
                                  "date",
                                  value?.toLocaleString() ?? ""
                                );
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="relative w-full flex items-center justify-center ">
              <FormField
                control={form.control}
                name="desiredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-extrabold">
                      Desired time:
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Slider
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                          }}
                          value={[field.value]}
                          defaultValue={[50]}
                          min={50}
                          max={100}
                          step={1}
                          className={cn("w-[450px]")}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </div> */}
            <div className=" w-full flex-col items-center mb-10 justify-start pl-[80px] pr-[125px]">
              <FormField
                control={form.control}
                name="desiredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-extrabold">
                      Desired time:
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-[100%]">
                        <div className="w-full flex items-center justify-between">
                          {/*  */}
                          <span>
                            {convertToTime(form.watch("desiredTime")[0])}
                          </span>
                          <span>
                            {convertToTime(form.watch("desiredTime")[1])}
                          </span>
                        </div>
                        <div className="absolute top-10 left-0  w-[100%] flex flex-col items-start justify-start">
                          <ReactSlider
                            value={field.value}
                            onChange={field.onChange}
                            className="horizontal-slider flex items-center justify-center w-full border border-primary rounded-full h-2"
                            thumbClassName="example-thumb"
                            trackClassName="example-track"
                            // defaultValue={['9', '18']}
                            max={18}
                            min={9}
                            ariaLabel={["Lower thumb", "Upper thumb"]}
                            ariaValuetext={(state) =>
                              `Thumb value ${state.valueNow}`
                            }
                            renderThumb={(props, state) => (
                              <div {...props}>{state.valueNow}</div>
                            )}
                            pearling
                            step={0.5}
                            minDistance={1}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold pt-4" />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative w-full flex items-center justify-center ">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          className="font-bold w-[450px] rounded-l-none h-10 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          placeholder="your phone number*"
                          {...field}
                        />
                        <div className="bg-primary p-2 w-max rounded-l-md h-10 mb-2 absolute top-0 -left-10 text-white">
                          <PhoneCallIcon size={25} />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative w-full flex items-start justify-center ">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          value={field.value}
                          onChange={field.onChange}
                          className="font-bold w-[450px] rounded-l-none h-28 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          placeholder="your request or comment*"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-center font-bold" />
                  </FormItem>
                )}
              />
            </div>
            <p className="font-bold">We look forward to hearing from you.</p>
            <Button
              className="font-bold text-lg px-6 hover:bg-primary text-white"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <DialogFooter></DialogFooter>
    </DialogContent>
  );
};

export default CallBackServicesModal;
