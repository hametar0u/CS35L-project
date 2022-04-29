import axios from 'axios';

const MALAuthTest = () => {
  // GENERATING CODE VERIFIER
  const dec2hex = (dec) => {
    return ("0" + dec.toString(16)).substr(-2);
  }
  const generateCodeVerifier = () => {
    var array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
  }

  const handleClick = async () => {

    const params = {
      code_challenge: generateCodeVerifier()
    };

    const response = await axios.post("/auth", params);
    const json = await response.data;
    console.log(json);
    window.location.assign(json.url);
  }

  return(
    <button onClick={handleClick}>go to auth</button>
  );
}

export default MALAuthTest;