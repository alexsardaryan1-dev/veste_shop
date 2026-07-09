import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:border lg:border-gray-300 lg:p-6 tracking-wider uppercase">
        <Link
          to="/"
          className="p-2 absolute top-5 left-5 flex items-center gap-1 text-black text-sm lg:text-base"
        >
          <ArrowLeft size={20} />
          Home
        </Link>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-3 lg:text-4xl">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Log In to Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* EMAIL */}
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
              className="border border-gray-300 p-3 text-base outline-none focus:border-black transition duration-300"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-base font-light">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 p-3 pr-11 text-base outline-none focus:border-black transition duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 normal-case"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-3 text-base font-light border border-black hover:bg-white hover:text-black disabled:cursor-not-allowed transition duration-300 uppercase"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-center my-3">
          <Link
            to="/forgot-password"
            className="text-gray-500 text-base font-light hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* REGISTER LINK */}
        <div className="text-center">
          <p className="text-sm font-light text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black font-normal hover:underline"
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
