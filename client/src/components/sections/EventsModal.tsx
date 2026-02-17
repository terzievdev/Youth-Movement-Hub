import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Clock } from "lucide-react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface Meeting {
  _id: string;
  title: string;
  dateTime: string;
  location: string;
  description: string;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function EventsModal({ isOpen, onClose }: EventsModalProps) {
  const { data: meetings = [], isLoading } = useQuery<Meeting[]>({
    queryKey: ["/api/meetings"],
    queryFn: async () => {
      const res = await fetch("/api/meetings");
      if (!res.ok) return [];
      return res.json();
    },
    enabled: isOpen,
  });

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-[8px]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white/[0.08] backdrop-blur-[20px] border-[0.5px] border-white/20 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden pointer-events-auto max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 pb-0 flex items-center justify-between shrink-0">
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

              <div className="p-8 pt-6 overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/50 text-sm">Зареждане...</p>
                  </div>
                ) : meetings.length > 0 ? (
                  <div className="space-y-4">
                    {meetings.map((meeting, index) => (
                      <motion.div
                        key={meeting._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/[0.06] rounded-2xl p-5 border border-white/10 hover:border-[#D4AF37]/30 transition-colors"
                        data-testid={`event-card-${meeting._id}`}
                      >
                        <h3 className="text-white font-serif font-bold text-lg mb-3">{meeting.title}</h3>
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            <Calendar className="w-4 h-4 text-[#D4AF37]" />
                            <span>{formatDate(meeting.dateTime)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/60 text-sm">
                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                            <span>{formatTime(meeting.dateTime)} ч.</span>
                          </div>
                          {meeting.location && (
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <MapPin className="w-4 h-4 text-[#D4AF37]" />
                              <span>{meeting.location}</span>
                            </div>
                          )}
                        </div>
                        {meeting.description && (
                          <p className="text-white/40 text-sm leading-relaxed">{meeting.description}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
