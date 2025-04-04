import React from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center overflow-y-auto">
      <NavBar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full px-6 md:px-12 py-16"
      >
        <h1 className="text-6xl font-extrabold text-center text-blue-400 mb-8 drop-shadow-lg">About Us</h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto leading-relaxed">
          <strong>Legaloop</strong> is a legal advice platform aimed at making legal assistance **accessible, clear, and empowering for all**.
        </p>

        {/* Mission Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16"
        >
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-300 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong>Legaloop</strong> exists to **simplify legal guidance** by integrating technology with user-friendly solutions. Our goal is to make legal assistance approachable for everyone.
            </p>
          </div>
          <img src="/assets/our-mission.webp" alt="Our Mission" className="w-full max-w-sm rounded-xl shadow-lg" />
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 mt-20"
        >
          <img src="/assets/our-vision.webp" alt="Our Vision" className="w-full max-w-sm rounded-xl shadow-lg" />
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-300 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe **technology can revolutionize the legal industry**. <strong>Legaloop</strong> is committed to creating a legal support system that’s **inclusive, transparent, and easy to access**.
            </p>
          </div>
        </motion.section>

        {/* Why It Matters */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-5xl font-bold text-center text-blue-400 mt-24 drop-shadow-lg"
        >
          Why It Matters?
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mt-8 leading-relaxed"
        >
          <p>
            Access to legal support is a fundamental right, but many find it **complex, expensive, and inaccessible**.
          </p>
          <p className="mt-4">Legaloop aims to solve these challenges by:</p>
          <ul className="list-disc list-inside mt-6 space-y-3 text-gray-400">
            <li>Breaking down complex **legal concepts** into simple terms.</li>
            <li>Providing **instant, reliable** legal insights through AI.</li>
            <li>Ensuring **privacy & security** for every legal interaction.</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;
