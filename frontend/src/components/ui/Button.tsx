"use client";

import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const navSpring = { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 } as const;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  if (isPrimary) {
    return (
      <motion.div 
        whileTap={disabled ? {} : { scale: 0.98 }} 
        className={`bg-gradient-to-b from-stone-400/30 to-transparent p-[1px] rounded-full inline-flex ${className}`}
      >
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className="group p-[1.5px] rounded-full bg-gradient-to-b from-stone-400 to-stone-500 shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] active:shadow-[0_0px_1px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          <div className={`bg-gradient-to-b from-stone-50 to-stone-200 rounded-full flex gap-2 items-center justify-center text-stone-900 font-semibold leading-none ${sizeClasses[size]}`}>
            {children}
          </div>
        </button>
      </motion.div>
    );
  } else {
    return (
      <motion.div 
        whileTap={disabled ? {} : { scale: 0.98 }} 
        className={`bg-gradient-to-b from-zinc-800/40 to-transparent p-[1px] rounded-full inline-flex ${className}`}
      >
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className="group p-[1.5px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          <div className={`bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-full flex gap-2 items-center justify-center text-white font-semibold leading-none ${sizeClasses[size]}`}>
            {children}
          </div>
        </button>
      </motion.div>
    );
  }
}
