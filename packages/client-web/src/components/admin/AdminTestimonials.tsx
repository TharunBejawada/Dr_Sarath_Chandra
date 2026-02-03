"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Youtube, Loader2, ExternalLink, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from "../../config";

// --- TYPES ---
interface Testimonial {
  id: string;
  videoUrl: string;
  videoId: string;
  createdAt: string;
}

// --- UTILS ---
// --- UTILS ---
const extractVideoId = (url: string) => {
  // Enhanced regex to handle:
  // 1. Standard: youtube.com/watch?v=ID
  // 2. Shortened: youtu.be/ID
  // 3. Shorts: youtube.com/shorts/ID
  // 4. Embeds: youtube.com/embed/ID
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  
  const match = url.match(regExp);
  
  // YouTube IDs are 11 characters
  return (match && match[1].length === 11) ? match[1] : null;
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [url, setUrl] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);

  // Fetch Data
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials`);
      if (res.ok) setTestimonials(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  // Handle Input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);
    setPreviewId(extractVideoId(val));
  };

  // Add Video
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewId) return;
    
    setAdding(true);
    try {
      const res = await fetch(`${API_URL}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: url, videoId: previewId })
      });

      if (res.ok) {
        setUrl("");
        setPreviewId(null);
        fetchTestimonials();
      }
    } finally {
      setAdding(false);
    }
  };

  // Delete Video
  const handleDelete = async (id: string) => {
    if (!confirm("Remove this video?")) return;
    setTestimonials(prev => prev.filter(t => t.id !== id)); // Optimistic delete
    await fetch(`${API_URL}/api/testimonials/${id}`, { method: "DELETE" });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
            <Youtube className="w-8 h-8 text-red-600" />
            Patient Testimonials
          </h1>
          <p className="text-slate-500 mt-2">Manage the YouTube video links displayed on the homepage.</p>
        </div>

        {/* --- ADD NEW SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-12">
          <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-grow w-full relative">
              <input 
                type="text" 
                placeholder="Paste YouTube Video Link here..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-gray-200 border focus:bg-white focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all text-lg"
                value={url}
                onChange={handleInput}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Youtube className="w-6 h-6" />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={!previewId || adding}
              className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 text-lg whitespace-nowrap"
            >
              {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Add Video
            </button>
          </form>

          {/* Preview Area */}
          <AnimatePresence>
            {previewId && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-4">
                  <div className="w-32 h-20 bg-black rounded-lg overflow-hidden relative shrink-0">
                    <img 
                      src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`} 
                      alt="Preview" 
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div>
                    <span className="text-green-700 font-bold text-sm uppercase tracking-wide">Ready to Add</span>
                    <p className="text-green-800 text-sm mt-1">Video identified successfully.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- VIDEO GRID --- */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-gray-300 animate-spin" /></div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {testimonials.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gray-900 relative">
                    <img 
                      src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} 
                      alt="Testimonial" 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-current" />
                      </div>
                    </div>

                    {/* Actions Overlay (Appears on Hover) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <a 
                        href={item.videoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-transform hover:scale-110"
                        title="Watch on YouTube"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-transform hover:scale-110"
                        title="Delete Video"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-4 bg-white border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                    <span>Added {new Date(item.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <Youtube className="w-4 h-4 text-red-500" />
                      <span>YouTube</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && testimonials.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Youtube className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-gray-900 font-bold text-lg">No testimonials yet</h3>
            <p className="text-gray-500">Paste a YouTube link above to add your first video.</p>
          </div>
        )}

      </div>
    </div>
  );
}