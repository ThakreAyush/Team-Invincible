import React, { useState } from "react";
import { motion } from "framer-motion";
import EarthCanvas from "../components/EarthCanvas";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/api/Axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await AxiosInstance.post("/auth/api-signup", {
        email,
        password,
        name,
        cmponeyName: companyName,
      });
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Error signing up. User may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-white to-green-100 flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center scale-75 opacity-40 z-0">
        <EarthCanvas />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 drop-shadow-md">
          🌱 CarbonChain
        </h1>
        <p className="text-sm text-green-900">
          Join our mission to reduce carbon emissions
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 w-[90%] max-w-md p-8 bg-white/30 backdrop-blur-2xl border border-white/40 shadow-xl rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
          Create your account
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.companyName && (
              <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold rounded-lg transition`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Creating...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <Link
          to="/Login"
          className="mt-4 text-sm text-green-900 text-center block"
        >
          <p className="mt-4">
            Already have an account?{" "}
            <span className="text-green-700 font-medium hover:underline cursor-pointer">
              Log In
            </span>
          </p>
        </Link>
      </motion.div>
    </div>
  );
};

export default SignUp;
