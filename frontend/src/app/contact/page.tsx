import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Prepl",
  description: "Get in touch with Prepl support, integrations, and partnerships teams.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
