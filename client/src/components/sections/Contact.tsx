import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Mail, ChevronDown } from "lucide-react";
import missionBg from "@/assets/mission-bg.png";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
  topic: z.string().min(1, "Моля изберете тема"),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
});

const topicOptions = [
  { value: "partnership", label: "Партньорство" },
  { value: "donation", label: "Дарение" },
  { value: "events", label: "Събития" },
  { value: "articles", label: "Статии и публикации" },
  { value: "website", label: "Въпрос за сайта" },
  { value: "other", label: "Друго" },
];

export function Contact() {
  const { toast } = useToast();
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const selectedTopic = topicOptions.find(t => t.value === form.watch("topic"));

  const contactMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to send');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Съобщението е изпратено!",
        description: "Ще се свържем с вас възможно най-скоро.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Грешка",
        description: "Не успяхме да изпратим съобщението. Моля опитайте отново.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    contactMutation.mutate(values);
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img src={missionBg} className="w-full h-full object-cover opacity-10 grayscale" alt="Background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center max-w-lg mx-auto">
          <div className="bg-secondary/10 backdrop-blur-md p-10 rounded-[2rem] border border-border/30 shadow-xl w-full" data-testid="contact-form-card">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-accent/10 mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-3" data-testid="text-contact-title">Свържи се с нас</h2>
              <p className="text-sm text-muted-foreground">Имаш въпрос или предложение? Пиши ни!</p>
              <div className="w-12 h-1 bg-accent mt-4 mx-auto" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Име" {...field} data-testid="input-contact-name" className="h-12 bg-white/40 border-none rounded-xl focus:bg-white transition-all shadow-inner" />
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
                        <Input placeholder="Имейл" {...field} data-testid="input-contact-email" className="h-12 bg-white/40 border-none rounded-xl focus:bg-white transition-all shadow-inner" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <button
                            type="button"
                            data-testid="button-topic-select"
                            onClick={() => setIsTopicOpen(!isTopicOpen)}
                            className="w-full h-12 px-4 bg-white/40 rounded-xl flex items-center justify-between transition-all shadow-inner hover:bg-white/60 focus:bg-white"
                          >
                            <span className={selectedTopic ? "text-primary font-medium" : "text-muted-foreground"}>
                              {selectedTopic ? selectedTopic.label : "Относно..."}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isTopicOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {isTopicOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-border/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                              {topicOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  data-testid={`button-topic-${option.value}`}
                                  onClick={() => {
                                    field.onChange(option.value);
                                    setIsTopicOpen(false);
                                  }}
                                  className={`w-full px-5 py-3.5 hover:bg-secondary/50 transition-colors text-left border-b border-border/10 last:border-b-0 ${
                                    field.value === option.value ? 'bg-secondary/30' : ''
                                  }`}
                                >
                                  <span className="font-medium text-primary tracking-wide">{option.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
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
                          data-testid="input-contact-message"
                          className="min-h-[120px] bg-white/40 border-none rounded-xl focus:bg-white transition-all shadow-inner resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  data-testid="button-contact-submit"
                  disabled={contactMutation.isPending}
                  className="w-full h-12 text-md font-bold rounded-xl shadow-lg hover:shadow-accent/20 hover:bg-accent/80 transition-all disabled:opacity-70"
                >
                  {contactMutation.isPending ? "Изпращане..." : "Изпрати"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-8 w-full">
            <p className="text-center text-xs font-serif uppercase tracking-[0.2em] text-muted-foreground mb-5">Последвай ни</p>
            <div className="flex justify-center gap-5">
              <a 
                href="http://facebook.com/share/1AqfYFRzt5/?mibextid=wwXlfr" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-facebook"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-xl bg-secondary/10 backdrop-blur-md border border-border/30 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <Facebook className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-serif uppercase tracking-widest font-bold opacity-70">Facebook</span>
              </a>
              <a 
                href="http://instagram.com/nextgenbulgaria" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-instagram"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-xl bg-secondary/10 backdrop-blur-md border border-border/30 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-sm">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-serif uppercase tracking-widest font-bold opacity-70">Instagram</span>
              </a>
              <a 
                href="http://tiktok.com/@next.gen.bulgaria" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-tiktok"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-xl bg-secondary/10 backdrop-blur-md border border-border/30 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                  <TikTokIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-serif uppercase tracking-widest font-bold opacity-70">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
