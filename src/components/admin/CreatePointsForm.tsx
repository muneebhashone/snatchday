'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreatePoints, useGetPoints } from "@/hooks/api"
import { toast } from "sonner"
import { useEffect } from "react"
import { points } from "@/types"
import { Facebook, Save, ThumbsUp, Users, DollarSign, Percent, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  facebookLike: z.number().min(0, "Points must be a positive number"),
  facebookShare: z.number().min(0, "Points must be a positive number"),
  referral: z.number().min(0, "Points must be a positive number"),
  facebookAppId: z.string().min(1, "Facebook App ID is required"),
  maxSnapPoints: z.number().min(0, "Maximum snap points must be a positive number"),
  maxDiscountPoints: z.number().min(0, "Maximum discount points must be a positive number"),
  maxWithdrawalAmount: z.number().min(0, "Maximum withdrawal amount must be a positive number"),
  minWithdrawalAmount: z.number().min(0, "Minimum withdrawal amount must be a positive number"),
  platformFee: z.number().min(0, "Platform fee must be a positive number"),
  snapPointsRatio: z.number().min(0, "Snap points ratio must be a positive number"),
})

type PointsFormValues = z.infer<typeof formSchema>

export function CreatePointsForm() {
  const { mutate: createPoints, isPending } = useCreatePoints()
  const { data: points, isLoading } = useGetPoints()

  const form = useForm<PointsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebookLike: 0,
      facebookShare: 0,
      referral: 0,
      facebookAppId: "",
      maxSnapPoints: 0,
      maxDiscountPoints: 0,
      maxWithdrawalAmount: 0,
      minWithdrawalAmount: 0,
      platformFee: 0,
      snapPointsRatio: 0,
    },
  })

  useEffect(() => {
    if (points?.data) {
      const pointsData = points.data;
      form.reset({
        facebookLike: pointsData.facebookLike,
        facebookShare: pointsData.facebookShare,
        referral: pointsData.referral,
        facebookAppId: pointsData.facebookAppId,
        maxSnapPoints: pointsData.maxSnapPoints,
        maxDiscountPoints: pointsData.maxDiscountPoints,
        maxWithdrawalAmount: pointsData.maxWithdrawalAmount,
        minWithdrawalAmount: pointsData.minWithdrawalAmount,
        platformFee: pointsData.platformFee,
        snapPointsRatio: pointsData.snapPointsRatio,
      } as PointsFormValues);
    }
  }, [points, form]);

  function onSubmit(values: PointsFormValues) {
    // Ensure all values are numbers except facebookAppId
    const submitData: points = {
      facebookLike: Number(values.facebookLike),
      facebookShare: Number(values.facebookShare),
      referral: Number(values.referral),
      facebookAppId: values.facebookAppId,
      maxSnapPoints: Number(values.maxSnapPoints),
      maxDiscountPoints: Number(values.maxDiscountPoints),
      maxWithdrawalAmount: Number(values.maxWithdrawalAmount),
      minWithdrawalAmount: Number(values.minWithdrawalAmount),
      platformFee: Number(values.platformFee),
      snapPointsRatio: Number(values.snapPointsRatio),
    };

    createPoints(submitData, {
      onSuccess: () => {
        toast.success("Points settings updated successfully")
      },
      onError: (error) => {
        toast.error("Failed to update points settings")
      },
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              <CardTitle>Social Media Settings</CardTitle>
            </div>
            <CardDescription>Configure points rewarded for social media interactions</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="facebookLike"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-blue-600" />
                      Facebook Like Points
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebookShare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      Facebook Share Points
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referral"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-600" />
                      Referral Points
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebookAppId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      Facebook App ID
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <CardTitle>Platform Limits</CardTitle>
            </div>
            <CardDescription>Configure maximum and minimum values for the platform</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="maxSnapPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Max Snap Points
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxDiscountPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Max Discount Points
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <CardTitle>Withdrawal Settings</CardTitle>
            </div>
            <CardDescription>Configure withdrawal limits and fees</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="maxWithdrawalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                      Max Withdrawal Amount
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minWithdrawalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                      Min Withdrawal Amount
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-orange-600" />
              <CardTitle>Fee Settings</CardTitle>
            </div>
            <CardDescription>Configure platform fees and conversion ratios</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="platformFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-orange-600" />
                      Platform Fee
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="snapPointsRatio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-orange-600" />
                      Snap Points Ratio
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2" disabled={isPending}>
            <Save className="h-4 w-4" />
            {isPending ? "Saving..." : "Save Points Settings"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 