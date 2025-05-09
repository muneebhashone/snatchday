"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Edit,
  Loader,
  AlertCircle,
} from "lucide-react";
import { useGetGames, useGetProducts, useManageTournament } from "@/hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { TimePickerDemo } from "../ui/TimePicker1";
// const formSchema = z.object({
//   id: z.string().min(1, "ID is required"),
//   name: z.string().min(3, "Name must be at least 3 characters"),
//   title: z.string().min(3, "Title must be at least 3 characters"),
//   textForBanner: z.string().min(3, "Banner text must be at least 3 characters"),
//   metaTitle: z.string().min(3, "Meta title must be at least 3 characters"),
//   metaDescription: z
//     .string()
//     .min(3, "Meta description must be at least 3 characters"),
//   metaKeywords: z
//     .string()
//     .min(3, "Meta keywords must be at least 3 characters"),
//   article: z.string().min(10, "Article must be at least 10 characters"),
//   startingPrice: z.coerce.number().min(0, "Starting price must be positive"),
//   priceReduction: z.coerce.number().min(0, "Price reduction must be positive"),
//   numberOfPieces: z.coerce
//     .number()
//     .min(1, "Number of pieces must be at least 1"),
//   game: z.string().min(1, "Game must be selected"),
//   start: z.string().min(1, "Start date must be selected"),
//   // end: z.string().min(1, "End date must be selected"),
//   length: z.coerce.number().min(1, "Length must be at least 1"),
//   fee: z.coerce.number().min(0, "Fee must be positive"),
//   numberOfParticipants: z.coerce
//     .number()
//     .min(1, "Number of participants must be at least 1"),
//   vip: z.boolean(),
//   resubmissions: z.coerce.number().min(0, "Resubmissions must be positive"),
// });
const formSchema = z.object({
  id: z.string().nonempty("ID is required"),
  name: z.string().nonempty("Name is required"),
  title: z.string().nonempty("Title is required"),
  textForBanner: z.string().nonempty("Banner text is required"),
  metaTitle: z.string().nonempty("Meta title is required"),
  metaDescription: z.string().nonempty("Meta description is required"),
  metaKeywords: z.string().nonempty("Meta keywords is required"),
  article: z.string().nonempty("Article is required"),
  startingPrice: z.coerce.number().min(1, "Starting price must be positive"),
  priceReduction: z.coerce.number().min(1, "Price reduction must be positive"),
  numberOfPieces: z.coerce
    .number()
    .min(1, "Number of pieces must be at least 1"),
  game: z.string().nonempty("Game is required"),
  start: z.string().nonempty("Start date is required"),
  end: z.string().nonempty("End date is required"),
  length: z.coerce.number().min(1, "Length must be at least 1"),
  fee: z.coerce.number().min(1, "Fee must be positive"),
  numberOfParticipants: z.coerce
    .number()
    .min(1, "Number of participants must be at least 1"),
  vip: z.boolean(),
  resubmissions: z.coerce.number().min(1, "Resubmissions must be positive"),
}).refine(
  (data) => {
    if (!data.startingPrice || !data.priceReduction) return true;
    return data.priceReduction <= data.startingPrice;
  },
  {
    message: "Price reduction cannot be greater than starting price",
    path: ["priceReduction"],
  }
);

interface Tournament {
  _id: string;
  name: string;
  title: string;
  textForBanner: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  article: string;
  startingPrice: number;
  priceReduction: number;
  numberOfPieces: number;
  game: object;
  start: string;
  end: string;
  length: number;
  fee: number;
  numberOfParticipants: number;
  vip: boolean;
  resubmissions: number;
  image: string;
}

