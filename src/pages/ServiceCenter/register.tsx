import { useState } from "react";
import { useServiceCenterAuth } from "../../hooks/useServiceCenterAuth";
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
        }
      });
      navigate("/service-center/login");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#001B3A] flex items-center justify-center px-4">

      {/* Container */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Moto<span className="text-cyan-400">Cline</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Join the elite MotoCline network today
          </p>
        </div>

        {/* Google Signup */}
        <button className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 transition rounded-lg py-3 text-white mb-6 border border-white/10">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR EMAIL</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Garage Name & Owner Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-300 text-sm">
                Garage Name
              </label>
              <input
                type="text"
                name="garageName"
                placeholder="Enter garage name"
                value={formData.garageName}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                placeholder="Enter owner name"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="text-gray-300 text-sm">
                Phone
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+91"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" required />
            <span>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-lg text-black font-semibold mt-3 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Service Center Account"}
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <span className="text-cyan-400 cursor-pointer hover:underline" onClick={() => navigate("/service-center/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}