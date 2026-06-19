"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterHero } from "@/components/features/landing/FooterHero";
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
    title: "How AI Is Transforming Technical Interviews in 2026",
    excerpt:
      "From resume screening to live coding assessments, autonomous agents are redefining what it means to evaluate engineering talent at scale.",
    coverImage: "/images/blog/ai-interviews.png",
    category: "AI & Hiring",
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
    title: "Behavioral Signals: What Resumes Can't Tell You",
    excerpt:
      "MediaPipe-powered behavioral analysis reveals the soft skills and communication patterns that predict on-the-job success far better than credentials.",
    coverImage: "/images/blog/behavioral-analysis.png",
    category: "Research",
    readTime: "6 min read",
    date: "Jun 5, 2026",
    author: {
      name: "Marcus Webb",
      avatar: "",
      role: "ML Engineer",
    },
  },
  {
    slug: "future-of-autonomous-recruiting",
    title: "The Autonomous Recruiting Pipeline: A 2027 Preview",
    excerpt:
      "We're building a world where hiring happens 24/7 without human bottlenecks. Here's the roadmap and the technology making it possible.",
    coverImage: "/images/blog/future-recruiting.png",
    category: "Vision",
    readTime: "10 min read",
    date: "May 28, 2026",
    author: {
      name: "Alex Rosenberg",
      avatar: "",
      role: "CEO & Co-Founder",
    },
  },
  {
    slug: "building-engineering-culture-that-scales",
    title: "Building an Engineering Culture That Actually Scales",
    excerpt:
      "Lessons from scaling our own team from 3 to 40 engineers — and how Prepl's tooling dogfoods the philosophy we preach.",
    coverImage: "/images/blog/engineering-culture.png",
    category: "Engineering",
    readTime: "7 min read",
    date: "May 20, 2026",
    author: {
      name: "Priya Nair",
      avatar: "",
      role: "VP of Engineering",
    },
  },
  {
    slug: "reducing-bias-in-automated-screening",
    title: "Reducing Bias in Automated Screening: Our Approach",
    excerpt:
      "How we audit our AI models for fairness, the metrics we track, and the hard trade-offs between speed and equity in autonomous hiring.",
    coverImage: "/images/blog/diversity-hiring.png",
    category: "Ethics & AI",
    readTime: "9 min read",
    date: "May 14, 2026",
    author: {
      name: "Jordan Lee",
      avatar: "",
      role: "Head of AI Ethics",
    },
  },
  {
    slug: "hiring-metrics-that-matter",
    title: "The Only 5 Hiring Metrics That Actually Matter",
    excerpt:
      "Time-to-hire is vanity. Quality-of-hire is sanity. We break down which numbers to track and which to ignore in modern technical recruiting.",
    coverImage: "/images/blog/hiring-metrics.png",
    category: "Strategy",
    readTime: "5 min read",
    date: "May 6, 2026",
    author: {
      name: "Elena Torres",
      avatar: "",
      role: "Customer Success",
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
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white text-xs font-bold shrink-0 ring-2 ring-zinc-800`}
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
      className="group col-span-full relative rounded-2xl overflow-hidden border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-500"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/80" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="relative flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-black">
          <span className="text-xs font-mono tracking-wider text-primary/80 uppercase mb-3">
            Featured Post
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
            {post.title}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <AuthorAvatar name={post.author.name} />
              <div>
                <p className="text-sm font-semibold text-zinc-200">
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
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5" />
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
      className="group relative rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700/70 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-500 flex flex-col"
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
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
          {/* Category Pill */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
            <div className="flex items-center gap-2.5">
              <AuthorAvatar name={post.author.name} />
              <div>
                <p className="text-xs font-semibold text-zinc-300">
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
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
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
    <div className="font-sans min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-stone-500/50">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-black">
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
          }}
        />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px]" />
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
                  className="inline-block text-xs font-mono tracking-[0.2em] text-primary/70 uppercase mb-3"
                >
                  Prepl Blog
                </motion.span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Insights & Ideas
                </h1>
                <p className="mt-3 text-lg text-zinc-400 max-w-xl leading-relaxed">
                  Explore the latest in autonomous hiring, AI-driven screening,
                  and building high-performance engineering teams.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="blog-search"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-zinc-600 font-medium"
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
                      ? "bg-primary/15 text-primary border-primary/40"
                      : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
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
                  className="mt-4 text-primary hover:text-primary/80 text-sm font-semibold transition-colors cursor-pointer"
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

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-20 rounded-2xl border border-zinc-800/60 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-violet-500/[0.04]" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                    Stay ahead of the curve
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Get weekly insights on AI hiring, engineering culture, and
                    product updates delivered to your inbox.
                  </p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@company.com"
                    className="flex-1 md:w-64 bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-zinc-600 font-medium"
                  />
                  <div className="shrink-0 bg-gradient-to-b from-stone-400/30 to-transparent p-[3px] rounded-xl inline-flex">
                    <button className="group p-[3px] rounded-[10px] bg-gradient-to-b from-stone-400 to-stone-500 shadow-[0_3px_6px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(96,165,250,0.3)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
                      <div className="bg-gradient-to-b from-stone-50 to-stone-200 rounded-[7px] px-5 py-2.5 flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm whitespace-nowrap">
                          Subscribe
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <FooterHero hideCta />
        </main>
      </div>
    </div>
  );
}
