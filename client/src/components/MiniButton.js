import { useState } from "react";
import axios from "axios";




const MiniButton = (props) => {
  
  return (
    <div>
      <button className={props.className + " border-2 border-purple hover:bg-light-blue focus:bg-purple px-2 text-xs rounded-lg w-fit"} onClick={props.handleClick}>{props.name}</button>
    </div>
  )
  
};

export default MiniButton;
