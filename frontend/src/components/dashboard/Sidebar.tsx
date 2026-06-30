"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  IconPlus,
  IconHome,
  IconBriefcase,
  IconHistory,
  IconChartLine,
  IconHelpCircle,
  IconBookmark,
  IconAccessible,
  IconCreditCard,
  IconSettings,
} from '@tabler/icons-react';

interface SidebarProps {
  onNewSession: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const GROUPS = [
  {
    label: 'Mock Arena',
    items: [
      { label: 'Home',               icon: IconHome,            href: '/dashboard' },
      { label: 'Custom Job Warmups', icon: IconBriefcase,       href: '/dashboard/warmups' },
    ],
  },
  {
    label: 'Hiring Intel',
    items: [
      { label: 'Session History',     icon: IconHistory,   href: '/dashboard/history' },
      { label: 'Performance',         icon: IconChartLine, href: '/dashboard/telemetry' },
    ],
  },
  {
    label: 'Personal Library',
    items: [
      { label: 'Vetted Questions', icon: IconHelpCircle, href: '/dashboard/questions' },
      { label: 'Saved Sessions',   icon: IconBookmark,   href: '/dashboard/saved' },
    ],
  },
];

const BOTTOM_ITEMS = [
  { label: 'Accessibility Hub',  icon: IconAccessible, href: '/dashboard/accessibility' },
  { label: 'Premium Billing',    icon: IconCreditCard, href: '/dashboard/billing' },
  { label: 'Settings',           icon: IconSettings,   href: '/dashboard/settings' },
];

export default function Sidebar({ onNewSession, isOpen = true, onClose, onOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <aside className="w-full h-full bg-white flex flex-col shrink-0 overflow-hidden">

      {/* ── Brand & Collapse ─────────────────────────────────────────── */}
      <div className="pt-10 pb-2.5 flex items-center min-h-[72px] w-[230px]">
        <div className="w-[72px] flex-shrink-0 flex justify-center items-center">
          {isOpen ? (
            <div className="w-9 h-9 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/square-logo.png"
                width={36} height={36}
                alt="Prepl logo"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          ) : (
            <button
              onClick={onOpen}
              className="group relative w-9 h-9 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center group-hover:hidden">
                <Image src="/images/square-logo.png" width={36} height={36} alt="Prepl logo" style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="absolute inset-0 items-center justify-center text-zinc-500 hidden group-hover:flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 3v18m5-12l3 3l-3 3" />
                  </g>
                </svg>
              </div>
            </button>
          )}
        </div>

        <div className="flex-1 flex items-center justify-between pr-5 min-w-0">
          <span className="text-lg font-bold tracking-tight text-zinc-900 truncate">Prepl</span>
          {isOpen && onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-all cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none" />
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 3v18m7-6l-3-3l3-3" />
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>

      {/* ── New Session CTA (Tactile Prepl Button Theme) ───────────────── */}
      <div className="px-4 pt-3.5 pb-2">
        <div className="bg-gradient-to-b from-zinc-300/40 to-transparent p-[2px] rounded-xl inline-flex w-full">
          <button
            onClick={onNewSession}
            className="group w-full p-[1px] rounded-xl bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-[0_2px_4px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
          >
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-white rounded-[10px] py-2 flex items-center justify-start hover:from-zinc-800 hover:to-zinc-900 transition-all duration-300 min-h-[36px] pl-[9px] pr-3">
              <IconPlus size={16} stroke={2.75} className="shrink-0" />
              <span
                className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-left font-semibold text-xs leading-none ${
                  isOpen ? 'opacity-100 max-w-[125px] ml-2' : 'opacity-0 max-w-0 ml-0'
                }`}
              >
                New Session
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ── Main Navigation (scrollable) ─────────────────────────────── */}
      <nav className="flex-1 px-3 pt-3 overflow-y-auto min-h-0">
        <div>
          {GROUPS.map((group) => {
            const hasHeader = group.label !== 'Hiring Intel';
            return (
              <div 
                key={group.label}
                className={group.label === 'Personal Library' ? 'mt-5' : ''}
              >
                {/* Group Label - Skip Rendering 'Hiring Intel' only */}
                {hasHeader && (
                  <p
                    className={`px-3 text-[9.5px] font-bold uppercase tracking-[0.18em] text-zinc-400 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                      isOpen ? 'opacity-100 max-h-8 mb-1.5' : 'opacity-0 max-h-0 mb-0'
                    }`}
                  >
                    {group.label}
                  </p>
                )}
                {/* Adjust spacing/separator visually for collapsed state if label is hidden */}
                {group.label === 'Hiring Intel' && !isOpen && (
                  <div className="border-t border-zinc-100/60 my-2 mx-1" />
                )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center pl-[15px] pr-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors duration-200 overflow-hidden ${
                        active
                          ? 'bg-zinc-100 text-zinc-900 font-semibold'
                          : 'text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer'
                      }`}
                    >
                      <Icon size={18} stroke={active ? 2.2 : 1.8} className="shrink-0 animate-none" />
                      <span
                        className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-left ${
                          isOpen ? 'opacity-100 max-w-[150px] ml-3' : 'opacity-0 max-w-0 ml-0'
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </nav>

      {/* ── Bottom Preferences Group (fixed) ─────────────────────────── */}
      <div className="border-t border-zinc-100 py-1.5 space-y-0.5 shrink-0 px-3">
        {BOTTOM_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center pl-[15px] pr-3 py-2.5 text-[13px] font-medium transition-colors duration-200 overflow-hidden rounded-lg ${
                active
                  ? 'bg-zinc-100 text-zinc-900 font-semibold'
                  : 'text-zinc-650 hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer'
              }`}
            >
              <Icon size={18} stroke={active ? 2.2 : 1.8} className="shrink-0" />
              <span
                className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden text-left ${
                  isOpen ? 'opacity-100 max-w-[150px] ml-3' : 'opacity-0 max-w-0 ml-0'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
