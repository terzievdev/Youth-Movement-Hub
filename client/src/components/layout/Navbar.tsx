import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        isScrolled ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <a className="text-2xl font-serif font-bold text-primary tracking-tighter">
              Младежко<span className="text-accent">Движение</span>
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
              className="group relative text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
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
