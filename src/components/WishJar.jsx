import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WISHES = [
  "Your impact will definitely last a lifetime.",
  "Thank you for believing in us when we didn't.",
  "You always made learning feel like an adventure.",
  "We promise to keep making you proud!",
  "Thank you for your infinite patience.",
  "You taught us to reach for the stars.",
  "Your classroom was a sanctuary for so many."
];

export default function WishJar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentWish, setCurrentWish] = useState("");

  const handlePullWish = () => {
    // Hide current if open
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => openNewWish(), 400); // wait for fade out
    } else {
      openNewWish();
    }
  };

  const openNewWish = () => {
    const randomWish = WISHES[Math.floor(Math.random() * WISHES.length)];
    setCurrentWish(randomWish);
    setIsOpen(true);
  };

  return (
    <section id="wish-jar" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The <span className="highlight">Wish Jar</span>
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Click to pull a special anonymous note.
        </motion.p>
        
        <div className="wish-jar-container">
          <motion.div 
            className={`jar ${isOpen ? 'open' : ''}`}
            onClick={handlePullWish}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="jar-lid"></div>
            <div className="jar-body">
              <span className="jar-label">Wishes</span>
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div 
                key={currentWish}
                className="wish-display"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ display: 'block' }} // override old hardcoded hidden class logic
              >
                <p>"{currentWish}"</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            className="btn-primary mt-4"
            onClick={handlePullWish}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pull a Wish
          </motion.button>
        </div>
      </div>
    </section>
  );
}
