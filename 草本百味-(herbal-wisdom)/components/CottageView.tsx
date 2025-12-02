import React from 'react';
import { motion } from 'framer-motion';

interface CottageViewProps {
  onEnter: () => void;
}

const CottageView: React.FC<CottageViewProps> = ({ onEnter }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#fdfbf7]">
      {/* Background Ink Painting Style */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `url('https://picsum.photos/1920/1080?grayscale&blur=2')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'sepia(0.3) contrast(1.2) brightness(0.9)'
        }}
      />
      
      {/* Overlay Gradient for calmness */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/30 via-transparent to-black/40 pointer-events-none" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center p-8"
      >
        <div className="
            bg-white/80 
            backdrop-blur-md 
            p-12 
            rounded-full 
            shadow-[0_0_60px_rgba(0,0,0,0.2)]
            border border-stone-300
            flex flex-col items-center
        ">
            <h1 className="text-6xl md:text-8xl font-calligraphy text-stone-800 mb-6 drop-shadow-sm">
                草堂
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 font-serif mb-10 tracking-widest">
                寻医问药 · 探秘古方
            </p>

            <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#8b5a2b", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnter}
                className="
                    px-10 py-3 
                    border-2 border-[#8b5a2b] 
                    text-[#8b5a2b] 
                    font-bold 
                    text-lg 
                    tracking-[0.3em] 
                    rounded 
                    transition-colors 
                    duration-300
                    shadow-md
                "
            >
                入堂
            </motion.button>
        </div>
      </motion.div>

      {/* Decorative poetic text vertical */}
      <div className="absolute top-20 right-10 md:right-20 z-0 select-none hidden md:block">
        <h2 className="text-4xl text-stone-800/60 font-calligraphy writing-vertical-rl tracking-widest">
            采菊东篱下
        </h2>
      </div>
      <div className="absolute top-32 right-24 md:right-36 z-0 select-none hidden md:block">
        <h2 className="text-4xl text-stone-800/60 font-calligraphy writing-vertical-rl tracking-widest">
            悠然见南山
        </h2>
      </div>
    </div>
  );
};

export default CottageView;