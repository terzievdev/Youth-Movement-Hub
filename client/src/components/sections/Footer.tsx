import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold tracking-tighter mb-2">
              Младежко<span className="text-accent">Движение</span>
            </h2>
            <p className="text-primary-foreground/60 text-sm max-w-md">
              Създаваме бъдещето днес, заедно.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <Twitter className="w-5 h-5" /> {/* Using Twitter icon for TikTok placeholder if needed, or just Twitter */}
            </a>
            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40 font-light">
          <p>© 2024 Младежко Движение. Всички права запазени.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Политика за поверителност</a>
            <a href="#" className="hover:text-white transition-colors">Общи условия</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
