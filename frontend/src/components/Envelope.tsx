import React, { useState } from "react";
import { motion } from "framer-motion";


interface EnvelopeProps {
  message: string;
  frontText?: string;
  color?: "pink" | "blue"; // New prop for color selection
}

const Envelope: React.FC<EnvelopeProps> = ({ message, frontText, color = "pink" }) => {
  const envelopeColor = color === "pink" ? "bg-xo-pink-light" : "bg-xo-blue";
  const flapColor = color === "pink" ? "bg-xo-pink" : "bg-xo-blue-dark"
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative w-[200px] h-[140px] flex justify-center items-center cursor-pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Envelope Back (Changes Color Based on Prop) */}
      <div className={`w-full h-full ${envelopeColor} rounded-lg shadow-md relative`}></div>

      {/* Letter (Starts Hidden Inside, Slides Out on Hover) */}
      <motion.div
        className="absolute w-[180px] h-[100px] bg-xo-cream rounded-md flex justify-center items-center text-center p-2 shadow-md"
        initial={{ y: 20 }}
        animate={{ y: isOpen ? -90 : 20 }} // Moves up from inside the envelope
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <p className="text-[10px] text-gray-700">{message}</p>
      </motion.div>

      {/* Envelope Flap (Lifts Up and Fades Out on Hover, Matches Color) */}
      <motion.div
        className={`absolute top-0 left-0 w-full h-full ${flapColor} rounded-t-lg clip-triangle origin-top z-10`}
        initial={{ rotateX: 0, opacity: 1 }}
        animate={{ rotateX: isOpen ? 120 : 0, opacity: isOpen ? 0 : 1 }} // Fade out when opened
        transition={{ duration: 0.5, ease: "easeInOut" }}
      ></motion.div>

      {/* Envelope Front (Covers Bottom of Letter & Holds Text, Matches Color) */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[73%] ${envelopeColor} rounded-b-lg shadow-md z-20 flex justify-center items-center text-center`}
      >
        {frontText && (
          <p className="text-lg md:text-xl font-handwritten text-gray-700">
            {frontText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Envelope;