import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const NewList = (props) => {

    const doEdit = () => {
        console.log("edit list");
    
    };

    return (
        <div className="bg-lightgrey p-5 flex flex-col gap-5 w-1/2 rounded-lg align-middle" onClick={props.onClick}>
             <div className="flex flex-col gap-5 align-middle items-center">
                <div>
                    Create a new list
                </div>
                <button className="bg-blue w-20 rounded-full text-white" onClick={props.onClick}>+</button>
             </div>
        </div>
        
        
        
    );
}


export default NewList;
