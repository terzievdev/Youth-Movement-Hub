import { Button } from "@/components/ui/button";
import { HandHeart, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import missionBg from "@/assets/mission-bg.png";
import donationBg from "@/assets/donation-bg-gold.png";
import partnershipBg from "@/assets/volunteer-bg-lux.png";

export function JoinUs() {
  const options = [
    {
      id: "donate",
      title: "Направи Дарение",
      icon: <HandHeart className="w-10 h-10" />,
      description: "Подкрепи нашите инициативи финансово. Всяка помощ е от значение за бъдещето на младежите в България.",
      action: "Дари сега",
      image: donationBg
    },
    {
      id: "partner",
      title: "Стани Партньор",
      icon: <Briefcase className="w-10 h-10" />,
      description: "Бизнес или организация? Нека обединим усилия за по-голямо въздействие и устойчива промяна.",
      action: "Свържи се",
      image: partnershipBg
    }
  ];

  return (
    <section id="join" className="py-24 relative overflow-hidden bg-secondary/30">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={missionBg} className="w-full h-full object-cover opacity-10 grayscale" alt="Background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Стани част от нас</h2>
          <p className="text-lg text-muted-foreground">
            Има много начини да допринесеш за промяната. Избери своя път и се присъедини към семейството.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex"
            >
              <div className="flex-1 p-10 rounded-[2rem] flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] shadow-2xl bg-white/50 backdrop-blur-[16px] border border-white/50 group relative overflow-hidden min-h-[320px]">
                {/* Background Image Asset */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={option.image} 
                    className="w-full h-full object-cover opacity-[0.15] grayscale group-hover:scale-110 group-hover:opacity-[0.25] transition-all duration-700" 
                    alt={option.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/50 to-white/90" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 text-primary group-hover:scale-110 group-hover:text-accent transition-all duration-300 inline-block p-3 bg-primary/5 rounded-2xl">
                    {option.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 font-serif text-primary">{option.title}</h3>
                  <p className="mb-8 opacity-90 leading-relaxed text-muted-foreground text-base">
                    {option.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold border border-primary/30 rounded-xl relative z-10 transition-all duration-300 shadow-sm py-6 text-base"
                >
                  {option.action}
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-accent" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
