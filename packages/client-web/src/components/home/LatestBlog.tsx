"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// 1. Mock Data (Matches your screenshot content)
const ARTICLES = [
  {
    id: 1,
    category: "Emergency Care",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    title: "Heart Attack Warning Signs You Shouldn't Ignore",
    excerpt: "Learn to recognize the early warning signs of a heart attack and when to seek immediate medical attention."
  },
  {
    id: 2,
    category: "Procedures",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    title: "Angioplasty vs Bypass Surgery: What's Right for You?",
    excerpt: "Understanding the differences between these two common cardiac procedures to help you make informed decisions."
  },
  {
    id: 3,
    category: "Prevention",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    title: "Managing High Blood Pressure: A Complete Guide",
    excerpt: "Effective strategies for controlling hypertension through lifestyle changes, diet, and medication."
  },
  {
    id: 4,
    category: "Lifestyle",
    date: "Nov 28, 2024",
    readTime: "4 min read",
    title: "Preventive Heart Care: Tips for a Healthy Heart",
    excerpt: "Simple yet effective lifestyle modifications to maintain optimal cardiovascular health in the long run."
  }
];

export default function LatestBlog() {
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
          {ARTICLES.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} // Stagger effect
              className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              {/* Image Placeholder Area */}
              <div className="relative h-48 bg-[#FDF2F2] overflow-hidden">
                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-[#A62B2B] text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                {/* Simulated Image Hover Zoom */}
                <div className="w-full h-full bg-red-50 group-hover:scale-105 transition-transform duration-500"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                
                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#A62B2B] transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-[#A62B2B] font-bold text-sm hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}