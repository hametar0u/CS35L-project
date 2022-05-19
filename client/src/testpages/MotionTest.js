import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ModalTest from "./ModalTest";
import { useState } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vh"
  },
  in: {
  opacity: 1,
    x: 0,

  },
  out: {
    opacity: 0,
    x: "100vh"
  }
};

const pageTransitions = {
  type: "tween",
  ease: "anticipate"
};

const pageStyle = {
  position: "absolute",
  width: "100%",
};

export const MotionTestPage1 = () => {
  return ( 
    <motion.div 
    style={pageStyle}
    exit="out" 
    animate="in"
    initial="initial"
    variants={pageVariants}
    transition={pageTransitions}
    >
      <Link to="/motion2">motion2</Link>
      <Link to="/motion3">motion3</Link>
      <h1>AYO WASSUP</h1>
    </motion.div>
  );
}

export const MotionTestPage2 = () => {
  return ( 
    <motion.div 
    style={pageStyle}
    exit="out" 
    animate="in"
    initial="initial"
    variants={pageVariants}
    transition={pageTransitions}
    >
      <Link to="/motion1">motion1</Link>
      <Link to="/motion3">motion3</Link>
      <h1>wanna scrap???!</h1>
    </motion.div>
  );
}

export const MotionTestPage3 = () => {
  const [showModal, setShowModal] = useState(true);
  return ( 
    <>
    <motion.div 
    style={pageStyle}
    exit="out" 
    animate="in"
    initial="initial"
    variants={pageVariants}
    transition={pageTransitions}
    >
      <Link to="/motion1">motion1</Link>
      <Link to="/motion2">motion2</Link>
      <h1>I beat yo ass up</h1>
    </motion.div>
    <ModalTest showModal={showModal} closeModal={() => setShowModal(false)}/>
    </>
  );
}

export const SlidingWrapper = ({children}) => {
  return ( 
    <motion.div 
    style={pageStyle}
    exit="out" 
    animate="in"
    initial="initial"
    variants={pageVariants}
    transition={pageTransitions}
    >
      {children}
    </motion.div>  
  );
}

const zoompageVariants = {
  initial: {
    opacity: 0,
    scale: 0
  },
  in: {
  opacity: 1,
    scale: 1,

  },
  out: {
    opacity: 0,
    scale: 0
  }
};

export const ZoomInWrapper = ({children}) => {
  return ( 
    <motion.div 
    style={pageStyle}
    exit="out" 
    animate="in"
    initial="initial"
    variants={zoompageVariants}
    transition={pageTransitions}
    >
      {children}
    </motion.div>  
  );
}
