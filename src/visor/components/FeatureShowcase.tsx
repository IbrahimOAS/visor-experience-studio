import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import panel01 from '@/assets/ui-panel-01.png.asset.json';
import panel02 from '@/assets/ui-panel-02.png.asset.json';
import panel03 from '@/assets/ui-panel-03.png.asset.json';
import panel04 from '@/assets/ui-panel-04.png.asset.json';

const features = [
  {
    id: 1,
    title: 'Start with one clear goal',
    subtitle: 'Lean out, build mass, recomposition or longevity — pick your primary outcome and shift it any week.',
    image: panel01.url,
  },
  {
    id: 2,
    title: 'Choose how hard you get pushed',
    subtitle: 'Steady, Ambitious or Olympia sets your progression speed, and you see the pace it implies.',
    image: panel04.url,
  },
  {
    id: 3,
    title: 'Become the version you choose',
    subtitle: 'Identity modes set the intensity of your plan and the voice of your coach.',
    image: panel03.url,
  },
  {
    id: 4,
    title: 'Coaching in a voice you like',
    subtitle: 'Commander, Guardian, Visionary or Strategist — change your coach tone whenever you want.',
    image: panel02.url,
  },
];

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['60%', '-60%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);

  return (
    <div
      ref={ref}
      className="bg-[#111318] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row mx-auto w-[97%] lg:w-[99%] max-w-[1880px] mb-6 min-h-[60vh] md:min-h-[50vh] relative shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Left Column: Text Content */}
      <div className="w-full md:w-[56%] p-8 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center relative z-10">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight max-w-2xl">
          {feature.title}
        </h3>
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
          {feature.subtitle}
        </p>
      </div>

      {/* Right Column: Mobile UI Mockup */}
      <div className="w-full md:w-[44%] relative flex justify-center items-center h-[46vh] md:h-auto">
        <motion.div
          style={{ y, scale }}
          className="absolute w-[62%] sm:w-[48%] md:w-[62%] lg:w-[54%] max-w-[340px] will-change-transform"
        >

          <div className="relative w-full aspect-[1/2.06] drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-contain block"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function FeatureShowcase() {
  return (
    <section className="bg-transparent py-16 md:py-24 w-full relative z-20 overflow-x-hidden">
      <div className="text-center max-w-4xl mx-auto px-6 mb-12 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight text-white">
          Be Yourself{' '}
          <span
            className="font-semibold text-[#99FFFF]"
            style={{ textShadow: '0 0 28px rgba(153, 255, 255, 0.4)' }}
          >
            Be VISOR
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-400 font-light max-w-2xl mx-auto">
          Set your goal, your pace, your identity and your coach's voice — VISOR adapts to the
          version of you that you choose.
        </p>
      </div>

      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </section>
  );
}

export default FeatureShowcase;
