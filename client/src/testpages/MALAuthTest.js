import { useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

const MALAuthTest = () => {
  const userData = useContext(UserContext);

  const handleClick = async () => {

    const params = {
      code_challenge: userData.code_challenge
    };

    const response = await axios.post("/auth", params);
    const json = await response.data;
    // console.log(json);
    window.location.assign(json.url);
  }

  return(
    <>
      <button onClick={handleClick}>go to auth</button>
      <h1>{userData.code_challenge}</h1>
    </>
  );
}

export default MALAuthTest;