import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">You must be logged in</p>
          <button
            onClick={() => navigate("/login")}
            className="text-black font-light hover:underline"
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 ">
      <div className="w-full max-w-md lg:border lg:border-gray-300 lg:p-6 tracking-wider uppercase">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-light mb-3">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Change Your Password
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <p className="font-normal tracking-widest text-center text-red-500 text-base">
            Password changed successfully!
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="font-normal tracking-widest text-center text-red-500 text-base">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleChangePassword} className="flex flex-col gap-5">
          {/* CURRENT PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-xs lg:text-base font-light"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-300 p-3 text-base outline-none focus:border-black transition duration-300"
              required
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="text-xs lg:text-base font-light"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-300 p-3 text-base outline-none focus:border-black transition duration-300"
              required
            />
            <p className="text-xs lg:text-sm text-gray-500 lowercase">
              Min 6 chars, 1 uppercase, 1 number
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-xs lg:text-base font-light"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-300 p-3 text-base outline-none focus:border-black transition duration-300"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-3 text-base lg:text-base font-light hover:bg-white hover:text-black disabled:opacity-50 transition duration-300 uppercase"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* BACK LINK */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="text-black text-sm lg:text-base font-light hover:underline uppercase"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
