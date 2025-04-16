// src/pages/About.jsx
import React from "react";
import EarthCanvas from "../components/EarthCanvas";

const About = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0f1f] text-white flex items-center justify-center">
      <EarthCanvas />

      <div className="relative z-10 max-w-3xl px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-400">
          About CarbonTrack
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          CarbonTrack is dedicated to empowering individuals and organizations
          to monitor, understand, and reduce their carbon emissions. Our mission
          is to build a greener, cleaner, and more sustainable future through
          technology, transparency, and awareness.
        </p>
        <p className="text-md md:text-lg text-gray-400">
          Built with modern web technologies, we integrate real-time data
          visualization, 3D simulations, and environmental science to make
          climate awareness accessible and impactful.
        </p>
      </div>
    </div>
  );
};

export default About;
