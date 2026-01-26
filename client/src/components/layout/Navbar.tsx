import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
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
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {["Мисия", "Галерия", "Статии", "Стани част", "Контакти"].map((item) => (
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {["Мисия", "Галерия", "Статии", "Стани част", "Контакти"].map((item) => (
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
                className="text-lg font-serif font-medium text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
