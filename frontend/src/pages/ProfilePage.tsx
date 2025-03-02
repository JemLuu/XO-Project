import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit, Save, X, Calendar } from 'lucide-react';
import ScrapbookElement from '../components/ScrapbookElement';
import PolaroidImage from '../components/PolaroidImage';

// Mock profile data
const mockProfile = {
  id: 1,
  name: 'Alex Johnson',
  age: 20,
  major: 'Computer Science',
  year: 'Class of 2025',
  bio: 'Coffee enthusiast, coding wizard, and amateur photographer. Looking for someone to explore Pittsburgh with!',
  interests: ['coding', 'photography', 'hiking', 'coffee'],
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(mockProfile);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interestsArray = e.target.value.split(',').map(item => item.trim().toLowerCase());
    setEditedProfile(prev => ({ ...prev, interests: interestsArray }));
  };
  
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
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
        <h1 className="text-4xl font-handwritten text-xo-pink mb-2">Your Profile</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This is how you'll appear to your match
        </p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="w-full md:w-1/3">
          <ScrapbookElement color="white" hasTape={true} tapePosition="top-right" className="p-6">
            <div className="text-center">
              <PolaroidImage
                src={profile.image}
                alt={profile.name}
                caption={profile.name}
                rotate={2}
                className="w-full mb-4"
              />
              
              <button className="btn-secondary mt-4">
                Change Photo
              </button>
            </div>
          </ScrapbookElement>
        </div>
        
        {/* Profile Info */}
        <div className="w-full md:w-2/3">
          <ScrapbookElement color="white" hasTape={true} className="p-6 relative">
            <div className="absolute top-4 right-4">
              {isEditing ? (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave}
                    className="p-2 bg-xo-pink text-white rounded-full"
                  >
                    <Save size={20} />
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="p-2 bg-gray-200 text-gray-700 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-xo-blue text-gray-700 rounded-full"
                >
                  <Edit size={20} />
                </button>
              )}
            </div>
            
            <h2 className="font-handwritten text-2xl text-xo-pink mb-6">About You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  />
                ) : (
                  <p className="text-lg">{profile.name}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Age</h3>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editedProfile.age}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  />
                ) : (
                  <p className="text-lg">{profile.age}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Major</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="major"
                    value={editedProfile.major}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  />
                ) : (
                  <p className="text-lg">{profile.major}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Graduation</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="year"
                    value={editedProfile.year}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  />
                ) : (
                  <p className="text-lg">{profile.year}</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                />
              ) : (
                <p className="text-lg">{profile.bio}</p>
              )}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Interests</h3>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="interests"
                    value={editedProfile.interests.join(', ')}
                    onChange={handleInterestsChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                    placeholder="e.g. hiking, music, reading, travel"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map(interest => (
                    <span 
                      key={interest} 
                      className="bg-xo-blue bg-opacity-30 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrapbookElement>
          
          {/* Questionnaire Results */}
          <ScrapbookElement color="pink" className="p-6 mt-8">
            <h2 className="font-handwritten text-2xl text-gray-800 mb-4">Your Match Preferences</h2>
            <p className="text-white mb-4">
              Based on your answers, you'll be matched with someone who:
            </p>
            
            <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
              <ul className="list-disc list-inside text-white space-y-2">
                <li>Shares your love for outdoor activities and adventure</li>
                <li>Is creative and appreciates art and photography</li>
                <li>Has similar study and work habits</li>
                <li>Enjoys exploring new places and trying new things</li>
              </ul>
            </div>
            
            <p className="text-white">
              Want to update your preferences? <a href="/questionnaire" className="underline font-medium">Retake the questionnaire</a>
            </p>
          </ScrapbookElement>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;