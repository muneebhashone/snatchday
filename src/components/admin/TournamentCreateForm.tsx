"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useCreateTournament, useGetProducts } from "@/hooks/api";
import { toast } from "sonner";

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
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters"),
  title: z.string({ required_error: "Title is required" }).min(3, "Title must be at least 3 characters"),
  textForBanner: z.string({ required_error: "Banner text is required" }).min(3, "Banner text must be at least 3 characters"),
  metaTitle: z.string({ required_error: "Meta title is required" }).min(3, "Meta title must be at least 3 characters"),
  metaDescription: z.string({ required_error: "Meta description is required" }).min(3, "Meta description must be at least 3 characters"),
  metaKeywords: z.string({ required_error: "Meta keywords are required" }).min(3, "Meta keywords must be at least 3 characters"),
  article: z.string({ required_error: "Product selection is required" }).min(1, "Please select a product"),
  startingPrice: z.coerce.number({ required_error: "Starting price is required" }).min(0, "Starting price must be positive"),
  priceReduction: z.coerce.number({ required_error: "Price reduction is required" }).min(0, "Price reduction must be positive"),
  numberOfPieces: z.coerce.number({ required_error: "Number of pieces is required" }).min(1, "Number of pieces must be at least 1"),
  game: z.string({ required_error: "Game selection is required" }).min(1, "Game must be selected"),
  start: z.string({ required_error: "Start date is required" }).min(1, "Start date must be selected"),
  end: z.string({ required_error: "End date is required" }).min(1, "End date must be selected"),
  length: z.coerce.number({ required_error: "Length is required" }).min(1, "Length must be at least 1"),
  fee: z.coerce.number({ required_error: "Fee is required" }).min(0, "Fee must be positive"),
  numberOfParticipants: z.coerce.number({ required_error: "Number of participants is required" }).min(1, "Number of participants must be at least 1"),
  vip: z.boolean(),
  resubmissions: z.coerce.number({ required_error: "Resubmissions is required" }).min(0, "Resubmissions must be positive"),
  image: z.string(),
});

const TournamentCreateForm = ({productId}: {productId?: string}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  
  console.log(pathname, "pathname")
  const { mutate: createTournament, isPending } = useCreateTournament();
  const {data: getProducts} = useGetProducts();
  const products = getProducts?.data?.products || [];

  const product = getProducts?.data?.products?.find((product: any) => product._id === productId);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createTournament(values, {
        onSuccess: () => {
          toast.success("Tournament created successfully");
          queryClient.invalidateQueries({ queryKey: ['tournaments'] });
          form.reset();
          router.push("/admin/tournament");
        },
        onError: (error: Error) => {
          const errorMessage = error?.message || "Failed to create tournament";
          toast.error(errorMessage);
          console.error("Error creating tournament:", error);
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form");
    }
  };

  const productSelectField = pathname === "/admin/tournament/create-tournament" && (
    <FormField
      control={form.control}
      name="article"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            Select Product
            <span className="text-red-500">*</span>
          </FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              const selectedProduct = products.find((p: any) => p._id === value);
              if (selectedProduct) {
                form.setValue("name", selectedProduct.name);
                form.setValue("title", selectedProduct.title);
                form.setValue("startingPrice", selectedProduct.price);
                form.setValue("image", selectedProduct.images[0] || "");
              }
            }} 
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {products.map((product: any) => (
                <SelectItem 
                  key={product._id} 
                  value={product._id}
                  className="flex items-center gap-2"
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
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Tournament</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-6">
              {productSelectField}
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Name
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tournament name" {...field} />
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
            </div>

            {/* Pricing and Numbers */}
            <div className="space-y-6">
              <FormField
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
                      <Input type="number" placeholder="0.00" {...field} />
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
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Game and Tournament Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Game
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a game" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="powerblocks">PowerBlocks</SelectItem>
                      <SelectItem value="pushit">Push It</SelectItem>
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
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
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
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tournament Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Input type="number" placeholder="1" {...field} />
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
                    <Input type="number" placeholder="0.00" {...field} />
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
                    <Input type="number" placeholder="1" {...field} />
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
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* VIP Switch */}
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

          {/* SEO and Content */}
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
                    <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full hover:bg-primary" disabled={isPending}>
            {isPending ? "Creating..." : "Create Tournament"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TournamentCreateForm;