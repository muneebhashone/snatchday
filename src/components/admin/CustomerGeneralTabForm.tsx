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
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useGetCustomerById, useUpdateCustomer } from "@/hooks/api";
import { useEffect } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

const formSchema = z.object({
  salutation: z.enum(["Mister", "Miss", "Doctor"], {
    required_error: "Salutation is required",
  }),
  title: z.enum(["Dr.", "Prof.", "Mr.", "Ms."], {
    required_error: "Title is required",
  }),
  username: z.string().min(1, "Username is required"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  street: z.string().optional(),
  location: z.string().optional(),
  country: z.enum(["Germany", "USA", "France", "UK"], {
    required_error: "Country is required",
  }),
  email: z.string().email("Invalid email format"),
  approved: z.boolean().optional(),
});

type IForm = z.infer<typeof formSchema>;

export default function CustomerForm() {
  const router = useRouter();
  const params = useParams();
  const paramsId = params.id;
  const { data: customer } = useGetCustomerById(paramsId);
  const customerData = customer?.data.customer;
  const { mutate: updateCustomer, isPending } = useUpdateCustomer(paramsId);
  console.log(customer);

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salutation: "Mister",
      title: "Dr.",
      username: "",
      firstName: "",
      lastName: "",
      street: "",
      location: "",
      country: "Germany",
      email: "",
      approved: false,
    },
  });

  useEffect(() => {
    if (customerData) {
      form.reset({
        salutation: customerData.salutation || "Mister",
        title: customerData.title || "Dr.",
        username: customerData.name || "",
        firstName: customerData.firstName || "",
        lastName: customerData.lastName || "",
        street: customerData.street || "",
        location: customerData.location || "",
        country: customerData.country || "Germany",
        email: customerData.email || "",
        approved: customerData.approved || false,
      });
    }
  }, [customer?.approved, customerData, form]);

  const onSubmitted = (values: any) => {
    const cleanedValues = JSON.parse(
      JSON.stringify(values, (key, value) => {
        return value === "" || value === null ? undefined : value;
      })
    );
    updateCustomer(cleanedValues, {
      onSuccess: () => {
        toast.success("customer updated successfully");
        router.push("/admin/customers");
      },
      onError: (error) => {
        console.log(error, "error on customer update");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitted)} className="space-y-4">
          {/* Salutation */}
          <FormField
            control={form.control}
            name="salutation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salutation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Salutation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mister">Mister</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Doctor">Doctor</SelectItem>
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Prof.">Prof.</SelectItem>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                    <SelectItem value="Ms.">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center mt-5">
              {" "}
              <FormField
                control={form.control}
                name="approved"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Approve </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="approved"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter street address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="Enter email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between mt-4 ">
            <Button type="submit" className="bg-primary hover:bg-primary">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  Save
                  <Save />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
