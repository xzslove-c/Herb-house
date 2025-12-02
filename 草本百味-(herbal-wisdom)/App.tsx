import React, { useState } from 'react';
import CottageView from './components/CottageView';
import CabinetView from './components/CabinetView';
import { AppState } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.COTTAGE);

  return (
    <div className="w-full min-h-screen">
      <AnimatePresence mode="wait">
        {view === AppState.COTTAGE ? (
          <motion.div
            key="cottage"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
          >
            <CottageView onEnter={() => setView(AppState.CABINET)} />
          </motion.div>
        ) : (
          <motion.div
            key="cabinet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <CabinetView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;