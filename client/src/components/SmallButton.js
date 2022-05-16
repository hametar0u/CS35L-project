import { useState } from "react";
import axios from "axios";




const SmallButton = (props) => {
  
  return (
    <div>
      <button className="bg-purple rounded-full hover:shadow-md text-lg font-bold h-10 w-1/2 pl-5 pr-5" onClick={props.handleClick}>{props.name}</button>
    </div>
  )
  
};

export default SmallButton;
