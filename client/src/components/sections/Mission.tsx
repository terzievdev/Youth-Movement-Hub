import { motion } from "framer-motion";
import { useState } from "react";
import { Target, Lightbulb } from "lucide-react";

export function Mission() {
  const [flipped, setFlipped] = useState<number | null>(null);

  const cards = [
    {
      icon: <Target className="w-12 h-12 text-accent" />,
      title: "Мисия",
      front: "Мисията на „НЕКСТ ДЖЕН БЪЛГАРИЯ“ е да подкрепя развитието на младите хора...",
      back: "Мисията на „НЕКСТ ДЖЕН БЪЛГАРИЯ“ е да подкрепя развитието на младите хора чрез неформално образование, изграждане на ключови умения и насърчаване на активно гражданско участие. Работим за приобщаване, равни възможности и социална интеграция, като създаваме достъпна и подкрепяща среда за всички млади хора."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-primary" />,
      title: "Визия",
      front: "Вярваме в общество, в което младите хора са активни, уверени и ангажирани...",
      back: "Вярваме в общество, в което младите хора са активни, уверени и ангажирани граждани, допринасящи за демократични, приобщаващи и устойчиви общности в България и Европа."
    }
  ];

  return (
    <section id="mission" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Защо сме тук?</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="perspective-1000 h-[400px] cursor-pointer"
              onClick={() => setFlipped(flipped === index ? null : index)}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: flipped === index ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full h-full preserve-3d"
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-card rounded-3xl shadow-xl p-10 flex flex-col items-center justify-center text-center border border-border">
                  <div className="mb-8 p-6 rounded-full bg-secondary/30">
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-primary mb-4">{card.title}</h3>
                  <p className="text-muted-foreground italic">Кликни за детайли</p>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 backface-hidden bg-primary rounded-3xl shadow-xl p-10 flex flex-col items-center justify-center text-center text-primary-foreground border border-primary/20"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <h3 className="text-2xl font-serif font-bold mb-6 text-accent">{card.title}</h3>
                  <p className="leading-relaxed text-lg">
                    {card.back}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </section>
  );
}
