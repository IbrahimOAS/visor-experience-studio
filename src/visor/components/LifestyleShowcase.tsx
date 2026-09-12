import lifestyleAsset from "@/assets/visor-lifestyle-lineup.png.asset.json";

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
          alt="VISOR app on iPhone alongside a water bottle, sunglasses, energy bar, earbuds, car key, smartwatch and cap"
          loading="lazy"
          decoding="async"
          className="mt-8 w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
