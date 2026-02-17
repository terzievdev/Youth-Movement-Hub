import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-youth.png";

export function Hero() {
  const scrollToMission = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center md:items-start overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Youth collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:hidden" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 pt-20 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left md:pl-8 lg:pl-16 max-w-3xl"
        >
          <div className="md:hidden mb-6">
            <div className="w-10 h-0.5 bg-[#D4AF37] mx-auto" />
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            Време е за <span className="italic text-accent">промяна</span>
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-xl font-light leading-relaxed mx-auto md:mx-0">
            Изграждаме общност от млади лидери, готови да променят света. 
            Бъди част от движението, което създава утрешния ден.
          </p>
          <div className="md:hidden mt-8">
            <motion.button
              onClick={scrollToMission}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="px-8 py-3 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-sm font-serif uppercase tracking-[0.2em] backdrop-blur-sm"
            >
              Открий повече
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <motion.button
        onClick={scrollToMission}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest font-medium">Научи повече</span>
          <ArrowDown className="animate-bounce w-5 h-5" />
        </div>
      </motion.button>
    </section>
  );
}
