"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, setDate } from "date-fns";
import { useCreateTournament, useGetGames, useGetProducts } from "@/hooks/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { TimePickerDemo } from "../ui/TimePicker1";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const formSchema = z
  .object({
    name: z.string().optional(),
    title: z
      .string({ required_error: "Title is required" })
      .min(3, "Title must be at least 3 characters"),
    textForBanner: z
      .string({ required_error: "Banner text is required" })
      .min(3, "Banner text must be at least 3 characters"),
    metaTitle: z
      .string({ required_error: "Meta title is required" })
      .min(3, "Meta title must be at least 3 characters"),
    metaDescription: z
      .string({ required_error: "Meta description is required" })
      .min(3, "Meta description must be at least 3 characters"),
    metaKeywords: z
      .string({ required_error: "Meta keywords are required" })
      .min(3, "Meta keywords must be at least 3 characters"),
    article: z
      .string({ required_error: "Product selection is required" })
      .min(1, "Please select a product"),
    startingPrice: z.coerce.number().optional(),
    priceReduction: z.coerce
      .number({ required_error: "Price reduction is required" })
      .min(1, "Price reduction must be at least 1"),
    numberOfPieces: z.coerce
      .number({ required_error: "Number of pieces is required" })
      .min(1, "Number of pieces must be at least 1"),
    game: z
      .string({ required_error: "Game selection is required" })
      .min(1, "Game must be selected"),

    // 🟢 Updated Start Date Validation
    start: z.string({ required_error: "Start date is required" }).refine(
      (val) => {
        const startDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return startDate >= today;
      },
      {
        message: "Start date cannot be in the past",
      }
    ),

    end: z.string({ required_error: "End date is required" }),

    length: z.coerce
      .number({ required_error: "Length is required" })
      .min(1, "Length must be at least 1"),
    fee: z.coerce
      .number({ required_error: "Fee is required" })
      .min(1, "Fee must be at least 1"),
    numberOfParticipants: z.coerce
      .number({ required_error: "Number of participants is required" })
      .min(1, "Number of participants must be at least 1"),
    vip: z.boolean(),
    resubmissions: z.coerce
      .number({ required_error: "Resubmissions is required" })
      .min(1, "Resubmissions must be at least 1"),
    image: z.string(),
  })

  .refine(
    (data) => {
      if (!data.start || !data.end) return true;
      return new Date(data.end) > new Date(data.start);
    },
    {
      message: "End date must be greater than start date",
      path: ["end"],
    }
  );

