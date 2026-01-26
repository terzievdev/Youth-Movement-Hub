import logo from "@/assets/logo.jpg";

export function Footer() {
  return (
    <footer className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="h-px w-full bg-border/50 mb-10" />
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto mb-6 rounded-xl shadow-lg" />
          <h2 className="text-2xl font-serif font-bold tracking-tighter text-primary">
            NEXT GEN <span className="text-accent">BULGARIA</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-4 font-serif italic">Младежко Движение © 2024</p>
        </div>
      </div>
    </footer>
  );
}
