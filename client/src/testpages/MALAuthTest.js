import { useContext, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

const MALAuthTest = (props) => {
  const userData = useContext(UserContext);
  const [userAuth, setUserAuth] = useState();
  const [user, setUser] = useState();

  const handleClick = async () => {

    const params = {
      code_challenge: userData.code_challenge
    };

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
    
    const response = await axios.post("/auth/token", params);
    const json = await response.data;
    console.log(json);
    setUserAuth(json);
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

export default MALAuthTest;