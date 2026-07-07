import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import visorLogo from "@/assets/visor-logo.png";
import LanguageToggle from "@/components/LanguageToggle";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks: { label: string; href: string }[] = [
    { label: t("nav.features"), href: "/#whats-inside" },
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
    { label: t("nav.pricing"), href: "/#pricing" },
    { label: t("nav.coaching"), href: "/#coaching" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card-strong rounded-full px-4 sm:px-5 h-14 sm:h-16 flex items-center justify-between shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] border border-white/10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={visorLogo}
              alt="VISOR AI Fitness app logo"
              width={48}
              height={48}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-base sm:text-lg font-bold font-['Space_Grotesk'] tracking-wide text-foreground">
              VISOR
            </span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle />
            <a
              href="/#download"
              className="px-4 h-9 inline-flex items-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
            >
              {t("nav.signIn")}
            </a>
            <a
              href="/#download"
              className="px-4 h-9 inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)]"
            >
              {t("nav.getApp")}
            </a>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              className="md:hidden glass-card-strong mt-2 rounded-3xl border border-white/10"
            >
              <div className="px-5 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-2">
                  <LanguageToggle align="left" dropdownMode="static" className="w-full" />
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="/#download"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 h-9 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-foreground"
                    >
                      {t("nav.signIn")}
                    </a>
                    <a
                      href="/#download"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 h-9 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                    >
                      {t("nav.getApp")}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
