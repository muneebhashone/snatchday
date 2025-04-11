"use client";
export const dynamic = "force-dynamic";
import { useCallback, useRef, useState } from "react";
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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { toast } from "sonner";
import RichTextEditor from "@/components/admin/RichTextEditor";

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
  const observer = useRef<IntersectionObserver>();
  const [showCustomers, setShowCustomers] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<
    { name: string; email: string }[]
  >([]);
  const filter = {
    limit: 10,
    search: "",
    offset: 0,
  };

  const [filters, setFilter] = useState(filter);
  const {
    data: customers,
    isLoading,
    fetchNextPage,
    hasNextPage,
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
    // console.log(mail, "maildata log");
  };
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("FETCHING NEXT PAGE");
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, fetchNextPage, hasNextPage]
  );
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
    return <div>{`Error Occured: ${error}`}</div>;
  } else {
    return (
      <AdminLayout>
        <div className="flex items-center gap-4">
          <h1 className="font-bold">Newsletter</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon size={20} className="text-primary font-bold" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/newsletters"
                  className="text-primary font-bold cursor-pointer hover:text-primary"
                >
                  {pathLinks[2]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-bold">
                  {pathLinks[pathLinks.length - 1]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="container mx-auto p-4 max-w-8xl">
              <Card className="p-0 rounded-none">
                <div className="flex items-center bg-muted/50 p-3 border-b">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span className="font-medium">Newsletter</span>
                  </div>
                </div>

                <div className="p-0">
                  <div className="flex border-b">
                    <div className="w-[180px] flex items-center justify-end pr-4 py-3 text-sm font-medium">
                      To
                    </div>
                    <div className="flex-1 py-2 pr-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(e) => {
                              return field.onChange(e);
                            }}
                          >
                            <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 h-9 rounded-none">
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
                        )}
                      />
                    </div>
                  </div>
                  {form.watch("type") === "customer-group" && (
                    <div className="flex border-b">
                      <div className="w-[180px] flex items-center justify-end pr-4 py-3 text-sm font-medium">
                        Group
                      </div>
                      <div className="flex-1 py-2 pr-4">
                        <FormField
                          control={form.control}
                          name="group"
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full border-0 shadow-none focus:ring-0 h-9 rounded-none">
                                <SelectValue placeholder="Select recipients" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BASIC">All</SelectItem>
                                <SelectItem value="VIP">VIP</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  {form.watch("type") === "customer" && (
                    <div className="flex border-b">
                      <div className="w-[180px] flex items-center justify-end pr-4 py-3 text-sm font-medium">
                        Customers
                      </div>
                      <div className="flex-1 py-2 pr-4 relative">
                        <FormField
                          control={form.control}
                          name="group"
                          render={({ field }) => (
                            <Input
                              onChange={(e) => {
                                console.log(e.target.value);
                                setFilter((prevFilters) => ({
                                  ...prevFilters,
                                  search: e.target.value,
                                }));
                              }}
                              placeholder="customers...."
                              onFocus={() => {
                                setShowCustomers(true);
                              }}
                            />
                          )}
                        />
                        {showCustomers && (
                          <div
                            ref={lastElementRef}
                            className="border p-3 mt-2 flex flex-col rounded bg-gray-100 gap-2 absolute z-10 w-full top-10 h-[200px] overflow-y-auto"
                          >
                            {customers?.pages
                              ?.flatMap((page) => page?.data?.customers)
                              .flatMap((data) =>
                                data?.data.map((customer, idx) => (
                                  <div
                                    onClick={() => {
                                      onAdd(customer);
                                    }}
                                    key={`${customer?.email}-${idx}  `}
                                    className="text-sm cursor-pointer"
                                  >
                                    {customer?.name}
                                  </div>
                                ))
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Display Customers */}
                  {form.watch("type") === "customer" && (
                    <div className="flex items-center justify-end pr-4">
                      {selectedCustomers.length > 0 && (
                        <div className="border p-3 mt-2 rounded bg-gray-100 flex flex-wrap gap-2 w-[88%]">
                          {selectedCustomers.map((customer) => (
                            <div
                              key={customer.name}
                              className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
                            >
                              {customer.name}
                              <X
                                className="w-4 h-4 cursor-pointer"
                                onClick={() =>
                                  setSelectedCustomers(
                                    selectedCustomers.filter(
                                      (c) => c.name !== customer.name
                                    )
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex border-b">
                          <div className="w-[180px] flex items-center justify-end pr-4 py-3 text-sm font-medium">
                            <span className="text-red-500 mr-1">*</span>{" "}
                            Regarding
                          </div>
                          <div className="flex-1 py-2 pr-4">
                            <FormControl>
                              <Input
                                {...field}
                                className="border-0 shadow-none focus-visible:ring-0 h-9 rounded-none"
                                placeholder="Regarding"
                              />
                            </FormControl>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex items-start px-4 py-3 border-b">
                    <div className="w-[180px] flex items-center justify-end pr-4 text-sm font-medium">
                      <span className="text-red-500 mr-1">*</span> News
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
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
                  {isPending ? (
                    <div className="flex items-center justify-center p-3 bg-primary text-white">
                      <Loader className="animate-spin" size={20} />
                    </div>
                  ) : (
                    <Input className="bg-primary text-white" type="submit" />
                  )}
                </div>
              </Card>
            </div>
          </form>
        </Form>
      </AdminLayout>
    );
  }
};

export default NewsletterComposer;
