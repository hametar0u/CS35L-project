import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SmallButton from "./SmallButton";
import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
    visible: { opacity: 0.95 },
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

const Modal = ({ showModal, closeModal, modalOptions, handleClick }) => {

    return (
        <AnimatePresence>
        { showModal && (
            <motion.div
                className="fixed z-50 w-screen h-full top-0 left-0 bg-black"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.div 
                    className="bg-white shadow-xl p-5 flex flex-col gap-10 rounded-lg align-middle w-1/3 m-auto opacity-100"
                    variants={modal}
                >
                    <button className="bg-red w-5 h-5 align-center items-center text-xs rounded-full text-white" onClick={closeModal}>x</button>
                    <div className="flex flex-col gap-5 align-middle items-left">
                        <div className="text-blue text-2xl font-bold">
                            {modalOptions.title}
                        </div>
                        <div className="mb-5">
                            {modalOptions.body}
                        </div>
                        <SmallButton name={modalOptions.buttonText} handleClick={handleClick}/>
                    </div>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
        
        
        
    );

    
}


export default Modal;
