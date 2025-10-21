import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FiArrowRight, FiGlobe, FiMail, FiMapPin, FiMessageSquare, FiPhone } from 'react-icons/fi';
import { contactFormFields } from '../../assets/dummydata';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', dish: '', query: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    toast.success('Your query has been submitted successfully!', {
      style: { 
        background: 'linear-gradient(135deg, #FF4C29 0%, #FFD369 100%)', 
        color: '#fff',
        fontFamily: "'Lato', sans-serif",
        fontWeight: '600'
      },
    });
    setFormData({ name: '', phone: '', email: '', address: '', dish: '', query: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#121212] via-[#1A1A1A] to-[#121212] text-white flex items-center justify-center px-4 py-20 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} />

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF4C29]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD369]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 relative z-10">
        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF4C29] via-[#FF6B35] to-[#FFD369] bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Connect With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#B3B3B3] text-lg leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            We'd love to hear from you! Reach out via phone, email, or just drop us a query.
          </motion.p>

          <div className="space-y-5">
            {/* Headquarters */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex items-start space-x-4 backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:border-[#FFD369]/50 hover:shadow-lg hover:shadow-[#FF4C29]/20"
            >
              <div className="bg-gradient-to-br from-[#FF4C29] to-[#FFD369] p-3 rounded-2xl shadow-lg">
                <FiMapPin className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Our Headquarter</h3>
                <p className="text-[#B3B3B3]" style={{ fontFamily: "'Lato', sans-serif" }}>Kathmandu, Nepal</p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex items-start space-x-4 backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:border-[#FFD369]/50 hover:shadow-lg hover:shadow-[#FF4C29]/20"
            >
              <div className="bg-gradient-to-br from-[#FF4C29] to-[#FFD369] p-3 rounded-2xl shadow-lg">
                <FiPhone className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Contact Number</h3>
                <p className="text-[#B3B3B3] flex items-center gap-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                  <FiGlobe /> +977 9862626262
                </p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ x: 5, scale: 1.02 }}
              className="flex items-start space-x-4 backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:border-[#FFD369]/50 hover:shadow-lg hover:shadow-[#FF4C29]/20"
            >
              <div className="bg-gradient-to-br from-[#FF4C29] to-[#FFD369] p-3 rounded-2xl shadow-lg">
                <FiMail className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#F5F5F5] mb-1" style={{ fontFamily: "'Lato', sans-serif" }}>Email Address</h3>
                <p className="text-[#B3B3B3]" style={{ fontFamily: "'Lato', sans-serif" }}>triotrick30@gmail.com</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-[0_8px_32px_rgba(255,76,41,0.2)] transition-all duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }, index) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              >
                <label className="block mb-2 text-sm font-semibold text-[#F5F5F5]" style={{ fontFamily: "'Lato', sans-serif" }}>{label}</label>
                <div className="flex items-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 focus-within:border-[#FFD369]/50 transition-all duration-300">
                  <Icon className="text-[#FFD369] mr-3 text-lg" />
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    pattern={pattern}
                    required
                    className="w-full bg-transparent outline-none py-3 text-white placeholder-[#B3B3B3]"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <label className="block mb-2 text-sm font-semibold text-[#F5F5F5]" style={{ fontFamily: "'Lato', sans-serif" }}>Your Query</label>
              <div className="flex items-start backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 py-3 focus-within:border-[#FFD369]/50 transition-all duration-300">
                <FiMessageSquare className="text-[#FFD369] mt-1 mr-3 text-lg" />
                <textarea
                  rows="5"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  className="w-full bg-transparent outline-none text-white placeholder-[#B3B3B3] resize-none"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                ></textarea>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF4C29] to-[#FFD369] hover:from-[#FF6B35] hover:to-[#FFD369] text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-[0_8px_32px_rgba(255,76,41,0.4)] transition-all duration-300"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <span>Submit Query</span>
              <FiArrowRight className="text-xl" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
