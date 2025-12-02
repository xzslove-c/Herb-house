import React, { useState, useEffect } from 'react';
import { MEDICINE_LIST } from '../constants';
import Drawer from './Drawer';
import MedicineModal from './MedicineModal';
import { fetchMedicineDetails } from '../services/geminiService';
import { MedicineDetails } from '../types';
import { motion } from 'framer-motion';

const CabinetView: React.FC = () => {
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const [details, setDetails] = useState<MedicineDetails | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Simple in-memory cache to avoid re-fetching same herb
  const [cache, setCache] = useState<Map<string, MedicineDetails>>(new Map());

  const handleDrawerClick = async (name: string) => {
    setSelectedMedicine(name);
    setLoading(true);
    setDetails(null);

    if (cache.has(name)) {
      setDetails(cache.get(name)!);
      setLoading(false);
      return;
    }

    const data = await fetchMedicineDetails(name);
    if (data) {
      setDetails(data);
      setCache(prev => new Map(prev).set(name, data));
    }
    setLoading(false);
  };

  const closeModal = () => {
    setSelectedMedicine(null);
    setDetails(null);
  };

  return (
    <div className="min-h-screen bg-[#2c1810] relative flex flex-col items-center py-8 px-4">
      {/* Header Plaque */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 bg-[#1a0f0a] border-2 border-[#8b5a2b] px-8 py-3 rounded shadow-lg z-10"
      >
        <h1 className="text-4xl font-calligraphy text-[#d4c5a3] tracking-[0.5em]">百草药柜</h1>
      </motion.div>

      {/* The Cabinet Grid */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="
          w-full max-w-7xl 
          bg-[#3e2316] 
          p-4 
          rounded-md 
          shadow-[0_0_50px_rgba(0,0,0,0.8)]
          border-[16px] border-[#5c3a21]
        "
      >
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 bg-[#1a0f0a] p-1 shadow-inner">
          {MEDICINE_LIST.map((med, index) => (
            <Drawer key={`${med}-${index}`} name={med} onClick={handleDrawerClick} />
          ))}
        </div>
      </motion.div>

      <MedicineModal 
        isOpen={!!selectedMedicine}
        isLoading={loading}
        data={details}
        onClose={closeModal}
        medicineName={selectedMedicine || ''}
      />
    </div>
  );
};

export default CabinetView;