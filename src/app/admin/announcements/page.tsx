"use client";
export const dynamic = "force-dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { HomeIcon, Loader, X } from "lucide-react";
import { useCustomers, useNewsletterMail } from "@/hooks/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  subject: z.string().nonempty(),
  message: z.string().min(1, "Message is required"),
  type: z.string().nonempty(),
  emails: z.array(z.string()),
  group: z.string(),
  list: z.array(z.string()),
});

type IForm = z.infer<typeof formSchema>;

const NewsletterComposer = () => {
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [showCustomers, setShowCustomers] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<
    { name: string; email: string }[]
  >([]);
  const filter = {
    limit: 10,
    search: "",
  };

  const [filters, setFilter] = useState(filter);
  const {
    data: customers,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCustomers(filters);

  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      message: "",
      emails: [""],
      type: "newsletter",
      group: "",
      list: [""],
    },
  });

  const {
    mutate: newsletterMail,
    isPending,
    error,
    isError,
  } = useNewsletterMail();
  const handleSubmit = (mail: IForm) => {
    const { subject, message, type } = mail;
    const payload: any = {
      subject,
      message,
      type,
    };
    if (type === "customer") {
      if (selectedCustomers.length > 0) {
        payload.emails = selectedCustomers.map((c) => c.email);
      } else {
        toast.error("Please select customers");
        return;
      }
    }
    if (mail.group) {
      payload.group = mail.group;
    }
    newsletterMail(payload, {
      onSuccess: () => {
        toast.success("Send");
        form.reset();
        setSelectedCustomers([]);
      },
      onError: () => {
        toast.error("error");
      },
    });
  };

  const onAdd = (customer) => {
    const exist = selectedCustomers.find((c) => c.email === customer.email);
    if (exist) return;
    setSelectedCustomers((prev) => [
      ...prev,
      {
        name: customer.name,
        email: customer.email,
      },
    ]);
    setShowCustomers(false);
  };
  const path = usePathname();
  const pathLinks = path.split("/");
  if (isError) {
    return <div>{`Error Occurred: ${error}`}</div>;
  } else {
    return (
      <AdminLayout>
        <AdminBreadcrumb title="Announcements" items={[]} />
        <div className="py-6 max-w-full mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Create Announcement</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => form.reset()}>
                Discard
              </Button>
              <Button
                type="submit"
                form="announcement-form"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Announcement"}
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form
              id="announcement-form"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <Card className="bg-white shadow-sm">
                <div className="p-6 space-y-6">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipients</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select recipients" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="newsletter">
                                All newsletter subscribers
                              </SelectItem>
                              <SelectItem value="all-customers">
                                All Customers
                              </SelectItem>
                              <SelectItem value="customer-group">
                                Customer Group
                              </SelectItem>
                              <SelectItem value="customer">
                                Selected Customers
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {form.watch("type") === "customer-group" && (
                      <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Customer Group</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select customer group" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BASIC">Basic</SelectItem>
                                <SelectItem value="VIP">VIP</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    )}

                    {form.watch("type") === "customer" && (
                      <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormLabel>Search Customers</FormLabel>
                            <Input
                              placeholder="Search customers..."
                              onChange={(e) => {
                                setFilter((prevFilters) => ({
                                  ...prevFilters,
                                  search: e.target.value,
                                }));
                              }}
                              onFocus={() => setShowCustomers(true)}
                              onBlur={() => {
                                setTimeout(() => {
                                  setShowCustomers(false);
                                }, 100);
                              }}
                            />
                            {showCustomers && (
                              <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg ">
                                <div
                                  onScroll={(e) => {
                                    const target = e.target as HTMLDivElement;
                                    const scrolledToBottom =
                                      Math.abs(
                                        target.scrollHeight -
                                          target.scrollTop -
                                          target.clientHeight
                                      ) < 5;

                                    if (
                                      scrolledToBottom &&
                                      hasNextPage &&
                                      !isFetchingNextPage
                                    ) {
                                      fetchNextPage();
                                    }
                                  }}
                                  className="p-2 space-y-1 max-h-[200px] overflow-y-auto"
                                >
                                  {customers?.pages
                                    ?.flatMap((page) => page?.data?.customers)
                                    .flatMap((data) =>
                                      data?.data.map((customer, idx) => (
                                        <div
                                          key={`${customer?.email}-${idx}`}
                                          onClick={() => onAdd(customer)}
                                          className="p-2 text-sm cursor-pointer hover:bg-muted rounded-sm"
                                        >
                                          {customer?.name}
                                        </div>
                                      ))
                                    )}
                                  {(isLoading || isFetchingNextPage) && (
                                    <div className="flex justify-center p-2">
                                      <Loader
                                        className="animate-spin text-primary"
                                        size={20}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </FormItem>
                        )}
                      />
                    )}

                    {form.watch("type") === "customer" &&
                      selectedCustomers.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedCustomers.map((customer) => (
                            <div
                              key={customer.email}
                              className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                            >
                              {customer.name}
                              <X
                                className="w-4 h-4 cursor-pointer hover:text-primary/80"
                                onClick={() =>
                                  setSelectedCustomers(
                                    selectedCustomers.filter(
                                      (c) => c.email !== customer.email
                                    )
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter announcement subject"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Card>
            </form>
          </Form>
        </div>
      </AdminLayout>
    );
  }
};

export default NewsletterComposer;
