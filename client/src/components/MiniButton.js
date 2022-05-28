import { useState } from "react";
import axios from "axios";




const MiniButton = (props) => {
  
  return (
    <div>
      <button className="bg-light-purple border-2 border-purple hover:bg-light-blue px-2 rounded-lg w-fit" onClick={props.handleClick}>{props.name}</button>
    </div>
  )
  
};

export default MiniButton;