const TournamentCreateForm = ({ productId }: { productId?: string }) => {
  const { data: games } = useGetGames(0, 100);
  console.log(games);
  const params = useParams();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname.split("/")[4], "pathname");
  const { mutate: createTournament, isPending } = useCreateTournament();
  const { data: getProducts } = useGetProducts({ limit: `100000` });
  const products = getProducts?.data?.products || [];

  const product = getProducts?.data?.products?.find(
    (product: any) => product._id === productId
  );
  const productImage = product?.images[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      textForBanner: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      article: productId || "",
      startingPrice: 0,
      priceReduction: 0,
      numberOfPieces: 1,
      game: "",
      start: "",
      end: "",
      length: 1,
      fee: 0,
      numberOfParticipants: 1,
      vip: false,
      resubmissions: 0,
      image: productImage || "",
      // startTime: undefined,
      // endTime: undefined,
    },
  });

  useEffect(() => {
    if (product) {
      form.setValue("name", product.name);
      form.setValue("title", product.title);
      form.setValue("article", product._id);
      form.setValue("startingPrice", product.price);
      form.setValue("image", product.images[0] || "");
    }
  }, [product, form]);

  const onSubmit = async (values) => {
    const pro = params.id ? params.id : value;
    try {
      createTournament(
        {
          ...values,
          article: pro,
        },
        {
          onSuccess: () => {
            toast.success("Tournament created successfully");
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
            form.reset();
            router.push("/admin/tournament");
          },
          onError: (error: Error) => {
            const errorMessage =
              error?.message || "Failed to create tournament";
            toast.error(errorMessage);
            console.error("Error creating tournament:", error);
          },
        }
      );
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form");
    }
  };

  const productSelectField = pathname ===
    "/admin/tournament/create-tournament" && (
    <FormField
      control={form.control}
      name="article"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            Article
            <span className="text-red-500">*</span>
          </FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button className="w-[200px] justify-between hover:bg-primary">
                {field.value
                  ? products.find(
                      (product: any) => product.name === field.value
                    )?.name || "Select a product"
                  : "Select a product"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search product..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No product found.</CommandEmpty>
                  <CommandGroup>
                    {products.map((product: any) => (
                      <CommandItem
                        key={product._id}
                        value={product.title}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue);
                          const selectedProduct = products.find(
                            (p: any) => p.name === currentValue
                          );
                          console.log(selectedProduct, "selectedProduct");
                          if (selectedProduct) {
                            form.setValue("name", selectedProduct.name);
                            form.setValue("title", selectedProduct.title);
                            form.setValue(
                              "startingPrice",
                              selectedProduct.price
                            );
                            form.setValue(
                              "image",
                              selectedProduct.images[0] || ""
                            );
                            setValue(selectedProduct._id);
                          }
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {product.images[0] && (
                            <div className="relative w-8 h-8 rounded overflow-hidden">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <span>{product.name}</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            field.value === product._id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription className="text-xs text-primary">
            <span className="text-black">*</span> if you select an article then
            the strating price and product name will be automatically filled{" "}
            <span className="text-black">*</span>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Tournament</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/tournament")}
          >
            Discard
          </Button>
          <Button type="submit" form="tournament-form" disabled={isPending}>
            {isPending ? "Creating..." : "Create Tournament"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="tournament-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information Section */}
            <div className="bg-white rounded-lg border p-6 col-span-2">
              <h2 className="text-lg font-semibold mb-6">Basic Information</h2>

              <div className="space-y-6">
                {productSelectField}

                <FormField
                  disabled={true}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Name
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Title
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Tournament title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="textForBanner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Banner Text
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Text for banner" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vip"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          VIP Tournament
                        </FormLabel>
                        <FormDescription>
                          Mark this tournament as VIP for special access
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Pricing & Numbers Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Pricing & Numbers</h2>

              <div className="space-y-6">
                <FormField
                  disabled={true}
                  control={form.control}
                  name="startingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Starting Price
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceReduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Price Reduction
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfPieces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Number of Pieces
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Game
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a game" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {games?.data?.games &&
                            games?.data?.games.map((game) => (
                              <SelectItem key={game._id} value={game._id}>
                                {game.game}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Tournament Settings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Tournament Settings
              </h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Length (minutes)
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Participation Fee
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numberOfParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Number of Participants
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resubmissions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Resubmissions
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">Date & Time</h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-1">
                        Start Date
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            disabled={(date) =>
                              form.getValues("end")
                                ? date > new Date(form.getValues("end")) ||
                                  date < new Date()
                                : date < new Date() ||
                                  date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem>
                      <TimePickerDemo
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(onchange) => {
                          field.onChange(onchange?.toISOString());
                        }}
                      />
                      <FormDescription className="text-xs text-primary">
                        <span className="text-black">*</span> The start date is
                        same as the end date then make sure the end time is
                        greater than the start time{" "}
                        <span className="text-black">*</span>
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex items-center gap-1">
                        End Date
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            disabled={(date) =>
                              form.getValues("start")
                                ? date < new Date(form.getValues("start")) ||
                                  date == new Date(form.getValues("start"))
                                : date < new Date() ||
                                  date < new Date("1900-01-01")
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem>
                      <TimePickerDemo
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(onchange) => {
                          field.onChange(onchange?.toISOString());
                        }}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* VIP & SEO Section */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">SEO Information</h2>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Meta Title
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="SEO title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Meta Description
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="SEO description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Meta Keywords
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="keyword1, keyword2, keyword3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TournamentCreateForm;
