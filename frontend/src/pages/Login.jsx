import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";

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
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative">
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:bg-white lg:border lg:border-gray-500 lg:shadow-sm lg:p-10 lg:rounded-xl">
        <Link
          to="/"
          className="border border-black p-2 rounded-xl absolute top-5 left-5 flex items-center gap-1 text-xs uppercase tracking-wider text-black hover:text-white hover:bg-black transition lg:text-sm"
        >
          <ArrowLeft size={20} />
          Home
        </Link>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-[.25em] mb-3 lg:text-4xl">
            VESTE
          </h1>
          <p className="text-gray-500 text-xs tracking-wider uppercase lg:text-lg">
            Log In to Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-6 text-xs">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              className="border border-gray-500 p-3 text-sm outline-none focus:border-black transition rounded-xl lg:text-base"
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
              className="border border-gray-500 p-3 text-sm outline-none focus:border-black transition rounded-xl lg:text-base"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-3 uppercase tracking-wider text-sm font-light border border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 rounded-xl lg:text-base"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-center my-3">
          <Link
            to="/forgot-password"
            className="text-gray-500 text-xs font-light hover:underline lg:text-base"
          >
            Forgot password?
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-500 my-5" />

        {/* REGISTER LINK */}
        <div className="text-center">
          <p className="text-xs text-gray-500 lg:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black font-light hover:underline lg:text-base"
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
