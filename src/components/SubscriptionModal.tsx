import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreditCard,
  User,
  Building,
  ArrowRight,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useCreateMandate,
  useDeleteMandate,
  useGetMandate,
  useSubscribePackage,
} from "@/hooks/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner";
import { CreditCardIcon, PaypalCardIcon } from "./icons/icon";
import { useRouter } from "next/navigation";

const subscriptionFormSchema = z
  .object({
    consumerName: z.string().min(1, "Consumer name is required"),
    method: z
      .string()
      .refine(
        (val) => val === "directdebit" || val === "paypal",
        "Payment method must be either directdebit or paypal"
      ),
    consumerAccount: z.string().optional(),
    consumerBic: z.string().optional(),
    paypalBillingAgreementId: z.string().optional(),
    paypalToken: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.method === "directdebit") {
        return !!data.consumerAccount && !!data.consumerBic;
      }
      return true;
    },
    {
      message: "Account number and BIC are required for direct debit",
      path: ["consumerAccount"],
    }
  )
  .refine(
    (data) => {
      if (data.method === "paypal") {
        return !!data.paypalBillingAgreementId && !!data.paypalToken;
      }
      return true;
    },
    {
      message: "PayPal billing agreement ID and token are required for PayPal",
      path: ["paypalBillingAgreementId"],
    }
  );

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

