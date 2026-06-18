import type { Metadata } from "next";
import { PricingPageClient } from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing | Prepl",
  description: "Compare Free vs Premium plans for Prepl's autonomous interview preparation platform.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
