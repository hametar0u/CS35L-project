import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SmallButton from "./SmallButton";



const Modal = (props) => {



    const doEdit = () => {
        console.log("close modal");
    
    };
    const handleClick = () => {
        console.log("do click");

        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    };


    return (
        <div className="bg-white shadow-xl p-5 flex flex-col gap-10 rounded-lg align-middle">
            <button className="bg-red w-4 h-4 align-center text-xs rounded-full text-white" onClick={props.onClick}>x</button>
             <div className="flex flex-col gap-5 align-middle items-left">
                <div className="text-blue font-bold">
                    Want unlimited lists?
                </div>
                <div className="mb-5">
                    Join Our Anime List Premium for the low low price of $99999999999
                </div>
                <SmallButton name={"Join OAL Premium"} handleClick={handleClick}/>
             </div>
        </div>
        
        
        
    );

    
}


export default Modal;
