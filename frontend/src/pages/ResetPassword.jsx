import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4 lg:text-base">
            No email found. Use forgot password link.
          </p>
          <Link
            to="/forgot-password"
            className="text-black font-medium hover:underline lg:text-base"
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
            Enter New Password
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl mb-6 text-xs lg:text-base">
            <p className="font-medium mb-2">Password reset successfully!</p>
            <button
              onClick={() => navigate("/login")}
              className="text-green-700 font-medium hover:underline mt-2"
            >
              Go to login
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-6 text-xs">
            {error}
          </div>
        )}

        {/* INFO */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl mb-6 text-xs lg:text-base text-blue-900">
          <p className="font-medium mb-1">For Testing:</p>
          <p>Check backend console for reset code</p>
        </div>

        {/* FORM */}
        {!success && (
          <form onSubmit={handleReset} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="code"
                className="text-xs uppercase tracking-wider font-light lg:text-base"
              >
                Reset Code
              </label>
              <input
                id="code"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength="6"
                className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition rounded-xl lg:text-base text-center text-lg tracking-widest"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="newPassword"
                className="text-xs uppercase tracking-wider font-light lg:text-base"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition rounded-xl lg:text-base"
                required
              />
              <p className="text-xs text-gray-500 lg:text-sm">
                Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
                character
              </p>
            </div>

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
                className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition rounded-xl lg:text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white p-3 uppercase tracking-wider text-sm font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 transition-colors duration-300 rounded-xl lg:text-base"
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
            className="text-black font-medium hover:underline text-xs lg:text-base"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
