"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
  BellDot, 
  Globe, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from "lucide-react"
import { 
DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/api"
const AdminLayout = ({children}: {children: React.ReactNode}) => {

  const router = useRouter();
  const { mutate: logout ,isPending} = useLogout();

  const handleLogout = async () => {
    try {
      await logout(undefined, {
        onSuccess: () => {
          localStorage.removeItem('snatchday_user');
          router.push('/admin/login');
        }
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between gap-2 px-4 w-full">
          <div className="flex items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            {/* Bell notification icon with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellDot className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="max-h-80 overflow-auto">
                  <DropdownMenuItem className="flex items-start gap-2 p-3 cursor-pointer">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">New category added</p>
                      <p className="text-sm text-muted-foreground">Audio devices category has been added successfully</p>
                      <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="flex items-start gap-2 p-3 cursor-pointer">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Category update pending</p>
                      <p className="text-sm text-muted-foreground">Headphones category update is awaiting approval</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="flex items-start gap-2 p-3 cursor-pointer">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Category deletion failed</p>
                      <p className="text-sm text-muted-foreground">Unable to delete DVD Players category due to linked products</p>
                      <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-center cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Globe/>
            <Button onClick={handleLogout}>Logout <LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>
      <div className="p-4 pt-0">
        
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default AdminLayout