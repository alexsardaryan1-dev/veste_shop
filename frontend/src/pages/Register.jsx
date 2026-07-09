import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, Check, X } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
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
      <div className="w-full max-w-md lg:max-w-lg mx-auto lg:bg-white lg:border lg:border-gray-500 lg:shadow-sm lg:p-10 lg:rounded-xl">
        <Link
          to="/"
          className="border border-black p-2 rounded-xl absolute top-5 left-5 flex items-center gap-1 text-xs uppercase tracking-wider text-black hover:text-white hover:bg-black transition duration-300 lg:text-sm"
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
            Create Your Account
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-xs">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs uppercase tracking-wider font-light lg:text-base"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border border-gray-500 p-3 text-sm outline-none focus:border-black transition duration-300 rounded-xl lg:text-base"
              required
            />
          </div>

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
              onBlur={() => setEmailTouched(true)}
              placeholder="your@email.com"
              className={`border p-3 text-sm outline-none transition duration-300 rounded-xl lg:text-base ${
                emailTouched && !isEmailValid
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-500 focus:border-black"
              }`}
              required
            />
            {emailTouched && !isEmailValid && (
              <p className="text-xs text-red-500">
                Enter a valid email, e.g. name@example.com
              </p>
            )}
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
              onFocus={() => setPasswordTouched(true)}
              placeholder="••••••••"
              className="border border-gray-500 p-3 text-sm outline-none focus:border-black transition duration-300 rounded-xl lg:text-base"
              required
            />
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
              className={`border rounded-xl p-3 text-sm outline-none transition duration-300 lg:text-base ${
                confirmPassword !== "" && !doPasswordsMatch
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-500 focus:border-black"
              }`}
              required
            />
            {confirmPassword !== "" && !doPasswordsMatch && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading || !isValidForm}
            className={`rounded-xl p-3 uppercase tracking-wider text-sm lg:text-base font-light border transition duration-300 ${
              loading || !isValidForm
                ? "bg-gray-500 border-gray-500 text-gray-500 cursor-not-allowed"
                : "bg-black border-black text-white hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-500 my-5" />

        {/* LOGIN LINK */}
        <div className="text-center">
          <p className="text-xs text-gray-500 lg:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-light hover:underline lg:text-base"
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
