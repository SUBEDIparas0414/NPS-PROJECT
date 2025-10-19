import React from 'react';
import { aboutfeature } from '../../assets/dummydata';
import { FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AboutImage from '../../assets/AboutImage.png';
import FloatingParticle from '../FloatingParticle/FloatingParticle';

const AboutHome = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white font-[poppins] py-16 px-4">
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="block text-yellow-400 drop-shadow-lg">Epicurean Elegance</span>
              <span className="block text-white drop-shadow-sm">Where Flavors Dance & Memories Come Alive</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Every plate we serve is a celebration of passion and creativity. At the core of our kitchen lies a love for real ingredients, timeless techniques, and meaningful moments. Whether it’s a comforting classic or a bold new taste, we aim to make every bite a memory worth savoring.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {aboutfeature.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center space-y-3 bg-white/5 p-6 rounded-xl backdrop-blur-md shadow-md hover:shadow-yellow-400/10 transition-all"
                >
                  <div className={`text-3xl p-4 rounded-full shadow-inner ${item.color}`}>
                    <item.icon className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 items-center mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-yellow-500 text-black font-medium px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-200 hover:scale-105"
              >
                <FaInfoCircle className="text-md" />
                <span>Unveil Our Legacy</span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <div className="relative group w-full max-w-md mx-auto">
              {/* Border Frame Behind */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-yellow-500 rounded-2xl z-0 blur-sm group-hover:blur group-hover:scale-105 transition-all duration-300" />
              
              {/* Image */}
              <img
                src={AboutImage}
                alt="restaurant"
                className="relative z-10 rounded-2xl shadow-2xl w-full object-cover brightness-105 contrast-110 transition-all duration-300 group-hover:scale-105"
              />
              
              {/* Glow Shadow */}
              <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 blur-xl z-[-1]" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Floating Particles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <FloatingParticle />
      </div>
    </div>
  );
};

export default AboutHome;
    