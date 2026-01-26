import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, MapPin } from "lucide-react";
import missionBg from "@/assets/mission-bg.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.14-1.33-.25-.15-.49-.31-.72-.49V15c0 2.37-1.12 4.67-3.14 5.92-2.02 1.25-4.63 1.4-6.79.38-2.16-1.02-3.65-3.23-3.88-5.61-.23-2.38.8-4.78 2.72-6.22 1.65-1.24 3.79-1.64 5.81-1.15V12.3c-.98-.32-2.08-.18-2.96.38-.88.56-1.47 1.55-1.6 2.58-.13 1.03.26 2.1 1.05 2.77.79.67 1.88.85 2.83.47.95-.38 1.66-1.29 1.83-2.3.02-.12.03-.24.03-.36V.02z"/>
  </svg>
);

const formSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().email("Невалиден имейл адрес"),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
});

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Съобщението е изпратено!",
      description: "Ще се свържем с вас възможно най-скоро.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={missionBg} className="w-full h-full object-cover opacity-10 grayscale" alt="Background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Form Card */}
          <div className="bg-secondary/10 backdrop-blur-md p-10 rounded-[2rem] border border-border/30 shadow-xl w-full lg:max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-primary mb-3">Свържи се с нас</h2>
              <div className="w-12 h-1 bg-accent mb-4" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Име" {...field} className="h-12 bg-white/40 border-none rounded-xl focus:bg-white transition-all shadow-inner" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Имейл" {...field} className="h-12 bg-white/40 border-none rounded-xl focus:bg-white transition-all shadow-inner" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Твоят въпрос..." 
                          className="min-h-[140px] bg-white/40 border-none rounded-xl focus:bg-white transition-all shadow-inner resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 text-md font-bold rounded-xl shadow-lg hover:shadow-accent/20 hover:bg-accent/80 transition-all">
                  Изпрати
                </Button>
              </form>
            </Form>
          </div>

          {/* Map & Socials Column */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            {/* Real Interactive Map with specific address and custom pin look */}
            <div className="h-[350px] lg:w-[450px] rounded-[2rem] overflow-hidden shadow-xl border border-border/30 transition-all duration-700 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.3217436034077!2d23.351000000000003!3d42.697400000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85f8f5b8f5b5%3A0x78395ad9d44800!2sul.%20%22Aleksandar%20Zhendov%22%206%2C%201113%20g.k.%20Yavorov%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1716385000000!5m2!1sen!2sbg&q=ul.+Aleksandar+Zhendov+6,+1113+Sofia" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            {/* Compact Info Card */}
            <div className="bg-secondary/10 backdrop-blur-md p-8 rounded-[2rem] border border-border/30 flex flex-col gap-6 items-center w-full max-w-[450px]">
              <div className="flex items-center gap-3 text-primary/80">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-sm font-serif italic font-bold">ул. "Александър Жендов" №6, София</span>
              </div>
              <div className="flex gap-10">
                <a href="#" className="group flex flex-col items-center gap-2">
                  <div className="p-4 rounded-xl bg-white/50 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-serif uppercase tracking-widest font-bold opacity-70">Facebook</span>
                </a>
                <a href="#" className="group flex flex-col items-center gap-2">
                  <div className="p-4 rounded-xl bg-white/50 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-sm">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-serif uppercase tracking-widest font-bold opacity-70">Instagram</span>
                </a>
                <a href="#" className="group flex flex-col items-center gap-2">
                  <div className="p-4 rounded-xl bg-white/50 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                    <TikTokIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-serif uppercase tracking-widest font-bold opacity-70">TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
