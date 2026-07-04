// MotoClineLanding.tsx
// Drop into a Vite + React + TypeScript + Tailwind v3 project.
// tailwind.config & Google Fonts setup at the bottom of this file.

import { useState, useEffect, useRef } from "react";

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Add Vehicle", "My Vehicle", "Repair", "History"];

function BellIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node))
        setAvatarOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-blue-500/30 bg-[rgba(7,12,28,0.97)] backdrop-blur-md shadow-[0_2px_32px_rgba(0,0,0,0.6)]">
      <div className="w-full px-6 lg:px-10 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 no-underline flex-shrink-0">
          <div
            className="w-7 h-7 rounded-[5px] flex items-center justify-center font-syne font-black text-sm text-white"
            style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
          >
            M
          </div>
          <span className="font-syne font-extrabold text-[15px] text-white tracking-tight">
            Moto<span className="text-blue-500">cline</span>
          </span>
        </a>

        {/* Center links */}
        <div className="hidden md:flex justify-center items-center gap-[clamp(16px,2.2vw,32px)]">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-white/65 hover:text-white text-[12.5px] font-medium tracking-wide pb-0.5 border-b border-dashed border-white/20 hover:border-white/50 no-underline transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Right side: notification + avatar */}
        <div className="hidden md:flex items-center gap-3">
          {/* Notification bell */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setNotifOpen((p) => !p);
                setAvatarOpen(false);
              }}
              className="relative w-9 h-9 rounded-lg border border-white/15 bg-white/[0.05] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.1] transition-all"
            >
              <BellIcon />
              {/* unread dot */}
              <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] rounded-full bg-red-500 border-[1.5px] border-[rgba(7,12,28,1)]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-11 w-72 bg-[#0d1428] border border-blue-500/25 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-syne font-bold text-white text-[13px]">Notifications</span>
                  <span className="text-[11px] text-blue-400 cursor-pointer hover:text-blue-300">Mark all read</span>
                </div>
                {[
                  { text: "Oil change completed at AutoPro Garage", time: "2 hours ago", unread: true },
                  { text: "Tyre rotation due in 300 km — schedule now", time: "Yesterday", unread: true },
                  { text: "Payment ₹2,400 confirmed for brake check", time: "2 days ago", unread: false },
                ].map((n, i) => (
                  <div key={i} className="flex gap-3 py-2.5 border-b border-white/[0.05] last:border-0 last:pb-0">
                    <div
                      className={`w-[7px] h-[7px] rounded-full mt-1 flex-shrink-0 ${n.unread ? "bg-blue-500" : "bg-white/20"}`}
                    />
                    <div>
                      <p className="text-[12px] text-white/75 leading-[1.5]">{n.text}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Avatar */}
          <div ref={avatarRef} className="relative">
            <button
              onClick={() => {
                setAvatarOpen((p) => !p);
                setNotifOpen(false);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold font-syne border-2 border-blue-500/40 hover:border-blue-400/70 transition-all"
              style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
            >
              AK
            </button>

            {avatarOpen && (
              <div className="absolute right-0 top-11 w-48 bg-[#0d1428] border border-blue-500/25 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] p-2 z-50">
                <div className="px-3 py-2.5 border-b border-white/[0.07] mb-1">
                  <p className="text-[13px] font-semibold text-white">Arun Kumar</p>
                  <p className="text-[11px] text-white/35 mt-0.5">arun@email.com</p>
                </div>
                {[
                  { label: "My Profile" },
                  { label: "Settings" },
                  { label: "Log Out", danger: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors ${
                      item.danger
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    } ${item.label === "Log Out" ? "mt-1 border-t border-white/[0.07] pt-2" : ""}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex items-center justify-center border border-white/20 rounded text-white hover:bg-white/10 transition-colors"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-5 pt-3 border-t border-blue-500/20 bg-[rgba(7,12,28,0.98)]">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-white/80 hover:text-white text-[15px] no-underline transition-colors">
              {l}
            </a>
          ))}
          <div className="flex gap-3 mt-1">
            <button className="px-5 py-2 rounded border border-white/30 bg-white/[0.06] text-white font-syne text-[13px] hover:bg-white/[0.14] transition-colors">
              Login
            </button>
            <button className="px-5 py-2 rounded bg-blue-700 border border-blue-500 text-white font-syne font-bold text-[13px] hover:bg-blue-500 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const GARAGE =
    "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1800&q=80&auto=format";
  const STATS = [
    { val: "500+", label: "Happy Clients" },
    { val: "1200+", label: "Services Done" },
    { val: "50k+", label: "Miles Tracked" },
  ];
  const FEATURES = [
    { icon: "✓", title: "Verified Garages", sub: "Quality service, every visit" },
    { icon: "★", title: "Certified Experts", sub: "Maximum Service Limit" },
    { icon: "◈", title: "Transparent Pricing", sub: "No hidden costs ever" },
  ];
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Garage BG */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${GARAGE})`,
          backgroundPosition: "center 35%",
        }}
      />
      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg,rgba(4,8,20,0.93) 0%,rgba(6,12,30,0.8) 45%,rgba(4,8,20,0.68) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 10% 65%,rgba(29,78,216,0.22),transparent)",
        }}
      />
      {/* Light shafts */}
      {[
        { l: "42%", h: "55%", bg: "rgba(255,220,80,0.18)", d: "4s" },
        { l: "57%", h: "46%", bg: "rgba(255,220,80,0.12)", d: "5s" },
        { l: "30%", h: "40%", bg: "rgba(59,130,246,0.28)", d: "6s" },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute top-0 w-0.5 rounded blur-[5px] animate-shaft"
          style={{
            left: s.l,
            height: s.h,
            background: `linear-gradient(to bottom,${s.bg},transparent)`,
            animationDuration: s.d,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center w-full  w-full px-6 lg:px-16 pt-32 pb-20">
        <div className="w-full]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/[0.12] border border-blue-500/35 rounded-full px-4 py-[5px] mb-7">
            <span className="w-[6px] h-[6px] rounded-full bg-blue-500 block animate-pulse" />
            <span className="text-[11px] text-blue-300 font-bold tracking-[0.1em] uppercase">
              What We Offer
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-syne font-extrabold text-white leading-[1.07] tracking-[-1.5px] mb-6"
            style={{
              fontSize: "clamp(2.5rem,5.8vw,4.4rem)",
              textShadow: "0 2px 24px rgba(0,0,0,0.5)",
            }}
          >
            Smarter Care For
            <br />
            Your{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Vehicle
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/55 mb-10 leading-[1.78] max-w-[440px]"
            style={{ fontSize: "15px", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            Experience premium automotive services with intelligent tracking, verified
            mechanics, and transparent pricing at every step.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3.5">
            <button
              className="px-8 py-3.5 rounded-md font-syne font-bold text-white text-[14px] tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
                boxShadow: "0 4px 22px rgba(59,130,246,0.45)",
              }}
            >
              Book a Service
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-11 mt-16">
            {STATS.map((s, i) => (
              <div key={s.val} className="relative">
                {i > 0 && (
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-px h-9 bg-white/15" />
                )}
                <div
                  className="font-syne font-extrabold text-white text-[26px] tracking-[-1px]"
                  style={{ textShadow: "0 0 20px rgba(59,130,246,0.5)" }}
                >
                  {s.val}
                </div>
                <div className="text-[11px] text-white/40 mt-1 tracking-[0.07em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div
        className="relative z-10 border-t border-blue-500/20 backdrop-blur-xl"
        style={{ background: "rgba(7,12,28,0.88)" }}
      >
        <div className="w-fullmx-auto px-6 lg:px-16 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-[7px] flex-shrink-0 flex items-center justify-center font-bold text-blue-500 text-sm bg-blue-500/[0.1] border border-blue-500/30">
                {f.icon}
              </div>
              <div>
                <div className="text-white font-semibold text-[13px]">{f.title}</div>
                <div className="text-white/35 text-[11px] mt-0.5">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Intelligence ──────────────────────────────────────────────────────────────
const IconHealth = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      stroke="rgba(59,130,246,0.4)"
      strokeWidth="1.2"
    />
    <path
      d="M7 12h2l2-4 2 8 2-4h2"
      stroke="#3b82f6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18.5" cy="5.5" r="2.5" fill="#06b6d4" opacity="0.9" />
    <circle cx="18.5" cy="5.5" r="1.2" fill="#fff" />
  </svg>
);

const IconTracking = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="#3b82f6"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.5" fill="#3b82f6" opacity="0.9" />
    <path
      d="M2 20h20"
      stroke="rgba(59,130,246,0.3)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="9" r="1.1" fill="#fff" />
  </svg>
);

const IconGarage = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
      stroke="#3b82f6"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 21V12h6v9" stroke="#3b82f6" strokeWidth="1.6" strokeLinejoin="round" />
    <path
      d="M9.5 7.5h5M9.5 10h5"
      stroke="rgba(59,130,246,0.5)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M14 16.5l1.2 1.2 2-2.2"
      stroke="#06b6d4"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SERVICES = [
  {
    Icon: IconHealth,
    title: "Vehicle Health Monitoring",
    desc: "Proactive tracking identifies potential issues before they become expensive repairs. Stay ahead with real-time diagnostics.",
  },
  {
    Icon: IconTracking,
    title: "Real-time Repair Tracking",
    desc: "Monitor repair progress and communicate with technicians directly from your phone with live status updates.",
  },
  {
    Icon: IconGarage,
    title: "Verified Garages",
    desc: "Access a network of rigorously vetted garages with certified mechanics you can trust. Quality guaranteed on every visit.",
  },
];

function Intelligence() {
  return (
    <section className="bg-[#080c18] py-24 px-6 lg:px-16">
      <div className="w-full">
        <Reveal className="text-center mb-14">
          <h2
            className="font-syne font-extrabold text-white tracking-[-0.5px] mb-4"
            style={{ fontSize: "clamp(1.7rem,3.5vw,2.4rem)" }}
          >
            Advanced Automotive Intelligence
          </h2>
          <p className="text-white/45 text-[14.5px] leading-[1.7] max-w-[480px] mx-auto">
            We bring cutting-edge technology to vehicle care, empowering you with insights
            that matter.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div
                className="rounded-[18px] p-7 border border-blue-500/[0.13] hover:border-blue-500/40 hover:-translate-y-1.5 hover:shadow-[0_22px_64px_rgba(59,130,246,0.13)] transition-all duration-300 cursor-default"
                style={{
                  background:
                    "linear-gradient(145deg,rgba(16,24,50,0.95),rgba(10,15,34,0.98))",
                }}
              >
                <div
                  className="w-[52px] h-[52px] rounded-[13px] flex items-center justify-center mb-6 border border-blue-500/28"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(59,130,246,0.18),rgba(6,182,212,0.09))",
                  }}
                >
                  <Icon />
                </div>
                <h3 className="font-syne font-bold text-white text-[16px] mb-3 tracking-[-0.2px]">
                  {title}
                </h3>
                <p className="text-white/45 text-[13px] leading-[1.72]">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ───────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "1",
    title: "Add Vehicle",
    desc: "Register your vehicle on our platform in seconds to get started.",
    active: true,
  },
  {
    num: "2",
    title: "Book Repair",
    desc: "Choose from verified garages and schedule repairs at your convenience.",
    active: false,
  },
  {
    num: "3",
    title: "Track Service",
    desc: "Monitor every step with real-time tracking and live notifications.",
    active: false,
  },
  {
    num: "4",
    title: "Pay Online",
    desc: "Securely complete payments and receive digital receipts instantly.",
    active: false,
  },
];

function Process() {
  return (
    <section className="bg-[#060a14] py-24 px-6 lg:px-16">
      <div className="max-w-[1240px] mx-auto">
        <Reveal className="text-center mb-20">
          <h2
            className="font-syne font-extrabold text-white tracking-[-0.5px] mb-3"
            style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}
          >
            Streamlined Process
          </h2>
          <p className="text-white/45 text-[14px] leading-[1.7]">
            Get your vehicle protected in 4 simple steps
          </p>
        </Reveal>
        <div className="relative">
          <div
            className="hidden lg:block absolute top-[30px] left-[12.5%] right-[12.5%] h-0.5"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(59,130,246,0.3),rgba(6,182,212,0.3),transparent)",
            }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="text-center">
                  <div
                    className={`w-[60px] h-[60px] rounded-full mx-auto mb-5 flex items-center justify-center font-syne font-extrabold text-[18px] relative z-10 hover:scale-110 transition-all duration-300 cursor-default ${
                      step.active ? "text-white" : "text-blue-500 hover:text-white"
                    }`}
                    style={{
                      background: step.active
                        ? "linear-gradient(135deg,#3b82f6,#06b6d4)"
                        : "rgba(20,30,55,0.8)",
                      border: `2px solid ${step.active ? "#3b82f6" : "rgba(59,130,246,0.25)"}`,
                    }}
                  >
                    {step.num}
                  </div>
                  <h4 className="font-syne font-bold text-white text-[14px] mb-2.5">
                    {step.title}
                  </h4>
                  <p className="text-white/45 text-[12.5px] leading-[1.65] max-w-[170px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="bg-[#080c18] py-20 px-6 lg:px-16">
      <div className="max-w-[1240px] mx-auto">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl text-center px-8 lg:px-20 py-16 lg:py-20"
            style={{ background: "linear-gradient(135deg,#1a3a8f,#1d4ed8 40%,#0369a1)" }}
          >
            <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full bg-white/[0.06] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.04] pointer-events-none" />
            <h2
              className="relative font-syne font-extrabold text-white tracking-[-0.5px] mb-4"
              style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}
            >
              Ready for a better service
              <br />
              experience?
            </h2>
            <p className="relative text-white/70 text-[14.5px] max-w-[460px] mx-auto mb-10 leading-[1.7]">
              Join thousands of car owners who trust Motocline to keep their vehicles
              healthy and running.
            </p>
            <div className="relative flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-white text-blue-700 font-syne font-bold text-[14px] hover:scale-105 transition-transform">
                Book Now
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const SOCIAL_ICONS = [
    // Twitter/X
    <svg key="x" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>,
    // Facebook
    <svg key="fb" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>,
    // Instagram
    <svg key="ig" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>,
  ];

  return (
    <footer className="bg-[#04080f] border-t border-white/[0.06] px-6 lg:px-16 pt-14 pb-8">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-[5px] flex items-center justify-center font-syne font-black text-sm text-white"
                style={{ background: "linear-gradient(135deg,#3b82f6,#06b6d4)" }}
              >
                M
              </div>
              <span className="font-syne font-extrabold text-white text-[14px]">
                Moto<span className="text-blue-500">cline</span>
              </span>
            </div>
            <p className="text-white/35 text-[12.5px] leading-[1.7] max-w-[210px] mb-5">
              Premium automotive care powered by intelligent technology and certified
              professionals.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL_ICONS.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/40 hover:text-blue-400 hover:border-blue-500/30 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syne font-bold text-white text-[13px] mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[
                "About Us",
                "Your Garage",
                "Transactions List",
                "Support Center",
                "Privacy Policy",
              ].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-white/40 text-[12.5px] no-underline hover:text-blue-400 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-bold text-white text-[13px] mb-4">Contact Info</h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📞", text: "+1 (555) 900 3000" },
                { icon: "✉️", text: "hello@motocline.com" },
                { icon: "📍", text: "88 Tiber Drive, San Francisco, CA" },
              ].map((c) => (
                <div key={c.text} className="flex items-start gap-2.5">
                  <span className="text-[12px] mt-0.5">{c.icon}</span>
                  <span className="text-white/40 text-[12.5px] leading-[1.5]">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <span className="text-white/25 text-[11px]">
            © 2026 Motocline Technologies Inc. All rights reserved.
          </span>
          <span className="text-white/25 text-[11px]">
            All Terms Copyrighted 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Dashboard() {
  return (
    <div className="font-dm bg-[#060a14]">
      <Navbar />
      <Hero />
      <Intelligence />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}

/*
 * ─── tailwind.config.ts ───────────────────────────────────────────────────────
 * import type { Config } from 'tailwindcss'
 * export default {
 *   content: ['./index.html', './src/** \/*.{ts,tsx}'],
 *   theme: {
 *     extend: {
 *       fontFamily: {
 *         syne: ['Syne', 'sans-serif'],
 *         dm:   ['DM Sans', 'sans-serif'],
 *       },
 *       keyframes: {
 *         shaft: {
 *           '0%':   { opacity: '0.2', transform: 'scaleY(0.8)' },
 *           '100%': { opacity: '0.85', transform: 'scaleY(1.1)' },
 *         },
 *       },
 *       animation: {
 *         shaft: 'shaft 4s ease-in-out infinite alternate',
 *       },
 *     },
 *   },
 * } satisfies Config
 *
 * ─── index.html <head> ────────────────────────────────────────────────────────
 * <link
 *   href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap"
 *   rel="stylesheet"
 * />
 */