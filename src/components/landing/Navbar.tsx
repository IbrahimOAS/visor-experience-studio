import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import visorLogo from "@/assets/visor-logo.png";

const navLinks: { label: string; href: string }[] = [
  { label: "Features", href: "#whats-inside" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Coaching", href: "#coaching" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <a href="#" className="flex items-center gap-2 group shrink-0">
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
          </a>

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
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 h-9 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              aria-label="Change language"
            >
              <Globe size={13} />
              EN
            </button>
            <a
              href="#download"
              className="px-4 h-9 inline-flex items-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
            >
              Sign In
            </a>
            <a
              href="#download"
              className="px-4 h-9 inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(28,100%,55%/0.5)]"
            >
              Get the App
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
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden glass-card-strong mt-2 rounded-3xl border border-white/10"
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
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex items-center gap-1.5 px-3 h-9 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted-foreground">
                    <Globe size={13} /> EN
                  </button>
                  <a
                    href="#download"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 h-9 inline-flex items-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-foreground"
                  >
                    Sign In
                  </a>
                  <a
                    href="#download"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 h-9 inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold ml-auto"
                  >
                    Get the App
                  </a>
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
