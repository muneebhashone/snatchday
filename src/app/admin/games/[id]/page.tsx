"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { useGetGameById } from "@/hooks/api";
import {
  Calendar,
  Gamepad2,
  Gamepad2Icon,
  Info,
  Plus,
  RefreshCcw,
  User,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  metaTitle: z.string().nonempty("Meta Title is required"),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  path: z.string().nonempty("Path is required"),
  levels: z.string().nonempty("Levels are required"),
  maxScore: z.string().optional(),
  delay: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  customGame: z.boolean(),
  randomLevels: z.boolean(),
  suitableDuel: z.boolean(),
  suitableTournament: z.boolean(),
  suitableTraining: z.boolean(),
  winnerDetermination: z.object({
    level: z.enum(["MAX", "MIN"]),
    score: z.enum(["MAX", "MIN"]),
    time: z.enum(["MAX", "MIN"]),
  }),
  logo: z.instanceof(File).optional(),
  image: z.instanceof(File).optional(),
});

type IForm = z.infer<typeof FormSchema>;

const Page = () => {
  const params = useParams();
  const paramsId = params.id;
  const { data: game } = useGetGameById(paramsId);
  console.log(game);

  const form = useForm<IForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: game?.data.title || "",
      content: game?.data.content || "",
      metaTitle: game?.data.metaTitle || "",
      metaDescription: game?.data.metaDescription || "",
      metaKeywords: game?.data.metaKeywords || "",
      path: game?.data.path || "",
      levels: game?.data.levels || "",
      maxScore: game?.data.maxScore || "",
      delay: game?.data.delay || "",
      width: game?.data.width || "",
      height: game?.data.height || "",
      customGame: game?.data.customGame || false,
      randomLevels: game?.data.randomLevels || false,
      suitableDuel: game?.data.suitableDuel || false,
      suitableTournament: game?.data.suitableTournament || false,
      suitableTraining: game?.data.suitableTraining || false,
      winnerDetermination: {
        level: game?.data.winnerDetermination?.level || "MAX",
        score: game?.data.winnerDetermination?.score || "MAX",
        time: game?.data.winnerDetermination?.time || "MAX",
      },
      logo: undefined,
      image: undefined,
    },
  });

  useEffect(() => {
    if (game?.data) {
      form.reset({
        title: game?.data.title,
        content: game?.data.content,
        metaTitle: game?.data.metaTitle,
        metaDescription: game?.data.metaDescription,
        metaKeywords: game?.data.metaKeywords,
        path: game?.data.path,
        levels: game?.data.levels,
        maxScore: game?.data.maxScore,
        delay: game?.data.delay,
        width: game?.data.width,
        height: game?.data.height,
        customGame: game?.data.customGame,
        randomLevels: game?.data.randomLevels,
        suitableDuel: game?.data.suitableDuel,
        suitableTournament: game?.data.suitableTournament,
        suitableTraining: game?.data.suitableTraining,
        winnerDetermination: {
          level: game?.data.winnerDetermination?.level,
          score: game?.data.winnerDetermination?.score,
          time: game?.data.winnerDetermination?.time,
        },
        logo: game?.data.logo,
        image: game?.data.image,
      });
    }
  }, [form, game?.data]);

  const onSubmit = (data: IForm) => {
    console.log(data);
    toast.success("Game updated successfully!");
  };

  return (
    <AdminLayout>
      <div>
        <div className="grid grid-cols-2 gap-4">
          {/* game details */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <Info />
              <h1 className="font-bold text-primary">Game details</h1>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <div className="bg-primary p-2 rounded-sm">
                    <Gamepad2 className="text-white" size={15} />
                  </div>
                  <p className="text-primary">{game?.data.title}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="bg-primary p-2 rounded-sm">
                    <Calendar className="text-white" size={15} />
                  </div>
                  <p>{game?.data.createdAt?.split("T")[0]}</p>
                </div>
              </div>
              <Image
                src={game?.data.logo}
                alt={game?.data.title}
                width={60}
                height={60}
                unoptimized
                className="rounded-md object-contain"
              />
            </div>
          </Card>
          {/* options */}
          <Card className="py-2 px-4 flex flex-col gap-2 shadow-md">
            <div className="flex gap-4 items-center pb-1 border-b">
              <Info />
              <h1 className="font-bold text-primary">Options</h1>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <RefreshCcw className="text-white" size={15} />
              </div>
              <p>Update Game</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-primary p-2 rounded-sm">
                <Plus className="text-white" size={15} />
              </div>
              <p>Add DLC</p>
            </div>
          </Card>
        </div>

        <h1 className="flex gap-2 items-center bg-primary p-2 w-max text-xl font-bold text-white rounded-md mt-10">
          <span className="bg-white text-primary rounded-full p-1">
            <Gamepad2Icon />
          </span>
          Update The Game
        </h1>
        {/* Update Game Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            <div className="grid md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={field.value}
                        placeholder="Enter title..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter content..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meta title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meta description..."
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
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meta keywords..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Path</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter path..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <FormField
                control={form.control}
                name="levels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Levels</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter levels..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Score</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter max score..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="delay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delay</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter delay..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-4 gap-5 mt-5">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter width..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter height..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="winnerDetermination"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Winner Determination</FormLabel>
                    <FormControl>
                      <div className="flex gap-5">
                        <div className="w-full flex items-center gap-2">
                          <label className="text-sm font-medium">Level:</label>
                          <Select
                            value={field.value.level}
                            onValueChange={(value) =>
                              field.onChange({ ...field.value, level: value })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Level</SelectLabel>
                                <SelectItem value="MAX">Max</SelectItem>
                                <SelectItem value="MIN">Min</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full flex items-center gap-2">
                          <label className="text-sm font-medium">Score:</label>
                          <Select
                            value={field.value.score}
                            onValueChange={(value) =>
                              field.onChange({ ...field.value, score: value })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Score" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Score</SelectLabel>
                                <SelectItem value="MAX">Max</SelectItem>
                                <SelectItem value="MIN">Min</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full flex items-center gap-2">
                          <label className="text-sm font-medium">Time:</label>
                          <Select
                            value={field.value.time}
                            onValueChange={(value) =>
                              field.onChange({ ...field.value, time: value })
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Time</SelectLabel>
                                <SelectItem value="MAX">Max</SelectItem>
                                <SelectItem value="MIN">Min</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-4 gap-5 mt-5">
              <div className="col-span-2 flex items-start gap-2">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Input
                            id="image"
                            type="file"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Image
                  className="object-contain"
                  unoptimized
                  src={game?.data.image}
                  alt={game?.data.title}
                  width={70}
                  height={70}
                />
              </div>
              <div className="col-span-2 flex items-start gap-2">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Input
                            id="logo"
                            type="file"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Image
                  className="object-contain"
                  unoptimized
                  src={game?.data.logo}
                  alt={game?.data.title}
                  width={70}
                  height={70}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-5 gap-5 mt-10 mb-5">
              <FormField
                control={form.control}
                name="customGame"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customGame"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="customGame"
                          className="text-sm font-medium leading-none"
                        >
                          Custom Game?
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="randomLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="randomLevels"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="randomLevels"
                          className="text-sm font-medium leading-none"
                        >
                          Random Levels?
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="suitableDuel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="suitableDuel"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="suitableDuel"
                          className="text-sm font-medium leading-none"
                        >
                          Suitable Duel?
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="suitableTournament"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="suitableTournament"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="suitableTournament"
                          className="text-sm font-medium leading-none"
                        >
                          Suitable Tournament?
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="suitableTraining"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="suitableTraining"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="suitableTraining"
                          className="text-sm font-medium leading-none"
                        >
                          Suitable Training?
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center mt-8">
              <Button type="submit" className="bg-primary text-white">
                Update Game
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Page;
