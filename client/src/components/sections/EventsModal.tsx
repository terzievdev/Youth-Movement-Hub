import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Clock } from "lucide-react";
import { useEffect } from "react";

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const events = [
    { 
      date: "15 Юни", 
      time: "10:00 ч.", 
      title: "Младежки форум София",
      location: "НДК, зала 3",
      description: "Годишен форум за младежки политики и инициативи"
    },
    { 
      date: "22 Юни", 
      time: "14:30 ч.", 
      title: "Работилница за лидерство",
      location: "Sofia Tech Park",
      description: "Интерактивна сесия за развитие на лидерски умения"
    },
    { 
      date: "05 Юли", 
      time: "09:00 ч.", 
      title: "Еко инициатива - парк Витоша",
      location: "Златни мостове",
      description: "Доброволческа акция за почистване на планината"
    },
    { 
      date: "18 Юли", 
      time: "16:00 ч.", 
      title: "Дебат: Бъдещето на образованието",
      location: "Софийски университет",
      description: "Открит дебат с участието на експерти и студенти"
    },
  ];

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
              className="bg-white/[0.08] backdrop-blur-[20px] border-[0.5px] border-white/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#D4AF37] w-6 h-6" />
                  <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-[0.15em]">
                    Предстоящи събития
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

              {/* Events List */}
              <div className="p-8 pt-6 overflow-y-auto max-h-[calc(85vh-100px)]">
                <div className="space-y-4">
                  {events.map((event, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-[#D4AF37]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#D4AF37]/5"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[#D4AF37] text-sm font-serif font-semibold tracking-[0.15em] uppercase">{event.date}</p>
                          <h3 className="text-white text-xl font-medium tracking-wide mt-1 group-hover:text-white/90 transition-colors" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                            {event.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#D4AF37]/60 text-sm font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          {event.time}
                        </div>
                      </div>
                      
                      <p className="text-white/60 text-sm mb-3">{event.description}</p>
                      
                      <div className="flex items-center gap-1.5 text-white/40 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button 
                  className="w-full mt-8 py-4 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-medium uppercase tracking-[0.3em] bg-transparent relative overflow-hidden group transition-all duration-500 hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">Запиши се за събитие</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/80 transition-all duration-500 -z-0" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
