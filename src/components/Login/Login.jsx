import React, { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaUserPlus
} from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:4000';

const Login = ({ onLoginSuccess, onClose }) => {
  const [showToast, setShowToast] = useState({ visible: false, message: '', isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',        // ✅ fixed: should be email instead of username
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, {
        email: formData.email,
        password: formData.password
      });
      console.log('axios res:', res);

      if (res.status === 200 && res.data.success && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        
        // Store user information properly
        const userInfo = {
          email: formData.email,
          token: res.data.token
        };
        localStorage.setItem('user', JSON.stringify(userInfo));

        // remember me
        formData.rememberMe
          ? localStorage.setItem('loginData', JSON.stringify(formData))
          : localStorage.removeItem('loginData');

        setShowToast({ visible: true, message: 'login successfully', isError: false });
        setTimeout(() => {
          setShowToast({ visible: false, message: '', isError: false });
          onLoginSuccess(res.data.token);
        }, 1500);
      } else {
        console.warn('unexpected error:', res.data);
        throw new Error(res.data.message || 'login Failed');
      }
    } catch (err) {
      console.error('Axios error:', err);
      if (err.response) {
        // ✅ fixed typo: was 'respose' and string concat wrong
        console.error('Server res:', err.response.status, err.response.data);
      }
      const msg = err.response?.data?.message || err.message || 'Login failed';
      setShowToast({ visible: true, message: msg, isError: true });
    }
  };

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <div className='space-y-6 relative'>
      {/* Toast Message */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
          showToast.visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        {/* ✅ removed empty toast div content */}
        <div
          className={`px-4 py-3 rounded-md shadow-lg flex items-center gap-3 text-sm ${
            showToast.isError ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
          }`}
        >
          <FaCheckCircle className='flex-shrink-0' />
          <span>{showToast.message}</span>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Email Field */}
        <div className='relative'>
          <FaUser className={iconClass} />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />
        </div>

        {/* Password Field */}
        <div className='relative'>
          <FaLock className={iconClass} />
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-10 py-3`}
          />
          <button
            type='button'
            onClick={toggleShowPassword}
            className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember Me */}
        <div className='flex items-center'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              name='rememberMe'
              checked={formData.rememberMe}
              onChange={handleChange}
              className='form-checkbox h-5 w-5 text-amber-600 bg-[#2D1B0E] border-amber-400 rounded focus:ring-amber-600'
            />
            <span className='ml-2'>Remember me</span>
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type='submit'
          className='w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition'
        >
          Sign In <FaArrowRight />
        </button>
      </form>

      {/* Signup Link */}
      <div className='text-center'>
        <Link
          to='/signup'
          onClick={onClose}
          className='text-blue-600 hover:underline flex items-center justify-center gap-2'
        >
          <FaUserPlus /> Create new Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
