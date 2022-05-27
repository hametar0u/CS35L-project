import { useState } from "react";
import axios from "axios";




const MiniButton = (props) => {
  
  return (
    <div>
      <button className="border-2 border-purple hover:bg-mint px-2 rounded-lg w-fit" onClick={props.handleClick}>{props.name}</button>
    </div>
  )
  
};

export default MiniButton;
