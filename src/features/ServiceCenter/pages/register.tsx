import { useState } from "react";
import { useServiceCenterAuth } from "../hooks/useServiceCenterAuth";
import { useNavigate } from "react-router-dom";

export default function ServiceCenterSignup() {
  const navigate = useNavigate();
  const { register, loading, error } = useServiceCenterAuth();

  const [formData, setFormData] = useState({
    garageName: "",
    ownerName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register({
        email: formData.email,
        password: formData.password,
        providerProfile: {
          garageName: formData.garageName,
          ownerName: formData.ownerName,
          phone: formData.phoneNumber,
        },
      });
      navigate("/service-center/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      {/* ── Background ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80')`,
        }}
      />
      {/* Dark overlay with cyan tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#00111f]/90 to-[#001B3A]/85" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[340px] h-[340px] rounded-full bg-blue-600/10 blur-[90px] pointer-events-none" />

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-lg mx-4">

        {/* Top accent bar */}
        <div className="h-[3px] w-full rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 border-t-0 rounded-b-2xl px-8 py-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

          {/* Logo */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 mb-1">
              {/* Wrench icon */}
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h1 className="text-[1.75rem] font-bold tracking-tight text-white font-sans">
                Moto<span className="text-cyan-400">Cline</span>
              </h1>
            </div>
            <p className="text-gray-400 text-xs tracking-widest uppercase">
              Service Center Registration
            </p>
          </div>

          {/* Google Signup */}
          <button className="w-full flex items-center justify-center gap-3 bg-white/[0.06] hover:bg-white/[0.11] active:scale-[0.99] transition-all duration-200 rounded-xl py-[11px] text-white text-sm font-medium mb-6 border border-white/10 hover:border-white/20">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-4 h-4"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-[11px] tracking-widest uppercase font-medium">or email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-xl mb-5">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Garage + Owner */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Garage Name" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }>
                <input
                  type="text"
                  name="garageName"
                  placeholder="Garage name"
                  value={formData.garageName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </Field>
              <Field label="Owner Name" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Owner name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </Field>
            </div>

            {/* Row 2: Phone + Email */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+91 00000 00000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </Field>
              <Field label="Email" icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }>
                <input
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </Field>
            </div>

            {/* Row 3: Password */}
            <Field label="Password" icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
              />
            </Field>

            {/* Row 4: Confirm Password */}
            <Field label="Confirm Password" icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
              />
            </Field>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-[2px]">
                <input type="checkbox" required className="peer sr-only" />
                <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all duration-200 flex items-center justify-center">
                  <svg className="w-3 h-3 text-black hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-gray-400 text-xs leading-relaxed">
                I agree to the{" "}
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">Terms of Service</span>
                {" "}and{" "}
                <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">Privacy Policy</span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden group mt-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-xl transition-all duration-300 group-hover:from-cyan-400 group-hover:to-cyan-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{ boxShadow: "0 0 24px rgba(34,211,238,0.5)" }} />
              <div className="relative flex items-center justify-center gap-2 py-3 text-black font-semibold text-sm tracking-wide">
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Service Center Account
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </div>
            </button>

          </form>

          {/* Login link */}
          <p className="text-center text-gray-500 text-xs mt-6">
            Already have an account?{" "}
            <span
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors font-medium"
              onClick={() => navigate("/service-center/login")}
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

/* ── Reusable field wrapper ── */
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="block text-gray-400 text-[11px] font-medium tracking-wider uppercase mb-[6px]">
        {label}
      </label>
      <div className="flex items-center gap-2.5 px-3.5 py-[11px] bg-white/[0.04] border border-white/10 rounded-xl focus-within:border-cyan-500/60 focus-within:bg-white/[0.07] transition-all duration-200">
        <span className="text-gray-500 shrink-0 group-focus-within:text-cyan-400 transition-colors">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}