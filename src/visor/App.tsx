import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowDown, ChevronUp, Apple, Globe } from 'lucide-react';
import { useVideoScrub, resolveVideoUrl } from './useVideoScrub';
import { GlassNavbar } from './components/GlassNavbar';
import { AppModal } from './components/AppModal';
import SkewCards from '@/components/ui/gradient-card-showcase';
import { FeaturesSection } from './components/FeaturesSection';
import { WhatsInsideSection } from './components/WhatsInsideSection';
import { TransformationCards } from './components/TransformationCards';
import { PersonalTrainingSection } from './components/PersonalTrainingSection';
import { PERMANENT_VIDEO_URL } from './constants';
import featuresBg from '@/assets/features-bg.jpg';
import Footer from '@/components/Footer';
import { GuidesSection } from './components/GuidesSection';
import { EliteCoachesDialog } from '@/components/EliteCoachesDialog';
import { SignUpDialog } from '@/components/SignUpDialog';
import { SignInDialog } from '@/components/SignInDialog';
import { useLanguage } from './i18n';

const VIDEO_URL = PERMANENT_VIDEO_URL;
const APP_STORE_URL = 'https://apps.apple.com/us/app/visor-fitness/id6776579817';

const DARK = '#1D3045';

interface StaggerProps {
  visible: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

function Stagger({ visible, delay = 0, className = '', children }: StaggerProps) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(24px)',
        transition:
          'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const { t } = useLanguage();
  const { scrollProgress, canvasLive, videoRef, canvasRef, containerRef } =
    useVideoScrub(VIDEO_URL);


