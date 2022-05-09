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
  const [userId, setId] = useState();
  const [Access_code, setAccess] = useState();

  useEffect(() => {
    setChallenge(userData.code_challenge);
  }, [userData]);

  const handleClick = async () => {
    const obj = {
      name: input.current.value,
      code: props.code,
      code_challenge: challenge,
    };
    console.log(obj);
    await axios
      .post("/auth/v2/login", obj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setId(response.data.id);
        //setAccess(response.access_code);
        if (response.data.url) {
          window.location.assign(response.data.url);
        } else {
          setUser(response.data);
          console.log(user);
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

  const generateAnimeList = async () => {
    //First needs to grab Access_code and username
    const obj = {
      id: userId,
      access_code: "nothing",
      user: "nothing",
    };
    console.log(userId);
    await axios
      .get("/listings/info", obj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data[0]);
        console.log(response.data[0].access_token);
        console.log(response.data[0].info.name);
        // setAccess(response.data[0].access_token);
        // setName(response.data[0].info.name);

        obj.access_code = response.data[0].access_token;
        obj.user = response.data[0].info.name;
    
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
      console.log(obj);
      //console.log(params);
    //Generate data into MongoDb in anime Lists
    await axios 
      .post("/listings/add", obj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Successfully generated List");
      })
      .catch((error) => {
        console.log(error);
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
      <button onClick={generateAnimeList}>Generate Anime List</button>
      <Link to="/session">go to another page</Link>
    </>
  );
};

export default MALAuthTest2;
