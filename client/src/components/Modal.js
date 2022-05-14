import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SmallButton from "./SmallButton";



const Modal = (props) => {



    const doEdit = () => {
        console.log("close modal");
    
    };
    const doClick = () => {
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    };


    if(props.show) {
        return (
            <div className="bg-white shadow-lg p-5 flex flex-col gap-10 w-1/2 rounded-lg align-middle">
                <button className="bg-red w-4 h-4 text-xs rounded-full text-white" onClick={props.onClick}>x</button>
                 <div className="flex flex-col gap-5 align-middle items-left">
                    <div className="text-blue font-bold">
                        Want unlimited lists?
                    </div>
                    <div className="mb-5">
                        Join Our Anime List Premium for the low low price of $99999999999
                    </div>
                    <SmallButton onClick={doClick} name={"Join OAL Premium"} />
                 </div>
            </div>
            
            
            
        );
    }
    else {
        return (
            <div></div>
        );
    }

    
}


export default Modal;
