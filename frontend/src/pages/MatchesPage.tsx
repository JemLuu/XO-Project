import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Calendar, Mail } from 'lucide-react';
import ScrapbookElement from '../components/ScrapbookElement';
import { AuthContext } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

// Mock match data - just one match per the Marriage Pact approach
const mockMatch = {
  name: 'Alex Johnson',
  major: 'Computer Science',
  year: 'Class of 2025',
  compatibility: 94,
  topTraits: [
    'You both love outdoor activities',
    'You share similar study habits',
    'You both enjoy trying new restaurants',
    'You have complementary communication styles'
  ],
  contactInfo: 'alex.johnson@alumni.pitt.edu'
};

const MatchesPage: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth?.user) {
    return <Navigate to="/login" />;
  }
  const [match] = useState(mockMatch);
  const [showContact, setShowContact] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <Heart className="inline-block text-xo-pink mb-4" size={40} fill="#FF80A0" />
        <h1 className="text-4xl font-handwritten text-xo-pink mb-2">Your Match</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This is a preview of who you've been matched with based on your compatibility!
        </p>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        <ScrapbookElement color="white" className="p-8 relative">
          <div className="heart-sticker absolute -top-4 -right-4 transform scale-150"></div>
          <div className="star-sticker absolute -bottom-4 -left-4 transform scale-150"></div>
          
          <div className="match-result-box">
            <div className="text-center mb-8">
              <div className="inline-block bg-xo-pink text-white px-4 py-2 rounded-full text-xl font-medium mb-2">
                {match.compatibility}% Compatible
              </div>
              <h2 className="text-3xl font-handwritten text-xo-pink">
                Your match: {match.name}
              </h2>
              <p className="text-gray-600 mt-2">
                {match.major} • {match.year}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="font-handwritten text-2xl text-xo-pink mb-4 text-center">Why You Match</h3>
              <div className="space-y-4">
                {match.topTraits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Heart className="text-xo-pink mt-1 flex-shrink-0" size={20} fill="#FF80A0" />
                    <p className="text-gray-700">{trait}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              {showContact ? (
                <div className="bg-xo-blue bg-opacity-20 p-4 rounded-lg">
                  <h3 className="font-handwritten text-xl mb-2">Contact Information</h3>
                  <div className="flex items-center justify-center gap-2">
                    <Mail size={18} className="text-gray-700" />
                    <p className="text-gray-700">{match.contactInfo}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    This is just a preview! You'll get the real contact info when you both confirm.
                  </p>
                </div>
              ) : (
                <button 
                  onClick={() => setShowContact(true)}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <MessageCircle size={18} />
                  Preview Contact Info
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-xo-pink bg-opacity-10 rounded-lg">
            <h3 className="font-handwritten text-2xl text-xo-pink mb-4 text-center">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="text-xo-pink mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">
                  <span className="font-medium">Take the questionnaire:</span> We'll analyze your personality and preferences.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="text-xo-pink mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">
                  <span className="font-medium">Get matched:</span> We'll connect you with your most compatible match.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="text-xo-pink mt-1 flex-shrink-0" size={20} fill="#FF80A0" />
                <p className="text-gray-700">
                  <span className="font-medium">No pressure:</span> This is just a fun way to meet someone compatible!
                </p>
              </div>
            </div>
          </div>
        </ScrapbookElement>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Remember, this is just a preview based on your current answers. Your actual match may be different!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;