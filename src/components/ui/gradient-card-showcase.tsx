import React from 'react';
import { Camera, Sparkles, Flame, TrendingUp, CheckCircle2, MousePointerClick } from 'lucide-react';
import { FlippingCard } from '@/components/ui/flipping-card';
import { useLanguage } from '@/visor/i18n';

export interface VisorCardItem {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  actionText?: string;
  backTitle?: string;
  backPoints: string[];
}

function useVisorCards(): VisorCardItem[] {
  const { t } = useLanguage();
  return [
    {
      step: t('sc1step'),
      title: t('sc1t'),
      desc: t('sc1d'),
      icon: <Camera className="w-5 h-5" />,
      gradientFrom: '#00d0ff',
      gradientTo: '#0066ff',
      backTitle: t('sc1bt'),
      backPoints: [t('sc1p1'), t('sc1p2'), t('sc1p3'), t('sc1p4')],
    },
    {
      step: t('sc2step'),
      title: t('sc2t'),
      desc: t('sc2d'),
      icon: <Sparkles className="w-5 h-5" />,
      gradientFrom: '#99FFFF',
      gradientTo: '#00d0ff',
      backTitle: t('sc2bt'),
      backPoints: [t('sc2p1'), t('sc2p2'), t('sc2p3'), t('sc2p4')],
    },
    {
      step: t('sc3step'),
      title: t('sc3t'),
      desc: t('sc3d'),
      icon: <Flame className="w-5 h-5" />,
      gradientFrom: '#00f2fe',
      gradientTo: '#4facfe',
      backTitle: t('sc3bt'),
      backPoints: [t('sc3p1'), t('sc3p2'), t('sc3p3'), t('sc3p4')],
    },
    {
      step: t('sc4step'),
      title: t('sc4t'),
      desc: t('sc4d'),
      icon: <TrendingUp className="w-5 h-5" />,
      gradientFrom: '#38ef7d',
      gradientTo: '#11998e',
      backTitle: t('sc4bt'),
      backPoints: [t('sc4p1'), t('sc4p2'), t('sc4p3'), t('sc4p4')],
    },
  ];
}

interface SkewCardsProps {
  cards?: VisorCardItem[];
  onCardClick?: (index: number) => void;
}

function CardFront({ card }: { card: VisorCardItem }) {
  const { t } = useLanguage();
  const { step, title, desc, icon } = card;
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden">
      <div className="relative h-full w-full p-5 backdrop-blur-xl rounded-xl text-white flex flex-col justify-between border border-white/25 bg-[#0b131e]/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]">
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.1] border border-white/20 flex items-center justify-center text-[#99FFFF] shadow-[0_0_12px_rgba(153,255,255,0.3)]">
              {icon}
            </div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#99FFFF] uppercase px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/15">
              {step}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-2">
            {title}
          </h2>
          <p className="text-xs sm:text-[13px] text-white/75 leading-relaxed">
            {desc}
          </p>
        </div>
        <div className="pt-3 border-t border-white/10 flex items-center justify-center text-xs font-medium text-[#99FFFF]">
          <span className="flex items-center gap-1.5">
            <MousePointerClick className="w-3.5 h-3.5" />
            <span className="md:hidden">{t('step.tap')}</span>
            <span className="hidden md:inline">{t('step.hover')}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function CardBack({ card }: { card: VisorCardItem }) {
  const { t } = useLanguage();
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden">
      <div
        className="relative h-full w-full p-5 rounded-xl text-white flex flex-col border border-[#99FFFF]/40 bg-[#0b131e]/50 backdrop-blur-xl"
        style={{
          boxShadow: `0 0 24px 0 ${card.gradientFrom}33, inset 0 0 0 1px rgba(255,255,255,0.12)`,
        }}
      >
        <div>
          <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#99FFFF]">
            {card.step} — {t('step.details')}
          </span>
          <h3 className="text-base font-semibold mt-1.5 mb-3 text-white">
            {card.backTitle || card.title}
          </h3>
          <ul className="space-y-2">
            {card.backPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-[11.5px] leading-snug text-white/80">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#99FFFF]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SkewCards({ cards, onCardClick }: SkewCardsProps) {
  const translatedCards = useVisorCards();
  const items = cards ?? translatedCards;
  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-6 justify-items-center items-stretch py-2">
      {items.map((card, idx) => (
        <div
          key={idx}
          className="relative w-full max-w-[280px] pointer-events-auto"
        >
          {/* Gradient glow behind card */}
          <span
            className="absolute inset-0 rounded-2xl blur-[28px] opacity-40 pointer-events-none"
            style={{ background: `linear-gradient(315deg, ${card.gradientFrom}, ${card.gradientTo})` }}
          />
          <FlippingCard
            width={280}
            height={330}
            className="!w-full border-white/20 bg-transparent dark:bg-transparent dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            frontContent={<CardFront card={card} />}
            backContent={<CardBack card={card} />}
          />
        </div>
      ))}
    </div>
  );
}
