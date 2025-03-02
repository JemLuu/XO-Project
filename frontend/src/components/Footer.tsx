import React from 'react';
import { Heart, Calendar } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 px-6 shadow-inner">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Heart className="text-xo-pink" size={20} fill="#FF80A0" />
              <span className="font-handwritten text-xl font-bold text-xo-pink">XO Pitt</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Find your perfect match at Pitt</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="#" className="text-gray-600 hover:text-xo-pink transition-colors text-sm">About Us</a>
            <a href="#" className="text-gray-600 hover:text-xo-pink transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-xo-pink transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-xo-pink transition-colors text-sm">Contact</a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} XO Pitt. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-1 font-handwritten">Made with 💖 for Pitt students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;