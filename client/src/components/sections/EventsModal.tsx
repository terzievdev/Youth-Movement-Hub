import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { useEffect } from "react";

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventsModal({ isOpen, onClose }: EventsModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[8px]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white/[0.08] backdrop-blur-[20px] border-[0.5px] border-white/20 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#D4AF37] w-6 h-6" />
                  <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-[0.15em]">
                    Събития
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors group"
                  data-testid="events-modal-close"
                >
                  <X className="w-6 h-6 text-[#D4AF37] group-hover:text-[#E8C547] transition-colors" />
                </button>
              </div>

              {/* Coming Soon Content */}
              <div className="p-8 pt-6">
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                      <Calendar className="w-10 h-10 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white text-2xl font-serif font-medium mb-3">
                      Очаквайте скоро
                    </h3>
                    <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
                      Работим върху вълнуващи събития за вас. Следете ни за актуална информация.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
