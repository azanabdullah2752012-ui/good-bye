import { motion } from 'framer-motion';

const TEACHERS = [
  {
    id: 't1',
    name: "Kavita Ma’am",
    subject: "Science",
    message: "Turned curiosity into confidence and made science feel alive.",
    image: "/assets/math.png" // using placeholder names copied earlier
  },
  {
    id: 't2',
    name: "Khritika Ma’am",
    subject: "Mathematics",
    message: "Brought clarity to chaos and taught us to keep trying.",
    image: "/assets/lit.png"
  },
  {
    id: 't3',
    name: "Karthiyani Ma’am",
    subject: "French",
    message: "Always patient, always supportive—even when we struggled.",
    image: "/assets/pe.png"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TeacherGrid() {
  return (
    <section id="hall-of-fame" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hall of <span className="highlight">Fame</span>
        </motion.h2>
        
        <motion.div 
          className="card-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TEACHERS.map(teacher => (
            <motion.div 
              key={teacher.id} 
              className="glass-card teacher-card"
              variants={cardVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.05, 
                boxShadow: "0 10px 40px 0 rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="teacher-image" 
                style={{ backgroundImage: `url(${teacher.image})` }} 
              />
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-subject">{teacher.subject}</p>
              <p className="teacher-legacy">"{teacher.message}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
