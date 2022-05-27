import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ModalTest from "../testpages/ModalTest";
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
    className="w-full"
    >
      {children}
    </motion.div>  
  );
};

export const CardWrapper = ({children}) => {
  return ( 
    <motion.div 
    exit="out" 
    animate="in"
    initial="initial"
    variants={zoompageVariants}
    transition={pageTransitions}
    >
      {children}
    </motion.div>  
  );
};

const fadeVariants = {
  initial: {
    opacity: 0,
  },
  in: {
  opacity: 1,

  },
  out: {
    opacity: 0,
  }
};

export const FadeInWrapper = ({children}) => {
  return ( 
    <motion.div 
    style={pageStyle}
    exit="out" 
    animate="in"
    initial="initial"
    variants={fadeVariants}
    transition={{
      delay: 0.5,
      duration: 1,
    }}
    >
      {children}
    </motion.div>  
  );
}
