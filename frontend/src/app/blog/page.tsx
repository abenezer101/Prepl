import type { Metadata } from "next";
import { BlogPageClient } from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Prepl",
  description:
    "Explore the latest insights on mock interview preparation, AI-driven feedback, and career growth.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
