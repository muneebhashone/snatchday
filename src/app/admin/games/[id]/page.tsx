"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { useGetGameById, useGetGamesPaths, useUpdateGame } from "@/hooks/api";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { createImageSchema, imageInputProps } from "@/lib/imageValidation";
import { Switch } from "@/components/ui/switch";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const FormSchema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  metaTitle: z.string().nonempty("Meta Title is required"),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  game: z.string().nonempty("Game is required"),
  levels: z.string().nonempty("Levels are required"),
  maxScore: z.string().nonempty("max score is required"),
  delay: z.string().nonempty("delay is required"),
  width: z
    .string()
    .nonempty("Width is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 500 && num <= 1000;
    }, "Width must be between 500 and 1000"),
  height: z
    .string()
    .nonempty("Height is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 500 && num <= 1000;
    }, "Height must be between 500 and 1000"),
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
  logo: createImageSchema("Logo").optional(),
  image: createImageSchema("Image").optional(),
});

type IForm = z.infer<typeof FormSchema>;

const Page = () => {
  const { data: getPaths } = useGetGamesPaths();
  const Paths = getPaths?.data?.games;
  const queryClient = new QueryClient();
  const params = useParams();
  const router = useRouter();
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
      <AdminBreadcrumb
        items={[{ title: "Games", href: "/admin/games" }]}
        title="Edit Game"
      />
      <div className="py-6 max-w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Game</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/games")}
            >
              Discard
            </Button>
            <Button type="submit" form="game-form" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Game Preview Card */}
        <div className="mb-8">
          <Card className="bg-white p-6">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={game?.data.logo}
                  alt={game?.data.title}
                  width={80}
                  height={80}
                  unoptimized
                  className="rounded-lg object-contain"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {game?.data.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Created on: {game?.data.createdAt?.split("T")[0]}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Form {...form}>
          <form
            id="game-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border p-6 col-span-2">
                <h2 className="text-lg font-semibold mb-6">
                  Basic Information
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Game title" {...field} />
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
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Game content" {...field} />
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
                        <FormLabel>Game Path *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={game?.data?.game}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a game" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Game Configuration Section */}
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">
                  Game Configuration
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="levels"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Levels *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Number of levels"
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
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
                        <FormLabel>Max Score *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Maximum score"
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
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
                        <FormLabel>Delay *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Game delay"
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
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

            {/* Winner Determination & Dimensions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">
                  Winner Determination
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="winnerDetermination"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <label className="min-w-20 text-sm font-medium">
                                Level:
                              </label>
                              <Select
                                value={field?.value?.level}
                                onValueChange={(value) =>
                                  field.onChange({
                                    ...field.value,
                                    level: value,
                                  })
                                }
                                defaultValue={
                                  game?.data?.winnerDetermination?.level
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="MAX">Max</SelectItem>
                                  <SelectItem value="MIN">Min</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center gap-4">
                              <label className="min-w-20 text-sm font-medium">
                                Score:
                              </label>
                              <Select
                                value={field?.value?.score}
                                onValueChange={(value) =>
                                  field.onChange({
                                    ...field.value,
                                    score: value,
                                  })
                                }
                                defaultValue={
                                  game?.data?.winnerDetermination?.score
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select score" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="MAX">Max</SelectItem>
                                  <SelectItem value="MIN">Min</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center gap-4">
                              <label className="min-w-20 text-sm font-medium">
                                Time:
                              </label>
                              <Select
                                value={field?.value?.time}
                                onValueChange={(value) =>
                                  field.onChange({
                                    ...field.value,
                                    time: value,
                                  })
                                }
                                defaultValue={
                                  game?.data?.winnerDetermination?.time
                                }
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="MAX">Max</SelectItem>
                                  <SelectItem value="MIN">Min</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Game Dimensions</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Game width (500-1000)"
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
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
                        <FormLabel>Height *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Game height (500-1000)"
                            onKeyDown={(e) => {
                              if (e.key === "-") {
                                e.preventDefault();
                              }
                            }}
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

            {/* Game Options & Media */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Game Options</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customGame"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Custom Game
                          </FormLabel>
                          <FormDescription>
                            Is this a custom game?
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

                  <FormField
                    control={form.control}
                    name="randomLevels"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Random Levels
                          </FormLabel>
                          <FormDescription>
                            Enable random level generation?
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

                  <FormField
                    control={form.control}
                    name="suitableDuel"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Suitable for Duel
                          </FormLabel>
                          <FormDescription>
                            Can this game be used in duels?
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

                  <FormField
                    control={form.control}
                    name="suitableTournament"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Suitable for Tournament
                          </FormLabel>
                          <FormDescription>
                            Can this game be used in tournaments?
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

                  <FormField
                    control={form.control}
                    name="suitableTraining"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Suitable for Training
                          </FormLabel>
                          <FormDescription>
                            Can this game be used in training?
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

              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-6">Media Files</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Logo *</FormLabel>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Input
                                type="file"
                                {...imageInputProps}
                                onChange={(e) =>
                                  field.onChange(e.target.files?.[0])
                                }
                              />
                              <p className="text-xs text-muted-foreground">
                                Accepted formats: JPG, PNG, GIF, WebP
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {game?.data.logo && (
                      <div className="flex-shrink-0">
                        <Image
                          src={game.data.logo}
                          alt="Current logo"
                          width={60}
                          height={60}
                          className="rounded-md object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Image *</FormLabel>
                          <FormControl>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Input
                                type="file"
                                {...imageInputProps}
                                onChange={(e) =>
                                  field.onChange(e.target.files?.[0])
                                }
                              />
                              <p className="text-xs text-muted-foreground">
                                Accepted formats: JPG, PNG, GIF, WebP
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {game?.data.image && (
                      <div className="flex-shrink-0">
                        <Image
                          src={game.data.image}
                          alt="Current image"
                          width={60}
                          height={60}
                          className="rounded-md object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Information */}
            <div className="grid grid-cols-1 gap-6">
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
                          <Input placeholder="SEO meta title" {...field} />
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
                          <Textarea
                            placeholder="SEO meta description"
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
                          <Input placeholder="SEO meta keywords" {...field} />
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
    </AdminLayout>
  );
};

export default Page;