const SubscriptionModal = ({
  isOpen,
  setIsOpen,
  packageId,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  packageId: string;
}) => {
  const router = useRouter();
  const { data: mandates, isLoading, refetch } = useGetMandate();
  console.log(mandates);
  const { mutate: createMandate } = useCreateMandate();
  const { mutate: deleteMandate } = useDeleteMandate();
  const { mutate: subscribePackage } = useSubscribePackage();
  const [showForm, setShowForm] = useState(false);
  const [selectedMandateId, setSelectedMandateId] = useState<string | null>(
    null
  );

  // Update showForm state when mandates data changes
  React.useEffect(() => {
    if (!isLoading && mandates?.data?.mandates?.length > 0) {
      // Set the first mandate as selected by default
      setSelectedMandateId(mandates.data.mandates[0].id);
      setShowForm(false);
    } else if (!isLoading) {
      setShowForm(
        !mandates ||
          !mandates.data ||
          !mandates.data.mandates ||
          mandates.data.mandates.length === 0
      );
    }
  }, [mandates, isLoading]);

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      consumerName: "",
      method: "directdebit",
      consumerAccount: "",
      consumerBic: "",
      paypalBillingAgreementId: "",
      paypalToken: "",
    },
  });

  const onSubmit = (data: SubscriptionFormValues) => {
    console.log(data);
    // Create a filtered data object based on payment method
    const filteredData = {
      consumerName: data.consumerName,
      method: data.method,
      ...(data.method === "directdebit"
        ? {
            consumerAccount: data.consumerAccount,
            consumerBic: data.consumerBic,
          }
        : {
            paypalBillingAgreementId: data.paypalBillingAgreementId,
            paypalToken: data.paypalToken,
          }),
    };

    createMandate(filteredData, {
      onSuccess: () => {
        toast.success("Payment method created successfully");
        refetch();
        setShowForm(false);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to create payment method"
        );
      },
    });
    // setIsOpen(false);
  };

  const selectedMethod = form.watch("method");

  const handleCreateNew = () => {
    setShowForm(true);
    form.reset();
  };

  const handleDelete = (mandateId: string) => {
    deleteMandate(mandateId, {
      onSuccess: () => {
        toast.success("Payment method deleted successfully");
        refetch();
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to delete payment method"
        );
      },
    });
  };

  // Add handler to select a mandate for subscription
  const handleSelectMandate = (mandateId: string) => {
    setSelectedMandateId(mandateId);
  };

  // Add handler to subscribe with the selected mandate
  const handleSubscribe = () => {
    if (!selectedMandateId) return;

    subscribePackage(
      {
        packageId,
        mandateId: selectedMandateId,
      },
      {
        onSuccess: (data: any) => {
          console.log(data);
          toast.success("Subscription created successfully");
          setIsOpen(false);
          if (data.data.subscription.status === "active") {
            router.push("/my-account/subscription");
          }
        },
        onError: (error: any) => {
          toast.error(
            error.response?.data?.message || "Failed to create subscription"
          );
        },
      }
    );
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <DialogTrigger asChild>
          <Button>Open</Button>
        </DialogTrigger> */}
        <DialogContent
          hideCloseButton={true}
          className="sm:max-w-[500px] p-0  rounded-lg shadow-lg"
        >
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            className="h-12 w-12 shadow-xl rounded-full bg-white p-0 hover:bg-gray-100 absolute -right-5 -top-5 "
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="p-6 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              Payment Method
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {showForm
                ? "Complete your payment details to start your subscription"
                : "Select a payment method for your subscription"}
            </p>
          </div>

          <div className="p-6">
            {!showForm ? (
              <>
                {isLoading ? (
                  <div className="py-12 text-center">
                    <div className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent animate-spin mx-auto"></div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Loading your payment methods...
                    </p>
                  </div>
                ) : mandates &&
                  mandates.data &&
                  mandates.data.mandates &&
                  mandates.data.mandates.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {mandates.data.mandates.map((mandate, index) => (
                        <div
                          key={index}
                          className={cn(
                            "border rounded-lg p-4 flex items-center justify-between cursor-pointer relative transition-all duration-200 hover:shadow-md",
                            {
                              "bg-green-50 border-green-200 shadow-sm":
                                mandate.id === selectedMandateId,
                              "bg-white hover:border-gray-300":
                                mandate.id !== selectedMandateId,
                            }
                          )}
                          onClick={() => handleSelectMandate(mandate.id)}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div
                              className={cn(
                                "w-14 h-10 rounded-md flex items-center justify-center shadow-sm"
                              )}
                            >
                              {mandate.method === "directdebit" ? (
                                <CreditCardIcon />
                              ) : (
                                <PaypalCardIcon />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-800">
                                    {mandate.method === "directdebit"
                                      ? "MasterCard"
                                      : "PayPal"}
                                  </span>
                                  <span className="text-sm ml-2 text-gray-500 font-mono">
                                    ••••{" "}
                                    {mandate.details?.consumerAccount?.slice(
                                      -4
                                    ) ||
                                      mandate.paypalBillingAgreementId?.slice(
                                        -4
                                      ) ||
                                      "xxxx"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                {index === 0 && (
                                  <span className="text-xs text-gray-500 flex items-center mb-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                                    Primary payment method
                                  </span>
                                )}
                                <span
                                  className={`text-xs text-gray-500 ${
                                    mandate.status === "valid"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {mandate.status === "valid"
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center ml-2">
                            {mandate.id === selectedMandateId && (
                              <div className="h-7 w-7 rounded-full bg-green-500 flex items-center justify-center mr-2 shadow-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                            {/* <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(mandate.id);
                              }}
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3">
                      <Button
                        onClick={handleCreateNew}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 py-5 rounded-lg border-dashed"
                      >
                        <Plus className="h-4 w-4" />
                        Use a different payment method
                      </Button>
                      {selectedMandateId && (
                        <Button
                          onClick={handleSubscribe}
                          className="w-full py-5 rounded-lg bg-gradient-to-r from-primary to-primary shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Subscribe Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 mx-auto max-w-md bg-gray-50">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-base font-medium mb-2 text-gray-800">
                        No payment methods
                      </h3>
                      <p className="text-muted-foreground text-sm mb-5">
                        You don't have any payment methods yet.
                      </p>
                      <Button
                        onClick={handleCreateNew}
                        className="flex items-center gap-1 px-6 py-5 rounded-lg shadow-sm"
                      >
                        <Plus className="h-4 w-4" />
                        Add payment method
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="consumerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                            <User className="h-4 w-4 text-primary/70" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter full name"
                              {...field}
                              className="border-2 focus-visible:ring-1 rounded-lg py-5"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                            <CreditCard className="h-4 w-4 text-primary/70" />
                            Payment Method
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-2 focus:ring-1 rounded-lg py-5">
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value="directdebit"
                                className="py-3 flex items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 mr-2 text-yellow-600" />
                                  <p>Bank Account</p>
                                </div>
                              </SelectItem>
                              <SelectItem
                                value="paypal"
                                className="py-3 flex items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                                  <p>PayPal</p>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedMethod && (
                      <div
                        className={cn(
                          "rounded-lg border-2 p-6 transition-all",
                          {
                            "bg-amber-50/50 border-amber-200/70":
                              selectedMethod === "directdebit",
                            "bg-blue-50/50 border-blue-200/70":
                              selectedMethod === "paypal",
                          }
                        )}
                      >
                        {selectedMethod === "directdebit" ? (
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="consumerAccount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <Building className="h-4 w-4 text-amber-600" />
                                    Account Number
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter account number"
                                      {...field}
                                      className="border-2 focus-visible:ring-1 rounded-lg py-5"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs mt-2">
                                    Your account number in the format required
                                    by your bank
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="consumerBic"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <Building className="h-4 w-4 text-amber-600" />
                                    Bank Identifier Code (BIC)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter BIC code"
                                      {...field}
                                      className="border-2 focus-visible:ring-1 rounded-lg py-5"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="paypalBillingAgreementId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CreditCard className="h-4 w-4 text-blue-600" />
                                    PayPal Billing Agreement ID
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter PayPal billing agreement ID"
                                      {...field}
                                      className="border-2 focus-visible:ring-1 rounded-lg py-5"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="paypalToken"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <CreditCard className="h-4 w-4 text-blue-600" />
                                    PayPal Token
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter PayPal token"
                                      {...field}
                                      className="border-2 focus-visible:ring-1 rounded-lg py-5"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <DialogFooter className="pt-6 flex flex-col-reverse sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        mandates &&
                        mandates.data &&
                        mandates.data.mandates &&
                        mandates.data.mandates.length > 0
                          ? setShowForm(false)
                          : setIsOpen(false)
                      }
                      className="w-full sm:w-auto py-5 rounded-lg"
                    >
                      {mandates &&
                      mandates.data &&
                      mandates.data.mandates &&
                      mandates.data.mandates.length > 0
                        ? "Back"
                        : "Cancel"}
                    </Button>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto gap-1 py-5 px-5 rounded-lg bg-gradient-to-r from-primary to-primary shadow-sm"
                    >
                      Save Payment Method
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionModal;
