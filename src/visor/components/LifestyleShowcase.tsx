import { Apple } from "lucide-react";
import lifestyleAsset from "@/assets/visor-lifestyle-lineup.jpg.asset.json";

const APP_STORE_URL = "https://apps.apple.com/us/app/visor-fitness/id6776579817";

export function LifestyleShowcase() {
  return (
    <section id="lifestyle-showcase" className="relative w-full bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white">
          Built into your everyday
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm sm:text-base text-white/70">
          VISOR lives beside your watch, your earbuds and your routine — one plan across every part
          of your day.
        </p>

        <img
          src={lifestyleAsset.url}
          alt="VISOR app on a phone alongside a water bottle, sunglasses, energy bar, earbuds, car key, smartwatch and cap"
          loading="lazy"
          decoding="async"
          width={1920}
          height={768}
          className="mt-8 w-full h-auto object-contain"
        />

        <div className="mt-6 flex justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#99FFFF] px-6 py-3 text-sm font-medium text-[#1D3045] shadow-[0_0_16px_rgba(153,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[#80ffff] hover:shadow-[0_0_24px_rgba(153,255,255,0.5)] active:scale-95"
          >
            <Apple className="h-4 w-4 fill-current" />
            <span>Download VISOR on the App Store</span>
          </a>
        </div>
      </div>
    </section>
  );
}
