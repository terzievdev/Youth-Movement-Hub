import { motion } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-youth.png";

export function Hero() {
  const scrollToMission = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  const events = [
    { date: "15 Юни", title: "Младежки форум София" },
    { date: "22 Юни", title: "Работилница за лидерство" },
    { date: "05 Юли", title: "Еко инициатива - парк Витоша" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Youth collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6">
              Обединяваме бъдещето
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Време е за <br />
              <span className="italic text-accent">промяна</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 font-light leading-relaxed">
              Изграждаме общност от млади лидери, готови да променят света. 
              Бъди част от движението, което създава утрешния ден.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:justify-self-end w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-accent w-6 h-6" />
                <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider">Предстоящи събития</h3>
              </div>
              <div className="space-y-6">
                {events.map((event, i) => (
                  <div key={i} className="group cursor-pointer">
                    <p className="text-accent text-sm font-bold mb-1">{event.date}</p>
                    <p className="text-white text-lg font-medium group-hover:text-accent transition-colors">{event.title}</p>
                    <div className="w-full h-px bg-white/10 mt-4 group-last:hidden" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white hover:text-primary transition-all uppercase tracking-widest">
                Виж всички
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToMission}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-medium">Научи повече</span>
          <ArrowDown className="animate-bounce w-5 h-5" />
        </div>
      </motion.button>
    </section>
  );
}
