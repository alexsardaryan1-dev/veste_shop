import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { setUser } = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            No email found. Please register first.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="text-black font-light hover:underline"
          >
            Go to Register
          </button>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/verify-code", {
        email,
        verificationCode: code,
      });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-md lg:border lg:border-gray-300 lg:p-6 tracking-wider uppercase">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-3 lg:text-4xl">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Verify Your Email
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="font-normal tracking-widest text-center text-red-500 text-base">
            {error}
          </div>
        )}

        {/* INFO */}
        <div className="bg-green-500 border border-green-500 p-4 rounded-xl mb-6">
          <p className="text-sm lg:text-base">
            Please check your email account for the verification code we just
            sent to your email <strong>{email} </strong>and enter that code in
            the box below.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleVerify} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-base font-light">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength="6"
              className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition duration-300 text-center text-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-3 text-base uppercase font-light border border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black transition duration-300"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* BACK LINK */}
        <div className="text-center">
          <p>
            <button
              onClick={() => navigate("/register")}
              className="text-black text-sm uppercase font-light hover:underline"
            >
              Back to register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
