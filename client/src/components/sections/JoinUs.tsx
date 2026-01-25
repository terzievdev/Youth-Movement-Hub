import { Button } from "@/components/ui/button";
import { HandHeart, Users, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import missionBg from "@/assets/mission-bg.png";

export function JoinUs() {
  const options = [
    {
      id: "volunteer",
      title: "Стани Доброволец",
      icon: <Users className="w-8 h-8" />,
      description: "Отдели от времето си за каузата. Твоята енергия е нашият двигател.",
      action: "Кандидатствай",
      color: "bg-primary text-primary-foreground"
    },
    {
      id: "donate",
      title: "Направи Дарение",
      icon: <HandHeart className="w-8 h-8" />,
      description: "Подкрепи нашите инициативи финансово. Всяка помощ е от значение.",
      action: "Дари сега",
      color: "bg-accent text-accent-foreground"
    },
    {
      id: "partner",
      title: "Стани Партньор",
      icon: <Briefcase className="w-8 h-8" />,
      description: "Бизнес или организация? Нека обединим усилия за по-голямо въздействие.",
      action: "Свържи се",
      color: "bg-white text-primary border border-border hover:bg-secondary"
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
              <div className={`flex-1 p-8 rounded-2xl flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm hover:shadow-md ${option.color === 'bg-white text-primary border border-border hover:bg-secondary' ? 'bg-white' : option.color}`}>
                <div>
                  <div className="mb-6 opacity-90">{option.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 font-serif">{option.title}</h3>
                  <p className={`mb-8 opacity-80 leading-relaxed`}>
                    {option.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-between group ${option.id === 'partner' ? 'hover:bg-primary/5' : 'hover:bg-white/10'}`}
                >
                  {option.action}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
