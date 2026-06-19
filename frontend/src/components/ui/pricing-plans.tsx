"use client";

import { motion } from "framer-motion";

import { Pricing } from "@/components/ui/pricing";

const demoPlans = [
  {
    name: "FREE",
    price: "0",
    yearlyPrice: "0",
    period: "month",
    features: [
      "3 mock practice sessions per month",
      "Full AI interviewer (voice + video)",
      "Post-session performance report",
      "Behavioral analysis (MediaPipe)",
      "Growth recommendations",
      "Universal accessibility suite",
      "Session calibration (target role or pasted JD)",
    ],
    description: "For anyone preparing for a job interview",
    buttonText: "Start Free",
    href: "/signup",
    isPopular: false,
    learnMoreHref: "/pricing",
  },
  {
    name: "PREMIUM",
    price: "19",
    yearlyPrice: "19",
    period: "month",
    features: [
      "Unlimited mock practice sessions",
      "Company-specific calibration",
      "Custom session generation",
      "Multi-industry practice tracks",
      "Historical performance tracking",
      "Cross-session improvement analytics",
      "Comparison to anonymized benchmarks",
      "Export reports & priority generation",
    ],
    description: "For active job seekers running multi-company searches",
    buttonText: "Upgrade to Premium",
    href: "/signup",
    isPopular: true,
    learnMoreHref: "/pricing",
  },
  {
    name: "ENTERPRISE",
    price: "0",
    yearlyPrice: "0",
    period: "month",
    features: [
      "Everything in Premium",
      "SSO / SAML authentication",
      "Dedicated account manager",
      "Custom integrations & API access",
      "White-label / branded experience",
      "Custom evaluation frameworks",
      "SLA agreement & priority support",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Talk to Sales",
    href: "/contact",
    isPopular: false,
    learnMoreHref: "/pricing",
    isEnterprise: true,
  },
];

export function PricingDemo() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%),linear-gradient(to_bottom,#050505,#0a0a0e_45%,#050505)]" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Pricing plans={demoPlans} />
      </motion.div>
    </div>
  );
}

export default PricingDemo;
