import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { BLOG_POSTS, type BlogPost } from "@/content/blog/posts";
import type { TemplateState } from "./types";

const SITE = "https://visorfitness.com";

interface IndexProps {
  view: "index";
  state?: TemplateState;
}
interface PostProps {
  view: "post";
  post: BlogPost;
  state?: TemplateState;
}

type Props = IndexProps | PostProps;

/**
 * Blog Template — supports index list and single-post views.
 * Safe to publish today (educational content, no marketplace claims).
 */
export default function BlogTemplate(props: Props) {
  if (props.view === "index") return <BlogIndexView />;
  return <BlogPostView post={props.post} />;
}

function BlogIndexView() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "VISOR Journal",
    url: `${SITE}/blog`,
    blogPost: BLOG_POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.publishedAt,
      url: `${SITE}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <SeoHead
        title="VISOR Journal — Identity, AI Coaching & Behavior Change"
        description="Essays on identity-driven fitness, AI vs human coaching, habit science, and the psychology behind long-term transformation."
        path="/blog"
        type="website"
        jsonLd={ld}
      />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />
        <article className="max-w-5xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
              VISOR Journal
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
              Ideas that make transformation stick
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Essays on identity, AI coaching, habit science, and the psychology
              behind long-term change.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block glass-card-strong rounded-3xl p-8 border border-white/10 hover:border-primary/40 transition-all duration-300 h-full"
                >
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 uppercase tracking-wider">
                    <span className="text-primary font-semibold">{post.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {post.readMinutes} min
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read essay <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}

function BlogPostView({ post }: { post: BlogPost }) {
  const url = `${SITE}/blog/${post.slug}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      author: { "@type": "Organization", name: "VISOR" },
      publisher: { "@type": "Organization", name: "VISOR" },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <SeoHead
        title={`${post.title} — VISOR Journal`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={ld}
      />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link to="/blog" className="hover:text-primary">Journal</Link></li>
              <li>/</li>
              <li className="text-foreground/80">{post.title}</li>
            </ol>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 uppercase tracking-wider">
              <span className="text-primary font-semibold">{post.category}</span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {post.readMinutes} min read
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="space-y-6 text-foreground/90 leading-relaxed">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="text-2xl font-bold font-['Space_Grotesk'] mt-10 mb-2">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "p") {
                return <p key={i} className="text-lg">{block.text}</p>;
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2 list-disc pl-6 text-lg">
                    {block.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                );
              }
              return (
                <blockquote key={i} className="glass-card rounded-2xl border-l-4 border-primary px-6 py-5 text-lg italic text-foreground/90">
                  {block.text}
                </blockquote>
              );
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to put this into practice?
            </p>
            <a
              href="/#download"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              Get VISOR <ArrowRight size={16} />
            </a>
          </div>
        </article>
        <Footer />
      </main>
    </>
  );
}
