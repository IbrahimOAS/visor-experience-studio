import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();
  const items = t("landing.testimonials.items", { returnObjects: true }) as Array<{
    name: string; role: string; text: string;
  }>;

  const reviewLd = items.map((it) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "MobileApplication", name: "VISOR", applicationCategory: "HealthApplication" },
    author: { "@type": "Person", name: it.name },
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    reviewBody: it.text,
  }));

  return (
    <section className="py-24 px-6">
      <Helmet>
        {reviewLd.map((ld, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
        ))}
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {t("landing.testimonials.titlePre")}{" "}
            <span className="text-gradient">{t("landing.testimonials.titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("landing.testimonials.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 mb-6 leading-relaxed">"{it.text}"</p>
              <div>
                <div className="font-semibold text-foreground">{it.name}</div>
                <div className="text-sm text-muted-foreground">{it.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
