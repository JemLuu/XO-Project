import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, ArrowRight, Calendar } from 'lucide-react';
import ScrapbookElement from '../components/ScrapbookElement';
import { loginUser } from '../api/auth';
import { AuthContext } from '../auth/AuthProvider'; // ✅ Import AuthContext

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); // ✅ Get auth state
  if (!auth) {
    console.error("❌ AuthContext is undefined. Ensure AuthProvider wraps the app.");
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData.email, formData.password);
      console.log('✅ Login successful:', data);

      if (!data || !data.token) {
        alert('Login failed: No token received.');
        return;
      }

      // Store token and update auth state
      localStorage.setItem('token', data.token);

      if (auth?.setUser) {
        auth.setUser({ email: formData.email }); // ✅ Mark user as logged in
      } else {
        console.error("❌ setUser is undefined. Ensure AuthProvider is wrapping the app.");
      }

      navigate('/questionnaire'); // ✅ Redirect after login
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
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
          <h1 className="text-4xl font-handwritten text-xo-pink mb-2">Welcome Back</h1>
          <p className="text-gray-600">Log in to see your match</p>
        </motion.div>

        <ScrapbookElement color="white" hasTape={true} className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-xo-pink focus:ring-xo-pink border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm text-xo-pink hover:underline">
                Forgot password?
              </a>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Log In <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </ScrapbookElement>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have a profile yet?{' '}
            <Link to="/signup" className="text-xo-pink hover:underline">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;