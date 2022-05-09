import { useState } from "react";
import axios from "axios";




const LoginButton = (props) => {
  
  return <button className="bg-mint rounded-full hover:shadow-md w-1/4" onClick={props.handleClick}>Login</button>;
};

export default LoginButton;
