import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import missionBg from "@/assets/mission-bg.png";
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import { ArrowRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  body: string;
  imageUrl: string | null;
  publishedAt: string;
}

interface GalleryItem {
  _id: string;
  title: string;
  images: { url: string | null; caption?: string }[];
}

export function GalleryAndArticles() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { data: blogs = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const { data: galleries = [] } = useQuery<GalleryItem[]>({
    queryKey: ["/api/galleries"],
    queryFn: async () => {
      const res = await fetch("/api/galleries");
      if (!res.ok) return [];
      return res.json();
    },
  });

  const fallbackImages = [
    { src: gallery1, className: "col-span-2 h-80" },
    { src: gallery2, className: "col-span-2 h-80" },
  ];

  const galleryImages = galleries.length > 0
    ? galleries.flatMap(g => g.images.filter(img => img.url).map(img => ({
        src: img.url!,
        caption: img.caption,
        className: "col-span-2 h-80",
      })))
    : fallbackImages.map(img => ({ ...img, caption: undefined }));

  const allImages = galleryImages.length > 0 ? galleryImages : fallbackImages.map(img => ({ ...img, caption: undefined }));

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length);
    }
  };

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img src={missionBg} className="w-full h-full object-cover opacity-10 grayscale" alt="Background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div id="gallery">
            <h2 className="text-4xl font-serif font-bold text-primary mb-8" data-testid="text-gallery-title">Галерия</h2>
            <div className="grid grid-cols-2 gap-4">
              {allImages.map((img, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`${img.className} rounded-3xl overflow-hidden shadow-lg border border-white/20 cursor-pointer`}
                  data-testid={`gallery-image-${idx}`}
                >
                  <img src={img.src} className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} alt={img.caption || `Gallery ${idx + 1}`} />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div id="articles">
            <h2 className="text-4xl font-serif font-bold text-primary mb-8" data-testid="text-articles-title">Статии</h2>
            <div className="space-y-6">
              {blogs.length > 0 ? blogs.slice(0, 2).map((blog) => (
                <Link key={blog._id} href={`/article/${blog.slug}`}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-card/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 group cursor-pointer"
                    data-testid={`card-article-${blog._id}`}
                  >
                    {blog.imageUrl && (
                      <div className="h-64 relative overflow-hidden bg-black/5">
                        <img 
                          src={blog.imageUrl} 
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                          alt={blog.title} 
                        />
                      </div>
                    )}
                    <div className="p-8">
                      {blog.publishedAt && (
                        <p className="text-accent text-sm font-bold mb-2">{formatDate(blog.publishedAt)}</p>
                      )}
                      <h3 className="text-2xl font-serif font-bold text-primary mb-4">{blog.title}</h3>
                      {blog.body && (
                        <p className="text-muted-foreground mb-6 line-clamp-2">{blog.body}</p>
                      )}
                      <div className="flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                        Прочети повече <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )) : (
                <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">Очаквайте скоро</h3>
                  <p className="text-muted-foreground text-sm">Работим върху интересни статии за вас.</p>
                </div>
              )}
              {blogs.length > 0 && (
                <Link href="/articles">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-center gap-2 py-4 text-primary font-serif font-bold text-lg hover:text-accent transition-colors cursor-pointer mt-4"
                    data-testid="link-all-articles"
                  >
                    Виж всички статии <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-accent transition-colors z-[110]"
              onClick={() => setSelectedImageIndex(null)}
              data-testid="button-lightbox-close"
            >
              <X size={40} />
            </button>

            <button 
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-md z-[110]"
              onClick={handlePrev}
              data-testid="button-lightbox-prev"
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-md z-[110]"
              onClick={handleNext}
              data-testid="button-lightbox-next"
            >
              <ChevronRightIcon size={48} />
            </button>

            <motion.img 
              key={selectedImageIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              src={allImages[selectedImageIndex].src} 
              className="max-w-[85vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
