import { useState, useRef, useEffect, useId, KeyboardEvent } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

interface LanguageToggleProps {
  className?: string;
  align?: "left" | "right";
  dropdownMode?: "absolute" | "static";
}

const LanguageToggle = ({
  className = "",
  align = "right",
  dropdownMode = "absolute",
}: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listboxId = useId();

  const current =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ??
    SUPPORTED_LANGUAGES[0];

  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(
      0,
      SUPPORTED_LANGUAGES.findIndex((l) => l.code === current.code),
    ),
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // When opening, focus the active option
  useEffect(() => {
    if (open) {
      const idx = Math.max(
        0,
        SUPPORTED_LANGUAGES.findIndex((l) => l.code === current.code),
      );
      setActiveIndex(idx);
      // Wait a tick for the list to render
      requestAnimationFrame(() => {
        optionRefs.current[idx]?.focus();
      });
    }
  }, [open, current.code]);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setOpen(false);
    // Restore focus to the trigger button
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const moveFocus = (nextIndex: number) => {
    const count = SUPPORTED_LANGUAGES.length;
    const idx = ((nextIndex % count) + count) % count;
    setActiveIndex(idx);
    optionRefs.current[idx]?.focus();
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveFocus(activeIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(activeIndex - 1);
        break;
      case "Home":
        e.preventDefault();
        moveFocus(0);
        break;
      case "End":
        e.preventDefault();
        moveFocus(SUPPORTED_LANGUAGES.length - 1);
        break;
      case "Escape":
      case "Tab":
        setOpen(false);
        if (e.key === "Escape") {
          e.preventDefault();
          buttonRef.current?.focus();
        }
        break;
    }
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleButtonKeyDown}
        className="flex items-center gap-1.5 px-3 h-9 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`${t("nav.language")}: ${current.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
      >
        <Globe size={13} aria-hidden="true" />
        <span aria-hidden="true">{current.label}</span>
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          dir="ltr"
          tabIndex={-1}
          aria-label={t("nav.language")}
          aria-activedescendant={`${listboxId}-opt-${SUPPORTED_LANGUAGES[activeIndex]?.code}`}
          onKeyDown={handleListKeyDown}
          style={{ boxShadow: dropdownMode === "static" ? "none" : undefined }}
          className={`${dropdownMode === "static" ? "relative w-full mb-2" : `absolute ${align === "left" ? "left-0" : "right-0"} w-[min(220px,calc(100vw-2rem))] z-[80]`} mt-2 glass-card-strong rounded-2xl border border-white/10 overflow-hidden focus:outline-none`}
        >
          {SUPPORTED_LANGUAGES.map((lang, i) => {
            const active = lang.code === current.code;
            return (
              <li key={lang.code} role="none">
                <button
                  ref={(el) => (optionRefs.current[i] = el)}
                  id={`${listboxId}-opt-${lang.code}`}
                  type="button"
                  role="option"
                  aria-selected={active}
                  tabIndex={i === activeIndex ? 0 : -1}
                  onClick={() => handleSelect(lang.code)}
                  onFocus={() => setActiveIndex(i)}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left text-xs hover:bg-white/10 focus:bg-white/10 focus:outline-none transition-colors ${active ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span className="min-w-0 truncate">
                    <span className="font-semibold mr-2">{lang.label}</span>
                    {lang.name}
                  </span>
                  {active && <Check size={13} className="text-primary" aria-hidden="true" />}
                  <span className="sr-only">{active ? t("nav.language") + " selected" : ""}</span>
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
