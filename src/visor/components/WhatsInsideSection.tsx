import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Activity, 
  Flame, 
  Camera, 
  Video, 
  ClipboardList, 
  Dumbbell, 
  Moon, 
  MessageSquare, 
  Bot, 
  RotateCw, 
  Compass, 
  Users, 
  MessageCircle, 
  Bell, 
  Crown,
  Apple, 
  Globe,
  Gift,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../i18n';

interface WhatsInsideSectionProps {
  onGetApp: () => void;
  onSignIn: () => void;
}

export function WhatsInsideSection({ onGetApp, onSignIn }: WhatsInsideSectionProps) {
  const { t } = useLanguage();
  const gridFeatures = [
    { icon: Sparkles, title: t('wi1t'), desc: t('wi1d') },
    { icon: Calendar, title: t('wi2t'), desc: t('wi2d') },
    { icon: TrendingUp, title: t('wi3t'), desc: t('wi3d') },
    { icon: Activity, title: t('wi4t'), desc: t('wi4d') },
    { icon: Flame, title: t('wi5t'), desc: t('wi5d') },
    { icon: Camera, title: t('wi6t'), desc: t('wi6d') },
    { icon: Video, title: t('wi7t'), desc: t('wi7d') },
    { icon: ClipboardList, title: t('wi8t'), desc: t('wi8d') },
    { icon: Dumbbell, title: t('wi9t'), desc: t('wi9d') },
    { icon: Moon, title: t('wi10t'), desc: t('wi10d') },
    { icon: MessageSquare, title: t('wi11t'), desc: t('wi11d') },
    { icon: Bot, title: t('wi12t'), desc: t('wi12d') },
    { icon: RotateCw, title: t('wi13t'), desc: t('wi13d') },
    { icon: Compass, title: t('wi14t'), desc: t('wi14d') },
    { icon: Users, title: t('wi15t'), desc: t('wi15d') },
    { icon: MessageCircle, title: t('wi16t'), desc: t('wi16d') },
    { icon: Bell, title: t('wi17t'), desc: t('wi17d') },
    { icon: Crown, title: t('wi18t'), desc: t('wi18d') },
  ];

  return (
    <section 
      id="whats-inside-section" 
      className="relative z-10 w-full overflow-hidden py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-20 bg-transparent text-white border-t border-white/10"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#99FFFF]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-3">
            {t('inside.title1')}{' '}
            <span className="font-semibold text-[#99FFFF]" style={{ textShadow: '0 0 24px rgba(153, 255, 255, 0.45)' }}>
              VISOR
            </span>
          </h1>
          <h2 className="text-sm sm:text-base md:text-lg text-white/50 font-medium">
            {t('inside.sub')}
          </h2>
        </div>

        {/* 18 Grid Feature Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 px-4 sm:px-10 lg:px-20">
          {gridFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative group rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#99FFFF]/20 overflow-hidden transition-all duration-300"
              >
                <div className="relative h-full rounded-xl p-6 bg-[#0B131E]/60 backdrop-blur-sm flex flex-col group-hover:bg-[#0B131E]/50 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#99FFFF] mb-4 group-hover:scale-110 group-hover:bg-[#99FFFF]/10 transition-all duration-300 shadow-[0_0_15px_rgba(153,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(153,255,255,0.2)]">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-base font-semibold text-white/90 mb-1.5 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Refer and Earn Conversion Banner */}
        <div className="rounded-3xl p-8 sm:p-12 backdrop-blur-2xl bg-gradient-to-br from-white/[0.10] via-white/[0.05] to-white/[0.08] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#99FFFF]/10 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#99FFFF]/5 blur-[80px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] text-[11px] sm:text-xs font-medium tracking-wide text-white/80 mb-5">
              <Users className="w-3.5 h-3.5 text-[#99FFFF]" />
              <span>{t('refer.badge')}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-light text-white mb-4 tracking-tight">
              {t('refer.title1')}{' '}
              <span className="font-semibold text-[#99FFFF]">
                {t('refer.title2')}
              </span>
            </h3>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto">
              {t('refer.desc')}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#99FFFF]/25 bg-[#99FFFF]/10 text-[11px] sm:text-xs font-medium text-[#99FFFF] mb-8 shadow-[0_0_20px_rgba(153,255,255,0.1)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t('refer.pill')}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onSignIn}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm text-[#1D3045] bg-[#99FFFF] hover:bg-[#80ffff] transition-all duration-300 shadow-[0_0_20px_rgba(153,255,255,0.4)] hover:shadow-[0_0_28px_rgba(153,255,255,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>{t('refer.join')}</span>
              </button>

              <Link
                to="/pricing"
                className="group inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full font-medium text-xs sm:text-sm text-white backdrop-blur-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t('refer.plans')}</span>
                <ArrowRight className="w-4 h-4 text-[#99FFFF] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
