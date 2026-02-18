"use client";
import React, { useState, useRef, useEffect, memo } from 'react';
import { createPortal } from 'react-dom'; // 1. Import createPortal
import { LogOut, ChevronDown, User, Settings } from 'lucide-react';
import Link from 'next/link';

export interface ProfileProps {
  name: string;
  email: string;
  role?: string;
  logOut: () => void;
}

const NavProfile: React.FC<ProfileProps> = ({ name, email, role, logOut }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button
  const [coords, setCoords] = useState({ top: 0, left: 0 }); // State for position

  const initial = name ? name.charAt(0).toUpperCase() : "U";

  // Calculate position when opening
  const toggleProfile = () => {
    if (!isProfileOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Position: Top is button bottom + scrollY + spacing, Right aligned
      setCoords({
        top: rect.bottom + window.scrollY + 8, 
        left: rect.right + window.scrollX - 288 // 288 is w-72 (width of dropdown)
      });
    }
    setIsProfileOpen(!isProfileOpen);
  };

  // Close on resize to prevent floating menu in wrong place
  useEffect(() => {
    const handleResize = () => setIsProfileOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard click outside and escape listeners...
  useEffect(() => {
     // ... (Keep your existing click outside logic if needed, or rely on the overlay)
  }, []);


  return (
    <>
      <button
        ref={buttonRef} // Attach Ref here
        onClick={toggleProfile}
        className="flex items-center space-x-2 p-1.5 pr-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isProfileOpen}
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
          {initial}
        </div>
        <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[100px] truncate capitalize">
          {name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* RENDER PORTAL DIRECTLY TO BODY */}
      {isProfileOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Transparent Overlay to handle clicking outside */}
          <div 
            className="fixed inset-0 z-[9998] bg-transparent" 
            onClick={() => setIsProfileOpen(false)} 
          />

          {/* The Dropdown Menu */}
          <div 
            style={{ 
              top: coords.top, 
              left: coords.left,
              position: 'absolute' 
            }}
            className="w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[9999] animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="px-4 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 truncate capitalize">{name}</div>
                  <div className="text-xs text-gray-500 truncate">{email}</div>
                  {role && <div className="text-[10px] uppercase font-bold text-blue-600 mt-0.5">{role}</div>}
                </div>
              </div>
            </div>

            <div className="py-2">
               <Link 
                 href={role === 'candidate' ? "/candidate/dashboard" : "/recruiter/dashboard"} 
                 className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                 onClick={() => setIsProfileOpen(false)}
               >
                 <User className="w-4 h-4" />
                 <span>Dashboard</span>
               </Link>
               <Link 
                 href="/settings"
                 className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                 onClick={() => setIsProfileOpen(false)}
               >
                 <Settings className="w-4 h-4" />
                 <span>Settings</span>
               </Link>
            </div>

            <div className="border-t border-gray-100 pt-2 mt-1">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  logOut();
                }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>,
        document.body // This puts it at the end of the <body> tag
      )}
    </>
  );
};

export default memo(NavProfile);
