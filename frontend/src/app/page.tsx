import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '../components/features/landing/HeroSection';
import { FAQSection } from '../components/features/landing/FAQSection';
import { FooterHero } from '../components/features/landing/FooterHero';
import { Navbar } from '../components/layout/Navbar';
import { Pricing } from '../components/ui/pricing';
import { PremiumCTA } from '../components/features/landing/PremiumCTA';
import { UseCases } from '../components/features/landing/UseCases';

const pricingPlans = [
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

export const metadata: Metadata = {
  title: 'Prepl — Practice. Improve. Get Hired.',
  description: 'Practice realistic mock interviews, get instant feedback, and walk into every interview with confidence. Calibrate sessions to any job description or company.',
};

export default function Page() {
  return (
    <div className="font-sans min-h-screen bg-[#fbf8f3] text-zinc-900 relative overflow-x-hidden selection:bg-stone-300/40">
      {/* Light Ambient Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        {/* Grain Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />

        <main className="w-full relative z-10 pt-24 pb-0 flex flex-col gap-24 md:gap-32">
          <HeroSection />
          <UseCases />
          <div id="pricing" className="-mb-20 md:-mb-28"><Pricing plans={pricingPlans} title="Free to start. Premium to win." description="Three free sessions to prove the value. Upgrade when you are ready to run unlimited interviews." /></div>
          <FAQSection />
          <div className="flex flex-col gap-0 w-full mt-10 md:mt-10 mb-4">
            <PremiumCTA />
            <FooterHero hideCta={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
