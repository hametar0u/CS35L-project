import { useState } from "react";
import axios from "axios";



const LoginButton = (props) => {
  
  return <button onClick={props.handleClick}>Login</button>;
};

export default LoginButton;
