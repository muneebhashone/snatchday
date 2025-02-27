// "use client";
// import ClientLayout from "@/components/landing-page/ClientLayout";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const formSchema = z.object({
//   refrence: z
//     .string()
//     .min(3, "Reference must be between 3 and 255 characters")
//     .max(255, "Reference must be between 3 and 255 characters"),
//   name: z
//     .string()
//     .min(3, "name must have atleast 3 characters")
//     .max(20, "Reference must be between 3 and 255 characters"),
//   email: z.string().email({ message: "Invalid email address" }),
//   phone: z
//     .string()
//     .min(11, "Phone must be atleast 3 characters")
//     .max(15, "Phone must be less than 15 characters"),
//   news: z.string(),
// });

// type FormValues = z.infer<typeof formSchema>;

// const page = () => {
//   const formFields = [
//     { name: "refrence", label: "Reference", placeholder: "Enter reference" },
//     { name: "name", label: "Name", placeholder: "Enter your name" },
//     { name: "email", label: "Email", placeholder: "Enter your email" },
//     { name: "phone", label: "Phone", placeholder: "Enter phone number" },
//     { name: "news", label: "News", placeholder: "Enter news" },
//   ];

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { refrence: "", name: "", email: "", phone: "", news: "" },
//   });

//   const onSubmit = form.handleSubmit((values) => {
//     console.log(values);
//   });

//   return (
//     <ClientLayout>
//       <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-20">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 mt-12">
//           Contact
//         </h1>
//         <Separator className="my-10" />
//         <div className="flex gap-2">
//           <div className="">
//             <Form {...form}>
//               <form onSubmit={onSubmit}>
//                 <div className="flex gap-2">
//                   {formFields.map((field) => (
//                     <FormField
//                       control={form.control}
//                       name={
//                         field.name as
//                           | "name"
//                           | "email"
//                           | "refrence"
//                           | "phone"
//                           | "news"
//                       }
//                       render={() => (
//                         <FormItem>
//                           <FormLabel>{field.label as string}</FormLabel>
//                           <FormControl>
//                             <Input
//                               {...field}
//                               placeholder={field.placeholder as string}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   ))}
//                 </div>
//                 <button
//                   type="submit"
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </Form>
//           </div>
//           <div></div>
//         </div>
//       </div>
//     </ClientLayout>
//   );
// };
// export default page;

"use client";
import ClientLayout from "@/components/landing-page/ClientLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LocateFixed, MailIcon, PhoneCallIcon } from "lucide-react";
import { BubblesIcon, BubblesIcon1 } from "@/components/icons/icon";

const formSchema = z.object({
  refrence: z
    .string()
    .min(3, "Reference must be between 3 and 255 characters")
    .max(255, "Reference must be between 3 and 255 characters"),
  name: z
    .string()
    .min(3, "name must have atleast 3 characters")
    .max(20, "Reference must be between 3 and 255 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(11, "Phone must be atleast 3 characters")
    .max(15, "Phone must be less than 15 characters"),
  news: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const Page = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { refrence: "", name: "", email: "", phone: "", news: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <ClientLayout>
      <div className="container max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 pt-28 pb-32 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 mt-12">
          Contact
        </h1>
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <BubblesIcon className="absolute top-[10%] left-[5%] animate-bubble-1" />
          <BubblesIcon1 className="absolute top-[15%] right-[15%] animate-bubble-5" />
          <BubblesIcon1 className="absolute top-[35%] right-[20%] animate-bubble-4" />
          <BubblesIcon className="absolute top-[65%] left-[12%] animate-bubble-3" />
          <BubblesIcon className="absolute top-[75%] left-[60%] animate-bubble-12" />
          <BubblesIcon1 className="absolute bottom-[5%] right-[90%] animate-bubble-2" />
          <BubblesIcon className="absolute bottom-[20%] left-[85%] animate-bubble-3" />
          <BubblesIcon1 className="absolute top-[40%] right-[85%] animate-bubble-4" />
        </div>
        <Separator className="my-10" />
        <div className="flex gap-8 min-w-full">
          <div className="w-3/5 flex items-center justify-end">
            <Form {...form}>
              <form className="flex flex-col items-center" onSubmit={onSubmit}>
                <div className="flex gap-2 flex-col items-center">
                  <FormField
                    control={form.control}
                    name="refrence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-lg text-foreground">
                          Refrence:
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="font-bold w-[500px]"
                            placeholder="Refrence*"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.refrence?.message}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-bold text-lg text-foreground'>Name:</FormLabel>
                        <FormControl>
                          <Input
                            className="font-bold w-[500px]"
                            placeholder="Name*"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.name?.message}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-bold text-lg text-foreground'>Email:</FormLabel>
                        <FormControl>
                          <Input
                            className="font-bold w-[500px]"
                            placeholder="Email*"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.email?.message}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-bold text-lg text-foreground'>Phone:</FormLabel>
                        <FormControl>
                          <Input
                            className="font-bold w-[500px]"
                            placeholder="Phone*"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.phone?.message}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="news"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-bold text-lg text-foreground'>News:</FormLabel>
                        <FormControl>
                          <Input
                            className="font-bold w-[500px]"
                            placeholder="News*"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {form.formState.errors.news?.message}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-primary text-white px-8 text-lg py-2 rounded font-bold"
                >
                  Submit
                </button>
              </form>
            </Form>
          </div>
          <div className="w-2/5">
            <div className="mt-10">
              <h1 className="text-3xl font-extrabold">CALL US</h1>
              <div className="flex gap-3 items-center mt-2">
                <PhoneCallIcon size={25} className="text-primary" />
                <div>
                  <p className="font-medium text-lg">
                    <span className="font-bold">Toll Free:</span> 0123-456-789
                  </p>
                  <p className="font-medium text-lg">
                    <span className="font-bold">Fax:</span> 0123-456-789
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-extrabold">CONTACT US</h1>
              <div className="flex gap-3 items-center mt-2">
                <MailIcon size={25} className="text-primary" />
                <div>
                  <a className="font-bold hover:text-primary cursor-pointer text-lg">
                    <link rel="" href="#" />
                    info@snatchday.de
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-extrabold">LOCATION</h1>
              <div className="flex gap-3 items-center mt-2 font-medium">
                <LocateFixed size={25} className="text-primary" />
                <p className="w-[260px] text-lg font-bold">
                  Snatch Day GmbH, Telramundweg 6 D-12167 Berlin
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <RecaptchaForm /> */}
      </div>
    </ClientLayout>
  );
};
export default Page;
