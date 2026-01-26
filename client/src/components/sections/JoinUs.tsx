import { Button } from "@/components/ui/button";
import { HandHeart, Users, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import missionBg from "@/assets/mission-bg.png";
import volunteerBg from "@/assets/volunteer-bg-lux.png";
import donationBg from "@/assets/donation-bg-lux.png";
import partnershipBg from "@/assets/partnership-bg-lux.png";

export function JoinUs() {
  const options = [
    {
      id: "volunteer",
      title: "Стани Доброволец",
      icon: <Users className="w-8 h-8" />,
      description: "Отдели от времето си за каузата. Твоята енергия е нашият двигател.",
      action: "Кандидатствай",
      color: "bg-primary text-primary-foreground",
      image: volunteerBg
    },
    {
      id: "donate",
      title: "Направи Дарение",
      icon: <HandHeart className="w-8 h-8" />,
      description: "Подкрепи нашите инициативи финансово. Всяка помощ е от значение.",
      action: "Дари сега",
      color: "bg-accent text-accent-foreground",
      image: donationBg
    },
    {
      id: "partner",
      title: "Стани Партньор",
      icon: <Briefcase className="w-8 h-8" />,
      description: "Бизнес или организация? Нека обединим усилия за по-голямо въздействие.",
      action: "Свържи се",
      color: "bg-white text-primary border border-border hover:bg-secondary",
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
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Стани част от нас</h2>
            <p className="text-lg text-muted-foreground">
              Има много начини да допринесеш за промяната. Избери своя път и се присъедини към семейството.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex"
            >
              <div className="flex-1 p-8 rounded-[2.5rem] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-xl bg-white/40 backdrop-blur-[12px] border border-white/40 group relative overflow-hidden">
                {/* Background Image Asset */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={option.image} 
                    className="w-full h-full object-cover opacity-[0.4] grayscale group-hover:scale-110 group-hover:opacity-[0.55] transition-all duration-700" 
                    alt={option.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/70" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300">{option.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 font-serif text-primary">{option.title}</h3>
                  <p className="mb-8 opacity-90 leading-relaxed text-muted-foreground font-light text-[15px]">
                    {option.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:bg-primary/5 text-primary font-bold border border-primary/10 rounded-xl relative z-10"
                >
                  {option.action}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-accent" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
