import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface QuestionnaireStepProps {
  children: ReactNode;
  title: string;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  children,
  title,
  stepNumber,
  totalSteps,
  onNext,
  onPrev,
  isFirstStep = false,
  isLastStep = false,
}) => {
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

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="scrapbook-paper p-8 mb-8">
        <div className="absolute -top-3 -right-3 scrapbook-tape bg-xo-blue opacity-50 rotate-12"></div>
        <div className="absolute -bottom-3 -left-3 scrapbook-tape bg-xo-pink-light opacity-50 -rotate-12"></div>
        
        <h2 className="font-handwritten text-3xl text-xo-pink mb-2">{title}</h2>
        
        <div className="flex items-center mb-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                index < stepNumber ? 'bg-xo-pink text-white' : 
                index === stepNumber ? 'bg-xo-pink-light text-white' : 
                'bg-xo-gray text-gray-500'
              }`}
            >
              {index + 1}
            </div>
          ))}
          <div className="ml-2 text-sm text-gray-500">
            Step {stepNumber + 1} of {totalSteps}
          </div>
        </div>
        
        <div className="mb-8">
          {children}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={onPrev}
            disabled={isFirstStep}
            className={`px-6 py-2 rounded-full font-medium ${
              isFirstStep 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-xo-blue text-gray-700 hover:bg-xo-blue-dark'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={onNext}
            className={`px-6 py-2 rounded-full font-medium ${
              isLastStep 
                ? 'bg-xo-pink text-white hover:bg-xo-pink-light' 
                : 'bg-xo-pink text-white hover:bg-xo-pink-light'
            }`}
          >
            {isLastStep ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionnaireStep;