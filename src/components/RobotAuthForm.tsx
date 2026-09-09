import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  buildSignupProfile,
  signInWithFirebaseEmail,
  signInWithGooglePopup,
  signUpWithFirebaseEmail,
} from "@/lib/auth";
import { completeFirebaseLogin, completeFirebaseSignup, completeGoogleLogin } from "@/lib/visor-api";

const CSS = `
.robot-auth {
  --ra-bg: #0d0f17;
  --ra-card-bg: #151722;
  --ra-accent: #99FFFF;
  --ra-accent-ink: #06121b;
  --ra-text-main: #ffffff;
  --ra-text-muted: #8a8ea8;
  --ra-field-bg: #0d0f17;
  --ra-field-border: #1f2233;
  --ra-shell: #e2e8f0;
  --ra-screen: #0d0f17;
  --ra-eye: #00e5ff;
  --ra-turn: .65s cubic-bezier(.5, -0.3, .25, 1.35);
  --ra-yellow: #ffc53d;
  --ra-teal: #2ec4b6;
  font-family: 'Sora', system-ui, sans-serif;
  color: var(--ra-text-main);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 44px 0 4px;
}
.robot-auth * { box-sizing: border-box; }

.robot-auth .robot {
  position: relative;
  z-index: 1;
  margin-bottom: -24px;
  animation: ra-float 4s ease-in-out infinite alternate;
  perspective: 800px;
}
@keyframes ra-float { from { transform: translateY(0); } to { transform: translateY(-5px); } }

.robot-auth .antenna { position: absolute; top: -24px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; z-index: 2; }
.robot-auth .antenna-rod { width: 4px; height: 16px; background: var(--ra-shell); border-radius: 2px; }
.robot-auth .antenna-tip { width: 12px; height: 12px; border-radius: 50%; background: var(--ra-eye); order: -1; margin-bottom: -2px; box-shadow: 0 0 10px rgba(0,229,255,.4); }

.robot-auth .head3d {
  width: 140px; height: 120px; perspective: 700px; transform-style: preserve-3d;
  transform: translateY(var(--hy, 0px)) scale(var(--hsc, 1)) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform .25s ease-out; will-change: transform;
}
.robot-auth .robot.is-hyped .head3d { --hy: 5px; --hsc: 1.04; }
.robot-auth .robot.is-pressed .head3d { --hy: 9px; --hsc: .94; }

.robot-auth .head { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform var(--ra-turn); }
.robot-auth .robot.is-turned .head { transform: rotateY(180deg); }
.robot-auth .robot.is-spinning .head { animation: ra-victory .9s ease-in-out; }
@keyframes ra-victory { to { transform: rotateY(360deg); } }

.robot-auth .ear { position: absolute; top: 40px; width: 14px; height: 36px; background: var(--ra-eye); border-radius: 8px; transform: translateZ(0); box-shadow: 0 0 12px rgba(0,229,255,.3); }
.robot-auth .ear--l { left: -7px; }
.robot-auth .ear--r { right: -7px; }

.robot-auth .face { position: absolute; inset: 0; border-radius: 40px; backface-visibility: hidden; -webkit-backface-visibility: hidden; background: var(--ra-shell); }
.robot-auth .face--front { box-shadow: inset 0 -6px 0 rgba(0,0,0,.1); }
.robot-auth .face--back { transform: rotateY(180deg); display: grid; place-items: center; border-radius: 40px; }

.robot-auth .visor { position: absolute; inset: 16px 12px 14px; background: var(--ra-screen); border-radius: 26px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; overflow: hidden; }
.robot-auth .eyes { display: flex; gap: 24px; transform: translate(var(--lx, 0px), var(--ly, 0px)); transition: transform .18s ease-out; }
.robot-auth .eyes.blink .eye { transform: scaleY(.08); }
.robot-auth .eye { width: 16px; height: 22px; border-radius: 8px; background: var(--ra-eye); transition: all .22s ease; box-shadow: 0 0 12px rgba(0,229,255,.4); }

.robot-auth [data-mood="happy"] .eye,
.robot-auth [data-mood="success"] .eye {
  width: 22px; height: 10px; background: transparent; border: 4px solid var(--ra-eye); border-bottom: none;
  border-radius: 22px 22px 0 0; box-shadow: none; filter: drop-shadow(0 -4px 6px rgba(0,229,255,.4));
}
.robot-auth [data-mood="excited"] .eye { transform: scale(1.2); border-radius: 50%; height: 18px; }
.robot-auth [data-mood="pressed"] .eye { width: 20px; height: 10px; background: transparent; border: 4px solid var(--ra-eye); border-top: none; border-radius: 0 0 20px 20px; box-shadow: none; }

.robot-auth .cheek { position: absolute; top: 56%; width: 12px; height: 6px; border-radius: 50%; background: var(--ra-accent); opacity: 0; transition: opacity .3s ease; }
.robot-auth .cheek--l { left: 16px; }
.robot-auth .cheek--r { right: 16px; }
.robot-auth [data-mood="happy"] .cheek, .robot-auth [data-mood="excited"] .cheek,
.robot-auth [data-mood="pressed"] .cheek, .robot-auth [data-mood="success"] .cheek { opacity: .6; }

.robot-auth .mouth { width: 12px; height: 4px; border-radius: 4px; background: var(--ra-eye); transition: all .25s ease; opacity: .5; }
.robot-auth [data-mood="watching"] .mouth { width: 8px; height: 8px; border-radius: 50%; }
.robot-auth [data-mood="happy"] .mouth { width: 24px; height: 10px; border-radius: 0 0 14px 14px; }
.robot-auth [data-mood="excited"] .mouth { width: 18px; height: 14px; border-radius: 0 0 10px 10px; }
.robot-auth [data-mood="pressed"] .mouth { width: 22px; height: 12px; border-radius: 0 0 12px 12px; }
.robot-auth [data-mood="success"] .mouth { width: 30px; height: 14px; border-radius: 0 0 16px 16px; }

.robot-auth .panel { width: 100px; padding: 10px; background: var(--ra-screen); border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.robot-auth .panel-lights { display: flex; gap: 6px; }
.robot-auth .panel-lights i { width: 6px; height: 6px; border-radius: 50%; background: var(--ra-accent); animation: ra-bob 1.8s ease-in-out infinite; }
.robot-auth .panel-lights i:nth-child(2) { animation-delay: .3s; background: var(--ra-yellow); }
.robot-auth .panel-lights i:nth-child(3) { animation-delay: .6s; background: var(--ra-teal); }
@keyframes ra-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }

.robot-auth .meter { display: flex; gap: 4px; }
.robot-auth .meter i { width: 12px; height: 16px; border-radius: 3px; background: #2a2d3d; transition: background .25s ease; }
.robot-auth .meter[data-lvl="1"] i.on { background: #ff5c4d; }
.robot-auth .meter[data-lvl="2"] i.on { background: #ff9f43; }
.robot-auth .meter[data-lvl="3"] i.on { background: var(--ra-yellow); }
.robot-auth .meter[data-lvl="4"] i.on { background: var(--ra-teal); }
.robot-auth .panel-label { font-size: 8px; font-weight: 700; letter-spacing: 1px; color: #fff; white-space: nowrap; }

.robot-auth .bubble {
  position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%);
  background: #2a2d3d; color: #fff; font-size: 12px; font-weight: 500; line-height: 1.4;
  padding: 8px 12px; border-radius: 8px; width: max-content; max-width: 220px; text-align: center;
  z-index: 3; opacity: 0; pointer-events: none; transition: opacity .2s ease;
}
.robot-auth .bubble.show { opacity: 1; }
.robot-auth .bubble::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 6px; border-style: solid; border-color: #2a2d3d transparent transparent transparent; }
.robot-auth .bubble.pop { animation: ra-pop .3s cubic-bezier(.34,1.56,.64,1); }
@keyframes ra-pop { from { transform: translateX(-50%) scale(.8); } to { transform: translateX(-50%) scale(1); } }

.robot-auth .card { position: relative; z-index: 2; width: 100%; background: var(--ra-card-bg); border-radius: 24px; padding: 40px 28px 28px; box-shadow: 0 24px 48px rgba(0,0,0,.4); }
.robot-auth .hand { position: absolute; top: -12px; width: 32px; height: 24px; background: var(--ra-shell); border-radius: 12px 12px 16px 16px; z-index: 3; transition: transform .25s ease; box-shadow: inset 0 -4px 0 rgba(0,0,0,.1); }
.robot-auth .hand--l { left: 40px; }
.robot-auth .hand--r { right: 40px; }
.robot-auth .robot.is-hyped ~ .card .hand { transform: translateY(-3px) scaleY(1.08); }

.robot-auth .tabs { display: flex; background: var(--ra-bg); border-radius: 30px; padding: 4px; margin: 0 auto 28px; width: fit-content; }
.robot-auth .tab { background: transparent; border: none; color: var(--ra-text-muted); padding: 8px 24px; border-radius: 30px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .2s ease; }
.robot-auth .tab.active { background: var(--ra-card-bg); color: var(--ra-accent); box-shadow: 0 2px 8px rgba(0,0,0,.2); }

.robot-auth .title { font-size: 22px; font-weight: 700; text-align: center; margin: 0 0 8px; }
.robot-auth .subtitle { font-size: 13px; color: var(--ra-text-muted); text-align: center; margin: 0 0 28px; }

.robot-auth .input-group { margin-bottom: 18px; }
.robot-auth .input-group label { display: block; font-size: 13px; color: var(--ra-text-main); margin-bottom: 8px; font-weight: 500; }
.robot-auth .field { display: flex; align-items: center; gap: 12px; height: 48px; padding: 0 16px; background: var(--ra-field-bg); border: 1px solid var(--ra-field-border); border-radius: 12px; transition: all .2s ease; }
.robot-auth .field:focus-within { border-color: var(--ra-accent); }
.robot-auth .field-icon { width: 18px; height: 18px; stroke: var(--ra-text-muted); flex: none; transition: stroke .2s ease; }
.robot-auth .field:focus-within .field-icon { stroke: var(--ra-text-main); }
.robot-auth .field input { flex: 1; min-width: 0; border: none; outline: none; background: transparent; font: inherit; font-size: 14px; font-weight: 500; color: var(--ra-text-main); }
.robot-auth .field input::placeholder { color: #4a4d66; }

.robot-auth .peek { border: none; background: none; padding: 4px; cursor: pointer; display: grid; place-items: center; }
.robot-auth .peek svg { width: 18px; height: 18px; stroke: var(--ra-text-muted); transition: stroke .2s ease; }
.robot-auth .peek:hover svg, .robot-auth .peek[aria-pressed="true"] svg { stroke: var(--ra-text-main); }

.robot-auth .btn { width: 100%; height: 48px; margin-top: 12px; border: none; border-radius: 12px; background: var(--ra-accent); color: var(--ra-accent-ink); font: inherit; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s ease; box-shadow: 0 0 20px rgba(153,255,255,.25); }
.robot-auth .btn:hover { background: #B3FFFF; }
.robot-auth .btn:active { transform: scale(.98); }
.robot-auth .btn.is-success { background: var(--ra-teal); color: #06121b; }

.robot-auth .btn-google { width: 100%; height: 48px; margin-top: 20px; border: 1px solid var(--ra-field-border); border-radius: 12px; background: transparent; color: #fff; font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: all .2s ease; }
.robot-auth .btn-google:hover { background: rgba(255,255,255,.03); }

.robot-auth .visor-text { font-size: 13px; color: var(--ra-text-muted); margin-top: 20px; line-height: 1.5; text-align: left; }
.robot-auth .footer-text { text-align: center; font-size: 13px; color: var(--ra-text-muted); margin-top: 20px; }
.robot-auth .footer-text button { color: var(--ra-accent); background: none; border: none; font: inherit; font-weight: 600; margin-left: 4px; cursor: pointer; }
.robot-auth .footer-text button:hover { text-decoration: underline; }
.robot-auth .forgot { font-size: 12px; color: var(--ra-accent); background: none; border: none; font-weight: 500; cursor: pointer; }

.robot-auth .card.shake { animation: ra-shake .4s ease; }
@keyframes ra-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(4px); } 75% { transform: translateX(-2px); } }

@media (prefers-reduced-motion: reduce) {
  .robot-auth .robot, .robot-auth .antenna-tip, .robot-auth .panel-lights i,
  .robot-auth .robot.is-spinning .head, .robot-auth .bubble.pop { animation: none; }
  .robot-auth .head { transition-duration: .01s; }
  .robot-auth .eyes { transition: none; }
}
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LEVELS = ["NOT LOOKING", "WEAK", "OKAY", "STRONG", "SECURE"];

type Mood = "idle" | "watching" | "shy" | "excited" | "pressed" | "success" | "happy";

export function RobotAuthForm({
  defaultMode = "signin",
  onAuthenticated,
  redirectTo = "/account",
}: {
  defaultMode?: "signin" | "register";
  onAuthenticated?: () => void;
  redirectTo?: string;
}) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(defaultMode === "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [mood, setMood] = useState<Mood>("idle");
  const [turned, setTurned] = useState(false);
  const [hyped, setHyped] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(0);
  const [bubble, setBubble] = useState("Ready when you are.");
  const [bubbleOn, setBubbleOn] = useState(true);
  const [blink, setBlink] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const robotRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const say = (text: string) => {
    setBubble(text);
    setBubbleOn(true);
  };

  useEffect(() => {
    const t = setTimeout(() => setBubbleOn(false), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(() => {
        if (!alive) return;
        setBlink(true);
        setTimeout(() => alive && setBlink(false), 150);
        loop();
      }, 2600 + Math.random() * 2600);
    };
    loop();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let raf = false;
    const onMove = (e: MouseEvent) => {
      const active = document.activeElement;
      if (done || turned || (active && active.tagName === "INPUT")) return;
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        raf = false;
        const el = robotRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / 260));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / 260));
        setLook({ x: dx * 7, y: dy * 6 });
        setTilt({ ry: dx * 12, rx: -dy * 9 });
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [done, turned]);

  const score = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    if (password.length > 0 && s === 0) s = 1;
    return s;
  })();

  const followTyping = (value: string) => {
    const ratio = Math.min(value.length / 22, 1);
    setLook({ x: -6 + 12 * ratio, y: 5 });
    setTilt({ ry: -5 + 10 * ratio, rx: -8 });
  };

  const switchMode = (login: boolean) => {
    setIsLogin(login);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDone(false);
    setSubmitting(false);
    setTurned(false);
    setHyped(false);
    setMood("idle");
    setLook({ x: 0, y: 0 });
    setTilt({ rx: 0, ry: 0 });
    if (login) say("Welcome back! Good to see you 😃");
    else setBubbleOn(false);
  };

  const fail = (message: string) => {
    setSubmitting(false);
    setMood("watching");
    say(message);
    setShake((s) => s + 1);
  };

  const succeed = (message: string, redirectTo: string) => {
    setDone(true);
    setSubmitting(false);
    setTurned(false);
    setHyped(false);
    setMood("success");
    say(message);
    setLook({ x: 0, y: 0 });
    setTilt({ rx: 0, ry: 0 });
    setSpinning(true);
    setTimeout(() => setSpinning(false), 950);

    setTimeout(() => {
      onAuthenticated?.();
      navigate(redirectTo);
    }, 900);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (done || submitting) return;

    let complaint: [string, HTMLInputElement | null] | null = null;
    if (!isLogin && !name.trim()) complaint = ["Name is required.", nameRef.current];
    else if (!EMAIL_RE.test(email.trim())) complaint = ["Invalid email format.", emailRef.current];
    else if (!password) complaint = ["Password is required.", passRef.current];
    else if (!isLogin && !confirmPassword) complaint = ["Please confirm your password.", confirmPassRef.current];
    else if (!isLogin && password !== confirmPassword) complaint = ["Passwords don't match. Try again.", confirmPassRef.current];

    if (complaint) {
      say(complaint[0]);
      setMood("watching");
      setShake((s) => s + 1);
      complaint[1]?.focus();
      return;
    }

    setSubmitting(true);

    try {
      if (isLogin) {
        const firebaseToken = await signInWithFirebaseEmail(email, password);
        await completeFirebaseLogin(firebaseToken);
        succeed("Access granted. Welcome back!", redirectTo);
      } else {
        const firebaseToken = await signUpWithFirebaseEmail(email, password);
        await completeFirebaseSignup(firebaseToken, buildSignupProfile(email, name));
        if (typeof window !== "undefined" && (window as any).fpr) {
          (window as any).fpr("referral", { email });
        }
        succeed(`Welcome aboard, ${name.trim()}!`, redirectTo);
      }
    } catch (err) {
      fail(err instanceof Error ? err.message : isLogin ? "Could not sign in." : "Could not create account.");
    }
  };

  const onGoogleClick = async () => {
    if (done || submitting) return;
    setSubmitting(true);
    setMood("watching");
    say("Connecting to Google…");

    try {
      const googleToken = await signInWithGooglePopup();
      await completeGoogleLogin(googleToken);
      succeed("Access granted. Welcome back!", redirectTo);
    } catch (err) {
      fail(err instanceof Error ? err.message : "Could not continue with Google.");
    }
  };

  const robotClasses = [
    "robot",
    turned ? "is-turned" : "",
    hyped ? "is-hyped" : "",
    pressed ? "is-pressed" : "",
    spinning ? "is-spinning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="robot-auth">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div ref={robotRef} className={robotClasses} data-mood={mood}>
        <div className={`bubble ${bubbleOn ? "show pop" : ""}`} key={bubble} role="status" aria-live="polite">
          <span>{bubble}</span>
        </div>

        <div className="antenna" aria-hidden="true">
          <span className="antenna-rod" />
          <span className="antenna-tip" />
        </div>

        <div
          className="head3d"
          aria-hidden="true"
          style={{ ["--ry" as string]: `${tilt.ry}deg`, ["--rx" as string]: `${tilt.rx}deg` }}
        >
          <div className="head">
            <span className="ear ear--l" />
            <span className="ear ear--r" />

            <div className="face face--front">
              <div className="visor">
                <div
                  className={`eyes ${blink ? "blink" : ""}`}
                  style={{ ["--lx" as string]: `${look.x}px`, ["--ly" as string]: `${look.y}px` }}
                >
                  <span className="eye eye--l" />
                  <span className="eye eye--r" />
                </div>
                <span className="cheek cheek--l" />
                <span className="cheek cheek--r" />
                <span className="mouth" />
              </div>
            </div>

            <div className="face face--back">
              <div className="panel">
                <span className="panel-lights">
                  <i />
                  <i />
                  <i />
                </span>
                <div className="meter" data-lvl={score}>
                  {[0, 1, 2, 3].map((i) => (
                    <i key={i} className={i < score ? "on" : ""} />
                  ))}
                </div>
                <p className="panel-label">
                  {password.length === 0 ? "NOT LOOKING" : LEVELS[score]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="card" key={shake} onSubmit={onSubmit} noValidate style={shake ? { animation: "ra-shake .4s ease" } : undefined}>
        <span className="hand hand--l" aria-hidden="true" />
        <span className="hand hand--r" aria-hidden="true" />

        <div className="tabs">
          <button type="button" className={`tab ${!isLogin ? "active" : ""}`} onClick={() => switchMode(false)}>
            Register
          </button>
          <button type="button" className={`tab ${isLogin ? "active" : ""}`} onClick={() => switchMode(true)}>
            Sign In
          </button>
        </div>

        <h1 className="title">{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="subtitle">
          {isLogin ? "Sign in to access your account dashboard" : "Join us today & get access to your dashboard"}
        </p>

        {!isLogin && (
          <div className="input-group">
            <label htmlFor="ra-name">Full Name</label>
            <div className="field">
              <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="ra-name"
                ref={nameRef}
                type="text"
                value={name}
                placeholder="e.g. Usman Shams"
                autoComplete="name"
                onFocus={() => {
                  setTurned(false);
                  setMood("watching");
                  say("What is your full name? ✍️");
                  followTyping(name);
                }}
                onChange={(e) => {
                  setName(e.target.value);
                  followTyping(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        <div className="input-group">
          <label htmlFor="ra-email">Email Address</label>
          <div className="field">
            <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 4 10 8 10-8" />
            </svg>
            <input
              id="ra-email"
              ref={emailRef}
              type="email"
              value={email}
              placeholder="usman@company.com"
              autoComplete="email"
              onFocus={() => {
                setTurned(false);
                setMood("watching");
                say("Enter your email address 💻");
                followTyping(email);
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                followTyping(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="input-group">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label htmlFor="ra-password" style={{ marginBottom: 0 }}>
              Password
            </label>
            {isLogin && (
              <button type="button" className="forgot">
                Forgot password?
              </button>
            )}
          </div>
          <div className="field">
            <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              id="ra-password"
              ref={passRef}
              type={showPass ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
              onFocus={() => {
                setMood("shy");
                setTurned(true);
                setLook({ x: 0, y: 0 });
                setTilt({ rx: 0, ry: 0 });
                say("Turning around! Your password is 100% private 🔒");
              }}
              onBlur={() => setTurned(false)}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="peek"
              type="button"
              aria-label={showPass ? "Hide password" : "Show password"}
              aria-pressed={showPass}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setShowPass((s) => !s);
                if (!showPass) say("Good thing I am facing the wall.");
                passRef.current?.focus();
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        {!isLogin && (
          <div className="input-group">
            <label htmlFor="ra-confirm-password">Confirm Password</label>
            <div className="field">
              <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="ra-confirm-password"
                ref={confirmPassRef}
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                placeholder="••••••••"
                autoComplete="new-password"
                onFocus={() => {
                  setMood("shy");
                  setTurned(true);
                  setLook({ x: 0, y: 0 });
                  setTilt({ rx: 0, ry: 0 });
                  say("Almost there — confirm your password 🔒");
                }}
                onBlur={() => setTurned(false)}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="peek"
                type="button"
                aria-label={showConfirmPass ? "Hide password" : "Show password"}
                aria-pressed={showConfirmPass}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setShowConfirmPass((s) => !s);
                  confirmPassRef.current?.focus();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <button
          className={`btn ${done ? "is-success" : ""}`}
          type="submit"
          disabled={submitting || done}
          onMouseEnter={() => {
            if (done || submitting) return;
            setHyped(true);
            setTurned(false);
            setMood("excited");
            say(isLogin ? "Ready to sign you in!" : "Ready to create account!");
          }}
          onMouseLeave={() => {
            if (done || submitting) return;
            setHyped(false);
            setMood("idle");
          }}
          onPointerDown={() => {
            if (done || submitting) return;
            setPressed(true);
            setMood("pressed");
          }}
          onPointerUp={() => {
            setPressed(false);
            if (!done && !submitting) setMood("excited");
          }}
        >
          <span className="btn-label">
            {done
              ? isLogin
                ? "Signed In ✓"
                : "Account Created ✓"
              : submitting
                ? isLogin
                  ? "Signing in…"
                  : "Creating account…"
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
          </span>
        </button>

        <p className="visor-text">
          {isLogin
            ? "Sign in with the same VISOR account you use in the mobile app."
            : "Sign up with the same VISOR account you use in the mobile app."}
        </p>
        <button type="button" className="btn-google" onClick={onGoogleClick} disabled={submitting || done}>
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p className="footer-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button type="button" onClick={() => switchMode(!isLogin)}>
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default RobotAuthForm;
