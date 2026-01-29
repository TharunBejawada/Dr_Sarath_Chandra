"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { API_URL } from "../../config";

// --- TYPES ---
interface ExtraField {
  heading: string;
  description: string;
}

interface BlogPost {
  blogId: string;
  blogTitle: string;
  timeline: string; // "2025-11-30"
  blogImage: string;
  categories: string[];
  url: string;
  extraFields: ExtraField[];
}

export default function LatestBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // --- HELPER: Strip HTML & Decode Entities for Excerpt ---
  const getExcerpt = (htmlContent: string) => {
    if (!htmlContent) return "";

    // 1. Remove HTML tags
    let text = htmlContent.replace(/<[^>]+>/g, ' ');

    // 2. Decode common HTML entities manually
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // 3. Remove extra whitespace
    text = text.replace(/\s+/g, ' ').trim();

    // 4. Truncate
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  // --- HELPER: Calculate Read Time ---
  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} min read`;
  };

  // --- FETCH & SORT DATA ---
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${API_URL}/api/blogs/getAllBlogs`);
        const data = await res.json();

        // data.Items usually contains the array in DynamoDB/SST responses. 
        // If your API returns the array directly, remove .Items
        const items: BlogPost[] = data.Items || data || [];

        // Sort: Newest First
        const sorted = items.sort((a, b) => 
          new Date(b.timeline).getTime() - new Date(a.timeline).getTime()
        );

        // Take Top 4
        setBlogs(sorted.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white flex justify-center items-center min-h-[600px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#A62B2B]" />
      </section>
    );
  }

  // If no blogs found, hide section or show message
  if (blogs.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header Row: Title + 'View All' Button */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#A62B2B] text-xs font-bold uppercase tracking-widest mb-4"
            >
              Health Insights
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Latest from Our <span className="text-[#A62B2B]">Blog</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg"
            >
              Stay informed with expert insights on heart health, treatments, and preventive care.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:border-[#A62B2B] hover:text-[#A62B2B] transition-colors"
            >
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((post, i) => {
            
            // Data Preparation
            const category = post.categories && post.categories.length > 0 ? post.categories[0] : "General";
            const dateStr = new Date(post.timeline).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });
            const rawDescription = post.extraFields?.[0]?.description || "";
            const excerpt = getExcerpt(rawDescription);
            const readTime = calculateReadTime(rawDescription);

            return (
              <motion.article
                key={post.blogId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} // Stagger effect
                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative h-48 bg-[#FDF2F2] overflow-hidden">
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-[#A62B2B] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                      {category}
                    </span>
                  </div>
                  
                  {/* Actual Image */}
                  <img 
                    src={post.blogImage || "https://placehold.co/600x400?text=Medical+Blog"} 
                    alt={post.blogTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  
                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{dateStr}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#A62B2B] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.url}`}>
                      {post.blogTitle}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link 
                    href={`/blog/${post.url}`}
                    className="inline-flex items-center gap-2 text-[#A62B2B] font-bold text-sm hover:gap-3 transition-all mt-auto"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
