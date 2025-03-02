import React from 'react';
import { motion } from 'framer-motion';

interface PolaroidImageProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  className?: string;
}

const PolaroidImage: React.FC<PolaroidImageProps> = ({
  src,
  alt,
  caption,
  rotate = 0,
  className = '',
}) => {
  return (
    <motion.div
      className={`polaroid inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, rotate: rotate + 2, transition: { duration: 0.3 } }}
    >
      <div className="polaroid-img overflow-hidden">
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      {caption && <p className="polaroid-caption">{caption}</p>}
    </motion.div>
  );
};

export default PolaroidImage;