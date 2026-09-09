import { useEffect, useState } from "react";

export interface CurrencyInfo {
  code: string;       // "NOK"
  symbol: string;     // "kr"
  rate: number;       // multiplier from USD (e.g. 10.5)
  position: "before" | "after";
}

// Approximate rates — Stripe Adaptive Pricing handles the exact charge;
// these are for display only and can be updated periodically.
const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  NO: { code: "NOK", symbol: "kr",   rate: 10.8,  position: "after"  },
  SE: { code: "SEK", symbol: "kr",   rate: 10.4,  position: "after"  },
  DK: { code: "DKK", symbol: "kr",   rate: 7.1,   position: "after"  },
  GB: { code: "GBP", symbol: "£",    rate: 0.79,  position: "before" },
  DE: { code: "EUR", symbol: "€",    rate: 0.92,  position: "before" },
  FR: { code: "EUR", symbol: "€",    rate: 0.92,  position: "before" },
  NL: { code: "EUR", symbol: "€",    rate: 0.92,  position: "before" },
  ES: { code: "EUR", symbol: "€",    rate: 0.92,  position: "before" },
  IT: { code: "EUR", symbol: "€",    rate: 0.92,  position: "before" },
  SA: { code: "SAR", symbol: "ر.س",  rate: 3.75,  position: "after"  },
  AE: { code: "AED", symbol: "د.إ",  rate: 3.67,  position: "after"  },
  EG: { code: "EGP", symbol: "E£",   rate: 49.0,  position: "before" },
  US: { code: "USD", symbol: "$",    rate: 1,     position: "before" },
  CA: { code: "CAD", symbol: "CA$",  rate: 1.36,  position: "before" },
  AU: { code: "AUD", symbol: "A$",   rate: 1.53,  position: "before" },
};

const USD: CurrencyInfo = { code: "USD", symbol: "$", rate: 1, position: "before" };

export function formatPrice(usdAmount: number, currency: CurrencyInfo): string {
  const converted = usdAmount * currency.rate;
  const rounded = Math.ceil(converted) - 0.10; // e.g. 215.90 → 215.90 style
  const formatted = rounded.toLocaleString("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency.position === "before"
    ? `${currency.symbol}${formatted}`
    : `${formatted} ${currency.symbol}`;
}

export function useCurrency(): { currency: CurrencyInfo; loading: boolean } {
  const [currency, setCurrency] = useState<CurrencyInfo>(USD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.country.is/")
      .then((r) => r.json())
      .then((data: { country?: string }) => {
        if (!cancelled && data.country) {
          setCurrency(CURRENCY_MAP[data.country] ?? USD);
        }
      })
      .catch(() => {/* fallback to USD silently */})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { currency, loading };
}
