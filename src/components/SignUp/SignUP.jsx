import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const url = 'http://localhost:4000';

// Toast Component
const AwesomeToast = ({ message, icon }) => (
  <div className="fixed bottom-6 right-6 flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg animate-slide-in">
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{message}</span>
  </div>
);

const SignUP = () => {
  const [showToast, setShowToast] = useState({ visible: false, message: '', icon: null });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  // For toast and redirect after success
  useEffect(() => {
    if (showToast.visible && showToast.message === 'Sign up successfully') {
      const timer = setTimeout(() => {
        setShowToast({ visible: false, message: '', icon: null });
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, navigate]);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('sign up fired', formData);
    try {
      const res = await axios.post(`${url}/api/user/register`, formData);
      console.log('Register Response', res.data);

      if (res.data.success && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        setShowToast({
          visible: true,
          message: 'Sign up successfully',
          icon: <FaCheckCircle />
        });
        return;
      }
      throw new Error(res.data.message || 'Registration failed');
    } catch (err) {
      console.error('registration error', err);
      const msg = err.response?.data?.message || err.message || 'Registration failed';
      setShowToast({
        visible: true,
        message: msg,
        icon: <FaCheckCircle />
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a120b] p-4">
      {showToast.visible && <AwesomeToast message={showToast.message} icon={showToast.icon} />}

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
            <FaArrowLeft />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
