import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n';
import { useIsMobile } from '@/hooks/use-mobile';

const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?q=80&w=1500&auto=format&fit=crop',
] as const;

interface TransformationSectionProps {
  id: string;
  title: string;
  description: string;
  image: string;
  imageLeft: boolean;
}

function TransformationSection({ data }: { data: TransformationSectionProps }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const slide = isMobile ? '0vw' : '20vw';
  const leftX = useTransform(scrollYProgress, [0, 1], [`-${slide}`, '0vw']);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 1], [slide, '0vw']);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const image = (
    <div className="mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-card md:mx-0 md:rounded-none">
      <img
        src={data.image}
        alt={data.title}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-all duration-700 md:opacity-70 md:grayscale md:hover:scale-105 md:hover:opacity-100 md:hover:grayscale-0"
      />
    </div>
  );

  const copy = (
    <div className="mx-auto w-full max-w-md md:mx-0">
      <span className="mb-3 block text-sm font-semibold text-primary md:mb-6">{data.id}</span>
      <h3 className="whitespace-pre-line text-[2rem] font-bold uppercase leading-[0.95] text-foreground sm:text-5xl sm:leading-[0.85] md:text-7xl">
        {data.title}
      </h3>
      <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground md:mt-8 md:text-base">
        {data.description}
      </p>
    </div>
  );

  return (
    <article
      ref={sectionRef}
      className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden text-foreground md:min-h-screen"
    >
      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 py-16 sm:px-6 md:grid-cols-2 md:gap-12 md:py-24 lg:gap-24">
        <motion.div
          className={`flex h-full w-full flex-col justify-center ${data.imageLeft ? 'order-1' : 'order-2 md:order-1'}`}
          style={{ x: leftX, opacity: leftOpacity }}
        >
          {data.imageLeft ? image : copy}
        </motion.div>

        <motion.div
          className={`flex h-full w-full flex-col justify-center ${data.imageLeft ? 'order-2' : 'order-1 md:order-2'}`}
          style={{ x: rightX, opacity: rightOpacity }}
        >
          {data.imageLeft ? copy : image}
        </motion.div>
      </div>
    </article>
  );
}

export function TransformationCards() {
  const { t } = useLanguage();
  const sections: TransformationSectionProps[] = [
    { id: '01', title: t('tc1t'), description: t('tc1d'), image: CARD_IMAGES[0], imageLeft: true },
    { id: '02', title: t('tc2t'), description: t('tc2d'), image: CARD_IMAGES[1], imageLeft: false },
    { id: '03', title: t('tc3t'), description: t('tc3d'), image: CARD_IMAGES[2], imageLeft: true },
    { id: '04', title: t('tc4t'), description: t('tc4d'), image: CARD_IMAGES[3], imageLeft: false },
    { id: '05', title: t('tc5t'), description: t('tc5d'), image: CARD_IMAGES[4], imageLeft: true },
  ];

  return (
    <section id="transformation-showcase" className="dark min-h-screen bg-transparent selection:bg-primary selection:text-primary-foreground">
      <header className="flex min-h-[55vh] items-end justify-center px-6 pb-20 pt-32 text-center">
        <h2 className="max-w-5xl text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-7xl">
          {t('action.title')}
        </h2>
      </header>
      {sections.map((section) => (
        <TransformationSection key={section.id} data={section} />
      ))}
    </section>
  );
}

export default TransformationCards;
