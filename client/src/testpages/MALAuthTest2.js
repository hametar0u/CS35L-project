import { useState } from 'react';
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
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleClick = async () => {
    const params = {
      userid: "1234"
    };

    await axios.post("/session/add", params)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(err => {
        console.log(err.response);
        setError(err.response);
      })
  };

  const checkSession = async () => {
    await axios.get("/session")
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(err => {
        console.log(err.response);
        setError(err.response);
      });
  };

  return (
    <>
      <button onClick={handleClick}>click for vBucks</button>
      <button onClick={checkSession}>check whats in session</button>
    </>
  );
};

export default MALAuthTest2;