// src/pages/Signup.jsx
import React from "react";
import { motion } from "framer-motion";
import EarthCanvas from "../components/EarthCanvas";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-white to-green-100 flex flex-col items-center justify-center">
      {/* 3D Earth Background */}
      <div className="absolute inset-0 flex items-center justify-center scale-75 opacity-40 z-0">
        <EarthCanvas />
      </div>

      {/* Company Branding */}
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

      {/* SignUp Form */}
      <motion.div
        className="relative z-10 w-[90%] max-w-md p-8 bg-white/30 backdrop-blur-2xl border border-white/40 shadow-xl rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
          Create your account
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Company Name"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/90 border border-green-300 text-green-900 placeholder-green-600 outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <Link to="/" className="mt-4 text-sm text-green-900 text-center">
          <p className="mt-4 text-sm text-green-900 text-center">
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
