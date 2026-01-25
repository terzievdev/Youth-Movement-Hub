import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Music2, MapPin } from "lucide-react";
import missionBg from "@/assets/mission-bg.png";

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
                <Button type="submit" className="w-full h-12 text-md font-bold rounded-xl shadow-lg hover:shadow-accent/20 transition-all">
                  Изпрати
                </Button>
              </form>
            </Form>
          </div>

          {/* Map & Socials Column */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            {/* Real Interactive Map with specific address */}
            <div className="h-[280px] lg:w-[400px] rounded-[2rem] overflow-hidden shadow-xl border border-border/30 grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.321773752528!2d23.34842777647233!3d42.69741217116484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85f8f5b8f5b5%3A0x78395ad9d44800!2sul.%20%22Aleksandar%20Zhendov%22%206%2C%201113%20g.k.%20Yavorov%2C%20Sofia!5e0!3m2!1sen!2sbg!4v1716385000000!5m2!1sen!2sbg" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            {/* Compact Info Card */}
            <div className="bg-secondary/10 backdrop-blur-md p-8 rounded-[2rem] border border-border/30 flex flex-col gap-6 items-center w-full max-w-[400px]">
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
                    <Music2 className="w-5 h-5" />
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
