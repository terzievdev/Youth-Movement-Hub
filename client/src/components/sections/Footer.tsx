import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="h-px w-full bg-border/50 mb-10" />
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Logo" className="h-24 w-auto mb-6 drop-shadow-md" />
          <h2 className="text-3xl font-serif font-bold tracking-widest flex gap-2">
            <span className="text-primary">NEXT</span>
            <span className="text-[#00966E]">GEN</span>
            <span className="text-[#D62612]">BULGARIA</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-4 font-serif italic">Младежко Движение © 2026</p>
        </div>
      </div>
    </footer>
  );
}
