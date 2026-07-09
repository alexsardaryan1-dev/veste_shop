import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            No email found. Use forgot password link.
          </p>
          <Link
            to="/forgot-password"
            className="text-black font-light hover:underline"
          >
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/reset-password", {
        email,
        resetCode,
        newPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative">
      <div className="w-full max-w-md lg:border lg:border-gray-300 lg:p-6 tracking-wider uppercase">
        <Link
          to="/"
          className=" absolute top-5 left-5 flex items-center gap-1 text-xs text-black lg:text-base"
        >
          <ArrowLeft size={20} />
          Home
        </Link>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-3 lg:text-4xl">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Enter New Password
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <p className="font-normal tracking-widest text-center text-green-500 text-base">
            Password reset successfully!
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="font-normal tracking-widest text-center text-red-500 text-base">
            {error}
          </div>
        )}

        {/* FORM */}
        {!success && (
          <form onSubmit={handleReset} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-base font-light">
                Reset Code
              </label>
              <input
                id="code"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength="6"
                className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition duration-300 text-center text-lg"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-base font-light">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 p-3 pr-11 text-base outline-none focus:border-black transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 normal-case"
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 lg:text-sm lowercase">
                Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
                character
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-base font-light">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 p-3 pr-11 text-sm outline-none focus:border-black transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 normal-case"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white p-3 text-base font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 transition duration-300 uppercase"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* BACK LINK */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-black font-light hover:underline text-sm uppercase"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
