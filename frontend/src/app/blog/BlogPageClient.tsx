"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterHero } from "@/components/features/landing/FooterHero";
import { PremiumCTA } from "@/components/features/landing/PremiumCTA";
import { Clock, ArrowRight, Tag, Search } from "lucide-react";

/* ─── Blog Post Data ─── */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: "how-ai-is-transforming-technical-interviews",
    title: "How AI Is Transforming Interview Preparation in 2026",
    excerpt:
      "From real-time feedback loops to company-specific calibration, AI interview coaches are giving candidates the tools to prepare more effectively than ever.",
    coverImage: "/images/blog/ai-interviews.png",
    category: "AI & Prep",
    readTime: "8 min read",
    date: "Jun 12, 2026",
    author: {
      name: "Sarah Chen",
      avatar: "",
      role: "Head of Product",
    },
    featured: true,
  },
  {
    slug: "behavioral-signals-beyond-the-resume",
    title: "Understanding Behavioral Signals: What Interviewers Watch For",
    excerpt:
      "Non-verbal patterns like pacing, expression, and structural clarity predict success. Learn how to calibrate your responses using modern feedback tools.",
    coverImage: "/images/blog/behavioral-analysis.png",
    category: "Communication",
    readTime: "6 min read",
    date: "Jun 5, 2026",
    author: {
      name: "Marcus Webb",
      avatar: "",
      role: "ML Engineer",
    },
  },
  {
    slug: "overcoming-interview-anxiety",
    title: "Overcoming Interview Anxiety: The Power of Simulated Practice",
    excerpt:
      "The best way to handle pressure is to build muscle memory. Discover how mock interview simulations prepare you for conversational dynamics.",
    coverImage: "/images/blog/future-recruiting.png",
    category: "Coaching",
    readTime: "7 min read",
    date: "May 28, 2026",
    author: {
      name: "Alex Rosenberg",
      avatar: "",
      role: "Career Coach",
    },
  },
  {
    slug: "structuring-behavioral-answers-with-star",
    title: "Mastering the STAR Method: Structure Your Way to Success",
    excerpt:
      "A deep dive into how to lay out the Situation, Task, Action, and Result for complex behavioral questions without getting lost in details.",
    coverImage: "/images/blog/engineering-culture.png",
    category: "Frameworks",
    readTime: "7 min read",
    date: "May 20, 2026",
    author: {
      name: "Priya Nair",
      avatar: "",
      role: "VP of Engineering",
    },
  },
  {
    slug: "preparing-for-technical-questions",
    title: "How to Explain Complex Technical Choices Under Pressure",
    excerpt:
      "Interviewers care about your reasoning process, not just memorized solutions. Learn how to walk through system design and architecture clearly.",
    coverImage: "/images/blog/diversity-hiring.png",
    category: "Technical",
    readTime: "9 min read",
    date: "May 14, 2026",
    author: {
      name: "Jordan Lee",
      avatar: "",
      role: "Technical Lead",
    },
  },
  {
    slug: "essential-mock-interview-metrics",
    title: "The 3 Mock Interview Metrics That Predict Real Success",
    excerpt:
      "Pacing, clarity of action, and structured explanations. We break down the key data indicators you need to monitor to prepare for live rounds.",
    coverImage: "/images/blog/hiring-metrics.png",
    category: "Strategy",
    readTime: "5 min read",
    date: "May 6, 2026",
    author: {
      name: "Elena Torres",
      avatar: "",
      role: "Success Coach",
    },
  },
];

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

/* ─── Author Avatar Fallback ─── */
function AuthorAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const colors = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-amber-500 to-orange-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-cyan-500 to-sky-600",
  ];
  const colorIndex =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    colors.length;
  return (
    <div
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-white`}
    >
      {initials}
    </div>
  );
}

/* ─── Featured Post Card ─── */
function FeaturedCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group col-span-full relative rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:border-zinc-300 transition-all duration-500 shadow-sm"
    >
      <Link href={`/blog/${post.slug}`} className="grid md:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className="relative h-64 md:h-[420px] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/30" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-zinc-800 border border-zinc-200 shadow-sm backdrop-blur-md">
              <Tag className="w-3 h-3 text-zinc-500" />
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="relative flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/30">
          <span className="text-xs font-mono tracking-wider text-zinc-500 uppercase mb-3">
            Featured Post
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight mb-4 group-hover:text-zinc-600 transition-colors duration-300 leading-tight">
            {post.title}
          </h2>
          <p className="text-zinc-650 text-base md:text-lg leading-relaxed mb-6 line-clamp-3 font-normal">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <AuthorAvatar name={post.author.name} />
              <div>
                <p className="text-sm font-semibold text-zinc-800">
                  {post.author.name}
                </p>
                <p className="text-xs text-zinc-500">{post.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </div>
          </div>
          {/* Hover arrow */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-zinc-900 group-hover:bg-zinc-50 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-950 transition-colors duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ─── Regular Post Card ─── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.15 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50/50 transition-all duration-500 flex flex-col shadow-sm"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Cover Image */}
        <div className="relative h-48 md:h-52 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-80" />
          {/* Category Pill */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-zinc-800 border border-zinc-200 shadow-sm backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-zinc-900 tracking-tight mb-2 group-hover:text-zinc-600 transition-colors duration-300 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-zinc-650 leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-150">
            <div className="flex items-center gap-2.5">
              <AuthorAvatar name={post.author.name} />
              <div>
                <p className="text-xs font-semibold text-zinc-800">
                  {post.author.name}
                </p>
                <p className="text-[11px] text-zinc-500">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-zinc-500">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-zinc-500/5 via-transparent to-transparent" />
      </Link>
    </motion.article>
  );
}

/* ─── Main Blog Page ─── */
export function BlogPageClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="font-sans min-h-screen bg-[#fbf8f3] text-zinc-900 relative overflow-x-hidden selection:bg-stone-300/40">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbf8f3]">
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-stone-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar />

        <main className="w-full relative z-10 pt-32 pb-0">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-6 mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase mb-3"
                >
                  Prepl Blog
                </motion.span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                  Insights & Ideas
                </h1>
                <p className="mt-3 text-lg text-zinc-650 max-w-xl leading-relaxed">
                  Explore the latest in interview preparation, AI-driven feedback, and building the confidence to land your next role.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  id="blog-search"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-zinc-200 text-zinc-900 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition-all placeholder:text-zinc-400 font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-600 border-zinc-200 hover:text-zinc-900 hover:border-zinc-400 shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <div className="max-w-7xl mx-auto px-6 pb-24">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-zinc-500 text-lg">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-zinc-800 hover:text-zinc-950 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Featured Post (full width) */}
                {featured && <FeaturedCard post={featured} index={0} />}

                {/* Regular Posts */}
                {regular.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Global Premium CTA */}
          <div className="flex flex-col gap-0 w-full mt-20 mb-0">
            <PremiumCTA />
            <FooterHero hideCta={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
