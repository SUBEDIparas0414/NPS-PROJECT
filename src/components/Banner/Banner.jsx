import React, { useState } from 'react';
import { FaDownload, FaPlay, FaSearch, FaTimes } from "react-icons/fa";
import { bannerAssets } from '../../assets/dummydata';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const { bannerImage, video } = bannerAssets;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-950 via-orange-900 to-orange-800 text-white pb-20 px-4 sm:px-8">
      {/* Decorative glowing gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/70 via-transparent to-orange-900/50 animate-pulse"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">

        {/* Left Section */}
        <div className="flex-1 text-center md:text-left space-y-6 mt-10 md:mt-0">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            We're Here <br />
            <span className="text-yellow-400 animate-pulse drop-shadow-lg">
              For Food & Delivery
            </span>
          </h1>
          <p className="text-orange-100 text-lg italic max-w-xl mx-auto md:mx-0">
            Best cooks and best delivery guys all at your service. 
            <span className="text-yellow-300 font-semibold"> Hot tasty food</span> will reach you in 60 minutes.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full overflow-hidden max-w-md mx-auto md:mx-0 shadow-xl border border-yellow-300/30"
          >
            <div className="px-4 py-3 text-orange-700">
              <FaSearch />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover your next favorite meal..."
              className="flex-grow py-3 px-2 text-orange-800 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-orange-900 font-semibold px-5 py-3 transition-all cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
            <button className="flex items-center gap-2 bg-orange-950 hover:bg-orange-900 text-yellow-400 px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105">
              <FaDownload />
              <span>Download App</span>
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-orange-900 px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            >
              <FaPlay />
              <span>Watch Video</span>
            </button>
          </div>
        </div>

        {/* Right Section (Image with floating animation) */}
        <div className="flex-1 relative mt-10 md:mt-0 min-h-[300px] sm:min-h-[400px] flex justify-center items-center">
          <div className="relative">
            {/* Soft glowing background */}
            <div className="absolute -inset-6 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
            <img
              src={bannerImage}
              alt="Banner"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-float"
            />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="absolute top-6 right-6 z-50">
            <button
              onClick={() => setShowVideo(false)}
              className="text-white text-2xl bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition"
            >
              <FaTimes />
            </button>
          </div>
          <div className="w-full max-w-4xl mx-auto relative z-40 animate-fadeIn">
            <video
              controls
              autoPlay
              className="w-full aspect-video object-contain rounded-lg shadow-2xl"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
