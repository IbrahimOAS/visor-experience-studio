import React from 'react';
import { 
  Camera, 
  Sparkles, 
  Zap, 
  Activity, 
  Cpu,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { FeaturesCarousel } from './FeaturesCarousel';
import { useLanguage } from '../i18n';

interface FeaturesSectionProps {
  onGetApp: () => void;
}

export function FeaturesSection({ onGetApp }: FeaturesSectionProps) {
  const { t } = useLanguage();
  const features = [
    {
      number: '01',
      icon: Camera,
      tag: 'Real-Time Vision',
      title: 'Sub-Millimeter Form Tracking',
      description: 'VISOR neural vision engine tracks 32 skeletal landmarks at 60 FPS, providing instant real-time audio and visual cues to correct bar path, joint angles, and tempo on every single rep.',
      metric: '< 18ms Latency',
      statLabel: '99.4% Form Precision',
    },
    {
      number: '02',
      icon: Sparkles,
      tag: 'Predictive 3D',
      title: 'Morphological Body Simulation',
      description: 'Generative AI projects your photorealistic physique at 30, 60, and 90 days based on your current caloric adherence, lifting volume, and hormonal baselines.',
      metric: '90-Day Forecast',
      statLabel: 'Photorealistic 4K Projection',
    },
    {
      number: '03',
      icon: Zap,
      tag: 'Auto-Periodization',
      title: 'Adaptive Load Calibration',
      description: 'Never guess your working weights. VISOR computes daily readiness, RPE thresholds, and eccentric bar speed to calculate the exact optimal load for every set.',
      metric: '+42% Stimulus',
      statLabel: 'Intra-Set Velocity Tuning',
    },
    {
      number: '04',
      icon: Activity,
      tag: 'Biometric Engine',
      title: 'Autonomic Recovery Synchronization',
      description: 'Seamless integration with Apple Watch, Whoop, and Oura monitors HRV, resting heart rate, and sleep architecture to tailor volume before you step into the gym.',
      metric: 'Instant Sync',
      statLabel: 'HRV-Driven Readiness Index',
    },
  ];

  return (
    <section 
      id="features-section" 
      className="relative z-10 w-full overflow-hidden py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-20 bg-transparent text-white border-t border-white/10"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#99FFFF]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl mb-4 shadow-[0_0_15px_rgba(153,255,255,0.15)]">
            <Cpu className="w-3.5 h-3.5 text-[#99FFFF] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#99FFFF]">
              {t('feat.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
            {t('feat.title1')}{' '}
            <span className="font-semibold text-[#99FFFF]" style={{ textShadow: '0 0 24px rgba(153, 255, 255, 0.4)' }}>
              {t('feat.title2')}
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            {t('feat.sub')}
          </p>
        </div>

        {/* 3D Cylinder Carousel */}
        <div className="mb-16 sm:mb-24">
          <FeaturesCarousel />
        </div>
      </div>
    </section>
  );
}
