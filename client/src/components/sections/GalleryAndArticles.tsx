import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import missionBg from "@/assets/mission-bg.png";
import gallery1 from "@/assets/gallery/gallery-1.jpg";
import gallery2 from "@/assets/gallery/gallery-2.jpg";
import article1 from "@/assets/article-1.png";
import { ArrowRight, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

export function GalleryAndArticles() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const images = [
    { src: gallery1, className: "col-span-2 h-64" },
    { src: gallery2, className: "col-span-2 h-64" }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={missionBg} className="w-full h-full object-cover opacity-10 grayscale" alt="Background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Gallery Section */}
          <div id="gallery">
            <h2 className="text-4xl font-serif font-bold text-primary mb-8">Галерия</h2>
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`${img.className} rounded-3xl overflow-hidden shadow-lg border border-white/20 cursor-pointer`}
                >
                  <img src={img.src} className="w-full h-full object-cover" alt={`Gallery ${idx + 1}`} />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* ... existing Articles section ... */}
          <div id="articles">
            <h2 className="text-4xl font-serif font-bold text-primary mb-8">Статии</h2>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 group cursor-pointer"
            >
              <div className="h-56 relative overflow-hidden">
                <img src={article1} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Article 1" />
                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Ново</div>
              </div>
              <div className="p-8">
                <p className="text-accent text-sm font-bold mb-2">24 Май, 2024</p>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Бъдещето на неформалното образование в България</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">Как новите методи на обучение променят начина, по който младите хора възприемат света и изграждат своите умения...</p>
                <div className="flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                  Прочети повече <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
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
            >
              <X size={40} />
            </button>

            <button 
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-md z-[110]"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-md z-[110]"
              onClick={handleNext}
            >
              <ChevronRightIcon size={48} />
            </button>

            <motion.img 
              key={selectedImageIndex}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              src={images[selectedImageIndex].src} 
              className="max-w-[85vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
