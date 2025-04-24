import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useGetPoints, useWithdrawl } from "@/hooks/api";
import { toast } from "sonner";
import { ArrowRight, Loader } from "lucide-react";

const formSchema = z
  .object({
    amount: z.number().min(1, "Amount is required"),
    withdrawalMethod: z.enum(["transfer", "paypal"], {
      required_error: "Please select a withdrawal method",
    }),
    // Transfer method fields
    bankDetails: z.object({
      bic: z.string().optional(),
      accountName: z.string().optional(),
      iban: z.string().optional(),
      // PayPal method fields
      paypalEmail: z.string().optional(),
    }),
    fee: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.withdrawalMethod === "transfer") {
        return (
          !!data.bankDetails.iban &&
          !!data.bankDetails.accountName &&
          !!data.bankDetails.bic
        );
      }
      if (data.withdrawalMethod === "paypal") {
        return !!data.bankDetails.paypalEmail;
      }
      return true;
    },
    {
      message: "Required fields are missing for the selected withdrawal method",
      path: ["withdrawalMethod"],
    }
  );
const Withdrawl = () => {
  const { data: getPoints } = useGetPoints();
  const [Totalamount, setAmount] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
      withdrawalMethod: undefined,
      bankDetails: {
        iban: "",
        accountName: "",
        bic: "",
        paypalEmail: "",
      },
    },
  });
  console.log(getPoints);

  const withdrawalMethod = form.watch("withdrawalMethod");
  const amount = form.watch("amount") || 0;

  // Calculate fees
  const paypalFee = withdrawalMethod === "paypal" ? 0.35 : 0;
  const totalFee = getPoints?.data.platformFee + paypalFee;
  const finalAmount = amount + totalFee;

  const { mutate: withdrawl, isPending } = useWithdrawl();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.withdrawalMethod) {
      toast.error("Please select a withdrawal method");
      return;
    }

    const data = { ...values };
    if (values.withdrawalMethod === "transfer") {
      data.bankDetails.paypalEmail = undefined;
    }
    if (values.withdrawalMethod === "paypal") {
      data.bankDetails.bic = undefined;
      data.bankDetails.iban = undefined;
      data.bankDetails.accountName = undefined;
    }
    withdrawl(data, {
      onSuccess: () => {
        toast.success("Withdrawal request submitted successfully");
        form.reset({
          amount: 0,
          withdrawalMethod: undefined,
          bankDetails: {
            iban: "",
            accountName: "",
            bic: "",
            paypalEmail: "",
          },
        });
      },
      onError: (error: any) => {
        toast.error(error.response.data.message || "Something went wrong");
      },
    });
  };

  return (
    <div className=" max-w-full mx-auto">
      <h2 className="text-xl font-bold mb-6">Pay out credit:</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >
          <div>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="€0.00"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                        setAmount(Number(field.value));
                      }}
                      onFocus={(e) => {
                        e.target.select();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground flex justify-start items-center gap-2">
              <div>Min: €{getPoints?.data.minWithdrawalAmount}</div>
              <ArrowRight className="w-4 h-4" />
              <div>Max: €{getPoints?.data.maxWithdrawalAmount}</div>
            </p>
          </div>

          <FormField
            control={form.control}
            name="withdrawalMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawal Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select withdrawal method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  A transaction fee of €1.00 applies to all withdrawals.
                  {withdrawalMethod === "paypal" && (
                    <span className="text-primary">
                      {" "}
                      An additional PayPal fee of €0.35 will also be deducted.
                    </span>
                  )}
                </FormDescription>
              </FormItem>
            )}
          />

          {withdrawalMethod === "transfer" && (
            <div className="col-span-2 grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="bankDetails.iban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter IBAN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankDetails.accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter account holder name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankDetails.bic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BIC</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter BIC" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {withdrawalMethod === "paypal" && (
            <FormField
              control={form.control}
              name="bankDetails.paypalEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PayPal Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter PayPal email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={isPending || !withdrawalMethod || amount <= 0}
            >
              {isPending ? (
                <Loader className="h-4 w-4 text-white animate-spin" />
              ) : (
                "Submit Withdrawal"
              )}
            </Button>
          </div>

          {withdrawalMethod && amount > 0 && (
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Summary:</span> Amount: €
                {amount.toFixed(2)} +{" "}
                {withdrawalMethod === "paypal"
                  ? `Fees: €${totalFee.toFixed(
                      2
                    )} (€1.00 transaction + €0.35 PayPal)`
                  : `Fee: €${getPoints?.data.platformFee.toFixed(2)}`}{" "}
                ={" "}
                <span className="font-bold">
                  Final amount: €{finalAmount.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Withdrawl;
