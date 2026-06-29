import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const current =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 h-9 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
        aria-label={t("nav.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={13} />
        {current.label}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 min-w-[160px] glass-card-strong rounded-2xl border border-white/10 overflow-hidden z-50 shadow-xl"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const active = lang.code === current.code;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs hover:bg-white/10 transition-colors ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span>
                    <span className="font-semibold mr-2">{lang.label}</span>
                    {lang.name}
                  </span>
                  {active && <Check size={13} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageToggle;
