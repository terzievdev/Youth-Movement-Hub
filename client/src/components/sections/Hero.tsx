import { motion } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-youth.png";

export function Hero() {
  const scrollToMission = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  const events = [
    { date: "15 Юни", time: "10:00 ч.", title: "Младежки форум София" },
    { date: "22 Юни", time: "14:30 ч.", title: "Работилница за лидерство" },
    { date: "05 Юли", time: "09:00 ч.", title: "Еко инициатива - парк Витоша" },
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
            className="text-left md:pl-8 lg:pl-16"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg whitespace-nowrap">
              Време е за <span className="italic text-accent">промяна</span>
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
            <div className="bg-white/[0.03] backdrop-blur-[20px] border-[0.5px] border-white/10 p-10 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-3 mb-10">
                <Calendar className="text-[#D4AF37] w-6 h-6" />
                <h3 className="text-lg font-serif font-bold text-white uppercase tracking-[0.25em]">Предстоящи събития</h3>
              </div>
              <div className="space-y-6">
                {events.map((event, i) => (
                  <motion.div 
                    key={i} 
                    className="group cursor-pointer py-5 px-5 -mx-5 rounded-2xl transition-all duration-500 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-[#D4AF37]/5"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[#D4AF37] text-sm font-serif font-semibold tracking-[0.15em] uppercase">{event.date}</p>
                      <p className="text-[#D4AF37]/60 text-xs font-mono tracking-[0.1em]">{event.time}</p>
                    </div>
                    <p className="text-white text-lg font-light tracking-wide group-hover:text-white transition-colors duration-300" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{event.title}</p>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                className="w-full mt-10 py-4 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-medium uppercase tracking-[0.3em] bg-transparent relative overflow-hidden group transition-all duration-500 hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Виж всички</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/80 transition-all duration-500 -z-0" />
              </motion.button>
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
