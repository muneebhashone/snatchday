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
  id: z.string().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  textForBanner: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  article: z.string().optional(),
  startingPrice: z.coerce.number().optional(),
  priceReduction: z.coerce.number().optional(),
  numberOfPieces: z.coerce.number().optional(),
  game: z.string().optional(),
  start: z.string().optional(),
  length: z.coerce.number().optional(),
  fee: z.coerce.number().optional(),
  numberOfParticipants: z.coerce.number().optional(),
  vip: z.boolean().optional(),
  resubmissions: z.coerce.number().optional(),
});

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
  const findItem = products?.find((pro) => pro._id === tournament.article)?.name;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
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
            setOpen(false);
          },
          onError: (error) => {
            toast.error("Failed to update tournament");
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Tournament</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="article"
                render={({ field }) => {
                  console.log(field.value);
                  return (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Article
                        <span className="text-red-500">*</span>
                      </FormLabel>

                      <Popover open={openPop} onOpenChange={setOpenPop}>
                        <PopoverTrigger asChild>
                          <Button className="w-[200px] justify-between hover:bg-primary">
                            {findItem}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search product..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No product found.</CommandEmpty>
                              <CommandGroup className="overflow-y-scroll max-h-60     ">
                                {products?.map((product: any) => (
                                  <CommandItem
                                    key={product._id}
                                    value={product.title}
                                    onSelect={(currentValue) => {
                                      field.onChange(currentValue);
                                      const selectedProduct = products.find(
                                        (p: any) => p.name === currentValue
                                      );
                                      console.log(
                                        selectedProduct,
                                        "selectedProduct"
                                      );
                                      if (selectedProduct) {
                                        form.setValue(
                                          "name",
                                          selectedProduct.name
                                        );
                                        form.setValue(
                                          "title",
                                          selectedProduct.title
                                        );
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
                  );
                }}
              />
              <FormField
                disabled={true}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Game</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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

              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
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
                    <FormLabel>Time</FormLabel>
                    <TimePickerDemo
                      date={field.value ? new Date(field.value) : undefined}
                      setDate={(onchange) => {
                        field.onChange(onchange?.toISOString());
                      }}
                    />
                  </FormItem>
                )}
              />
              <FormField
                disabled={true}
                control={form.control}
                name="startingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Price Reduction</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Number of Pieces</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Fee</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Number of Participants</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
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
                    <FormLabel>Resubmissions</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
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
                    <FormLabel>Meta Description</FormLabel>
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
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                disabled={isPending}
                className={`hover:bg-primary`}
                type="submit"
              >
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
