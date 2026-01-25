import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { JoinUs } from "@/components/sections/JoinUs";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <JoinUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
