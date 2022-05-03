import { useState, useRef } from 'react';
import axios from 'axios';

// GENERATING CODE VERIFIER
const dec2hex = (dec) => {
  return ("0" + dec.toString(16)).substr(-2);
}
const generateCodeVerifier = () => {
  var array = new Uint32Array(128 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

const MALAuthTest2 = (props) => {
  const input = useRef();
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();

  const handleClick = async () => {
    const obj = { name: input.current.value };
    await axios.post("/new", obj, {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };

  const handleGetName = async () => {
    await axios.get("/name", {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      setName(response.data);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };
  

  return (
    <>
      {/* <p>{name}</p> */}
      <input ref={input} />
      <button onClick={handleClick}>click for vBucks</button>
      <button onClick={handleGetName}>check whats in session</button>
    </>
  );
};

export default MALAuthTest2;