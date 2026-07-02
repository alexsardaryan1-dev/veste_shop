import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidForm =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/register", { name, email, password });
      navigate("/verify-code", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:bg-white lg:border lg:border-[#E5E5E5] lg:shadow-sm lg:p-10 lg:rounded-xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-[.25em] mb-3 lg:text-4xl">
            VESTE
          </h1>
          <p className="text-gray-600 text-xs tracking-wider uppercase lg:text-lg">
            Create Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 text-xs">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs uppercase tracking-wider font-light lg:text-base"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition lg:text-base"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-wider font-light lg:text-base"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition lg:text-base"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-wider font-light lg:text-base"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition lg:text-base"
              required
            />
            <p className="text-xs text-gray-500 lg:text-sm ">
              Min 6 chars, 1 uppercase, 1 number
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-xs uppercase tracking-wider font-light lg:text-base"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition lg:text-base"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading || !isValidForm}
            className="bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light border border-black hover:bg-white hover:text-black lg:text-base transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="w-full h-px bg-[#D0D0D0] my-5" />

        {/* LOGIN LINK */}
        <div className="text-center">
          <p className="text-xs text-gray-600 lg:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#313131] font-medium hover:underline lg:text-base"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
