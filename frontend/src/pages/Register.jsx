import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, Check, X, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const doPasswordsMatch =
    confirmPassword !== "" && password === confirmPassword;

  const isValidForm =
    name.trim() !== "" && isEmailValid && isPasswordValid && doPasswordsMatch;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Password doesn't meet the requirements below");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/register", { name, email, password });
      navigate("/verify-code", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const CheckItem = ({ passed, label }) => (
    <li
      className={`flex items-center gap-1.5 ${passed ? "text-green-500" : "text-gray-500"}`}
    >
      {passed ? <Check size={20} /> : <X size={20} />}
      {label}
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative">
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:border lg:border-gray-300 lg:p-6 tracking-wider uppercase">
        <Link
          to="/"
          className="p-2 absolute top-5 left-5 flex items-center gap-1 text-sm text-black lg:text-base"
        >
          <ArrowLeft size={20} />
          Home
        </Link>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-3 lg:text-4xl">VESTE</h1>
          <p className="text-gray-500 text-base lg:text-lg">
            Create Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="font-normal tracking-widest text-center text-red-500 text-base">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-light lg:text-base">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border border-gray-300 p-3 text-sm outline-none focus:border-black transition duration-300 lg:text-base"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-light lg:text-base">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="your@email.com"
              className={`border p-3 text-sm outline-none transition duration-300 lg:text-base ${
                emailTouched && !isEmailValid
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
              required
            />
            {emailTouched && !isEmailValid && (
              <p className="text-xs lg:text-sm text-red-500">
                Enter a valid email, e.g. name@example.com
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-light lg:text-base"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordTouched(true)}
                placeholder="••••••••"
                className="w-full border border-gray-300 p-3 pr-11 text-sm outline-none focus:border-black transition duration-300 lg:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 normal-case"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordTouched && (
              <ul className="flex flex-col gap-1 text-xs lg:text-sm mt-1">
                <CheckItem
                  passed={passwordChecks.length}
                  label="At least 8 characters"
                />
                <CheckItem
                  passed={passwordChecks.uppercase}
                  label="1 uppercase letter"
                />
                <CheckItem
                  passed={passwordChecks.lowercase}
                  label="1 lowercase letter"
                />
                <CheckItem passed={passwordChecks.number} label="1 number" />
                <CheckItem
                  passed={passwordChecks.special}
                  label="1 special character (!@#$...)"
                />
              </ul>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-light lg:text-base"
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
                className={`w-full border p-3 pr-11 text-sm outline-none transition duration-300 lg:text-base ${
                  confirmPassword !== "" && !doPasswordsMatch
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
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
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirmPassword !== "" && !doPasswordsMatch && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading || !isValidForm}
            className={`p-3 text-sm lg:text-base font-light border transition duration-300 uppercase ${
              loading || !isValidForm
                ? "bg-black border-black text-white cursor-not-allowed"
                : "bg-black border-black text-white hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-300 my-5" />

        {/* LOGIN LINK */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
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

export default Register;
