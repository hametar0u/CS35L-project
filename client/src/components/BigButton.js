import { useState } from "react";
import axios from "axios";



const BigButton = (props) => {
  
  return (
    <div>
      <button className="bg-mint w-64 font-extrabold text-white h-12 rounded-xl text-lg" onClick={props.handleClick}>{props.name}</button>
    </div>
  )
  
};

export default BigButton;
