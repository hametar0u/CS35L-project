import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

// GENERATING CODE VERIFIER
const dec2hex = (dec) => {
  return ("0" + dec.toString(16)).substr(-2);
};
const generateCodeVerifier = () => {
  var array = new Uint32Array(128 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
};

const MALAuthTest2 = (props) => {
  const input = useRef();
  const { userData, setUserData } = useContext(UserContext);
  const [challenge, setChallenge] = useState();
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [user, setUser] = useState();
  const [count, setCount] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setChallenge(userData.code_challenge);
  }, [userData]);

  const handleClick = async () => {
    const obj = {
      name: input.current.value,
      code: props.code,
      code_challenge: challenge,
    };
    await axios
      .post("/auth/v2/login", obj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.url) {
          window.location.assign(response.data.url);
        } else {
          setUser(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  };

  const checkSession = async () => {
    await axios
      .get("/checksession", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setName(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  };

  const getPageViews = async () => {
    await axios
      .get("/sessioncount", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setCount(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  };

  const resetSession = async () => {
    await axios
      .get("/end", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  };

  return (
    <>
      {user && <p>welcome {user.name}</p>}
      <p>{count}</p>
      <input ref={input} />
      <button onClick={handleClick}>click for vBucks</button>
      <button onClick={checkSession}>check whats in session</button>
      <button onClick={getPageViews}>check times visited</button>
      <button onClick={resetSession}>reset</button>
      <Link to="/session">go to another page</Link>
    </>
  );
};

export default MALAuthTest2;
