import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-youth.png";

export function Hero() {
  const scrollToMission = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Youth collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left md:pl-8 lg:pl-16 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-lg">
            Време е за <span className="italic text-accent">промяна</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 font-light leading-relaxed">
            Изграждаме общност от млади лидери, готови да променят света. 
            Бъди част от движението, което създава утрешния ден.
          </p>
          <motion.button
            onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-full uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Присъедини се
          </motion.button>
        </motion.div>
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
