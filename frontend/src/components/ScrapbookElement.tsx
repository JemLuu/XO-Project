import React, { ReactNode} from 'react';
import { motion } from 'framer-motion';

interface ScrapbookElementProps {
  children: ReactNode;
  color?: 'pink' | 'blue' | 'white';
  className?: string;
  rotate?: number;
  hasTape?: boolean;
  tapePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  notebookStyle?: boolean;
}

const ScrapbookElement: React.FC<ScrapbookElementProps> = ({
  children,
  color = 'white',
  className = '',
  rotate = 0,
  hasTape = false,
  tapePosition = 'top-left',
  notebookStyle = true,
}) => {
  const getColorClass = () => {
    if (!notebookStyle) {
      switch (color) {
        case 'pink':
          return 'bg-xo-pink-light';
        case 'blue':
          return 'bg-xo-blue';
        default:
          return 'bg-white';
      }
    }
    return 'notebook-page';
  };

  const getBindingClass = () => {
    return color === 'pink' ? 'notebook-binding' : 'notebook-binding notebook-binding-blue';
  };

  const getTapePosition = () => {
    switch (tapePosition) {
      case 'top-left':
        return '-top-3 -left-3 -rotate-12';
      case 'top-right':
        return '-top-3 -right-3 rotate-12';
      case 'bottom-left':
        return '-bottom-3 -left-3 rotate-12';
      case 'bottom-right':
        return '-bottom-3 -right-3 -rotate-12';
      default:
        return '-top-3 -left-3 -rotate-12';
    }
  };

  const getTapeColor = () => {
    return color === 'pink' ? 'bg-xo-blue opacity-50' : 'bg-xo-pink-light opacity-50';
  };

  return (
    <motion.div
      className={`relative p-6 rounded-lg shadow-md ${getColorClass()} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {notebookStyle && <div className={getBindingClass()}></div>}
      
      {hasTape && !notebookStyle && (
        <div className={`absolute w-24 h-6 ${getTapeColor()} ${getTapePosition()}`}></div>
      )}
      
      {/* Random stickers */}
      {Math.random() > 0.5 && (
        <div 
          className="heart-sticker" 
          style={{ 
            top: `${Math.random() * 80}%`, 
            right: `${Math.random() * 20}%`,
            transform: `rotate(${Math.random() * 40 - 20}deg) scale(${0.7 + Math.random() * 0.6})`,
            opacity: 0.8
          }}
        ></div>
      )}
      
      {Math.random() > 0.7 && (
        <div 
          className="star-sticker" 
          style={{ 
            bottom: `${Math.random() * 80}%`, 
            right: `${Math.random() * 30}%`,
            transform: `rotate(${Math.random() * 40 - 20}deg) scale(${0.7 + Math.random() * 0.6})`,
            opacity: 0.8
          }}
        ></div>
      )}
      
      <div className="pl-8">
        {children}
      </div>
    </motion.div>
  );
};

export default ScrapbookElement;