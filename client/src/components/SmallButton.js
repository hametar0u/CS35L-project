import { useState } from "react";
import axios from "axios";




const SmallButton = (props) => {
  
  return (
    <div>
      <button className="bg-purple rounded-full hover:shadow-md w-1/4" onClick={props.handleClick}>{props.name}</button>
    </div>
  )
  
};

export default SmallButton;
