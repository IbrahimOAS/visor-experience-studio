import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Menu, X, Check, LogOut, User, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { VisorLogo } from './VisorLogo';
import { LANGUAGES, useLanguage, type LangCode } from '../i18n';
import { clearSession, getSession } from '@/lib/auth';

interface GlassNavbarProps {
  onNavigate?: (index: number) => void;
  onGetApp?: () => void;
  onSignIn?: () => void;
  onEliteCoaches?: () => void;
}

export const NAV_BUTTONS = [
  { id: 'features', labelKey: 'nav.features', targetProgress: 0 },
  { id: 'how-it-works', labelKey: 'nav.howItWorks', targetProgress: 0.45 },
  { id: 'pricing', labelKey: 'nav.pricing', targetProgress: 0.7 },
  { id: 'coaching', labelKey: 'nav.coaching', targetProgress: 0.85 },
  { id: 'elite-coaches', labelKey: 'nav.eliteCoaches', targetProgress: 1.0 },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function GlassNavbar({ onNavigate, onGetApp, onSignIn, onEliteCoaches }: GlassNavbarProps) {
  const { lang: selectedLang, setLang, t } = useLanguage();
  const [activeItem, setActiveItem]         = useState<string>('features');
  const [isLoaded, setIsLoaded]             = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen]     = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const session = getSession();
  const user    = session?.user;

  const selectLanguage = (code: LangCode) => {
    setLang(code);
    setLangDropdownOpen(false);
  };
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pathname === '/pricing') setActiveItem('pricing');
    else setActiveItem('features');
  }, [pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (item: (typeof NAV_BUTTONS)[0], index: number) => {
    setActiveItem(item.id);
    setMobileMenuOpen(false);
    if (item.id === 'elite-coaches') { if (onEliteCoaches) onEliteCoaches(); return; }
    if (onNavigate) onNavigate(index);
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    await clearSession();
    navigate('/');
  };

  const navButtonBase =
    'px-3 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium tracking-normal transition-all duration-200 cursor-pointer outline-none select-none relative inline-flex items-center justify-center';
  const navButtonActive   = 'bg-white/15 text-white font-semibold shadow-inner border border-white/20';
  const navButtonInactive = 'text-neutral-300 hover:text-white hover:bg-white/10 border border-transparent';

  return (
    <>
      <header
        id="glassmorphism-navbar"
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div
          id="navbar-pill-container"
          className="relative w-full rounded-full px-3 sm:px-5 py-2 sm:py-2.5 backdrop-blur-xl bg-black/25 hover:bg-black/35 border border-white/15 hover:border-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.25) 100%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* LEFT: Logo */}
          <Link
            to="/"
            id="brand-cluster"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            onClick={() => { setActiveItem('features'); if (onNavigate) onNavigate(0); }}
          >
            <div
              id="logo-circle-container"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] border border-white/25 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.5)] group-hover:border-[#99FFFF]/60 group-hover:shadow-[0_0_15px_rgba(153,255,255,0.35)] transition-all duration-300 shrink-0 overflow-hidden"
            >
              <VisorLogo size={34} className="w-8 h-8 sm:w-8.5 sm:h-8.5 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <span
              id="brand-title"
              className="font-extrabold text-white text-base sm:text-lg tracking-wider uppercase font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
            >
              VISOR
            </span>
          </Link>

          {/* CENTER: Nav (desktop) */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {NAV_BUTTONS.map((item, index) => {
              const isActive = activeItem === item.id;
              if (item.id === 'pricing') {
                return (
                  <Link
                    key={item.id}
                    to="/pricing"
                    id={`nav-button-${item.id}`}
                    className={`${navButtonBase} ${isActive ? navButtonActive : navButtonInactive}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  id={`nav-button-${item.id}`}
                  onClick={() => handleNavClick(item, index)}
                  className={`${navButtonBase} ${isActive ? navButtonActive : navButtonInactive}`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Language, Auth, Get App */}
          <div id="nav-actions-cluster" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language selector */}
            <div className="relative hidden md:block">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-neutral-200 hover:text-white transition-all cursor-pointer outline-none select-none"
              >
                <Globe className="w-3.5 h-3.5 text-[#99FFFF]" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-white/20 shadow-2xl py-1.5 z-50 flex flex-col overflow-hidden">
                    {LANGUAGES.map((lang) => {
                      const isSelected = selectedLang === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => selectLanguage(lang.code)}
                          dir={lang.dir}
                          className={`flex items-center gap-2 px-3.5 py-2 text-xs text-left hover:bg-white/10 transition-colors ${
                            isSelected ? 'text-[#99FFFF] font-bold bg-white/5' : 'text-neutral-300'
                          }`}
                        >
                          <span className="w-4 shrink-0 flex items-center justify-center">
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </span>
                          <span className="font-semibold w-6">{lang.code}</span>
                          <span>{lang.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* ── Auth section ── */}
            {user ? (
              /* Signed-in: avatar pill + dropdown */
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/25 transition-all duration-200 outline-none select-none"
                >
                  {/* Avatar circle with initials */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#99FFFF]/30 to-[#99FFFF]/10 border border-[#99FFFF]/40 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#99FFFF] leading-none">
                      {getInitials(user.full_name || user.username || 'U')}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white max-w-[100px] truncate">
                    {user.full_name?.split(' ')[0] || user.username}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-neutral-900/98 backdrop-blur-xl border border-white/15 shadow-2xl py-1.5 z-50 overflow-hidden">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-white/8">
                      <p className="text-xs font-bold text-white truncate">{user.full_name || user.username}</p>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/8 transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#99FFFF]" />
                        My Account
                      </Link>
                      <Link
                        to="/account/billing"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-neutral-200 hover:text-white hover:bg-white/8 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        Billing &amp; Plan
                      </Link>
                    </div>

                    <div className="border-t border-white/8 py-1">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Signed-out: Sign In button */
              <button
                id="sign-in-btn"
                onClick={onSignIn}
                className="hidden sm:inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-200 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/15 bg-transparent outline-none select-none"
              >
                {t('nav.signIn')}
              </button>
            )}

            {/* Get the App */}
            <a
              id="get-app-btn"
              href="https://apps.apple.com/us/app/visor-fitness/id6776579817"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-[#0A1926] bg-[#99FFFF] hover:bg-[#B3FFFF] active:scale-95 shadow-[0_2px_16px_rgba(153,255,255,0.45)] hover:shadow-[0_4px_22px_rgba(153,255,255,0.7)] transition-all duration-200 cursor-pointer border-none outline-none select-none no-underline"
            >
              {t('nav.getApp')}
            </a>

            {/* Mobile toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="flex lg:hidden items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white transition-all cursor-pointer outline-none p-0 ml-0.5"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="fixed top-20 left-1/2 -translate-x-1/2 w-[94%] max-w-lg z-40 lg:hidden rounded-3xl backdrop-blur-2xl bg-black/90 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-5 sm:p-6 flex flex-col gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
        >
          <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <VisorLogo size={24} />
              <span className="font-bold text-white text-sm tracking-wider">VISOR NAVIGATION</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>

          {/* Signed-in user card (mobile) */}
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#99FFFF]/30 to-[#99FFFF]/10 border border-[#99FFFF]/40 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-[#99FFFF]">
                  {getInitials(user.full_name || user.username || 'U')}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.full_name || user.username}</p>
                <p className="text-xs text-neutral-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col gap-1.5">
            {NAV_BUTTONS.map((item, index) => {
              const isActive = activeItem === item.id;
              const itemClass = `flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                isActive ? 'bg-white/15 text-white border border-white/20 shadow-sm' : 'text-neutral-300 hover:bg-white/5 hover:text-white'
              }`;
              if (item.id === 'pricing') {
                return (
                  <Link key={item.id} to="/pricing" className={itemClass} onClick={() => setMobileMenuOpen(false)}>
                    <span>{t(item.labelKey)}</span>
                  </Link>
                );
              }
              return (
                <button key={item.id} onClick={() => handleNavClick(item, index)} className={itemClass}>
                  <span>{t(item.labelKey)}</span>
                </button>
              );
            })}

            {/* Account link (mobile, only when signed in) */}
            {user && (
              <Link
                to="/account"
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-[#99FFFF] hover:bg-white/5 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                My Account
              </Link>
            )}
          </div>

          <div className="h-px bg-white/10 my-1" />

          {/* Bottom: language + auth */}
          <div className="flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#99FFFF]" />
              <div className="flex gap-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    title={lang.label}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                      selectedLang === lang.code
                        ? 'bg-[#99FFFF] text-[#0A1926] font-bold'
                        : 'bg-white/5 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>

            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 px-3.5 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/15 border border-red-500/20"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            ) : (
              <button
                id="mobile-sign-in-btn"
                onClick={() => { setMobileMenuOpen(false); if (onSignIn) onSignIn(); }}
                className="text-xs font-semibold text-neutral-200 hover:text-white px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15"
              >
                {t('nav.signIn')}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
