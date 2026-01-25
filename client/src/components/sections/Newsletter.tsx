import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Успешно записване!",
        description: "Благодарим ви, че се абонирахте за нашия бюлетин.",
      });
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Бъди информиран</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Остави своя имейл адрес, за да получаваш новини за нашите събития, инициативи и успешни истории.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="твоят@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 rounded-full px-6 focus-visible:ring-accent focus-visible:border-accent"
              required
            />
            <Button type="submit" className="h-12 rounded-full px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Абонирай се
            </Button>
          </form>
          <p className="text-xs text-primary-foreground/40 mt-4">
            Ние уважаваме твоята поверителност. Без спам, обещаваме.
          </p>
        </div>
      </div>
    </section>
  );
}
