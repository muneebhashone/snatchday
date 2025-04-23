import React from "react";
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
import { useWithdrawl } from "@/hooks/api";
import { toast } from "sonner";

const formSchema = z
  .object({
    amount: z.number().min(1, "Amount is required"),
    withdrawalMethod: z.enum(["transfer", "paypal"]).optional(),
    // Transfer method fields
    bankDetails: z.object({
      bic: z.string().optional(),
      accountName: z.string().optional(),
      iban: z.string().optional(),
      // PayPal method fields
      paypalEmail: z.string().optional(),
    }),
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
//   .refine(
//     (data) => {
//       if (data.withdrawalMethod === "transfer") {
//         return !!data.iban && !!data.accountName && !!data.bic;
//       }
//       return true;
//     },
//     {
//       message: "Required fields are missing for the selected withdrawal method",
//       path: ["iban", "accountName", "bic"],
//     }
//   ).refine(
//     (data) => {
//       if (data.withdrawalMethod === "paypal") {
//         return !!data.paypalEmail;
//       }
//       return true;
//     },
//     {
//       message: "Required fields are missing for the selected withdrawal method",
//       path: ["paypalEmail"],
//     }
//   );

const Withdrawl = () => {
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

  const withdrawalMethod = form.watch("withdrawalMethod");

  const { mutate: withdrawl, isPending } = useWithdrawl();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = { ...values, withdrawalMethod: undefined };
    if (withdrawalMethod === "transfer") {
      data.bankDetails.paypalEmail = undefined;
    }
    if (withdrawalMethod === "paypal") {
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
        form.setValue("withdrawalMethod", undefined);
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
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            <Button type="submit">Submit Withdrawal</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Withdrawl;
