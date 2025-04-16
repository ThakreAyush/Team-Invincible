import React, { useState } from "react";
import { motion } from "framer-motion";
import EarthCanvas from "../components/EarthCanvas";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/api/Axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const LoginFunc = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await AxiosInstance.post("/auth/api-login", {
        email,
        password,
      });

      const { token, data } = response.data;

      // Save token and user data securely
      localStorage.setItem("userToken", token); // optional if you're using JWT
      localStorage.setItem("userData", JSON.stringify(data));

      navigate("/");
      window.location.reload();
    } catch (error) {
      setErrorMsg("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-white to-green-300 flex flex-col items-center justify-center">
      {/* Background Earth */}
      <div className="absolute inset-0 flex items-center justify-center scale-75 opacity-40 z-0">
        <EarthCanvas />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 drop-shadow-md">
          🌿 CarbonChain
        </h1>
        <p className="text-sm text-green-900">Track. Reduce. Sustain.</p>
      </motion.div>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-[90%] max-w-md p-8 bg-white/30 backdrop-blur-2xl border border-white/40 shadow-xl rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
          Login to your account
        </h2>

        <form className="space-y-4" onSubmit={LoginFunc}>
          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <Link to="/sign-up" className="block mt-6 text-center">
          <p className="text-sm text-green-900">
            Don’t have an account?{" "}
            <span className="text-green-700 font-medium hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
