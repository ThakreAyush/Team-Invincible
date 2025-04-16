// src/pages/About.jsx
import React from "react";
import EarthCanvas from "../components/EarthCanvas";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const About = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0f1f] text-white flex items-center justify-center">
      <EarthCanvas />

      <motion.div
        className="relative z-10 max-w-3xl px-6 py-10 text-center space-y-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-green-400 drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About CarbonTrack
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl leading-relaxed text-gray-300"
          variants={fadeUp}
        >
          CarbonTrack is dedicated to empowering individuals and organizations
          to monitor, understand, and reduce their carbon emissions. Our mission
          is to build a greener, cleaner, and more sustainable future through
          technology, transparency, and awareness.
        </motion.p>

        <motion.p
          className="text-md md:text-lg text-gray-400"
          variants={fadeUp}
        >
          Built with modern web technologies, we integrate real-time data
          visualization, 3D simulations, and environmental science to make
          climate awareness accessible and impactful.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 pt-4"
          variants={fadeUp}
        >
          <span className="bg-green-700/30 text-sm px-4 py-2 rounded-full border border-green-500/30 text-green-300 shadow">
            Real-time Data
          </span>
          <span className="bg-green-700/30 text-sm px-4 py-2 rounded-full border border-green-500/30 text-green-300 shadow">
            3D Earth Visualization
          </span>
          <span className="bg-green-700/30 text-sm px-4 py-2 rounded-full border border-green-500/30 text-green-300 shadow">
            Climate Awareness
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
