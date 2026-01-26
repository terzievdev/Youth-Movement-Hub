import { motion } from "framer-motion";
import { useState } from "react";
import missionBg from "@/assets/mission-bg.png";
import missionImg from "@/assets/mission-card.png";
import visionImg from "@/assets/vision-card.png";
import visionBackImg from "@/assets/vision-back-new.png";
import sideImg from "@/assets/about-us-side.png";

export function Mission() {
  const [flipped, setFlipped] = useState<number | null>(null);

  const cards = [
    {
      image: missionImg,
      title: "Мисия",
      frontText: "Изграждаме умения за бъдещето чрез иновативно образование.",
      back: "Мисията на „НЕКСТ ДЖЕН БЪЛГАРИЯ“ е да подкрепя развитието на младите хора чрез неформално образование, изграждане на ключови умения и насърчаване на активно гражданско участие. Работим за приобщаване, равни възможности и социална интеграция, като създаваме достъпна и подкрепяща среда за всички млади хора."
    },
    {
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

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Side Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
          >
            <img src={sideImg} className="w-full h-full object-cover" alt="Collaborative work" />
          </motion.div>

          {/* Vertical Cards Stack */}
          <div className="flex flex-col gap-10 w-full">
            {cards.map((card, index) => (
              <div 
                key={index}
                className="perspective-1000 h-[300px] cursor-pointer group w-full"
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: 0 }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full preserve-3d"
                >
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-[10px] rounded-[2.5rem] shadow-2xl p-0 overflow-hidden border border-white/20 flex">
                    <div className="w-1/3 h-full relative">
                      <img src={card.image} className="w-full h-full object-cover" alt={card.title} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20" />
                    </div>
                    <div className="flex-1 p-8 flex flex-col justify-center">
                      <h3 className="text-3xl font-serif font-bold text-primary mb-1">{card.title}</h3>
                      <p className="text-primary leading-relaxed text-[16px] font-bold italic">{card.frontText}</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-[#fdfbf7] backdrop-blur-[25px] rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center justify-center text-center text-primary border border-[#e5d5c5]/50 overflow-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    {/* Background Image - Significantly more visible */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={card.title === "Визия" ? visionBackImg : card.image} 
                        className="w-full h-full object-cover opacity-[0.45] contrast-110 brightness-95" 
                        alt="Thematic background" 
                      />
                      <div className="absolute inset-0 bg-[#fdfbf7]/30 mix-blend-overlay" />
                    </div>

                    <p className={`leading-relaxed tracking-wide text-primary font-serif italic px-6 font-bold relative z-10 ${card.title === "Мисия" ? "text-[16px]" : "text-[18px]"}`} style={{ textShadow: "0 0 10px rgba(253, 251, 247, 1), 0 0 20px rgba(253, 251, 247, 0.8), 1px 1px 2px rgba(0,0,0,0.1)" }}>
                      {card.back}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
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
