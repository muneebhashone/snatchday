"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useLogout, useUpdatePassword } from "@/hooks/api"
import { toast } from "sonner"
import { Loader2Icon, LockIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { useUserContext } from "@/context/userContext"
import { useRouter } from "next/navigation"

const formSchema = z
  .object({
    currentPassword: z.string().nonempty("*Current password is required*"),
    newPassword: z
      .string()
      .min(8, "*Password must be at least 8 characters*")
      .nonempty("*New password is required*")
      .refine(
        (password) => /(?=.*[A-Z])|(?=.*[!@#$%^&*])/.test(password),
        "*Password must contain at least one uppercase letter or special character*"
      ),
    confirmPassword: z.string().nonempty("*Confirm password is required*"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "*Passwords do not match*",
    path: ["confirmPassword"],
  })

type IForm = z.infer<typeof formSchema>

const ChangePasswordModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const { isPending, mutate: updatePassword } = useUpdatePassword()
  const {mutate:logout}=useLogout()  
  const {setUserData}=useUserContext()
  const router=useRouter()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const form = useForm<IForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = (data: IForm) => {
    updatePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password updated successfully")
          
          logout(undefined,{
            onSuccess:()=>{
              router.push("/")
              setUserData(null)
              setIsOpen(false)
            }
          })
          form.reset()
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Failed to update password")
          console.log(error)
        },
      },
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] p-0">
        <DialogHeader>
          <DialogTitle className="bg-primary p-5  flex items-center justify-center gap-3 text-white">
            Change Your Password
            <div className="p-2 rounded-full bg-white">
              <LockIcon className="text-primary" size={30} />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Current Password:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showCurrentPassword ? "text" : "password"} 
                          placeholder="Current password" 
                          {...field} 
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage  className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>New Password:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showNewPassword ? "text" : "password"} 
                          placeholder="New password" 
                          {...field} 
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Confirm Password:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm new password" 
                          {...field} 
                        />
                        <button 
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="my-5 w-full flex items-center justify-center">
                <Button
                  className="w-40 font-bold border border-primary bg-white text-primary hover:bg-primary hover:text-white"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? <Loader2Icon className="animate-spin" size={20} /> : "Update Password"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal
