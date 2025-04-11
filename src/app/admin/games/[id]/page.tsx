"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { useGetGameById, useGetGamesPaths, useUpdateGame } from "@/hooks/api";
import {
  Calendar,
  Gamepad2,
  Gamepad2Icon,
  Info,
  Key,
  Loader,
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
import { QueryClient } from "@tanstack/react-query";
import { IError } from "../create/page";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  metaTitle: z.string().nonempty("Meta Title is required"),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  game: z.string().nonempty("Game is required"),
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
  const { data: getPaths } = useGetGamesPaths();
  const Paths = getPaths?.data?.games;
  const queryClient = new QueryClient();
  const params = useParams();
  const paramsId = params.id;
  const { mutate: UpdateGame, isPending } = useUpdateGame(paramsId);
  const { data: game } = useGetGameById(paramsId);
  const form = useForm<IForm>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (game?.data) {
      const stringifiedData = {
        ...game.data,
        levels: String(game.data.levels || ""),
        height: String(game.data.height || ""),
        delay: String(game.data.delay || ""),
        maxScore: String(game.data.maxScore || ""),
        width: String(game.data.width || ""),
      };
      form.reset({
        title: stringifiedData.title,
        content: stringifiedData.content,
        metaTitle: stringifiedData.metaTitle,
        metaDescription: stringifiedData.metaDescription,
        metaKeywords: stringifiedData.metaKeywords,
        game: stringifiedData?.game,
        levels: stringifiedData.levels,
        maxScore: stringifiedData.maxScore,
        delay: stringifiedData.delay,
        width: stringifiedData.width,
        height: stringifiedData.height,
        customGame: stringifiedData.customGame,
        randomLevels: stringifiedData.randomLevels,
        suitableDuel: stringifiedData.suitableDuel,
        suitableTournament: stringifiedData.suitableTournament,
        suitableTraining: stringifiedData.suitableTraining,
        winnerDetermination: {
          level: stringifiedData?.winnerDetermination?.level,
          score: stringifiedData?.winnerDetermination?.score,
          time: stringifiedData?.winnerDetermination?.time,
        },
        logo: undefined,
        image: undefined,
      });
    }
  }, [form, game?.data, Paths, game, UpdateGame]);

  const onSubmit = (data: IForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "winnerDetermination") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : value.toString());
      }
    });

    UpdateGame(formData, {
      onSuccess: () => {
        toast.success("Game Has Been Updated Successfully");
        queryClient.invalidateQueries({ queryKey: ["game"] });
        form.reset();
        window.location.href = "/admin/games";
      },
      onError: (error) => {
        toast.error((error as unknown as IError)?.response.data.message);
      },
    });
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
                      {/* <Input placeholder="Enter content..." {...field} /> */}
                      <Textarea
                        placeholder="enter your content here..."
                        {...field}
                      />
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
                name="game"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="Enter path..." {...field} /> */}
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={game?.data?.game}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Game" />
                        </SelectTrigger>
                        <SelectContent className="h-52">
                          <SelectGroup>
                            <SelectLabel>Games</SelectLabel>
                            {Paths?.map((path, i) => (
                              <SelectItem key={i} value={path}>
                                {path}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                      <Input
                        type="number"
                        placeholder="Enter levels..."
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Enter max score..."
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Enter delay..."
                        {...field}
                      />
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
                      <Input
                        type="number"
                        placeholder="Enter width..."
                        {...field}
                      />
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
                            value={field?.value?.level}
                            onValueChange={(value) =>
                              field.onChange({ ...field.value, level: value })
                            }
                            defaultValue={
                              game?.data?.winnerDetermination?.level
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
                            value={field?.value?.score}
                            onValueChange={(value) =>
                              field.onChange({ ...field.value, score: value })
                            }
                            defaultValue={game?.data.winnerDetermination?.score}
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
                            value={field?.value?.time}
                            onValueChange={(value) =>
                              field.onChange({ ...field.value, time: value })
                            }
                            defaultValue={game?.data.winnerDetermination?.time}
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
                            onChange={
                              (e) => field.onChange(e.target.files?.[0])
                              // console.log(e.target.files?.[0])
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
                            onChange={
                              (e) => field.onChange(e.target.files[0])
                              // console.log(e.target.files[0])
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
            <div className="flex justify-start items-center mt-14">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-primary text-white"
              >
                {isPending ? (
                  <Loader className="animate-spin text-primary" size={18} />
                ) : (
                  "Update Game"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Page;
