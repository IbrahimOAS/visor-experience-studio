import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/content/blog/posts";

const FEATURED_SLUGS = [
  "meal-prep-guide",
  "workout-routine-guide",
  "tracking-progress-guide",
  "6-pack-transformation-guide",
];

/**
 * Homepage entry point into the VISOR guides (blog).
 * Purely presentational — content comes from the blog registry.
 */
export const GuidesSection = () => {
  const posts = FEATURED_SLUGS.map((slug) =>
    BLOG_POSTS.find((p) => p.slug === slug),
  ).filter(Boolean) as typeof BLOG_POSTS;

  if (posts.length === 0) return null;

  return (
    <section
      id="guides"
      className="relative z-10 px-5 sm:px-6 py-16 sm:py-24 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-bold text-white">
            Fitness Guides
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
            Practical, no-hype guides on meal prep, training and measuring real
            progress — the habits VISOR is built to support.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-[#99FFFF]/40 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#99FFFF]/60"
            >
              <span className="text-[11px] uppercase tracking-widest text-[#99FFFF]/80">
                {post.category}
              </span>
              <h3 className="mt-2 font-['Space_Grotesk'] text-base sm:text-lg font-semibold text-white leading-snug">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-4">
                {post.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/80 group-hover:text-[#99FFFF] transition-colors">
                Read guide
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 hover:text-[#99FFFF] hover:border-[#99FFFF]/40 transition-colors"
          >
            See all guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
