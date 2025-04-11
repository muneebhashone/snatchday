"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
    level: z.enum(["MAX", "MIN"]),
    score: z.enum(["MAX", "MIN"]),
    time: z.enum(["MAX", "MIN"]),
  }),
  levels: z.string().nonempty("Levels Must Be Required"),
  maxScore: z.string().nonempty("Max Score Must Be Required"),
  delay: z.string().nonempty("Levels Must Be Required"),
  randomLevels: z.boolean(),
  suitableDuel: z.boolean(),
  suitableTournament: z.boolean(),
  suitableTraining: z.boolean(),
  width: z.string().nonempty("width Must Be Required"),
  height: z.string().nonempty("height Must Be Required"),
  logo: z.instanceof(File),
  image: z.instanceof(File),
});

type IForm = z.infer<typeof FormSchema>;

const Page = () => {
  const { data: getPaths } = useGetGamesPaths();
  const Paths = getPaths?.data?.games;
  const { mutate: createGame,isPending } = UseCreateGame();
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
      } else if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : value.toString());
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
      <div>
        <h1 className="bg-primary px-4 py-1 text-white font-extrabold text-2xl w-max rounded-md">
          Create Your Game
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-3 gap-5 my-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="input title here..." {...field} />
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
                      <Textarea
                        placeholder="enter your content here.."
                        className="h-10"
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
                      <Input
                        placeholder="input Meta Title here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-5 my-5">
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="input Meta Description here..."
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
                      <Input
                        placeholder="input Meta Keywords here..."
                        {...field}
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
                    <FormLabel>Games</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-5 my-5">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="winnerDetermination"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Winner Determination</FormLabel>
                      <FormControl>
                        <div className="flex gap-5 justify-between">
                          <div className="w-full flex items-center gap-2">
                            <Label>Level:</Label>
                            <Select
                              value={field.value.level || ""}
                              onValueChange={(value) =>
                                field.onChange({ ...field.value, level: value })
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a level" />
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
                            <Label>Score:</Label>
                            <Select
                              value={field.value.score || ""}
                              onValueChange={(value) =>
                                field.onChange({ ...field.value, score: value })
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Score" />
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
                            <Label>Time:</Label>
                            <Select
                              value={field.value.time || ""}
                              onValueChange={(value) =>
                                field.onChange({ ...field.value, time: value })
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Time" />
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
              <FormField
                control={form.control}
                name="levels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Levels</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="input Levels here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5 my-5">
              <FormField
                control={form.control}
                name="maxScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Score</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="input Max Score here..."
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
                        placeholder="input delay here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="input width here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5 my-5">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="input height here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          id="image"
                          type="file"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-5 gap-5 mt-10 mb-5">
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Suitable Training
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Random Levels?
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-center mt-10">
              <Button
                className="bg-white text-primary border border-primary hover:bg-primary hover:text-white w-44 text-xl font-bold"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Game"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Page;
