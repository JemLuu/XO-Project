import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { AuthContext } from '../auth/AuthProvider';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useContext(AuthContext); // ✅ Get auth state

  const handleLogout = () => {
    auth?.logout(); // ✅ Logout user
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Heart className="text-xo-pink" size={28} fill="#FF80A0" />
          <span className="font-handwritten text-2xl font-bold text-xo-pink">XO Pitt</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-xo-pink transition-colors">Home</Link>

          {auth?.user ? (
            <>
              <span className="text-gray-700">{auth.user.email}</span>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 rounded-full bg-xo-pink text-white hover:bg-xo-pink-light transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/signup" 
              className="px-4 py-2 rounded-full bg-xo-pink text-white hover:bg-xo-pink-light transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4">
          <Link to="/" className="text-gray-700 hover:text-xo-pink transition-colors">Home</Link>

          {auth?.user ? (
            <>
              <span className="text-gray-700">Welcome, {auth.user.email}</span>
              <button 
                onClick={() => { 
                  handleLogout(); 
                  setIsMenuOpen(false); 
                }} 
                className="px-4 py-2 rounded-full bg-xo-pink text-white hover:bg-xo-pink-light transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/signup" 
              className="px-4 py-2 rounded-full bg-xo-pink text-white hover:bg-xo-pink-light transition-colors text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;