import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'Your progress, made clear',
    subtitle: 'See your milestones and understand how far you have come.',
    image: '/app-screens/ui-1.jpeg',
  },
  {
    id: 2,
    title: 'Guidance that understands you',
    subtitle: 'Get personalized support shaped around your goals.',
    image: '/app-screens/ui-3.jpeg',
  },
  {
    id: 3,
    title: 'Build your daily rhythm',
    subtitle: 'Turn small actions into consistent habits.',
    image: '/app-screens/ui-4.jpeg',
  },
  {
    id: 4,
    title: 'See the bigger picture',
    subtitle: 'Explore your trends and choose your next step with confidence.',
    image: '/app-screens/ui-2.jpeg',
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
      className="bg-[#111318] border border-white/5 rounded-[3rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row mx-auto w-[92%] lg:w-[95%] max-w-[1400px] mb-6 min-h-[75vh] md:min-h-[85vh] relative shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Left Column: Text Content */}
      <div className="w-full md:w-[50%] p-10 sm:p-12 md:p-20 lg:p-24 flex flex-col justify-center relative z-10">
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-2xl">
          {feature.title}
        </h3>
        <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-lg leading-relaxed font-light">
          {feature.subtitle}
        </p>
      </div>

      {/* Right Column: Mobile UI Mockup */}
      <div className="w-full md:w-[50%] relative flex justify-center items-center h-[50vh] md:h-auto">
        <motion.div
          style={{ y, scale }}
          className="absolute w-[80%] sm:w-[60%] md:w-[85%] lg:w-[75%] max-w-[420px] will-change-transform"
        >
          <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative w-full aspect-[1/2.16]">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover object-top block"
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
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </section>
  );
}

export default FeatureShowcase;
