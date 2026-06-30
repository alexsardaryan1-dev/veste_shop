import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      console.log("Login success:", res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.log("Login error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-[.25em] mb-3">VESTE</h1>
          <p className="text-gray-600 text-xs tracking-wider uppercase">
            Log In to Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-6 text-xs">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-wider font-light"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-wider font-light"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-[#D0D0D0] p-3 text-sm outline-none focus:border-[#313131] transition"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#313131] text-white p-3 uppercase tracking-wider text-sm font-light hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-center mb-5">
          <Link
            to="/forgot-password"
            className="text-[#313131] text-xs font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-[#D0D0D0] my-5" />

        {/* REGISTER LINK */}
        <div className="text-center">
          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#313131] font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
