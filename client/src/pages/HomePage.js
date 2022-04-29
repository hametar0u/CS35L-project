import { useContext } from "react";
import { UserContext } from "../App";
import axios from 'axios';

const HomePage = (props) => {
  const userData = useContext(UserContext);
  const getAccessToken = async () => {
    const params = {
      code: props.code,
      state: props.state,
      code_verifier: userData.code_challenge
    };
    
    const response = await axios.post("/auth/token", params);
    const json = await response.data;
    console.log(json);
  }
  return(
    <div>
      hi
      <p>code: {props.code}</p>
      <p>state: {props.state}</p>
      <p>code challenge: {userData.code_challenge}</p>
      <button onClick={getAccessToken}>get access token</button>
    </div>
  );
}

export default HomePage;