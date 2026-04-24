import { motion } from 'framer-motion';
import TeacherGrid from './components/TeacherGrid';
import MemoryWall from './components/MemoryWall';
import WishJar from './components/WishJar';

function App() {
  return (
    <>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <header className="hero" id="hero">
        <div className="container hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Thank You <br /><span className="highlight">For Everything.</span>
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            A heartfelt tribute to the amazing teachers who shaped our journeys.
          </motion.p>
          <motion.a 
            href="#hall-of-fame" 
            className="btn-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(99, 102, 241, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            View the Tribute
          </motion.a>
        </div>
      </header>

      <main>
        <TeacherGrid />
        <MemoryWall />
        <WishJar />
      </main>

      <footer className="footer">
        <div className="container">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Made with love by your students. Goodbye, and good luck!
          </motion.p>
        </div>
      </footer>
    </>
  );
}

export default App;
