import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


function Hosting() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <AnimatePresence>
        {showWelcome && (
         <div>
             <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex justify-center items-center bg-teal-700 z-52"
          >
            <h1 className="text-6xl text-white font-bold">Welcome</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 0.5,delay:0.9 }}
            className="absolute inset-0 flex justify-center items-center bg-teal-500 z-51"
          >
            <h1 className="text-6xl text-white font-bold">To</h1>
          </motion.div>
          <motion.div
            drag
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, x: [700,400,-400,-100],rotate:300 }}
            transition={{ delay:4.0 }}
            className="absolute inset-0 flex justify-center items-center bg-transparent z-50"
          >
            
          </motion.div>
         </div>
        )}
      </AnimatePresence>
      <div className="w-full h-screen flex justify-center items-center text-6xl">
        Hosting
      </div>
    </div>
  );
}

export default Hosting;