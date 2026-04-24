import { motion } from 'framer-motion';

const MESSAGES = [
  { text: "I'll never forget the time you stayed after class to help me. Thank you!", author: "Sarah T.", color: "color-1" },
  { text: "Your classroom was my safe space. We will miss you so much!", author: "John D.", color: "color-2" },
  { text: "Good luck in your next adventure! The school won't be the same.", author: "Class of 2026", color: "color-3" },
  { text: "You didn't just teach us subjects; you taught us how to be better people.", author: "Aryan", color: "color-4" },
  { text: "Wishing you nothing but happiness and rest in your new journey!", author: "Principal Harris", color: "color-5" }
];

export default function MemoryWall() {
  return (
    <section id="memory-wall" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Memory <span className="highlight">Wall</span>
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Messages of gratitude from students and staff.
        </motion.p>
        
        <div className="masonry-grid" id="messages-grid">
          {MESSAGES.map((msg, idx) => {
            // Generate a random slight rotation between -3 and 3 degrees for organic feel
            const organicRotation = Math.random() * 6 - 3;
            
            return (
              <motion.div 
                key={idx} 
                className={`message-note ${msg.color}`}
                initial={{ opacity: 0, y: 40, rotate: organicRotation }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.15,
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  rotate: 0, 
                  scale: 1.03, 
                  transition: { duration: 0.3 }
                }}
              >
                <p className="note-text">"{msg.text}"</p>
                <span className="note-author">- {msg.author}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
