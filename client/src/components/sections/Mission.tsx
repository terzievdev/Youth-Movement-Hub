import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Users } from "lucide-react";

export function Mission() {
  const cards = [
    {
      icon: <Target className="w-10 h-10 text-accent" />,
      title: "Нашата Мисия",
      description: "Да овластим младите хора чрез образование, менторство и реални възможности за развитие."
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
      title: "Нашата Визия",
      description: "Свят, в който всеки млад човек има достъп до ресурсите, необходими за да реализира пълния си потенциал."
    },
    {
      icon: <Users className="w-10 h-10 text-accent" />,
      title: "Нашите Ценности",
      description: "Интегритет, иновации, приобщаване и непоколебима вяра в силата на общността."
    }
  ];

  return (
    <section id="mission" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Защо сме тук?</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 bg-card group overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
                  <div className="mb-6 p-4 rounded-full bg-secondary/50 group-hover:bg-primary/5 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
