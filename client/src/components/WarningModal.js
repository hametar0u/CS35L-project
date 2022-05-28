import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SmallButton from "./SmallButton";
import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
    visible: { opacity: 0.75 },
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

const WarningModal = ({ showModal, closeModal }) => {

    const handleClick = () => {
        console.log("do click");
    };

    return (
        <AnimatePresence>
        { showModal && (
            <motion.div
            className="fixed z-1 w-full h-screen top-0 left-0 bg-dark"
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
                            Warning! 
                        </div>
                        <div className="mb-5">
                            You are about to join a new list and exit your current list. Are you sure you want to do this?
                        </div>
                        <SmallButton name={"Continue"} handleClick={handleClick}/>
                    </div>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
        
        
        
    );

    
}


export default WarningModal;
