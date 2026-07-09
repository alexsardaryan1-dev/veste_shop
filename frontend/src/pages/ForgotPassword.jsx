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
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:border lg:border-gray-300 lg:p-6 tracking-wider uppercase">
        <Link
          to="/"
          className="p-2 absolute top-5 left-5 flex items-center gap-1 text-sm lg:text-base text-black"
        >
          <ArrowLeft size={20} />
          Home
        </Link>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-3 lg:text-4xl">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Reset Your Password
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="bg-green-50 border border-green-500 text-green-500 p-3 rounded-xl mb-6 text-sm lg:text-base">
            <p className="font-normal mb-2">Reset code sent!</p>
            <button
              onClick={() => navigate("/reset-password", { state: { email } })}
              className="text-green-500 uppercase font-normal hover:underline mt-2"
            >
              Enter reset code:
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm lg:text-base">
            {error}
          </div>
        )}

        {/* FORM */}
        {!success && (
          <form onSubmit={handleForgot} className="flex flex-col gap-5">
            <p className="text-base text-orange-500 -mt-2 mb-2">
              Enter your email to get a reset code
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base font-light">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border border-black lg:border-gray-300 p-3 text-base outline-none focus:border-black transition duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white p-3 text-base font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 transition duration-300 uppercase"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* LOGIN LINK */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-black font-normal hover:underline"
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
