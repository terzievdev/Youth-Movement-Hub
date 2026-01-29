import { Button } from "@/components/ui/button";
import { HandHeart, Briefcase, ChevronRight, X, Check, Copy, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import missionBg from "@/assets/mission-bg.png";
import donationBg from "@/assets/donation-bg-gold.png";
import partnershipBg from "@/assets/volunteer-bg-lux.png";

function FloatingInput({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  required = false 
}: { 
  label: string; 
  type?: string; 
  value: string; 
  onChange: (val: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full px-4 pt-6 pb-2 bg-white/80 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-primary"
        placeholder=" "
      />
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive 
            ? "top-2 text-xs text-primary font-medium" 
            : "top-1/2 -translate-y-1/2 text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({ 
  label, 
  value, 
  onChange, 
  options 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}) {
  const isActive = value.length > 0;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 pt-6 pb-2 bg-white/80 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-primary appearance-none cursor-pointer"
      >
        <option value="" disabled></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive 
            ? "top-2 text-xs text-primary font-medium" 
            : "top-1/2 -translate-y-1/2 text-gray-400"
        }`}
      >
        {label}
      </label>
      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
    </div>
  );
}

function FloatingTextarea({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className="w-full px-4 pt-6 pb-2 bg-white/80 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-primary resize-none"
        placeholder=" "
      />
      <label 
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          isActive 
            ? "top-2 text-xs text-primary font-medium" 
            : "top-4 text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function DonationModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const IBAN = "BG80 BNBG 9661 1020 3456 78";

  const handleCopyIBAN = async () => {
    await navigator.clipboard.writeText(IBAN.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl w-full max-w-xl pointer-events-auto relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={donationBg} 
                  className="w-full h-full object-cover opacity-[0.08] scale-150" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-white" />
              </div>

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-primary">Направи Дарение</h2>
                    <p className="text-muted-foreground text-sm mt-1">Подкрепи нашата кауза</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                    data-testid="donation-close-button"
                  >
                    <X className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </button>
                </div>

                {/* Bank Transfer Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif font-semibold text-primary text-lg">Банков превод</h3>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-5 border border-gray-200/50">
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest font-medium">IBAN</p>
                    <div className="flex items-center justify-between gap-3 bg-white rounded-xl p-4 border border-gray-100">
                      <code className="font-mono text-base md:text-lg text-primary tracking-wider font-semibold">
                        {IBAN}
                      </code>
                      <div className="relative">
                        <button
                          onClick={handleCopyIBAN}
                          className="p-3 bg-primary/5 rounded-xl border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                          data-testid="copy-iban-button"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                          )}
                        </button>
                        <AnimatePresence>
                          {copied && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
                            >
                              Копирано!
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary/80">Получател:</span> Сдружение "Младежко Движение"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PartnerDrawer({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partnershipTypes = [
    { value: "corporate", label: "Корпоративно партньорство" },
    { value: "ngo", label: "НПО / Организация" },
    { value: "media", label: "Медийно партньорство" },
    { value: "educational", label: "Образователна институция" },
    { value: "other", label: "Друго" }
  ];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setOrganization("");
      setEmail("");
      setPartnerType("");
      setMessage("");
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg z-[101] bg-white shadow-2xl overflow-y-auto"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src={partnershipBg} 
                className="w-full h-full object-cover opacity-[0.06] scale-125" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/95 to-white" />
            </div>

            <div className="p-8 md:p-10 min-h-full flex flex-col relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Стани Партньор</h2>
                  <p className="text-muted-foreground mt-1">Нека изградим нещо заедно</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  data-testid="drawer-close-button"
                >
                  <X className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col space-y-5"
                  >
                    <FloatingInput
                      label="Вашето име"
                      value={name}
                      onChange={setName}
                      required
                    />
                    
                    <FloatingInput
                      label="Организация"
                      value={organization}
                      onChange={setOrganization}
                      required
                    />
                    
                    <FloatingInput
                      label="Имейл адрес"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      required
                    />
                    
                    <FloatingSelect
                      label="Тип партньорство"
                      value={partnerType}
                      onChange={setPartnerType}
                      options={partnershipTypes}
                    />
                    
                    <FloatingTextarea
                      label="Вашето съобщение"
                      value={message}
                      onChange={setMessage}
                    />

                    <div className="pt-4 mt-auto">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 bg-[#1a1a2e] hover:bg-[#16213e] text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        data-testid="partner-submit-button"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          "Изпрати запитване"
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30"
                    >
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                      </motion.div>
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-serif font-bold text-primary mb-3"
                    >
                      Благодарим ви!
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-muted-foreground max-w-xs"
                    >
                      Ще се свържем с вас възможно най-скоро, за да обсъдим партньорството.
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={handleClose}
                      className="mt-8 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-primary font-medium rounded-xl transition-all duration-300"
                    >
                      Затвори
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function JoinUs() {
  const [isPartnerDrawerOpen, setIsPartnerDrawerOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const options = [
    {
      id: "donate",
      title: "Направи Дарение",
      icon: <HandHeart className="w-10 h-10" />,
      description: "Подкрепи нашите инициативи финансово. Всяка помощ е от значение за бъдещето на младежите в България.",
      action: "Дари сега",
      image: donationBg,
      onClick: () => setIsDonationModalOpen(true)
    },
    {
      id: "partner",
      title: "Стани Партньор",
      icon: <Briefcase className="w-10 h-10" />,
      description: "Бизнес или организация? Нека обединим усилия за по-голямо въздействие и устойчива промяна.",
      action: "Свържи се",
      image: partnershipBg,
      onClick: () => setIsPartnerDrawerOpen(true)
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
                  onClick={option.onClick}
                  className="w-full justify-between bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold border border-primary/30 rounded-xl relative z-10 transition-all duration-300 shadow-sm py-6 text-base"
                  data-testid={`card-button-${option.id}`}
                >
                  {option.action}
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-accent" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />

      <PartnerDrawer 
        isOpen={isPartnerDrawerOpen} 
        onClose={() => setIsPartnerDrawerOpen(false)} 
      />
    </section>
  );
}
