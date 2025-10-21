import React, { useState } from 'react';
import { FaDownload, FaPlay, FaSearch, FaTimes, FaArrowRight } from "react-icons/fa";
import { bannerAssets } from '../../assets/dummydata';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const { bannerImage, video } = bannerAssets;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#121212] via-[#1A1A1A] to-[#242424] text-white min-h-[90vh] flex items-center px-4 sm:px-8 py-16">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF4C29]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD369]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF4C29]/10 to-[#FFD369]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-12">

        {/* Left Section - Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left space-y-8 mt-10 md:mt-0"
        >
          {/* Main Headline - Playfair Display style */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We're Here <br />
            <span className="bg-gradient-to-r from-[#FF4C29] via-[#FF6B35] to-[#FFD369] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,76,41,0.5)]">
              For Food & Delivery
            </span>
          </motion.h1>

          {/* Subtext - Inter font */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#B3B3B3] text-lg sm:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Best cooks and best delivery guys all at your service. 
            <span className="text-[#FFD369] font-semibold"> Hot tasty food</span> will reach you in <span className="text-[#FF4C29] font-bold">60 minutes</span>.
          </motion.p>

          {/* Premium Glass Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            onSubmit={handleSearch}
            className="flex items-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden max-w-md mx-auto md:mx-0 shadow-[0_8px_32px_rgba(255,76,41,0.2)] hover:shadow-[0_8px_40px_rgba(255,76,41,0.3)] transition-all duration-300"
          >
            <div className="px-5 py-4 text-[#FFD369]">
              <FaSearch className="text-lg" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your favorite dish..."
              className="flex-grow py-4 px-2 bg-transparent text-white placeholder-[#B3B3B3] focus:outline-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-[#FF4C29] to-[#FFD369] hover:from-[#FF6B35] hover:to-[#FFD369] text-white font-semibold px-6 py-4 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Search</span>
              <FaArrowRight className="text-sm" />
            </motion.button>
          </motion.form>

          {/* Premium Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FFD369]/50 text-white px-8 py-4 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,211,105,0.3)] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF4C29] to-[#FFD369] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaDownload className="text-white" />
              </div>
              <span className="font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Download App</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVideo(true)}
              className="group flex items-center gap-3 bg-gradient-to-r from-[#FF4C29] to-[#FFD369] hover:from-[#FF6B35] hover:to-[#FFD369] text-white px-8 py-4 rounded-3xl shadow-[0_8px_24px_rgba(255,76,41,0.4)] hover:shadow-[0_8px_40px_rgba(255,76,41,0.6)] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaPlay className="text-white ml-0.5" />
              </div>
              <span className="font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Watch Video</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Section - Premium Image with Depth */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative mt-10 md:mt-0 min-h-[400px] sm:min-h-[500px] flex justify-center items-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Multi-layered Glowing Background */}
            <div className="absolute -inset-8 bg-gradient-to-r from-[#FF4C29]/30 to-[#FFD369]/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -inset-12 bg-[#FFD369]/20 rounded-full blur-[100px]"></div>
            
            {/* Premium Glass Container for Image */}
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-6 shadow-[0_0_60px_rgba(255,211,105,0.3)] hover:shadow-[0_0_80px_rgba(255,211,105,0.5)] transition-all duration-500"
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_60px_rgba(255,76,41,0.1)]"></div>
              
              <motion.img
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                src={bannerImage}
                alt="Food Delivery"
                className="relative z-10 max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#FF4C29] to-[#FFD369] rounded-full blur-2xl opacity-50"
            ></motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-[#FFD369] to-[#FF4C29] rounded-full blur-2xl opacity-40"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
          >
            {/* Close Button */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute top-6 right-6 z-50"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowVideo(false)}
                className="text-white text-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 rounded-full p-4 transition-all shadow-[0_8px_32px_rgba(255,76,41,0.3)]"
              >
                <FaTimes />
              </motion.button>
            </motion.div>

            {/* Video Container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-5xl mx-auto relative z-40"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-4 shadow-[0_0_80px_rgba(255,76,41,0.4)]">
                <video
                  controls
                  autoPlay
                  className="w-full aspect-video object-contain rounded-2xl"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Banner;
