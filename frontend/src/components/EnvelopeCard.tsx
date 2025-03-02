import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeCardProps {
  children: ReactNode;
  color?: 'pink' | 'blue';
  className?: string;
}

const EnvelopeCard: React.FC<EnvelopeCardProps> = ({
  children,
  color = 'pink',
  className = '',
}) => {
  const getColorClass = () => {
    return color === 'pink' ? 'bg-xo-pink-light' : 'bg-xo-blue';
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ENVELOPE FLAP */}
      <div className="envelope">
        <div className={`envelope-flap ${getColorClass()}`}></div>
        <br></br>
        <div className="p-3 pt-6">{children}</div>
      </div>
    </motion.div>
  );
};

export default EnvelopeCard;