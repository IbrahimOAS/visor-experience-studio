import React from 'react';
import { BadgeCheck, MapPin, MonitorSmartphone, CalendarClock, Bell, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

const APP_STORE_URL = 'https://apps.apple.com/us/app/visor-fitness/id6776579817';

export function PersonalTrainingSection({ overlay = false }: { overlay?: boolean; visible?: boolean }) {
  const { t } = useLanguage();
  const FEATURES = [
    { icon: BadgeCheck, title: t('pt.f1t'), desc: t('pt.f1d') },
    { icon: MapPin, title: t('pt.f2t'), desc: t('pt.f2d') },
    { icon: MonitorSmartphone, title: t('pt.f3t'), desc: t('pt.f3d') },
    { icon: CalendarClock, title: t('pt.f4t'), desc: t('pt.f4d') },
  ];

  return (
    <section
      id="personal-training-section"
      className={
        overlay
          ? 'relative w-full min-h-full flex flex-col justify-center py-20 sm:py-24 px-4 sm:px-8 bg-transparent'
          : 'relative w-full py-20 sm:py-28 px-4 sm:px-8 bg-[#070b12]'
      }
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-[#99FFFF]/30 bg-[#99FFFF]/5 px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#99FFFF]">
          {t('pt.badge')}
        </span>

        {/* Heading */}
        <h2 className={`${overlay ? 'mt-3 text-2xl sm:text-4xl md:text-5xl' : 'mt-5 text-3xl sm:text-5xl md:text-6xl'} font-light tracking-tight text-white leading-tight`}>
          {t('pt.title1')}{' '}
          <span
            className="font-semibold text-[#99FFFF]"
            style={{ textShadow: '0 0 24px rgba(153,255,255,0.45)' }}
          >
            {t('pt.title2')}
          </span>
        </h2>
        <p className="mt-3 max-w-xl text-sm sm:text-base text-white/60">
          {t('pt.sub')}
        </p>

        {/* Fanned card stack */}
        <div className={`${overlay ? 'mt-4' : 'mt-8'} w-full`}>
          <CardStack
            items={CARDS}
            maxVisible={7}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            overlap={0.5}
            spreadDeg={40}
            autoAdvance
            intervalMs={3200}
            pauseOnHover
            showDots
          />
        </div>

        {/* Meet Your Coaches — coming soon card */}
        <div className={`${overlay ? 'mt-5 p-4 sm:p-6' : 'mt-10 p-6 sm:p-8'} w-full max-w-xl rounded-3xl border border-[#99FFFF]/20 bg-[#0b131e]/60 backdrop-blur-2xl shadow-[0_0_60px_rgba(153,255,255,0.07),inset_0_0_30px_rgba(153,255,255,0.03)]}`}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#99FFFF]/30 bg-[#99FFFF]/5 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#99FFFF]">
            {t('pt.comingSoon')}
          </span>
          <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white">
            {t('pt.meetTitle')}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-white/55 max-w-sm mx-auto">
            {t('pt.meetDesc')}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#99FFFF] hover:bg-[#80ffff] text-[#1D3045] px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_0_18px_rgba(153,255,255,0.35)] hover:shadow-[0_0_28px_rgba(153,255,255,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {t('pt.notify')}
            </a>
            <Link
              to="/for-coaches"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] text-white px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer no-underline"
            >
              <UserRound className="w-4 h-4 text-[#99FFFF]" />
              {t('pt.coach')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalTrainingSection;
