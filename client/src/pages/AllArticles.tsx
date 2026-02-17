import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Newspaper } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  body: string;
  imageUrl: string | null;
  publishedAt: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export default function AllArticles() {
  const { data: blogs = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) return [];
      return res.json();
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Обратно към начало</span>
            </Link>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2" data-testid="text-all-articles-title">Всички статии</h1>
            <div className="w-16 h-1 bg-accent mb-10" />

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
            ) : blogs.length > 0 ? (
              <div className="space-y-8">
                {blogs.map((blog, index) => (
                  <Link key={blog._id} href={`/article/${blog.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ y: -4 }}
                      className="bg-card/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 group cursor-pointer"
                      data-testid={`card-article-${blog._id}`}
                    >
                      {blog.imageUrl && (
                        <div className="relative overflow-hidden">
                          <img
                            src={blog.imageUrl}
                            className="w-full max-h-80 object-cover object-top"
                            alt={blog.title}
                          />
                        </div>
                      )}
                      <div className="p-8">
                        {blog.publishedAt && (
                          <p className="text-accent text-sm font-bold mb-2">{formatDate(blog.publishedAt)}</p>
                        )}
                        <h3 className="text-2xl font-serif font-bold text-primary mb-4">{blog.title}</h3>
                        {blog.body && (
                          <p className="text-muted-foreground mb-6 line-clamp-3">{blog.body}</p>
                        )}
                        <div className="flex items-center text-primary font-bold group-hover:text-accent transition-colors">
                          Прочети повече <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-card/60 backdrop-blur-sm rounded-3xl p-16 border border-white/20 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <Newspaper className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Няма статии все още</h3>
                <p className="text-muted-foreground">Очаквайте интересно съдържание скоро.</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
