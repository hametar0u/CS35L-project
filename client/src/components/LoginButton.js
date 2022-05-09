import { useState } from "react";
import axios from "axios";



const LoginButton = (props) => {
  
  return <button className="bg-mint rounded-full hover:shadow-md" onClick={props.handleClick}>Login</button>;
};

export default LoginButton;
