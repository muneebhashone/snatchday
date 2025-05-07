"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  useCreateSubscriptionPlan,
  useGetSubscriptionPlan,
  useUpdateSubscriptionPlan,
} from "@/hooks/api";
import { toast } from "sonner";
import { Loader, Plus, Save, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z
    .string()
    .min(1, "Description must be at least 1 characters")
    .max(100, "Description must be less than 300 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0.00"),
  interval: z.string().min(1, "Interval is required").refine(value => ["30 days", "3 months", "6 months", "12 months"].includes(value), "Interval must be either 30 days, 3 months, 6 months, or 12 months"),
  times: z.coerce.number().int().min(1, "Times must be a positive integer").optional(),
  features: z.array(
    z.object({ value: z.string().min(1, "Feature cannot be empty") })
  ),
  popular: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SubscriptionPackage {
  _id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  times: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionPlan {
  name: string;
  description: string;
  price: number;
  interval: string;
  times: number;
  features?: string[];
  popular?: boolean;
}

const PackagesForm = () => {
  const params = useParams();
  const router = useRouter();
  const isEditMode = Boolean(params.id);
  const packageId = params.id as string;

  const { mutate: createPackage, isPending: isCreatePending } =
    useCreateSubscriptionPlan();
  const { mutate: updatePackage, isPending: isUpdatePending } =
    useUpdateSubscriptionPlan();
  const { data: packagesData, isLoading } = useGetSubscriptionPlan();

  const [currentPackage, setCurrentPackage] =
    useState<SubscriptionPackage | null>(null);

  const isPending = isCreatePending || isUpdatePending;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      interval: "30 days",
      times: 1,
      features: [{ value: "" }],
      popular: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  useEffect(() => {
    if (isEditMode && packagesData && packageId) {
      const foundPackage = packagesData.data?.packages?.find(
        (pkg: SubscriptionPackage) => pkg._id === packageId
      );

      if (foundPackage) {
        setCurrentPackage(foundPackage);

        const featuresArray = foundPackage.features?.length
          ? foundPackage.features.map((feature) => ({ value: feature }))
          : [{ value: "" }];

        form.reset({
          name: foundPackage.name,
          description: foundPackage.description,
          price: foundPackage.price,
          interval: foundPackage.interval,
          times: foundPackage.times,
          features: featuresArray,
          popular: foundPackage.popular,
        });
      }
    }
  }, [isEditMode, packagesData, packageId, form]);

  const onSubmit = (values: FormValues) => {
    const subscriptionData: SubscriptionPlan = {
      popular: values.popular,
      name: values.name,
      description: values.description,
      price: values.price,
      interval: values.interval,
      times: values.times,
      features: values.features
        .map((feature) => feature.value)
        .filter((value) => value.trim() !== ""),
    };

    if (isEditMode && packageId) {
      updatePackage(
        {
          packageId,
          data: subscriptionData,
        },
        {
          onSuccess: () => {
            toast.success("Subscription package updated successfully");
            router.push("/admin/packages");
          },
          onError: (error: any) => {
            toast.error(
              error.response?.data?.message ||
                "Failed to update subscription package"
            );
            console.error("Error updating subscription package:", error);
          },
        }
      );
    } else {
      createPackage(subscriptionData, {
        onSuccess: () => {
          toast.success("Subscription package created successfully");
          router.push("/admin/packages");
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message ||
              "Failed to create subscription package"
          );
          console.error("Error creating subscription package:", error);
        },
      });
    }
  };

  if (isLoading && isEditMode) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode
            ? "Edit Subscription Package"
            : "Create Subscription Package"}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/packages")}
          >
            Discard
          </Button>
          <Button type="submit" form="package-form" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditMode ? "Update Package" : "Save Package"}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-6">Package Information</h2>

          <Form {...form}>
            <form
              id="package-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter package name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter package description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="mb-2 block">Features *</FormLabel>
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`features.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1 mb-0">
                            <FormControl>
                              <Input
                                placeholder={`Feature ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => remove(index)}
                        className="flex-shrink-0"
                        disabled={fields.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ value: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-6">Pricing & Settings</h2>

          <Form {...form}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          €
                        </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          className="pl-8"
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Interval *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing interval" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30 days">30 Days</SelectItem>
                        <SelectItem value="3 months">3 Months</SelectItem>
                        <SelectItem value="6 months">6 Months</SelectItem>
                        <SelectItem value="12 months">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="times"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycles *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        min={1}
                        onKeyDown={(e) => {
                          if (e.key === "-") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of times to bill the customer
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="popular"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel>Popular</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      If the package is popular, it will be highlighted on the
                      homepage.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PackagesForm;
