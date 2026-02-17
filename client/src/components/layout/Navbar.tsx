import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { EventsModal } from "@/components/sections/EventsModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = ["Мисия", "Галерия", "Статии", "Стани част", "Контакти"];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/80 backdrop-blur-md border-border py-2 shadow-sm" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex flex-col items-center group">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className={cn(
                    "h-12 w-auto transition-all duration-300",
                    !isScrolled && "brightness-0 invert"
                  )} 
                />
                <span className={cn(
                  "text-xs font-serif font-bold tracking-[0.2em] transition-colors duration-300 mt-1 whitespace-nowrap",
                  isScrolled ? "text-primary" : "text-white"
                )}>
                  NEXT GEN BULGARIA
                </span>
              </a>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  const idMap: Record<string, string> = {
                    "Мисия": "mission",
                    "Галерия": "gallery",
                    "Статии": "articles",
                    "Стани част": "join",
                    "Контакти": "contact"
                  };
                  scrollToSection(idMap[item]);
                }}
                className={cn(
                  "group relative text-sm font-medium transition-colors uppercase tracking-widest py-2",
                  isScrolled ? "text-foreground hover:text-accent" : "text-white/90 hover:text-white"
                )}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            {/* Events Button - Dark Premium Style */}
            <button
              onClick={() => setIsEventsModalOpen(true)}
              className={cn(
                "group relative text-sm font-medium transition-all uppercase tracking-widest py-2 px-4 flex items-center gap-2 rounded-full border",
                isScrolled 
                  ? "bg-primary text-white border-primary hover:bg-primary/90" 
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
              )}
              data-testid="events-nav-button"
            >
              <Calendar className="w-4 h-4" />
              <span>Събития</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu - Luxury Fullscreen */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-[#0a0a14]/95 backdrop-blur-xl md:hidden z-[60] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex flex-col items-center">
                  <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert" />
                  <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-white/80 mt-1">NEXT GEN BULGARIA</span>
                </div>
                <button
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.07 }}
                    onClick={() => {
                      const idMap: Record<string, string> = {
                        "Мисия": "mission",
                        "Галерия": "gallery",
                        "Статии": "articles",
                        "Стани част": "join",
                        "Контакти": "contact"
                      };
                      scrollToSection(idMap[item]);
                    }}
                    className="w-full py-4 text-center text-2xl font-serif font-bold text-white/90 tracking-widest uppercase hover:text-[#D4AF37] transition-colors duration-300 border-b border-white/5"
                  >
                    {item}
                  </motion.button>
                ))}
                
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navItems.length * 0.07 }}
                  onClick={() => {
                    setIsEventsModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-4 text-center text-2xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase flex items-center justify-center gap-3 mt-2"
                >
                  <Calendar className="w-6 h-6" />
                  Събития
                </motion.button>
              </div>

              <div className="px-8 pb-8 text-center">
                <div className="w-12 h-0.5 bg-[#D4AF37]/40 mx-auto mb-3" />
                <p className="text-white/30 text-xs font-serif tracking-widest uppercase">Младежко Движение</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <EventsModal 
        isOpen={isEventsModalOpen} 
        onClose={() => setIsEventsModalOpen(false)} 
      />
    </>
  );
}