  const [modalType, setModalType] = useState<'get-app' | 'sign-in' | null>(null);
  const [eliteCoachesOpen, setEliteCoachesOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const openAppStore = () => {
    window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  const p = scrollProgress;

  // Sequential Section Opacities
  let s1Opacity = 0;
  if (p < 0.1) {
    s1Opacity = 1;
  } else {
    s1Opacity = Math.max(0, 1 - (p - 0.1) / 0.03);
  }

  let s2Opacity = 0;
  if (p < 0.14) {
    s2Opacity = 0;
  } else if (p < 0.18) {
    s2Opacity = (p - 0.14) / 0.04;
  } else if (p < 0.25) {
    s2Opacity = 1;
  } else {
    s2Opacity = Math.max(0, 1 - (p - 0.25) / 0.03);
  }

  // Section 4 must only appear after the transformation panels
  // (top-[480vh] + ~555vh of content ≈ 1035vh of a 1150vh max scroll ≈ 0.90).
  let s4Opacity = 0;
  if (p < 0.9) {
    s4Opacity = 0;
  } else if (p < 0.94) {
    s4Opacity = (p - 0.9) / 0.04;
  } else {
    s4Opacity = 1;
  }

  const s1Visible = s1Opacity > 0.02;
  const s2Visible = s2Opacity > 0.02;
  const s4Visible = s4Opacity > 0.02;

  const scrollToProgress = (targetP: number) => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: targetP * maxScroll,
      behavior: 'smooth',
    });
  };

  const handleNavNavigate = (index: number) => {
    if (index === 0) {
      const el = document.getElementById('whats-inside-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (index === 1) {
      if (!containerRef.current) return;
      const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: 0.45 * maxScroll, behavior: 'smooth' });
    } else if (index === 2) {
      const el = document.getElementById('features-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (index === 3) {
      // Coaching -> Personal Training, Your Door (section 4 of hero track)
      scrollToProgress(0.96);
    } else if (index === 4) {
      const el = document.getElementById('whats-inside-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#0b131e] text-white select-none min-h-screen">
      {/* Floating Glassmorphism Navigation Bar */}
      <GlassNavbar
        onNavigate={handleNavNavigate}
        onGetApp={openAppStore}
        onSignIn={() => setSignInOpen(true)}
        onEliteCoaches={() => setEliteCoachesOpen(true)}
      />

      {/* Main Interactive Video Scrub Track */}
      <div
        ref={containerRef}
        id="main-scroll-track"
        className="relative h-[1250vh] bg-[#0b131e]"
      >
        {/* Sticky Full Viewport Scene */}
        <div
          id="sticky-scene-container"
          className="sticky top-0 w-full h-[100dvh] overflow-hidden"
        >

        {/* 1) Video Full Cover */}
        <video
          ref={videoRef}
          id="background-scrub-video"
          src={resolveVideoUrl(VIDEO_URL)}
          crossOrigin="anonymous"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 2) Canvas for decoded frame bank */}
        <canvas
          ref={canvasRef}
          id="frame-scrub-canvas"
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            canvasLive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* 3) Overlay with 3 sequential text sections */}
        <div
          id="scene-overlay"
          className="absolute inset-0 pointer-events-none flex flex-col justify-between"
        >
          {/* SECTION 1 (Hero, Centered) */}
          <section
            id="section-1-hero"
            className="absolute inset-0 px-6 sm:px-8 md:px-20 lg:px-32 pt-24 sm:pt-28 pb-12 flex flex-col justify-center items-center text-center"
            style={{
              opacity: s1Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s1Visible ? 'auto' : 'none',
              visibility: s1Visible ? 'visible' : 'hidden',
            }}
          >
            {/* Glassmorphic Badge / Button */}
            <Stagger visible={s1Visible} delay={0} className="mb-4 sm:mb-5">
              <button
                id="hero-ai-badge-btn"
                onClick={openAppStore}
                className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 cursor-pointer pointer-events-auto hover:scale-105"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(153, 255, 255, 0.12)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#99FFFF] animate-pulse shadow-[0_0_6px_#99FFFF]" />
                <span
                  className="text-[11px] sm:text-xs font-medium tracking-wide uppercase"
                  style={{
                    color: '#99FFFF',
                    textShadow: '0 0 8px rgba(153, 255, 255, 0.5), 0 0 16px rgba(153, 255, 255, 0.25)',
                  }}
                >
                  {t('hero.badge')}
                </span>
              </button>
            </Stagger>

            <Stagger visible={s1Visible} delay={100} className="flex flex-col items-center">
              <h1
                id="section-1-title"
                className="text-[clamp(2.2rem,6vw,5.5rem)] font-light uppercase leading-[1.1] max-w-4xl tracking-tight text-center flex flex-col items-center gap-1"
              >
                <span style={{ color: '#99FFFF' }} className="block text-center">{t('hero.title1')}</span>
                <span style={{ color: '#FFFFFF' }} className="block text-center">{t('hero.title2')}</span>
              </h1>
            </Stagger>

            <Stagger visible={s1Visible} delay={150} className="mt-6 max-w-2xl flex flex-col items-center">
              <p
                id="section-1-subtitle"
                className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-center text-white"
                style={{ color: '#FFFFFF' }}
              >
                {t('hero.subtitle')}
              </p>
            </Stagger>

            {/* Action Buttons */}
            <Stagger visible={s1Visible} delay={200} className="mt-6 flex flex-col items-center">
              <div
                id="hero-action-buttons-group"
                className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pointer-events-auto"
              >
                {/* 1. Download on the App Store */}
                <a
                  id="btn-download-app-store"
                  href="https://apps.apple.com/us/app/visor-fitness/id6776579817"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-[18px] py-2.5 rounded-full font-medium text-xs sm:text-sm text-[#1D3045] bg-[#99FFFF] hover:bg-[#80ffff] transition-all duration-300 shadow-[0_0_16px_rgba(153,255,255,0.3)] hover:shadow-[0_0_24px_rgba(153,255,255,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Apple className="w-4 h-4 fill-current" />
                  <span>{t('hero.download')}</span>
                </a>

                {/* 2. Join now — web */}
                <button
                  id="btn-join-web"
                  onClick={() => setSignUpOpen(true)}
                  className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm text-white backdrop-blur-xl bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_0_rgba(0,0,0,0.25)] cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#99FFFF] group-hover:rotate-12 transition-transform" />
                  <span>{t('hero.joinWeb')}</span>
                </button>

                {/* 3. Explore Features */}
                <button
                  id="btn-explore-features"
                  onClick={() => {
                    const el = document.getElementById('features-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <span>{t('hero.explore')}</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </Stagger>
          </section>

          {/* SECTION 2 (How VISOR AI Fitness App Works - 4 Glassmorphism Cards) */}
          <section
            id="section-2-center"
            className="absolute inset-0 px-3 sm:px-8 md:px-12 pt-20 sm:pt-32 md:pt-36 pb-6 sm:pb-12 flex flex-col items-center justify-center pointer-events-none overflow-hidden sm:overflow-visible"
            style={{
              opacity: s2Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s2Visible ? 'auto' : 'none',
              visibility: s2Visible ? 'visible' : 'hidden',
            }}
          >
            <div className="max-w-6xl w-full flex flex-col items-center text-center my-auto">
              {/* Heading */}
              <Stagger visible={s2Visible} delay={0}>
                <h2
                  id="section-2-heading"
                  className="text-xl sm:text-3xl md:text-4xl lg:text-[40px] font-light tracking-tight text-white leading-tight"
                >
                  {t('how.title')}
                </h2>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto">
                  {t('how.sub')}
                </p>
              </Stagger>

              {/* 4 Step Skew Gradient Glassmorphic Cards Grid */}
              <Stagger visible={s2Visible} delay={150} className="w-full mt-3 sm:mt-6">
                <SkewCards onCardClick={openAppStore} />
              </Stagger>
            </div>

            {/* Right Column: Down arrow, 3 dots, Up chevron */}
            <div
              id="section-2-right-column"
              className="hidden md:flex absolute bottom-8 right-6 sm:right-8 md:right-12 flex-col items-center gap-3 pointer-events-auto"
            >
              <button
                id="section-2-down-btn"
                onClick={() => scrollToProgress(0.85)}
                aria-label="Scroll down"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer text-white border border-white/30 bg-black/20 backdrop-blur-md"
              >
                <ArrowDown size={16} />
              </button>

              <button
                id="section-2-up-btn"
                onClick={() => scrollToProgress(0)}
                aria-label="Scroll to top"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer text-white/70 border border-white/20 bg-black/20 backdrop-blur-md"
              >
                <ChevronUp size={14} />
              </button>
            </div>
          </section>

          {/* Personal Training, Your Door — same hero.mp4 scrubbing behind */}
          <section
            id="section-4-personal-training"
            className="absolute inset-0 overflow-y-auto"
            style={{
              opacity: s4Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s4Visible ? 'auto' : 'none',
              visibility: s4Visible ? 'visible' : 'hidden',
            }}
          >
            <PersonalTrainingSection overlay visible={s4Visible} />
          </section>
        </div>
      </div>

        {/* Body transformation panels scroll over video 1 inside this track. */}
        <div className="absolute inset-x-0 top-[480vh] z-10">
          <TransformationCards />
        </div>
    </div>

      {/* Secondary Track (Features -> Programs -> What's Inside VISOR) */}
      <div
        id="features-flow-track"
        className="relative bg-[#070b12]"
      >
        {/* Sticky still background — portal scene, no person */}
        <div className="sticky top-0 w-full h-[100dvh] overflow-hidden pointer-events-none z-0">
          <img
            src={featuresBg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#070b12]/35" />
        </div>

        {/* Content Layers on top of the background */}
        <div className="relative z-10 -mt-[100dvh]">
          {/* 1. AI Fitness App Features to Transform Your Body */}
          <FeaturesSection onGetApp={openAppStore} />

          {/* 3. What's inside VISOR */}
          <WhatsInsideSection
            onGetApp={openAppStore}
            onSignIn={() => setSignUpOpen(true)}
          />
        </div>
      </div>

      {/* Interactive Modal */}
      <AppModal
        type={modalType}
        onClose={() => setModalType(null)}
      />

      <EliteCoachesDialog open={eliteCoachesOpen} onOpenChange={setEliteCoachesOpen} />

      <SignUpDialog
        open={signUpOpen}
        onOpenChange={setSignUpOpen}
        onSignIn={() => setSignInOpen(true)}
      />

      <SignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onSignUp={() => setSignUpOpen(true)}
      />

      <GuidesSection />

      <Footer />
    </div>
  );
}
