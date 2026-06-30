"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  CreditCard,
  Accessibility,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const { userName, userEmail, handleLogout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <header className="flex items-center bg-transparent border-none">
      {/* Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className={`flex items-center gap-1.5 p-1 pr-2 rounded-full bg-zinc-100/85 hover:bg-zinc-200/60 transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${
            isProfileOpen ? 'bg-zinc-200/80' : ''
          }`}
        >
          {/* Avatar frame */}
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-zinc-600 border border-zinc-200 shrink-0">
            <User className="w-4 h-4" />
          </div>
          {/* Chevron Down */}
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
            isProfileOpen ? 'rotate-180 text-zinc-600' : ''
          }`} />
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 mt-1 w-64 bg-white border border-zinc-200 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-50 overflow-hidden"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-zinc-900">{userName}</span>
                  <span className="text-xs text-zinc-500 truncate">{userEmail}</span>
                </div>
              </div>
              <div className="h-px bg-zinc-100" />
              <div className="p-1.5 space-y-0.5">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 rounded-md hover:bg-zinc-50 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-zinc-400" />
                  Settings
                </Link>
                <Link
                  href="/dashboard/billing"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 rounded-md hover:bg-zinc-50 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-zinc-400" />
                  Billing
                </Link>
                <Link
                  href="/dashboard/accessibility"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 rounded-md hover:bg-zinc-50 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                >
                  <Accessibility className="w-4 h-4 text-zinc-400" />
                  Accessibility Hub
                </Link>
                <div className="h-px bg-zinc-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-zinc-500 hover:text-rose-500 rounded-md hover:bg-rose-50 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
