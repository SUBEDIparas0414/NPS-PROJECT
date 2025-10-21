import React, { useState } from "react";
import { FaRegEnvelope, FaArrowRight } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { GiChefToque } from "react-icons/gi";
import { socialIcons } from "../../assets/dummydata";
import { motion } from "framer-motion";

const Footer = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Menu", link: "/menu" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing! We will send updates to ${email}`);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#121212] to-[#0A0A0A] text-gray-300 py-16 px-5 border-t border-white/10 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF4C29]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD369]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Left Column - Brand & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF4C29] to-[#FFD369] rounded-2xl flex items-center justify-center shadow-lg">
              <GiChefToque className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF4C29] via-[#FF6B35] to-[#FFD369] bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trio Order
            </h2>
          </div>

          <p className="text-[#B3B3B3] mb-6 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif" }}>
            Bringing delicious moments to your doorstep with love and care.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-[#FFD369]">
              <FaRegEnvelope className="text-lg" />
              <span className="font-semibold" style={{ fontFamily: "'Lato', sans-serif" }}>Get Exclusive Offers</span>
            </div>
            <div className="flex backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_8px_32px_rgba(255,76,41,0.2)] transition-all duration-300">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-white placeholder-[#B3B3B3]" 
                style={{ fontFamily: "'Lato', sans-serif" }}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-[#FF4C29] to-[#FFD369] text-white px-5 py-3 font-semibold hover:from-[#FF6B35] hover:to-[#FFD369] transition-all duration-300"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <span>Subscribe</span>
                <FaArrowRight className="text-sm" />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Middle Column - Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h3>
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.name} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 group"
              >
                <BiChevronRight className="text-[#FF4C29] group-hover:translate-x-1 transition-transform duration-300" />
                <a
                  href={item.link}
                  className="text-[#B3B3B3] hover:text-[#FFD369] transition-colors duration-300"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column - Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#F5F5F5] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Connect With Us
          </h3>
          <div className="flex flex-col gap-4">
            {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
              <motion.a
                key={idx}
                target="_blank"
                href={link}
                rel="noopener noreferrer"
                whileHover={{ x: 5, scale: 1.05 }}
                className="flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FFD369]/50 px-4 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg"
              >
                <Icon className="text-2xl" style={{ color }} />
                <span className="text-[#B3B3B3] hover:text-white transition-colors" style={{ fontFamily: "'Lato', sans-serif" }}>{label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-white/10 mt-16 pt-8 text-center relative z-10"
      >
        <p className="text-[#B3B3B3] text-sm mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>
          &copy; 2025 <span className="text-[#FFD369] font-semibold">Trio Order</span>. All Rights Reserved.
        </p>
        <p className="text-xs text-[#808080]" style={{ fontFamily: "'Lato', sans-serif" }}>
          Crafted with ❤️ by <span className="text-[#FF4C29]">Paras Subedi</span> • <span className="text-[#FF4C29]">Nilesh Karn</span> • <span className="text-[#FF4C29]">Shishir Gautam</span>
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
