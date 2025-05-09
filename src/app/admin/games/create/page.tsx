"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseCreateGame, useGetGamesPaths } from "@/hooks/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createImageSchema, imageInputProps } from "@/lib/imageValidation";
import { Switch } from "@/components/ui/switch";

export interface IError {
  response: {
    data: {
      message: string;
    };
  };
}

const FormSchema = z.object({
  title: z.string().nonempty("Title Must Be Required"),
  content: z.string().nonempty("Content Must Be Required"),
  metaTitle: z.string().nonempty("Meta Title Must Be Required"),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  game: z.string().nonempty("Game Must Be Required"),
  customGame: z.boolean(),
  winnerDetermination: z.object({
    level: z.enum(["MAX", "MIN"], {
      errorMap: () => ({ message: "Please select a level determination" }),
    }),
    score: z.enum(["MAX", "MIN"], {
      errorMap: () => ({ message: "Please select a score determination" }),
    }),
    time: z.enum(["MAX", "MIN"], {
      errorMap: () => ({ message: "Please select a time determination" }),
    }),
  }),
  levels: z.string().nonempty("Levels Must Be Required"),
  maxScore: z.string().nonempty("Max Score Must Be Required"),
  delay: z.string().nonempty("Delay Must Be Required"),
  randomLevels: z.boolean(),
  suitableDuel: z.boolean(),
  suitableTournament: z.boolean(),
  suitableTraining: z.boolean(),
  // width: z.string().nonempty("width Must Be Required"),
  // height: z.string().nonempty("height Must Be Required"),

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

  logo: createImageSchema("Logo"),
  image: createImageSchema("Image"),
});

type IForm = z.infer<typeof FormSchema>;

const Page = () => {
  const { data: getPaths } = useGetGamesPaths();
  const Paths = getPaths?.data?.games;
  const { mutate: createGame, isPending } = UseCreateGame();
  const router = useRouter();
  const form = useForm<IForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      game: "",
      customGame: false,
      winnerDetermination: { level: null, score: null, time: null },
      levels: "",
      maxScore: "",
      delay: "",
      randomLevels: false,
      suitableDuel: false,
      suitableTournament: false,
      suitableTraining: false,
      width: "",
      height: "",
      logo: undefined,
      image: undefined,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "winnerDetermination") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value instanceof File ? value : value.toString());
      } else {
        formData.delete(key);
      }
    });
    createGame(formData, {
      onSuccess: () => {
        toast.success("Game has been created successfully");
        form.reset();
        router.push("/admin/games");
      },
      onError: (error) => {
        console.log(error, "error");
        toast.error(
          `Error Occured ${(error as unknown as IError)?.response.data.message}`
        );
      },
    });

    console.log(data, "formdata");
  };

  return (
    <AdminLayout>
      <AdminBreadcrumb
        items={[{ title: "Games", href: "/admin/games" }]}
        title="Create New Game"
      />
      <div className="py-6 max-w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Game</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/admin/games")}
            >
              Discard
            </Button>
            <Button type="submit" form="game-form" disabled={isPending}>
              {isPending ? "Saving..." : "Save Game"}
            </Button>
          </div>
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
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a game" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="h-52">
                            <SelectGroup>
                              <SelectLabel>Paths</SelectLabel>
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
                    name="winnerDetermination.level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level Determination *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level determination" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MAX">Max</SelectItem>
                            <SelectItem value="MIN">Min</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="winnerDetermination.score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score Determination *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select score determination" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MAX">Max</SelectItem>
                            <SelectItem value="MIN">Min</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="winnerDetermination.time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Determination *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time determination" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MAX">Max</SelectItem>
                            <SelectItem value="MIN">Min</SelectItem>
                          </SelectContent>
                        </Select>
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
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Logo *</FormLabel>
                        <FormControl>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                              type="file"
                              {...imageInputProps}
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
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

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Image *</FormLabel>
                        <FormControl>
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Input
                              type="file"
                              {...imageInputProps}
                              onChange={(e) => onChange(e.target.files?.[0])}
                              {...field}
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
