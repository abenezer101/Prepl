"use client";

import React from 'react';
import {
  Plus,
  LayoutDashboard,
  BarChart2,
  Clock,
  Settings,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
  onNewSession: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: true },
  { label: 'History', icon: Clock, href: '#', disabled: true },
  { label: 'Analytics', icon: BarChart2, href: '#', disabled: true },
];

export default function Sidebar({ onNewSession, isOpen = true, onClose, onOpen }: SidebarProps) {
  return (
    <aside className="w-full h-full bg-white flex flex-col shrink-0">
      {/* Brand & Collapse Button */}
      <div className="pt-10 pb-2.5 flex items-center min-h-[72px] w-[230px] group/brand">
        {/* Logo container - always 72px wide, centering the logo at 36px */}
        <div className="w-[72px] flex-shrink-0 flex justify-center items-center">
          {isOpen ? (
            <div className="w-9 h-9 flex items-center justify-center overflow-hidden cursor-pointer">
              <Image
                src="/images/square-logo.png"
                width={36}
                height={36}
                alt="Prepl logo"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          ) : (
            <button
            onClick={onOpen}
            className="group relative w-9 h-9 flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {/* Prepl Logo (Default state) */}
            <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
              <Image
                src="/images/square-logo.png"
                width={36}
                height={36}
                alt="Prepl logo"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>

            {/* Open Sidebar Icon (Hover state) */}
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 hidden group-hover:flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18m5-12l3 3l-3 3" />
                </g>
              </svg>
            </div>
          </button>
          )}
        </div>

        {/* Brand Text & Collapse Button area */}
        <div className="flex-1 flex items-center justify-between pr-5 min-w-0">
          <span className="text-lg font-bold tracking-tight text-zinc-900 truncate">
            Prepl
          </span>
          {isOpen && onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18m7-6l-3-3l3-3" />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* New Session CTA */}
      <div className="px-4 pt-3.5 pb-2">
        <button
          onClick={onNewSession}
          className="w-full h-10 bg-zinc-900 text-white rounded-lg font-semibold flex items-center transition-all shadow-sm cursor-pointer text-[13px] pl-3 pr-4 overflow-hidden"
        >
          <Plus className="w-4 h-4 shrink-0" strokeWidth={2.75} />
          <span
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-left pl-5.75 ${
              isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 pl-0'
            }`}
          >
            New Session
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.disabled ? undefined : item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all overflow-hidden ${
                  item.active
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : item.disabled
                    ? 'text-zinc-400 cursor-default'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer'
                }`}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <span
                  className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-left pl-3 ${
                    isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                  }`}
                >
                  {item.label}
                </span>
                {isOpen && item.disabled && (
                  <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-100 px-1 py-0.5 rounded shrink-0">
                    Soon
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Collections Section */}
        <div className="mt-5">
          <p
            className={`px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-all duration-300 whitespace-nowrap overflow-hidden ${
              isOpen ? 'opacity-100 h-auto mb-2' : 'opacity-0 h-0 mb-0'
            }`}
          >
            Collections
          </p>
          {!isOpen && <div className="border-t border-zinc-100/60 my-3 mx-1" />}
          <div className="space-y-0.5">
            <div className="flex items-center rounded-lg text-[13px] text-zinc-400 cursor-default overflow-hidden pl-4 pr-3 py-2">
              <div className="w-4 h-4 rounded bg-zinc-100 border border-zinc-200 shrink-0" />
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-left pl-3.5 ${
                  isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                Mock Interviews
              </span>
            </div>
            <div className="flex items-center rounded-lg text-[13px] text-zinc-400 cursor-default overflow-hidden pl-4 pr-3 py-2">
              <div className="w-4 h-4 rounded bg-zinc-100 border border-zinc-200 shrink-0" />
              <span
                className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-left pl-3.5 ${
                  isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                Saved Sessions
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-zinc-100 py-1.5 space-y-0.5">
        <a
          href="#"
          className="flex items-center py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer transition-all group overflow-hidden pl-[27px] pr-5"
        >
          <Settings className="w-[18px] h-[18px] shrink-0" />
          <span
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-left pl-3 ${
              isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}
          >
            Settings
          </span>
          {isOpen && (
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          )}
        </a>
        <a
          href="#"
          className="flex items-center py-2.5 text-[13px] font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer transition-all group overflow-hidden pl-[27px] pr-5"
        >
          <HelpCircle className="w-[18px] h-[18px] shrink-0" />
          <span
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden text-left pl-3 ${
              isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}
          >
            Help & Support
          </span>
          {isOpen && (
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          )}
        </a>
      </div>
    </aside>
  );
}
