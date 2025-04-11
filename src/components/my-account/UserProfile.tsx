"use client";
import React, { useEffect, useState } from "react";
import { Loader2, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import VipMembershipModal from "./VipMembershipModal";
import CollectPointsModal from "./CollectPointsModal";
import {
  useGetMyProfile,
  useMyAccountGames,
  useUpdateProfile,
} from "@/hooks/api";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/context/userContext";
import { createImageSchema, imageInputProps } from "@/lib/imageValidation";

const profileSchema = z.object({
  salutation: z.string().nonempty("Salutation is required"),
  title: z.string().optional(),
  username: z.string().nonempty("Username is required"),
  lastName: z.string().nonempty("Last name is required"),
  firstName: z.string().nonempty("First name is required"),
  street: z.string().optional(),
  zip: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  // federalState: z.string().nonempty("Federal state is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  image: createImageSchema("Profile image").optional(),
});

const UserProfile = () => {
  const { data: myAccountGame } = useMyAccountGames();
  console.log(myAccountGame);
  const { user, setUserData } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const { data: myProfile, isLoading, refetch } = useGetMyProfile();
  const Profile = myProfile?.data?.user;

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const formData = new FormData();
      formData.append("image", file);
      updateProfile(formData, {
        onSuccess: (data: any) => {
          setUserData({ ...user, image: data?.image });

          toast.success("Profile picture updated successfully");
          refetch();
        },
        onError: (error: any) => {
          toast.error(error.response.data.message || "Something went wrong");
        },
      });
    }
  };

  const onSubmit = async (profileData: z.infer<typeof profileSchema>) => {
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) =>
      formData.append(key, value || "")
    );
    await updateProfile(formData, {
      onSuccess: () => {
        refetch();

        toast.success("Profile updated successfully");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message || "Something went wrong");
      },
    });
  };

  useEffect(() => {
    if (myProfile?.data?.user) {
      reset({
        salutation: myProfile.data.user.salutation,
        title: myProfile.data.user.title,
        username: myProfile.data.user.username || myProfile.data.user.name,
        lastName: myProfile.data.user.lastName,
        firstName: myProfile.data.user.firstName,
        street: myProfile.data.user.street,
        zip: myProfile.data.user.zip,
        location: myProfile.data.user.location,
        country: myProfile.data.user.country,
        // federalState: myProfile.data.user.federalState,
        email: myProfile.data.user.email,
      });
    }
  }, [myProfile, reset]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin size-10" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">MY PROFILE</h2>

            <div className="flex flex-col items-start justify-between mb-8 gap-8">
              {/* Profile Information */}
              <div className="w-full flex items-start justify-between gap-12 p-6 bg-gray-50 rounded-xl">
                {/* Profile Image */}
                <div className="flex flex-col items-center relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-gray-100 shadow-sm flex items-center justify-center">
                    {isPending ? (
                      <Loader2 className="animate-spin size-10" />
                    ) : myProfile?.data?.user?.image ? (
                      <Image
                        src={myProfile.data.user.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    ) : selectedImage ? (
                      <>
                        <Image
                          src={URL.createObjectURL(selectedImage)}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          width={128}
                          height={128}
                        />
                        <button
                          className="absolute z-10 top-0 bg-orange-500 right-4 rounded-full p-1 shadow-md"
                          onClick={() => setSelectedImage(null)}
                        >
                          <X className="size-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <button
                    className="text-primary hover:text-primary mt-3 text-sm font-medium"
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                  >
                    Change Profile Picture
                  </button>
                  <input
                    id="file-input"
                    type="file"
                    {...imageInputProps}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Accepted formats: JPG, PNG, GIF, WebP
                  </p>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold capitalize ">
                      {myProfile?.data?.user?.username || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M3.62 8.49C5.59 -0.169998 18.42 -0.159998 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39 20.54C5.63 17.88 2.47 13.57 3.62 8.49Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span>
                      {Profile?.street} {Profile?.zip} {Profile?.location}{" "}
                      {Profile?.country}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">
                          Customer number:
                        </span>
                        <span className="text-gray-900">
                          {Profile?.customerNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">
                          Group:
                        </span>
                        <span className="bg-primary rounded-full px-3 text-white text-center font-bold">
                          {myProfile?.data?.user?.group}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">
                          Registered on:
                        </span>
                        <span className="text-gray-900">
                          {formatDate(myProfile?.data?.user?.createdAt) ||
                            "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">
                          Snap points:
                        </span>
                        <span className="text-gray-900">
                          {myProfile?.data?.wallet?.snapPoints}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">
                          Discount points:
                        </span>
                        <span className="text-gray-900">
                          {myProfile?.data?.wallet?.discountPoints}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600 font-medium">
                          Last online:
                        </span>
                        <span className="text-gray-900">
                          {formatDate(myProfile?.data?.user?.user?.lastLogin) ||
                            "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <VipMembershipModal />
                    <CollectPointsModal />
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="game-statistics" className="w-full mt-8">
                <TabsList className="w-full">
                  <TabsTrigger
                    value="game-statistics"
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    GAME STATISTICS
                  </TabsTrigger>
                  <TabsTrigger
                    value="top-up"
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    TOP UP/WITHDRAW CREDIT
                  </TabsTrigger>
                  <TabsTrigger
                    value="profile"
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    PROFILE
                  </TabsTrigger>
                  <TabsTrigger
                    value="tickets"
                    className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    MY TICKETS
                  </TabsTrigger>
                </TabsList>

                {/* Game Statistics Content */}
                <TabsContent value="game-statistics" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        GRAB YOUR BARGAIN
                      </h3>
                      <p className="text-card-foreground mb-4 font-medium">
                        You can purchase your winning product at the reduced
                        price within 24 hours of the tournament. After that, the
                        claim expires and the product will be offered at the
                        regular price again.
                      </p>
                      <p className="text-xl font-semibold mb-6">
                        You have not won any items yet
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="font-medium text-card-foreground">
                          {`Tournaments played: ${myAccountGame?.data?.tournamentsPlayed}`}
                        </p>
                        <p className="font-medium text-card-foreground">
                          {`Duels played: ${myAccountGame?.data?.duelsPlayed}`}
                        </p>
                        <p className="font-medium text-card-foreground">
                          You have {myProfile?.data?.wallet?.snapPoints} snap
                          points
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-card-foreground">
                          Tournaments won: {myAccountGame?.data?.tournamentsWon}
                        </p>
                        <p className="font-medium text-card-foreground">
                          Duels won: {myAccountGame?.data?.duelsWon}
                        </p>
                        <p className="font-medium text-card-foreground">
                          You have {myProfile?.data?.wallet?.discountPoints}{" "}
                          discount points
                        </p>
                      </div>
                      <div className="text-start space-y-2 col-span-2">
                        <p className="font-medium text-card-foreground">
                          Games played in the training center:{" "}
                          {myAccountGame?.data?.trainingCount}
                        </p>
                        <p className="font-medium text-card-foreground">
                          Tournaments won in the current month:{" "}
                          {myAccountGame?.data?.tournamentsWon}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Top Up/Withdraw Credit Content */}
                <TabsContent value="top-up" className="mt-6">
                  <div className="space-y-8">
                    {/* Recharge Credit Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Recharge Credit
                      </h3>
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <Label
                            htmlFor="recharge-amount"
                            className="text-card-foreground font-medium"
                          >
                            Amount *
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="5.00" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5.00 €</SelectItem>
                              <SelectItem value="10">10.00 €</SelectItem>
                              <SelectItem value="20">20.00 €</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="bg-primary">CHECKOUT</Button>
                      </div>
                    </div>

                    {/* Payout Credit Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        Payout credit
                      </h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div>
                            <Label
                              htmlFor="payout-amount"
                              className="text-card-foreground font-medium"
                            >
                              Amount *
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                type="text"
                                id="payout-amount"
                                defaultValue="5.00"
                              />
                              <span className="flex items-center font-bold">
                                €
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <Label className="text-foreground font-medium">
                              Choose a payment method:
                            </Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bank">
                                  Bank Transfer
                                </SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-card-foreground font-medium">
                            Withdrawal fee:
                          </span>
                          <span className="text-card-foreground font-medium">
                            1.00 €
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-card-foreground font-medium">
                            The amount to be deducted from your balance:
                          </span>
                          <span className="text-card-foreground font-medium">
                            6.00 €
                          </span>
                        </div>

                        <div className="flex justify-end">
                          <Button>OK</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Profile Content */}
                <TabsContent value="profile" className="mt-6 mb-12">
                  <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          Salutation *
                        </Label>
                        <Controller
                          name="salutation"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Salutation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mr">Mister</SelectItem>
                                <SelectItem value="mrs">Mrs</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.salutation && (
                          <span className="text-red-500">
                            {errors.salutation.message}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          Title
                        </Label>
                        <Controller
                          name="title"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="-- Please select --" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dr">Dr.</SelectItem>
                                <SelectItem value="prof">Prof.</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground font-medium text-lg">
                        Username *
                      </Label>
                      <Input {...register("username")} />
                      {errors.username && (
                        <span className="text-red-500">
                          {errors.username.message}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          First name *
                        </Label>
                        <Input {...register("firstName")} />
                        {errors.firstName && (
                          <span>{errors.firstName.message}</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          Last name *
                        </Label>
                        <Input {...register("lastName")} />
                        {errors.lastName && (
                          <span className="text-red-500">
                            {errors.lastName.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground font-medium text-lg">
                        Street *
                      </Label>
                      <Input {...register("street")} />
                      {errors.street && (
                        <span className="text-red-500">
                          {errors.street.message}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          Zip code *
                        </Label>
                        <Input {...register("zip")} defaultValue="" />
                        Last
                        {errors.zip && (
                          <span className="text-red-500">
                            {errors.zip.message}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          Location *
                        </Label>
                        <Input
                          {...register("location")}
                          defaultValue="Berlin"
                        />
                        {errors.location && (
                          <span className="text-red-500">
                            {errors.location.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium text-lg">
                          Country *
                        </Label>
                        <Select {...register("country")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Germany" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="at">Austria</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <span className="text-red-500">
                            {errors.country.message}
                          </span>
                        )}
                      </div>
                      {/* <div className="space-y-2">
                  <Label className="text-foreground font-medium text-lg">Federal State *</Label>
                  <Controller
                    name="federalState"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Federal State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="berlin">Berlin</SelectItem>
                          <SelectItem value="hamburg">Hamburg</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.federalState && <span className="text-red-500">{errors.federalState.message}</span>}
                </div> */}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground font-medium text-lg">
                        E-mail *
                      </Label>
                      <Input
                        {...register("email")}
                        defaultValue="testen@tester.de"
                      />
                      {errors.email && (
                        <span className="text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" />
                      <label
                        htmlFor="newsletter"
                        className="text-card-foreground font-medium"
                      >
                        Yes, I would like to be informed about tournaments,
                        special offers and news and subscribe to the newsletter
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-4 mt-6">
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-primary"
                      >
                        {" "}
                        {isPending ? "Saving..." : "SAVE"}
                      </Button>
                      <Button variant="outline">CHANGE PASSWORD</Button>
                      <Button variant="destructive">DELETE ACCOUNT</Button>
                    </div>
                  </form>
                </TabsContent>

                {/* My Tickets Content */}
                <TabsContent value="tickets" className="mt-6">
                  <div className="text-center text-gray-500">
                    No tickets available
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
