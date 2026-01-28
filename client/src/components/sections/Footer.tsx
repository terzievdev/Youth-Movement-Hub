import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="py-6 bg-background">
      <div className="container mx-auto px-6">
        <div className="h-px w-full bg-border/50 mb-6" />
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Logo" className="h-12 w-auto mb-3 drop-shadow-sm" />
          <h2 className="text-lg font-serif font-bold tracking-widest flex gap-1.5">
            <span className="text-primary">NEXT</span>
            <span className="text-[#00966E]">GEN</span>
            <span className="text-[#D62612]">BULGARIA</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-2 font-serif italic">Младежко Движение © 2026</p>
        </div>
      </div>
    </footer>
  );
}
