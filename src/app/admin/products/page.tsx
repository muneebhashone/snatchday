"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Product } from "@/components/admin/Product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseITScope } from "@/hooks/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IError } from "../games/create/page";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.type === "application/json",
      "Only JSON files are allowed"
    ),
  // updateAttributes: z.boolean(),
  // updateDescription: z.boolean(),
  // updateStock: z.boolean(),
  // updateTitles: z.boolean(),
  // updatePrice: z.boolean(),
});

type IForm = z.infer<typeof formSchema>;

export default function ProductsPage() {
  const { mutate: ITScope, isPending } = UseITScope();
  const [open, setOpen] = useState(false);
  // const [progress, setProgress] = useState(13);
  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
      // updateAttributes: false,
      // updateDescription: false,
      // updateStock: false,
      // updateTitles: false,
      // updatePrice: false,
    },
  });

  const { socket } = useSocket();
  useEffect(() => {
    console.log(socket);
    // const timer = setTimeout(() => setProgress(66), 500);
    // return () => clearTimeout(timer);
  }, [socket]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : String(value));
    });
    ITScope(formData, {
      onSuccess: () => {
        toast.success("products uploaded successfully");
        setOpen(false);
      },
      onError: (error) => {
        toast.error((error as unknown as IError)?.response.data.message);
      },
    });
  };
  return (
    <AdminLayout>
      <AdminBreadcrumb title="Products" items={[]} />
      <div className="w-full flex items-center justify-between">
        {/* <Button className="mb-4">
          <Link href="/admin/products/create">Create Product</Link>
        </Button> */}

        <div className="flex items-center gap-2">
          <Button className="bg-primary border border-primary text-white hover:text-white hover:bg-primary">
            <Link href="/admin/products/create">Create Product</Link>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white border border-primary text-primary hover:text-white hover:bg-primary">
                IT Scope Sync
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40%]">
              <DialogHeader>
                <DialogTitle>IT Scope Sync</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <label
                              htmlFor="jsonFile"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            ></label>
                            <Input
                              name="jsonFile"
                              type="file"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              }
                              ref={field.ref}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isPending} type="submit">
                    {isPending ? (
                      <Loader className="animate-spin " size={18} />
                    ) : (
                      " Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-sm">
        <Product />
      </div>
    </AdminLayout>
  );
}
