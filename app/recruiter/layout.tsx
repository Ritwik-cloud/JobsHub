"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Cookies, useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { recruiterProfile } from "@/redux/slice/recruiterSlice/recruiterSlice";
import { RecruiterProfileData } from "@/typeScript/recruiter_interface/recruiter.interface";

const navigation = [
  { name: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { name: "Company", href: "/recruiter/company", icon: Users },
  { name: "Jobs", href: "/recruiter/jobs", icon: Briefcase },
  { name: "Recruiters", href: "/recruiter/manage-recruiter", icon: Calendar },
];

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const cookie = new Cookies();
  // Using useCookies hook
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "userId",
    "userData",
  ]);


  const { recruiterProfileData } = useSelector(
    (state: RootState) => state.Recruiter,
  ) as { recruiterProfileData: RecruiterProfileData };

  //  Fetch profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(recruiterProfile());
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };

    fetchData();
  }, [dispatch]);

  //  Extract profile info
  const profileData = recruiterProfileData || {};
  const name = profileData.name || "Recruiter";
  const email = profileData.email || "";
  const designation = profileData.recruiterProfile?.designation || "Recruiter";
  const profilePicture = `http://localhost:3005/${profileData.profilePicture}`;

  console.log(profilePicture, "profilePic");

  //  Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    removeCookie("userId", { path: "/" });
    removeCookie("userData", { path: "/" });

    
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <Link href="/recruiter/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">JobsHub</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section (Bottom of Sidebar) */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profilePicture} alt={name} />
              <AvatarFallback className="bg-blue-600 text-white text-sm">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {name}
              </p>
              <p className="text-xs text-gray-500 truncate">{designation}</p>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button - Left side */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search - Commented out */}
          {/* <div className="flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search candidates, jobs..."
          className="pl-9"
        />
      </div>
    </div> */}

          {/* Right section - Notifications and User menu */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={profilePicture} alt={name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                    <p className="text-xs text-blue-600 font-medium">
                      {designation}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/recruiter/profile")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
