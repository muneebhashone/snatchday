"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BellDot, Search, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/api";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();
  const { user } = useUserContext();
  const { socket } = useSocket();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        socket.emit("logout");
        localStorage.removeItem("snatchday_user");
        router.push("/admin/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  useEffect(() => {
    const header = document.getElementById('admin-header');
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header?.classList.add('shadow-lg');
        header?.classList.add('bg-white');
      } else {
        header?.classList.remove('shadow-lg');
        header?.classList.remove('bg-white');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SidebarProvider className="!bg-gray-100 gap-10">
      <AppSidebar />
      {/* <SidebarInset className="!bg-gray-100"> */}
      <div className="bg-gray-100 container w-[80%] mr-auto">
        <header className="bg-gray-100 sticky top-0 right-0 z-50 transition-shadow duration-300" 
          id="admin-header"
        >
          <div className="flex items-center justify-end px-8 py-4">
            {/* <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-500 hover:text-primary" />
            
            </div> */}

            
          

              <div className="flex items-center gap-3">
              
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {user?.name || user?.user?.name}
                  </p>
                  <p className="text-gray-500">Admin</p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-500 hover:text-primary gap-2"
              >
                {isPending ? "Logging out..." : "Logout"}
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          
        </header>
        <div className="bg-gray-100 min-h-screen">{children}</div>
      </div>
      {/* </SidebarInset> */}
    </SidebarProvider>
  );
};

export default AdminLayout;
