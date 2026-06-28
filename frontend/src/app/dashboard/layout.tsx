"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { motion, AnimatePresence } from 'motion/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white text-zinc-900 font-sans selection:bg-stone-300/40">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-multiply"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* Body — sidebar + content */}
      <div className="flex flex-1 overflow-hidden relative z-10 bg-white">
        {/* Mobile Drawer (Only visible on mobile screens) */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[59] lg:hidden"
                transition={{ duration: 0.2 }}
              />
              {/* Drawer Container */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 bottom-0 h-full w-[230px] bg-white z-[60] shadow-2xl lg:hidden flex flex-col"
              >
                <Sidebar
                  isOpen={true}
                  onClose={() => setIsMobileDrawerOpen(false)}
                  onOpen={() => {}}
                  onNewSession={() => {
                    window.dispatchEvent(new CustomEvent('dashboard:new-session'));
                    setIsMobileDrawerOpen(false);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
 
        {/* Sidebar — animated width, hidden on mobile */}
        <motion.div
          animate={{ width: isSidebarOpen ? 230 : 72 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="hidden lg:block h-full bg-white overflow-hidden shrink-0"
        >
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onOpen={() => setIsSidebarOpen(true)}
            onNewSession={() => {
              window.dispatchEvent(new CustomEvent('dashboard:new-session'));
            }}
          />
        </motion.div>

        {/* Right content area (Header + Main Dashboard) */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white relative">
          {/* Transparent, borderless header at the top right */}
          <div className="flex justify-end items-center px-6 pt-0.5 pb-3.5 relative">
            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 active:bg-zinc-200/50 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18m5-12l3 3l-3 3" />
                </g>
              </svg>
            </button>
            <Header />
          </div>

          {/* Main containerized dashboard */}
          <div className="flex-1 pb-1 pr-0 flex flex-col overflow-hidden bg-white -mt-3">
            <main className="dashboard-main-container flex-1 bg-[#fbf8f3] rounded-tl-lg rounded-bl-lg border-t border-l border-b border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
