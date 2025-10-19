import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FiArrowRight, FiGlobe, FiMail, FiMapPin, FiMessageSquare, FiPhone } from 'react-icons/fi';
import { contactFormFields } from '../../assets/dummydata';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', dish: '', query: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    toast.success('Your query has been submitted successfully ', {
      style: { background: '#fff', color: '#000' },
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
    <div className="min-h-screen bg-[rgb(31,18,10)] text-white flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* Info Section */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-amber-400">Connect With Us</h1>
          <p className="text-gray-300">We’d love to hear from you! Reach out via phone, email, or just drop us a query.</p>

          <div className="space-y-6">
            {/* Headquarters */}
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="bg-amber-400 p-3 rounded-xl">
                <FiMapPin className="text-[rgb(31,18,10)] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Our Headquarter</h3>
                <p className="text-gray-300">Kathmandu, Nepal</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="bg-amber-400 p-3 rounded-xl">
                <FiPhone className="text-[rgb(31,18,10)] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Contact Number</h3>
                <p className="text-gray-300 flex items-center gap-2">
                  <FiGlobe /> +977 9862626262
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="bg-amber-400 p-3 rounded-xl">
                <FiMail className="text-[rgb(31,18,10)] text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email Address</h3>
                <p className="text-gray-300">triotrick30@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg transition duration-300 hover:shadow-amber-500/20">
          <form onSubmit={handleSubmit} className="space-y-5">
            {contactFormFields.map(({ label, name, type, placeholder, pattern, Icon }) => (
              <div key={name}>
                <label className="block mb-1 text-sm font-medium">{label}</label>
                <div className="flex items-center bg-white/20 rounded-lg px-3">
                  <Icon className="text-amber-400 mr-2" />
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    pattern={pattern}
                    required
                    className="w-full bg-transparent outline-none py-2 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block mb-1 text-sm font-medium">Your Query</label>
              <div className="flex items-start bg-white/20 rounded-lg px-3">
                <FiMessageSquare className="text-amber-400 mt-3 mr-2" />
                <textarea
                  rows="4"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                  className="w-full bg-transparent outline-none py-2 text-white placeholder-gray-400"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-amber-400 text-[rgb(31,18,10)] font-semibold py-3 rounded-lg hover:bg-amber-300 transition-transform duration-300 hover:scale-105"
            >
              <span>Submit Query</span>
              <FiArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
