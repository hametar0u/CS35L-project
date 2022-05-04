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
  const [count, setCount] = useState();
  const [error, setError] = useState();

  const handleClick = async () => {
    const obj = { 
      name: input.current.value,
      // code: "abc123",
      // code_challenge: "9876fdsa"
    };
    await axios.post("/auth/v2/login", obj, {
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
    await axios.get("/checksession", {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      setName(response.data.message);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };
  
  const getPageViews = async () => {
    await axios.get("/sessioncount", {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      setCount(response.data);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };

  const resetSession = async () => {
    await axios.get("/end", {
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

  return (
    <>
      <p>{name} {count}</p>
      <input ref={input} />
      <button onClick={handleClick}>click for vBucks</button>
      <button onClick={handleGetName}>check whats in session</button>
      <button onClick={getPageViews}>check times visited</button>
      <button onClick={resetSession}>reset</button>
    </>
  );
};

export default MALAuthTest2;