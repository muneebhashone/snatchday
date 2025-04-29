"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Loader, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetCustomerById, useUpdateCustomer } from "@/hooks/api";
import { useEffect } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  salutation: z.string().optional(),
  title: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  street: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email("Invalid email format"),
  approved: z.boolean().optional(),
  phone: z.string().optional(),
  dob: z.date().optional(),
});

type IForm = z.infer<typeof formSchema>;

export default function CustomerForm({
  onClose,
}: {
  onClose: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const params = useParams();
  const paramsId = params.id;
  const { data: customer } = useGetCustomerById(paramsId);
  const customerData = customer?.data.customer;
  const { mutate: updateCustomer, isPending } = useUpdateCustomer(paramsId);
  console.log(customerData, "datacustomer");

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salutation: customerData?.salutation || "Mister",
      title: customerData?.title || "Dr.",
      name: customerData?.username || "",
      firstName: customerData?.firstName || "",
      lastName: customerData?.lastName || "",
      street: customerData?.street || "",
      location: customerData?.location || "",
      country: customerData?.country || "Germany",
      email: customerData?.email || "",
      approved: customerData?.approved || false,
      phone: customerData?.phone || "",
      dob: customerData?.dob || "",
    },
  });

  useEffect(() => {
    if (customerData) {
      form.reset({
        salutation: customerData?.salutation || "Mister",
        title: customerData?.title || "Dr.",
        name: customerData?.name || "",
        firstName: customerData?.firstName || "",
        lastName: customerData?.lastName || "",
        street: customerData?.street || "",
        location: customerData?.location || "",
        country: customerData?.country || "Germany",
        email: customerData?.email || "",
        approved: customerData?.approved || false,
      });
    }
  }, [customerData, form]);

  const onSubmitted = (values: any) => {
    const cleanedValues = JSON.parse(
      JSON.stringify(values, (key, value) => {
        return value === "" || value === null ? undefined : value;
      })
    );
    updateCustomer(cleanedValues, {
      onSuccess: () => {
        toast.success("customer updated successfully");
        onClose(false);
        window.location.reload();
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to update customer"
        );
        console.log(error, "error on customer update");
      },
    });
  };

  return (
    <div className="py-6 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Update Customer</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/customers")}
          >
            Cancel
          </Button>
          <Button type="submit" form="customer-form" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Customer
              </>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="customer-form"
          onSubmit={form.handleSubmit(onSubmitted)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Personal Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="salutation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salutation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Salutation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mr">Mister</SelectItem>
                            <SelectItem value="Mrs">Miss</SelectItem>
                            <SelectItem value="Dr">Doctor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Title" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dr">Dr.</SelectItem>
                            <SelectItem value="Prof">Prof.</SelectItem>
                            <SelectItem value="Mr">Mr.</SelectItem>
                            <SelectItem value="Mrs">Ms.</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter first name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter last name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Enter email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter phone number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <CalendarIcon className="h-4 w-4" />
                              {field.value
                                ? new Date(field.value).toLocaleDateString()
                                : "Select Date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(date);
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-6">
                Address Information
              </h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter street address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="approved"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Approval Status
                        </FormLabel>
                        <FormDescription>
                          Approve or reject this customer
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
          </div>
        </form>
      </Form>
    </div>
  );
}
