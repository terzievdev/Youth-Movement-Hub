import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useEffect } from "react";
import lacrosseSigning1 from "@/assets/articles/lacrosse-signing-1.jpg";
import lacrosseSigning2 from "@/assets/articles/lacrosse-signing-2.jpg";

const articles: Record<string, {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  images: string[];
  content: React.ReactNode;
}> = {
  "lacrosse-partnership": {
    title: "Споразумение за сътрудничество с Българската федерация по лакрос",
    subtitle: "NEXT GEN BULGARIA поставя основите за дългосрочно партньорство в полза на младежта",
    date: "9 Януари, 2026",
    readTime: "3 мин",
    images: [lacrosseSigning1, lacrosseSigning2],
    content: (
      <>
        <p className="text-lg leading-relaxed mb-6">
          NEXT GEN BULGARIA подписа Споразумение за сътрудничество с Българската федерация по лакрос. Партньорството поставя основите за дългосрочно сътрудничество в обществена полза, насочено към развитието на младежта чрез спорт, неформално образование, доброволчество и активна гражданска ангажираност.
        </p>
        
        <p className="text-lg leading-relaxed mb-6">
          Съвместно ще работим за насърчаване на приобщаването, равните възможности, здравословния начин на живот, психичното благополучие и превенцията на рисково поведение, като използваме спорта – включително лакроса – като силен инструмент за социално развитие.
        </p>
        
        <p className="text-lg leading-relaxed mb-6">
          Специално внимание ще бъде обърнато и на адаптивния спорт, включително и адаптивен лакрос.
        </p>
        
        <p className="text-lg leading-relaxed mb-6">
          Предстоят съвместни инициативи, проекти и дейности на национално и европейско ниво, насочени към млади хора и общности.
        </p>
        
        <p className="text-lg leading-relaxed text-primary font-medium">
          Благодарим на г-н Николай Чолаков и Българската федерация по лакрос за доверието и споделената визия!
        </p>
      </>
    )
  }
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Статията не е намерена</h1>
          <Link href="/" className="text-accent hover:underline">Обратно към начало</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Обратно към статии</span>
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {article.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {article.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="rounded-2xl overflow-hidden shadow-xl border border-border/20"
                >
                  <img 
                    src={img} 
                    alt={`Снимка ${idx + 1}`} 
                    className="w-full h-80 object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </motion.div>
              ))}
            </div>

            <article className="prose prose-lg max-w-none text-muted-foreground">
              {article.content}
            </article>

            <div className="mt-12 pt-8 border-t border-border/30">
              <Link href="/#articles" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Виж всички статии</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
