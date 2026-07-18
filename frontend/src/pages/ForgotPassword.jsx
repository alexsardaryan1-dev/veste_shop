import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/forgot-password", { email });
      setEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetCode.trim().length !== 6 || codeVerified) return;

    const verify = async () => {
      setVerifying(true);
      setCodeError("");
      try {
        await api.post("/api/auth/verify-reset-code", { email, resetCode });
        setCodeVerified(true);
      } catch (err) {
        setCodeVerified(false);
        setCodeError(err.response?.data?.message || "Invalid or expired code");
      } finally {
        setVerifying(false);
      }
    };

    verify();
  }, [resetCode, email, codeVerified]);

  const handleCodeChange = (e) => {
    setResetCode(e.target.value.toUpperCase());
    setCodeVerified(false);
    setCodeError("");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setResetting(true);
    try {
      await api.post("/api/auth/reset-password", {
        email,
        resetCode,
        newPassword,
      });
      setResetDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setResetting(false);
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

        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-3 lg:text-4xl">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Reset Your Password
          </p>
        </div>

        {resetDone && (
          <p className="font-normal tracking-widest text-center text-green-500 text-base normal-case">
            Password reset successfully!{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </p>
        )}

        {error && !resetDone && (
          <div className="font-normal tracking-widest text-center text-red-500 text-base mb-4 normal-case">
            {error}
          </div>
        )}

        {!emailSent && !resetDone && (
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

        {emailSent && !resetDone && (
          <div className="flex flex-col gap-5">
            <p className="text-base text-gray-500 normal-case -mt-2 mb-1">
              We sent a code to <span className="font-medium">{email}</span>
            </p>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="code"
                className="text-base font-light flex items-center gap-2"
              >
                Reset Code
                {codeVerified && <Check size={16} className="text-green-500" />}
              </label>
              <input
                id="code"
                type="text"
                value={resetCode}
                onChange={handleCodeChange}
                placeholder="ABC123"
                maxLength={6}
                className={`p-3 text-sm outline-none border transition duration-300 text-center text-lg ${
                  codeVerified
                    ? "border-green-500 focus:border-green-500"
                    : codeError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                }`}
              />
              {verifying && (
                <p className="text-gray-400 text-sm normal-case">
                  Checking code...
                </p>
              )}
              {codeError && (
                <p className="text-red-500 text-sm normal-case">{codeError}</p>
              )}
            </div>

            {codeVerified && (
              <form
                onSubmit={handleResetPassword}
                className="flex flex-col gap-5"
              >
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
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 lg:text-sm lowercase">
                    Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special
                    character
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base font-light"
                  >
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
                  disabled={resetting}
                  className="bg-black text-white p-3 text-base font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 transition duration-300 uppercase"
                >
                  {resetting ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="w-full h-px bg-gray-300 my-5" />

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

export default ForgotPassword;
