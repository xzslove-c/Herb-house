import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MedicineDetails } from '../types';
import { X, BookOpen, MapPin, Activity, Loader2 } from 'lucide-react';

interface MedicineModalProps {
  isOpen: boolean;
  isLoading: boolean;
  data: MedicineDetails | null;
  onClose: () => void;
  medicineName: string;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ isOpen, isLoading, data, onClose, medicineName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content - Rice Paper Style */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="
            relative 
            w-full max-w-lg 
            bg-[#fdfbf7] 
            rounded-lg 
            shadow-2xl 
            overflow-hidden
            border-2 border-[#d4c5a3]
          "
          style={{
            backgroundImage: `radial-gradient(#e6ded1 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        >
            {/* Header / Top Border */}
            <div className="h-4 bg-[#8b5a2b] w-full"></div>
            
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
                <X size={24} />
            </button>

            <div className="p-8 flex flex-col items-center">
                <h2 className="text-4xl font-calligraphy mb-6 text-[#5c3a21] border-b-2 border-[#8b5a2b] pb-2 px-8">
                    {medicineName}
                </h2>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-48 space-y-4 text-[#8b5a2b]">
                        <Loader2 className="animate-spin" size={48} />
                        <p className="font-serif">研磨中 (Consulting Ancient Texts)...</p>
                    </div>
                ) : data ? (
                    <div className="w-full space-y-6 text-stone-800">
                        
                        {/* Efficacy */}
                        <div className="bg-[#f5f0e6] p-4 rounded-md border border-[#e6ded1]">
                            <div className="flex items-center gap-2 mb-2 text-[#8b5a2b]">
                                <Activity size={20} />
                                <h3 className="text-lg font-bold">功效 (Efficacy)</h3>
                            </div>
                            <p className="leading-relaxed text-justify">{data.efficacy}</p>
                        </div>

                        {/* Region */}
                        <div className="bg-[#f5f0e6] p-4 rounded-md border border-[#e6ded1]">
                            <div className="flex items-center gap-2 mb-2 text-[#8b5a2b]">
                                <MapPin size={20} />
                                <h3 className="text-lg font-bold">地域 (Region)</h3>
                            </div>
                            <p className="leading-relaxed">{data.region}</p>
                        </div>

                        {/* Books */}
                        <div className="bg-[#f5f0e6] p-4 rounded-md border border-[#e6ded1]">
                            <div className="flex items-center gap-2 mb-2 text-[#8b5a2b]">
                                <BookOpen size={20} />
                                <h3 className="text-lg font-bold">古籍 (Classics)</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.books.map((book, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-[#8b5a2b] text-[#fdfbf7] rounded-full text-sm shadow-sm">
                                        {book}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center text-red-500">
                        <p>无法获取信息，请稍后再试。</p>
                        <p className="text-sm mt-2">Could not retrieve data.</p>
                    </div>
                )}
            </div>

             {/* Footer / Bottom Border */}
             <div className="h-4 bg-[#8b5a2b] w-full mt-6"></div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MedicineModal;