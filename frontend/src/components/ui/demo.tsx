"use client";

import { motion } from "framer-motion";

import { Pricing } from "@/components/ui/pricing";

export function PricingDemo() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(to_bottom,#050505,#0a0a0e_45%,#050505)]" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Pricing />
      </motion.div>
    </div>
  );
}

export default PricingDemo;
