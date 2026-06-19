import type { Metadata } from "next";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Prepl",
  description:
    "Explore insights on autonomous hiring, AI-driven technical screening, and building high-performance engineering teams.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
