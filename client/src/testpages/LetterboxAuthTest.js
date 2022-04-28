import { useEffect, useState } from 'react';
import axios from 'axios';

const AuthTest = () => {
  const [accessToken, setAccessToken] = useState('');

  const getAccessToken = async () => {
    const response = await axios.get("https://api.letterboxd.com/api/v0/auth/get-login-token", {
      username: "MaldingmonkE",
      password: "Dacnom-6nyhti-vujsam"
    });
    const json = await response.data;
    console.log(json);
    setAccessToken(json);
  };

  useEffect(() => {
    getAccessToken();
  });  

  return(
    <></>
  );
}

export default AuthTest;