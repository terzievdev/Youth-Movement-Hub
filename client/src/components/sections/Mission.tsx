import { motion } from "framer-motion";
import { useState } from "react";
import { Target, Lightbulb } from "lucide-react";
import missionBg from "@/assets/mission-bg.png";
import missionImg from "@/assets/mission-card.png";
import visionImg from "@/assets/vision-card.png";

export function Mission() {
  const [flipped, setFlipped] = useState<number | null>(null);

  const cards = [
    {
      icon: <Target className="w-12 h-12 text-accent" />,
      image: missionImg,
      title: "Мисия",
      frontText: "Изграждаме умения за бъдещето чрез иновативно образование.",
      back: "Мисията на „НЕКСТ ДЖЕН БЪЛГАРИЯ“ е да подкрепя развитието на младите хора чрез неформално образование, изграждане на ключови умения и насърчаване на активно гражданско участие. Работим за приобщаване, равни възможности и социална интеграция, като създаваме достъпна и подкрепяща среда за всички млади хора."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-primary" />,
      image: visionImg,
      title: "Визия",
      frontText: "Създаваме общество от уверени и ангажирани млади граждани.",
      back: "Вярваме в общество, в което младите хора са активни, уверени и ангажирани граждани, допринасящи за демократични, приобщаващи и устойчиви общности в България и Европа."
    }
  ];

  return (
    <section id="mission" className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={missionBg} className="w-full h-full object-cover opacity-20" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6 uppercase tracking-tight">Защо сме тук?</h2>
          <div className="w-32 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="perspective-1000 h-[500px] cursor-pointer"
              onClick={() => setFlipped(flipped === index ? null : index)}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: flipped === index ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
                className="relative w-full h-full preserve-3d"
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-card/80 backdrop-blur-sm rounded-[2.5rem] shadow-2xl p-0 overflow-hidden border border-white/20 flex flex-col">
                  <div className="h-2/3 w-full relative">
                    <img src={card.image} className="w-full h-full object-cover" alt={card.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center text-center -mt-16 relative z-10">
                    <div className="mb-4 p-4 rounded-2xl bg-white shadow-lg text-primary">
                      {card.icon}
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-primary mb-4">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed px-4">{card.frontText}</p>
                  </div>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 backface-hidden bg-primary rounded-[2.5rem] shadow-2xl p-12 flex flex-col items-center justify-center text-center text-primary-foreground border border-primary/20"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <h3 className="text-3xl font-serif font-bold mb-8 text-accent">{card.title}</h3>
                  <p className="leading-relaxed text-xl font-light">
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
