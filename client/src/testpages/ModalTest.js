import { motion, AnimatePresence } from 'framer-motion';
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { 
    y: "200px", 
    opacity: 1,
    transition: { delay: 0.5 }
  },
}

const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    "z-index": 1,
};

const modalStyle = {
  "max-width": "400px",
  padding: "40px 20px",
  background: "white",
  "border-radius": "10px",
  "text-align": "center",
};

const ModalTest = ({ showModal, closeModal }) => {
  return (
    <AnimatePresence>
      { showModal && (
        <motion.div
          style={backdropStyle}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            style={modalStyle}
            variants={modal}
          >
            <p>Want to make another Pizza?</p>
            <button onClick={closeModal}>x</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalTest;