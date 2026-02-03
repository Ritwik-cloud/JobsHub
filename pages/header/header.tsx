"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux"; // 1. Import useSelector
import { check_token, handleLoggedout } from "@/redux/slice/authSlice/authSlice"; 
import NavProfile from "@/components/ui/com/navbar-profile/profile"; 
import { AppDispatch, RootState } from "@/redux/store/store"; // 2. Import RootState

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLogin, user } = useSelector((state: RootState) => state.Auth); 
  
  useEffect(() => {
    dispatch(check_token());
  }, [dispatch]);

  // 5. Logout Handler
  const onLogout = () => {
    dispatch(handleLoggedout()); 
    router.push("/auth/login");
    setMobileMenuOpen(false);
  };

  // Helper to get initial for Mobile View
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <header className="relative py-4 md:py-6 backdrop-blur-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="flex rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all hover:scale-105"
              >
                <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  JobsHub
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button + Mobile Profile Preview */}
            <div className="flex lg:hidden items-center gap-4">
              {/* Mobile Header Avatar (Logged In) */}
              {isLogin && user && (
                 <div className="lg:hidden">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                      {userInitial}
                    </div>
                 </div>
              )}
              
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-8 lg:-translate-x-1/2 lg:left-1/2">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 rounded-lg px-4 py-2 hover:text-gray-800"
              >
                Home
              </Link>
              <Link
                href="/pages/contact"
                className="text-sm font-medium text-gray-700 rounded-lg px-4 py-2 hover:text-gray-800"
              >
                Contact Us
              </Link>
              <Link
                href="/pages/about"
                className="text-sm font-medium text-gray-700 rounded-lg px-4 py-2 hover:text-gray-800"
              >
                About
              </Link>
            </nav>

            {/* Desktop CTA Buttons or Profile */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-3">
              {isLogin ? (
                // --- Logged In View ---
                <NavProfile
                  name={user?.name || "User"} 
                  email={user?.email} 
                  role={user?.role} 
                  logOut={onLogout} 
                />
              ) : (
                // --- Logged Out View ---
                <>
                  <Link
                    href="/auth/candidate/register"
                    className="text-sm font-medium text-gray-700 rounded-lg px-4 py-2 hover:text-gray-800"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg shadow-blue-600/30"
                  >
                    LogIn
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-xl font-bold text-blue-600">
                JobsHub
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href="/"
                className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pages/contact"
                className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/pages/about"
                className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-4 mt-4 border-t space-y-2">
                {isLogin ? (
                    // Mobile Logged In View
                    <div className="px-4">
                      <div className="flex items-center gap-3 mb-4">
                          {/* Avatar Circle */}
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {userInitial}
                          </div>
                          
                          <div className="overflow-hidden">
                            <p className="font-semibold text-gray-900 truncate capitalize">{user?.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                          </div>
                      </div>
                      <button
                          onClick={onLogout}
                          className="w-full text-left px-4 py-3 text-base font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Log Out
                      </button>
                    </div>
                ) : (
                    // Mobile Logged Out View
                    <>
                    <Link
                      href="/auth/candidate/register"
                      className="block px-4 py-3 text-base font-medium text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/auth/login"
                      className="block px-4 py-3 text-base font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      LogIn
                    </Link>
                    </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
