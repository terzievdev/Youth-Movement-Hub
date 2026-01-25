import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import mapImage from "@/assets/map-placeholder.png";

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
    console.log(values);
    toast({
      title: "Съобщението е изпратено!",
      description: "Ще се свържем с вас възможно най-скоро.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-serif font-bold text-primary mb-4">Свържи се с нас</h2>
              <p className="text-muted-foreground">
                Имаш въпрос или идея? Попълни формата и ние ще ти отговорим.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Име</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван Иванов" {...field} className="h-12 bg-secondary/20" />
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
                      <FormLabel>Имейл</FormLabel>
                      <FormControl>
                        <Input placeholder="ivan@example.com" {...field} className="h-12 bg-secondary/20" />
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
                      <FormLabel>Съобщение</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Как можем да помогнем?" 
                          className="min-h-[150px] bg-secondary/20 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Изпращане..." : "Изпрати запитване"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Map & Info */}
          <div className="h-full min-h-[500px] relative rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img 
              src={mapImage} 
              alt="Map Location" 
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Info Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
              <h3 className="font-serif font-bold text-xl mb-2">Нашият Офис</h3>
              <p className="text-muted-foreground text-sm mb-4">
                ул. "Примерна" №15, ет. 2<br />
                София 1000, България
              </p>
              <div className="flex flex-col gap-1 text-sm font-medium">
                <a href="tel:+359888123456" className="hover:text-accent transition-colors">+359 888 123 456</a>
                <a href="mailto:contact@youthmovement.bg" className="hover:text-accent transition-colors">contact@youthmovement.bg</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
