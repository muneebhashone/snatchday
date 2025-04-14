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

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();
  const { user } = useUserContext();
  const { socket } = useSocket();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        socket.emit("logout");
        document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        localStorage.removeItem("snatchday_user");

        router.push("/admin/login");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-white/15 shadow-md">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-500 hover:text-primary" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-80 bg-gray-50 text-gray-900 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-gray-500 hover:text-primary"
                  >
                    <BellDot className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>

              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl ring-2 ring-gray-100"
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {user?.user?.name}
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
          </div>
        </header>
        <div className="bg-white/20 min-h-screen p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
