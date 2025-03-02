import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Calendar, MessageSquare, Sparkles, PenSquare } from 'lucide-react';
import ScrapbookElement from '../components/ScrapbookElement';
import Envelope from '../components/Envelope';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-xo-blue rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-xo-pink rounded-full opacity-20"></div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-handwritten text-xo-pink mb-4">
              Find Your Perfect Match
            </h1>
            <p className="text-lg mb-6">
              XO Pitt is a fun matchmaking system for Pitt students. Take our playful questionnaire now, 
              and we'll find your most compatible match among fellow Panthers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/questionnaire" className="btn-primary flex items-center gap-2">
                Questionnaire <PenSquare size={18} />
              </Link>
              <Link to="/signup" className="btn-secondary">
                Login
              </Link>
            </div>
          </motion.div>
          
          <div className="relative">
            <ScrapbookElement 
              color="white" 
              notebookStyle={true} 
              className="p-8 z-10 min-h-[300px] flex flex-col justify-center items-center text-center"
            >
              {/* Text Content */}
              <h2 className="font-handwritten text-3xl text-xo-pink mb-4">
                Turn a New Page with XO Pitt
              </h2>

              {/* Sticker Images */}
              <div className="relative w-full h-full">
                <img
                  src="/stickers/letters.png"
                  alt="Letters Sticker"
                  className="absolute top-[-170px] left-[-150px] w-[130px] sticker-shadow rotate-[-7deg] scale-[1.1]"
                />

                <img
                  src="/stickers/couple.png"
                  alt="Couple Sticker"
                  className="absolute bottom-[-210px] left-[-90px] w-[220px] sticker-shadow rotate-[10deg] scale-[1.1]"
                />

                <img
                  src="/stickers/heart.png"
                  alt="Heart Sticker"
                  className="absolute bottom-[-75px] right-[-100px] w-[90px] sticker-shadow rotate-[4deg] scale-[1.1]"
                />
                <img
                  src="/stickers/couple2.png"
                  alt="Couple Sticker"
                  className="absolute top-[-280px] right-[-110px] w-[220px] sticker-shadow rotate-[-10deg] scale-[1.1]"
                />
              </div>
            </ScrapbookElement>

            {/* Floating Heart Icon */}
            <div className="absolute -bottom-10 -right-10 transform rotate-12 z-0">
              <Heart className="text-xo-pink" size={60} fill="#FF80A0" />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="text-center mb-40">
          <h2 className="text-3xl md:text-4xl font-handwritten text-xo-pink mb-2">How It Works</h2>
          <p className="text-lg max-w-2xl mx-auto">
            XO Pitt uses linear algebra and a Nobel Prize winning algorithm to find your perfect match.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex justify-center items-center scale-[1.5]">
            <Envelope 
            message="Our fun questionnaire will ask you about your values, personality, and what makes you unique!" 
            frontText="1. Take the Questionnaire"
            color="pink"/>
          </div>
          
          <div className="flex justify-center items-center scale-[1.5]">
            <Envelope 
            message="Our algorithm finds your most compatible match among fellow Pitt students." 
            frontText="2. We find your match"
            color="blue"/>
          </div>
          
          <div className="flex justify-center items-center scale-[1.5]">
            <Envelope 
            message="Once matches are released, you can send an XO Letter: A singular message that goes to your match, so make it count! 💌" 
            frontText="3. Love letter!?"
            color="pink"/>
          </div>
        </div>
      </section>
      
      {/* Questionnaire Preview Section */}
      <section className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <ScrapbookElement color="blue" notebookStyle={true} className="relative">
              <div className="p-4">
                <h3 className="font-handwritten text-2xl text-center mb-4">Sample Questions</h3>
                <div className="space-y-4">
                  <div className="question-box">
                    <p className="font-handwritten text-lg">How would you describe your personality?</p>
                    <div className="mt-2">
                      <div className="flex justify-between mb-2">
                        <span>Introvert</span>
                        <span>Extrovert</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-xo-pink h-2 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="question-box">
                    <p className="font-handwritten text-lg">What's your ideal weekend activity?</p>
                    <div className="mt-2 space-y-2">
                      <div className="p-2 bg-xo-cream rounded">Exploring Pittsburgh</div>
                      <div className="p-2 bg-xo-pink bg-opacity-20 rounded">Movie marathon</div>
                      <div className="p-2 bg-xo-cream rounded">Hanging with friends</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrapbookElement>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-handwritten text-xo-pink mb-4">Find Your Perfect Match</h2>
            <p className="text-lg mb-6">
              XO Pitt uses a sophisticated algorithm to match you with your most compatible fellow Pitt student.
            </p>
            <p className="mb-6">
              Our questionnaire captures who you are today, and our algorithm will find your most compatible match among fellow Pitt students.
            </p>
            <Link to="/questionnaire" className="btn-primary inline-flex items-center gap-2">
              Take the Questionnaire <PenSquare size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials/CTA Section */}
      <section className="py-16">
        <ScrapbookElement color="pink" notebookStyle={true} className="text-center p-12">
          <h2 className="text-3xl md:text-4xl font-handwritten text-xo-pink mb-6">
            Ready to Find Your Match?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            It's fun, it's free, and there's absolutely no pressure. Fill out the questionnaire now and discover your most compatible match!
          </p>
          <Link to="/questionnaire" className="bg-xo-pink text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-xo-pink-light transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
            Take the Questionnaire   <PenSquare size={18} />
          </Link>
        </ScrapbookElement>
      </section>
    </div>
  );
};

export default HomePage;