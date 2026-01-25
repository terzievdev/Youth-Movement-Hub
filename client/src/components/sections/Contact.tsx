import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import mapImage from "@/assets/map-placeholder.png";
import { Facebook, Instagram, Twitter } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().email("Невалиден имейл адрес"),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
});

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Съобщението е изпратено!",
      description: "Ще се свържем с вас възможно най-скоро.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Form Card */}
          <div className="bg-secondary/20 backdrop-blur-sm p-10 rounded-3xl border border-border/50 shadow-sm flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-4xl font-serif font-bold text-primary mb-4">Свържи се с нас</h2>
              <p className="text-muted-foreground">
                Имаш въпрос или идея? Попълни формата и ние ще ти отговорим.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Име" {...field} className="h-14 bg-white/50 border-border/50 focus:bg-white" />
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
                        <Input placeholder="Имейл" {...field} className="h-14 bg-white/50 border-border/50 focus:bg-white" />
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
                          className="min-h-[180px] bg-white/50 border-border/50 focus:bg-white resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-2xl" disabled={form.formState.isSubmitting}>
                  Изпрати запитване
                </Button>
              </form>
            </Form>
          </div>

          {/* Map & Socials Column */}
          <div className="flex flex-col gap-8">
            {/* Map Area */}
            <div className="flex-1 min-h-[350px] relative rounded-3xl overflow-hidden shadow-sm border border-border/50">
              <img 
                src={mapImage} 
                alt="Map Location" 
                className="w-full h-full object-cover grayscale opacity-70"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-sm">
                <p className="font-bold">ул. "Примерна" №15, София</p>
              </div>
            </div>
            
            {/* Socials Card */}
            <div className="bg-secondary/20 backdrop-blur-sm p-8 rounded-3xl border border-border/50 flex justify-center items-center gap-10">
              <a href="#" className="group flex flex-col items-center gap-2">
                <div className="p-4 rounded-2xl bg-white/50 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Facebook className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Facebook</span>
              </a>
              <a href="#" className="group flex flex-col items-center gap-2">
                <div className="p-4 rounded-2xl bg-white/50 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Instagram</span>
              </a>
              <a href="#" className="group flex flex-col items-center gap-2">
                <div className="p-4 rounded-2xl bg-white/50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <Twitter className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
