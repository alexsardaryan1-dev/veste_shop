import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative">
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:bg-white lg:border lg:border-gray-300 lg:shadow-sm lg:p-10 lg:rounded-xl">
        <Link
          to="/"
          className="border border-black p-2 rounded-xl absolute top-5 left-5 flex items-center gap-1 text-xs uppercase tracking-wider text-black hover:text-white hover:bg-black transition lg:text-sm"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-[.25em] mb-3 lg:text-4xl">
            VESTE
          </h1>
          <p className="text-gray-600 text-xs tracking-wider uppercase lg:text-lg">
            Reset Your Password
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl mb-6 text-xs lg:text-base">
            <p className="font-medium mb-2">Reset code sent!</p>
            <p>Check backend console for reset code</p>
            <button
              onClick={() => navigate("/reset-password", { state: { email } })}
              className="text-green-700 font-medium hover:underline mt-2"
            >
              Enter reset code
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-6 text-xs">
            {error}
          </div>
        )}

        {/* FORM */}
        {!success && (
          <form onSubmit={handleForgot} className="flex flex-col gap-5">
            <p className="text-xs text-gray-600 lg:text-base -mt-2 mb-2">
              Enter your email address and we'll send you a reset code
            </p>

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
                className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition rounded-xl lg:text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white p-3 uppercase tracking-wider text-sm font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 transition-colors duration-300 rounded-xl lg:text-base"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* LOGIN LINK */}
        <div className="text-center">
          <p className="text-xs text-gray-600 lg:text-base">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline lg:text-base"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
