import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, ArrowRight, Calendar } from 'lucide-react';
import ScrapbookElement from '../components/ScrapbookElement';
import { signupUser } from '../api/auth';
import { AuthContext } from '../auth/AuthProvider';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); // ✅ Get setUser function from AuthContext
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signupUser(formData);
      console.log('Signup successful:', data);

      if (!data || !data.token) {
        alert('Signup failed: No token received.');
        return;
      }

      // Store token and update auth state
      localStorage.setItem('token', data.token);
      if (auth?.setUser) {
        auth.setUser({ email: formData.email });
      }
      navigate('/questionnaire'); // ✅ Redirect after login
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Signup failed. Please try again.');
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="text-xo-pink" size={40} fill="#FF80A0" />
            <Calendar className="text-xo-blue" size={30} />
          </div>
          <h1 className="text-4xl font-handwritten text-xo-pink mb-2">New Here?</h1>
          <p className="text-gray-600">Sign up now to take our questionnaire!</p>
        </motion.div>
        
        <ScrapbookElement color="white" hasTape={true} className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                    placeholder="Your first name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                    placeholder="Your last name"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  placeholder="your.email@pitt.edu"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">We'll use this to contact you when you have a match</p>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  placeholder="Create a password"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Create My Profile <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </ScrapbookElement>
        
        <div className="text-center">
          <p className="text-gray-600">
            Already have a profile?{' '}
            <Link to="/login" className="text-xo-pink hover:underline">
              Log in here
            </Link>
          </p>
          
          <p className="mt-4 text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-xo-pink hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-xo-pink hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;