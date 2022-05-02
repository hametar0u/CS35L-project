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


  return (
    <>
      hi
    </>
  );
};

export default MALAuthTest2;