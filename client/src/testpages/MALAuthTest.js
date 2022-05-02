import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";

const MALAuthTest = (props) => {
  const { userData, setUserData } = useContext(UserContext);
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const getAuthorization = async () => {
    const params = {
      code_challenge: userData.code_challenge,
    };

    const response = await axios.post("/auth", params);
    const json = await response.data;
    // console.log(json);
    window.location.assign(json.url);
  };

  const getAccessToken = async () => {
    const params = {
      code: props.code,
      state: props.state,
      code_verifier: userData.code_challenge,
    };

    await axios
      .post("/auth/token", params)
      .then((res) => {
        const json = res.data;
        console.log(json);
        setUser(json);
        setError({});
      })
      .catch((err) => {
        if (err.response.data === "Cannot decrypt the authorization code") {
          getAuthorization();
        } else {
          setError(err.response);
          console.log(err.response);
        }
      });
  };

  return (
    <>
      {/* <h1>code challenge: {userData.code_challenge}</h1> */}

      {/* <p>code: {props.code}</p> */}
      <button onClick={getAccessToken}>Login</button>
      {user && <p>welcome {user.name}</p>}
      {error && <p>{error.data}</p>}
    </>
  );
};

// GENERATING CODE VERIFIER
const dec2hex = (dec) => {
  return ("0" + dec.toString(16)).substr(-2);
};
const generateCodeVerifier = () => {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
};

export default MALAuthTest;
