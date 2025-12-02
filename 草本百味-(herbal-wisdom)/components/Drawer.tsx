import React from 'react';
import { motion } from 'framer-motion';

interface DrawerProps {
  name: string;
  onClick: (name: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ name, onClick }) => {
  return (
    <div className="relative p-1">
      <motion.div
        whileHover={{ 
          scale: 1.05,
          y: 5,
          rotateX: -10,
          boxShadow: "0px 15px 15px rgba(0,0,0,0.4)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => onClick(name)}
        className="
          relative 
          w-full 
          aspect-[3/2] 
          bg-[#5c3a21] 
          border-t-[3px] border-l-[3px] border-r-[3px] border-b-[5px]
          border-t-[#754a2a] border-l-[#654024] border-r-[#4a2e1a] border-b-[#2e1d11]
          rounded-sm
          shadow-lg
          cursor-pointer
          flex flex-col items-center justify-center
          group
          overflow-hidden
        "
      >
        {/* Wood Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
               mixBlendMode: 'overlay'
             }} 
        />
        
        {/* Brass Handle */}
        <div className="
          w-8 h-8 
          rounded-full 
          bg-gradient-to-br from-yellow-300 via-yellow-600 to-yellow-800 
          shadow-md 
          border border-yellow-900
          mb-2
          flex items-center justify-center
        ">
          <div className="w-4 h-4 rounded-full border border-yellow-900 bg-yellow-700 opacity-50"></div>
          {/* Ring */}
          <div className="absolute w-10 h-8 border-2 border-yellow-600 rounded-b-full mt-2 opacity-80 group-hover:rotate-6 transition-transform origin-top"></div>
        </div>

        {/* Paper Label */}
        <div className="
          bg-[#f0e6d2] 
          px-2 py-3 
          shadow-sm 
          border border-[#d4c5a3]
          absolute bottom-4
        ">
          <span className="font-calligraphy text-xl text-black writing-vertical-rl tracking-widest leading-none">
            {name}
          </span>
        </div>
        
        {/* Depth shadow inside drawer when pulled */}
        <div className="absolute top-0 left-0 w-full h-2 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

      </motion.div>
    </div>
  );
};

export default Drawer;