import React from 'react';
import { X, Apple, Play, ShieldCheck, Mail, Lock } from 'lucide-react';
import { VisorLogo } from './VisorLogo';

interface AppModalProps {
  type: 'get-app' | 'sign-in' | null;
  onClose: () => void;
}

export function AppModal({ type, onClose }: AppModalProps) {
  if (!type) return null;

  return (
    <div
      id="app-modal-backdrop"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        id="app-modal-card"
        className="relative w-full max-w-md rounded-3xl bg-neutral-900/95 border border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.8)] p-6 sm:p-8 flex flex-col text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer border-none outline-none"
        >
          <X size={16} />
        </button>

        {type === 'get-app' ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] border border-[#99FFFF]/40 flex items-center justify-center shadow-[0_0_20px_rgba(153,255,255,0.25)] mb-4">
              <VisorLogo size={42} />
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Experience VISOR
            </h3>
            <p className="text-sm text-neutral-300 mb-6 leading-relaxed max-w-xs">
              Unlock elite real-time coaching, advanced vision metrics, and performance analytics.
            </p>

            <div className="flex flex-col w-full gap-3">
              <a
                href="https://apps.apple.com/us/app/visor-fitness/id6776579817"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm transition-all active:scale-[0.98]"
              >
                <Apple size={18} />
                <span>Download on iOS App Store</span>
              </a>

              <button
                onClick={() => alert('Redirecting to Google Play Store...')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-sm transition-all active:scale-[0.98]"
              >
                <Play size={16} className="fill-current" />
                <span>Get it on Google Play</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-[#99FFFF] hover:bg-[#B3FFFF] text-[#0A1926] font-bold text-sm shadow-md shadow-[#99FFFF]/30 transition-all active:scale-[0.98] mt-1"
              >
                Launch Web App
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck size={14} className="text-[#99FFFF]" />
              <span>Version 2.4 • 4.9★ Rating • Over 50k+ Athletes</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] border border-[#99FFFF]/40 flex items-center justify-center shadow-[0_0_15px_rgba(153,255,255,0.25)] mb-3">
              <VisorLogo size={36} />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white mb-1">
              Sign in to VISOR
            </h3>
            <p className="text-xs text-neutral-400 mb-5">
              Access your training telemetry and elite coaches
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Signed in successfully!');
                onClose();
              }}
              className="w-full flex flex-col gap-3"
            >
              <div>
                <label className="text-xs font-medium text-neutral-300 mb-1 block">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="athlete@domain.com"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#99FFFF] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#99FFFF] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#99FFFF] hover:bg-[#B3FFFF] text-[#0A1926] font-bold text-sm shadow-md shadow-[#99FFFF]/30 transition-all active:scale-[0.98] mt-2"
              >
                Continue
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
