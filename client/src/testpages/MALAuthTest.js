import { useContext, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

const MALAuthTest = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [userAuth, setUserAuth] = useState();
  const [user, setUser] = useState();

  const handleClick = async () => {
    const code_challenge = generateCodeVerifier();
    setUserData({
      code_challenge: code_challenge
    });

    const params = {
      code_challenge: userData.code_challenge
    };
    console.log("code challenge: ", userData.code_challenge);

    const response = await axios.post("/auth", params);
    const json = await response.data;
    // console.log(json);
    window.location.assign(json.url);
  }

  const getAccessToken = async () => {

    const params = {
      code: props.code,
      state: props.state,
      code_verifier: userData.code_challenge
    };
    
    await axios.post("/auth/token", params)
      .then(res => {
        // Work with the response...
        const json = res.data;
        console.log(json);
        setTokens(json);
        loginUser(json);
      }).catch(err => {
        // Handle error
        
        console.log(err);
      });
    
  }

  const loginUser = async () => {
    const params = userAuth;
    const response = await axios.post("/get-user", params);
    const json = await response.data;
    console.log(json);
    setUser(json.name);
  };

  return(
    <>
      <button onClick={handleClick}>go to auth</button>
      <h1>code challenge: {userData.code_challenge}</h1>

      <p>code: {props.code}</p>
      <button onClick={getAccessToken}>get access token</button>
      <button onClick={loginUser}>login</button>
      {user && <p>welcome {user}</p>}

    </>
  );
}


// GENERATING CODE VERIFIER
const dec2hex = (dec) => {
  return ("0" + dec.toString(16)).substr(-2);
}
const generateCodeVerifier = () => {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}


export default MALAuthTest;