export function EditTournamentDialog({
  tournament,
  products,
}: {
  tournament: Tournament;
  products: any[];
}) {
  console.log(tournament);
  const { data: games } = useGetGames(0, 100);
  const { mutate: manageTournament, isPending } = useManageTournament();
  const [value, setValue] = useState();
  const [open, setOpen] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const queryClient = useQueryClient();
  const findItem = products?.find(
    (pro) => pro._id === tournament.article
  )?.name;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    console.log(tournament);
    if (tournament) {
      form.reset({
        id: tournament._id,
        name: tournament?.name,
        title: tournament?.title,
        textForBanner: tournament?.textForBanner,
        metaTitle: tournament?.metaTitle,
        metaDescription: tournament?.metaDescription,
        metaKeywords: tournament?.metaKeywords,
        article: tournament?.article,
        startingPrice: tournament?.startingPrice,
        priceReduction: tournament?.priceReduction,
        numberOfPieces: tournament?.numberOfPieces,
        game: tournament?.game?._id,
        start: tournament?.start,
        end: tournament?.end,
        length: tournament?.length,
        fee: tournament?.fee,
        numberOfParticipants: tournament?.numberOfParticipants,
        vip: tournament?.vip,
        resubmissions: tournament?.resubmissions,
      });
    }
  }, [form, tournament]);

  async function onSubmit(values) {
    try {
      manageTournament(
        { data: { ...values, article: value } },
        {
          onSuccess: () => {
            toast.success("Tournament updated successfully");
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
            setOpen(false);
          },
          onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update tournament");
            console.error(error);
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update tournament");
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 [&::-webkit-scrollbar-track]:my-4">
        <DialogHeader>
          <DialogTitle>Edit Tournament</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tournament Information Section */}
              <div className="bg-white rounded-lg border p-6 col-span-2">
                <h2 className="text-lg font-semibold mb-6">Tournament Information</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="article"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">Article *</FormLabel>
                        <Popover open={openPop} onOpenChange={setOpenPop}>
                          <PopoverTrigger asChild>
                            <Button className="w-[200px] justify-between hover:bg-primary">
                              {findItem}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search product..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No product found.</CommandEmpty>
                                <CommandGroup className="overflow-y-scroll max-h-60">
                                  {products?.map((product: any) => (
                                    <CommandItem
                                      key={product._id}
                                      value={product.title}
                                      onSelect={(currentValue) => {
                                        field.onChange(currentValue);
                                        const selectedProduct = products.find(
                                          (p: any) => p.name === currentValue
                                        );
                                        if (selectedProduct) {
                                          form.setValue("name", selectedProduct.name);
                                          form.setValue("title", selectedProduct.title);
                                          form.setValue("startingPrice", selectedProduct.price);
                                          setValue(selectedProduct._id);
                                        }
                                        setOpenPop(false);
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input disabled {...field} />
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
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Banner Text *</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Game *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select game" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {games?.data?.games?.map((game) => (
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

              {/* Tournament Settings Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Tournament Settings</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="startingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Price *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled
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
                    name="priceReduction"
                    render={({ field }) => {
                      const startingPrice = form.watch('startingPrice');
                      return (
                        <FormItem>
                          <FormLabel>Price Reduction *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onKeyDown={(e) => {
                                if (e.key === "-") {
                                  e.preventDefault();
                                }
                              }}
                              className={field.value > startingPrice ? "border-destructive" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                          {field.value > startingPrice && (
                            <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Price reduction cannot be greater than starting price ({startingPrice})
                            </p>
                          )}
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfPieces"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Pieces *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                        <FormLabel>Fee *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tournament Schedule Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Tournament Schedule</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date *</FormLabel>
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
                          <PopoverContent className="w-auto p-0 z-[100]" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date?.toISOString())}
                              disabled={(date) => {
                                if (form.getValues("end")) {
                                  return (
                                    date > new Date(form.getValues("end")) ||
                                    date < new Date()
                                  );
                                }
                                return date < new Date();
                              }}
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
                        <FormLabel>Time *</FormLabel>
                        <TimePickerDemo
                          date={field.value ? new Date(field.value) : undefined}
                          setDate={(date) => {
                            field.onChange(date?.toISOString());
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (minutes) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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

              {/* Tournament Options Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Tournament Options</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="numberOfParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Participants *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                        <FormLabel>Resubmissions *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                    name="vip"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">VIP Tournament</FormLabel>
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
            </div>

            {/* SEO Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">SEO Information</h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title *</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Meta Description *</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
                      <FormLabel>Meta Keywords *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="article"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article *</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  "Update Tournament"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
