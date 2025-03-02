import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, ArrowLeft, Calendar, Star, Sparkles, Coffee, Music, Book, Camera, Mountain as Mountains, Utensils } from 'lucide-react';
import ScrapbookElement from '../components/ScrapbookElement';
import { AuthContext } from '../auth/AuthProvider';

// Questions for the questionnaire
const questions = [
  {
    id: 'basics',
    title: "Let's Start With The Basics",
    question: "Tell us a bit about yourself",
    type: 'profile',
    fields: [
      { name: 'age', label: 'How old are you?', type: 'number', placeholder: 'Your age' },
      { name: 'gender', label: 'What\'s your gender?', type: 'select', 
        options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
      { name: 'major', label: 'What\'s your major?', type: 'text', placeholder: 'Your major at Pitt' },
      { name: 'year', label: 'What year are you?', type: 'select', 
        options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student'] }
    ]
  },
  {
    id: 'personality',
    title: "Your Personality",
    question: "Where do you fall on these scales?",
    type: 'sliders',
    fields: [
      { name: 'introvert_extrovert', label: 'Social Energy', leftLabel: 'Introvert', rightLabel: 'Extrovert', 
        description: 'Do you recharge alone or with others?' },
      { name: 'practical_creative', label: 'Thinking Style', leftLabel: 'Practical', rightLabel: 'Creative', 
        description: 'Are you more down-to-earth or imaginative?' },
      { name: 'logical_emotional', label: 'Decision Making', leftLabel: 'Logical', rightLabel: 'Emotional', 
        description: 'Do you follow your head or your heart?' },
      { name: 'spontaneous_planner', label: 'Planning Style', leftLabel: 'Spontaneous', rightLabel: 'Planner', 
        description: 'Do you go with the flow or make detailed plans?' }
    ]
  },
  {
    id: 'interests',
    title: "Your Interests",
    question: "What do you enjoy doing?",
    type: 'checkboxes',
    fields: [
      { name: 'outdoors', label: 'Outdoor Activities', icon: Mountains },
      { name: 'arts', label: 'Arts & Creativity', icon: Camera },
      { name: 'reading', label: 'Reading & Literature', icon: Book },
      { name: 'music', label: 'Music', icon: Music },
      { name: 'cooking', label: 'Cooking & Food', icon: Utensils },
      { name: 'coffee', label: 'Coffee & Cafes', icon: Coffee }
    ]
  },
  {
    id: 'dating',
    title: "Dating Preferences",
    question: "What matters most to you in a relationship?",
    type: 'ranking',
    fields: [
      { name: 'honesty', label: 'Honesty & Communication' },
      { name: 'humor', label: 'Sense of Humor' },
      { name: 'ambition', label: 'Ambition & Goals' },
      { name: 'kindness', label: 'Kindness & Compassion' },
      { name: 'adventure', label: 'Sense of Adventure' }
    ]
  },
  {
    id: 'specifics',
    title: "A Few More Details",
    question: "Help us get to know you better",
    type: 'text',
    fields: [
      { name: 'idealDate', label: 'What\'s your idea of a perfect date?', type: 'textarea' },
      { name: 'studyHabits', label: 'How would you describe your study habits?', type: 'select',
        options: ['Early bird - Morning studier', 'Night owl - Late night studier', 
                 'Consistent - A little every day', 'Crammer - Before deadlines', 
                 'Group studier - With friends'] },
      { name: 'weekendActivity', label: 'What\'s your typical weekend activity?', type: 'select',
        options: ['Going out with friends', 'Relaxing at home', 'Studying', 
                 'Outdoor activities', 'Exploring Pittsburgh'] }
    ]
  }
];

const QuestionnairePage: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth?.user) {
    return <Navigate to="/signup" />;
  }
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    age: '',
    gender: '',
    major: '',
    year: '',
    
    // Personality
    introvert_extrovert: 3,
    practical_creative: 3,
    logical_emotional: 3,
    spontaneous_planner: 3,
    
    // Interests
    outdoors: false,
    arts: false,
    reading: false,
    music: false,
    cooking: false,
    coffee: false,
    
    // Values
    honesty: 0,
    humor: 0,
    ambition: 0,
    kindness: 0,
    adventure: 0,
    
    // Specifics
    idealDate: '',
    studyHabits: '',
    weekendActivity: '',
  });
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRankingChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit the form
      console.log('Form submitted:', formData);
      navigate('/matches');
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Random rotation for decorative elements
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 20) - 10;
  };
  
  // Random position for decorative elements
  const getRandomPosition = (axis: 'x' | 'y') => {
    return axis === 'x' 
      ? `${Math.floor(Math.random() * 80) + 10}%` 
      : `${Math.floor(Math.random() * 70) + 15}%`;
  };
  
  // Render different question types
  const renderQuestionFields = () => {
    switch (currentQuestion.type) {
      case 'profile':
        return (
          <div className="space-y-6">
            {currentQuestion.fields.map((field, index) => (
              <div key={field.name} className="question-box">
                <label htmlFor={field.name} className="block text-lg font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map(option => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                    placeholder={field.placeholder}
                    min={field.type === 'number' ? 18 : undefined}
                  />
                )}
              </div>
            ))}
          </div>
        );
        
      case 'sliders':
        return (
          <div className="space-y-8">
            <p className="text-gray-600 mb-4 font-handwritten text-lg">
              Slide the hearts to show where you fall on each scale!
            </p>
            
            {currentQuestion.fields.map((field) => (
              <div key={field.name} className="question-box">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{field.leftLabel}</span>
                  <span className="font-medium">{field.rightLabel}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData[field.name as keyof typeof formData] as number}
                    onChange={(e) => handleSliderChange(field.name, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-xo-pink"
                  />
                  <div 
                    className="absolute top-0 transform -translate-y-1/2"
                    style={{ 
                      left: `calc(${(formData[field.name as keyof typeof formData] as number - 1) * 25}% - 10px)`,
                      transition: 'left 0.2s ease-out'
                    }}
                  >
                    <Heart className="text-xo-pink" size={20} fill="#FF80A0" />
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {field.description}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'checkboxes':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-4 font-handwritten text-lg">
              Check all the activities you enjoy!
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.fields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      checked={formData[field.name as keyof typeof formData] as boolean}
                      onChange={handleInputChange}
                      className="h-5 w-5 text-xo-pink focus:ring-xo-pink border-gray-300 rounded"
                    />
                    <label htmlFor={field.name} className="ml-2 flex items-center gap-2 text-lg text-gray-700">
                      {Icon && <Icon size={18} className="text-xo-pink" />}
                      {field.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'ranking':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-4 font-handwritten text-lg">
              Rate how important each of these values is to you!
            </p>
            
            {currentQuestion.fields.map((field) => (
              <div key={field.name} className="question-box">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRankingChange(field.name, value)}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        formData[field.name as keyof typeof formData] === value
                          ? 'bg-xo-pink text-white border-xo-pink'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {value === 1 && 'Not Important'}
                      {value === 2 && 'Somewhat Important'}
                      {value === 3 && 'Very Important'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'text':
        return (
          <div className="space-y-6">
            {currentQuestion.fields.map((field) => (
              <div key={field.name} className="question-box">
                <label htmlFor={field.name} className="block text-lg font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                    placeholder="Tell us more..."
                  />
                ) : (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-xo-pink focus:border-xo-pink"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map(option => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -100,
    },
  };
  
  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Decorative elements */}
      <div className="absolute" style={{ top: getRandomPosition('y'), left: getRandomPosition('x'), transform: `rotate(${getRandomRotation()}deg)`, zIndex: 1 }}>
        <Star className="text-xo-blue" size={24} fill="#A3E4FF" />
      </div>
      <div className="absolute" style={{ top: getRandomPosition('y'), right: getRandomPosition('x'), transform: `rotate(${getRandomRotation()}deg)`, zIndex: 1 }}>
        <Heart className="text-xo-pink" size={24} fill="#FF80A0" />
      </div>
      <div className="absolute" style={{ bottom: getRandomPosition('y'), left: getRandomPosition('x'), transform: `rotate(${getRandomRotation()}deg)`, zIndex: 1 }}>
        <Sparkles className="text-xo-pink" size={24} />
      </div>
      
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
        <h1 className="text-4xl font-handwritten text-xo-pink mb-2">Find Your Perfect Match</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Answer these fun questions to help us find your most compatible match at Pitt!
        </p>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="text-sm text-gray-500">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-xo-pink h-2 rounded-full" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute hidden md:block" style={{ top: '15%', right: '-60px', zIndex: 10 }}>
          <div className="washi-tape transform rotate-12"></div>
        </div>
        
        <div className="absolute hidden md:block" style={{ bottom: '25%', left: '-60px', zIndex: 10 }}>
          <div className="washi-tape-blue transform -rotate-12"></div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
          >
            <ScrapbookElement 
              color={currentQuestionIndex % 2 === 0 ? 'pink' : 'blue'} 
              className="p-8 relative"
              notebookStyle={true}
            >
              {/* Decorative tape */}
              <div className="absolute -top-3 -right-3 scrapbook-tape bg-xo-blue opacity-50 rotate-12"></div>
              <div className="absolute -bottom-3 -left-3 scrapbook-tape bg-xo-pink-light opacity-50 -rotate-12"></div>
              
              <div className="mb-6">
                <h2 className="font-handwritten text-3xl text-xo-pink mb-2">
                  {currentQuestion.title}
                </h2>
                <p className="text-xl text-gray-700 font-handwritten">
                  {currentQuestion.question}
                </p>
              </div>
              
              {renderQuestionFields()}
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 ${
                    currentQuestionIndex === 0 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-xo-blue text-gray-700 hover:bg-xo-blue-dark'
                  }`}
                >
                  <ArrowLeft size={18} />
                  Previous
                </button>
                
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-full font-medium bg-xo-pink text-white hover:bg-xo-pink-light flex items-center gap-2"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Find My Match' : 'Next'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </ScrapbookElement>
          </motion.div>
        </AnimatePresence>
        
        {/* Decorative envelope */}
        <div className="mt-8 text-center">
          <div className="inline-block transform rotate-3">
            <div className="bg-xo-pink-light p-2 rounded-lg shadow-md max-w-xs mx-auto">
              <p className="font-handwritten text-white text-lg">
                Your answers are sealed with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;