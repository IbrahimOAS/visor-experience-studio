import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SeoHead } from "@/components/seo/SeoHead";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Trash2,
  Mail,
  Shield,
  Database,
  CreditCard,
  FileText,
  ArrowRight,
  Check,
} from "lucide-react";

const SITE = "https://visorfitness.com";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

interface CardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
}

const Card = ({ icon, title, children, index }: CardProps) => (
  <motion.div
    custom={index}
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    className="glass-card-strong rounded-2xl p-6 md:p-8 border border-white/10"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h2 className="text-xl md:text-2xl font-bold font-['Space_Grotesk']">{title}</h2>
    </div>
    <div className="text-foreground/85 leading-relaxed space-y-3">{children}</div>
  </motion.div>
);

const DeleteAccount = () => {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Delete Account", item: `${SITE}/delete-account` },
    ],
  };

  const deletionSteps = [
    "Open VISOR.",
    "Go to Profile.",
    "Open Settings.",
    "Tap Delete Account.",
    "Confirm the deletion.",
  ];

  const deletedData = [
    "Profile information",
    "Workout history",
    "Nutrition logs",
    "AI body prediction history",
    "Progress statistics",
    "Uploaded body photos",
    "AI coach conversations",
    "Personal preferences",
  ];

  return (
    <>
      <SeoHead
        title="Delete Your VISOR Account | VISOR"
        description="Learn how to permanently delete your VISOR account and understand what data is removed after deletion."
        path="/delete-account"
        jsonLd={breadcrumbLd}
      />
      <main className="bg-background text-foreground overflow-x-hidden min-h-screen">
        <Navbar />

        <article className="max-w-4xl mx-auto px-6 pt-32 pb-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <span>/</span>
              <li className="text-foreground/80">Delete Account</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-5 leading-tight">
              Delete Your VISOR Account
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              You can permanently delete your VISOR account and associated personal data at any time.
            </p>
          </motion.div>

          <div className="grid gap-5">
            <Card icon={<Trash2 size={22} />} title="Delete from the App" index={0}>
              <p>If you still have access to your account:</p>
              <ol className="list-decimal list-inside space-y-1.5 ml-1">
                {deletionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Card>

            <Card icon={<Mail size={22} />} title="Can't access your account?" index={1}>
              <p>
                Email{" "}
                <a
                  href="mailto:support@visorfitness.com?subject=Delete%20My%20Account"
                  className="text-primary hover:underline"
                >
                  support@visorfitness.com
                </a>{" "}
                with the subject line <strong>Delete My Account</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                Include the email address associated with your VISOR account so we can verify and
                process your request.
              </p>
            </Card>

            <Card icon={<Shield size={22} />} title="What data is deleted?" index={2}>
              <p>
                When your account is deleted, VISOR permanently removes the following data:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2">
                {deletedData.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card icon={<Database size={22} />} title="Data retention" index={3}>
              <p>
                Certain information may be retained only where required by applicable law, fraud
                prevention, security investigations, payment reconciliation, or tax and accounting
                obligations.
              </p>
            </Card>

            <Card icon={<CreditCard size={22} />} title="Subscription notice" index={4}>
              <p>
                Deleting your VISOR account does <strong>not</strong> automatically cancel your
                subscription.
              </p>
              <p>
                If you subscribed through Apple App Store or Google Play, you must cancel your
                subscription through your respective store.
              </p>
            </Card>

            <Card icon={<FileText size={22} />} title="Privacy" index={5}>
              <p>
                For additional information about how VISOR handles personal data, please read our
                Privacy Policy.
              </p>
              <div className="pt-2">
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)]"
                >
                  Privacy Policy
                  <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-14 flex flex-wrap justify-center gap-4 text-sm"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-white/10 bg-white/5 text-foreground font-medium hover:bg-white/10 transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-white/10 bg-white/5 text-foreground font-medium hover:bg-white/10 transition-colors"
            >
              Support
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-white/10 bg-white/5 text-foreground font-medium hover:bg-white/10 transition-colors"
            >
              Terms of Service
            </Link>
          </motion.div>
        </article>

        <Footer />
      </main>
    </>
  );
};

export default DeleteAccount;
