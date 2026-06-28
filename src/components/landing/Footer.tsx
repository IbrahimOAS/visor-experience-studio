import { Link } from "react-router-dom";
import visorLogo96 from "@/assets/visor-logo-96.png";
import visorLogo192 from "@/assets/visor-logo-192.png";
import visorLogo256 from "@/assets/visor-logo-256.png";

type FooterLink = { label: string; href: string; external?: boolean };

const Footer = () => (
  <footer className="relative border-t border-border/30 py-14 px-6">
    {/* Top border glow */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <img
            src={visorLogo96}
            srcSet={`${visorLogo96} 96w, ${visorLogo192} 192w, ${visorLogo256} 256w`}
            sizes="(min-width: 768px) 64px, (min-width: 640px) 56px, 48px"
            alt="VISOR"
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
            className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full object-cover"
          />
          <span className="text-lg sm:text-xl md:text-2xl font-bold font-['Space_Grotesk']">VISOR</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          AI-powered identity transformation. See your future body. Become it.
        </p>
      </div>

      {[
        { title: "Product", links: ["Features", "Pricing", "AI Coach", "Soul Track"] },
        { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
        { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
      ].map((col) => (
        <div key={col.title}>
          <h4 className="font-semibold mb-4 text-foreground">{col.title}</h4>
          <ul className="space-y-2.5">
            {col.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/20 text-center text-sm text-muted-foreground">
      © 2026 VISOR. All rights reserved.
    </div>
  </footer>
);

export default Footer;
