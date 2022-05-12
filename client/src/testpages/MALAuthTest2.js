import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";
import debounce from 'lodash.debounce';

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
  const [anime, setAnime] = useState(null);
  const [ready, setReady] = useState(false);
  const [delanime, setDelAnime] = useState(null);
  const [adduser, setAddUser] = useState(null);

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

  const addAnime = async () => {
    
    console.log("Clicked");
    console.log(anime);
    console.log(userId);
    const obj = {
      anime: anime,
      user: userId
    }
    await axios
    .post("/listings/animeAdd", obj, {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      setError(err.response);
    })
  }

  const delAnime = async () => {
    console.log("Clicked");
    console.log(delanime);
    const obj = {
      anime: delanime,
      user: userId
    }
    await axios
    .post("/listings/animeDelete", obj, {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      setError(err.response);
    })
  }

  const colabList = async () => {

    console.log(anime);
    
    const obj = {
      id: userId,

    }
    await axios
    .get("/listings/colab", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      setError(err.response);
    })
    setReady(false);
  }

  const UserColab = async () => {
    const obj = {
      user: user,
      colabuser: adduser,
    }
    await axios
    .post("/listings/addUser", obj, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      setError(err.response);
    })
  }

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
      .post("/listings/allanimes", obj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Successfully generated List");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function getData(val) {
    setAnime(val.target.value);
  }
  function getData2(val) {
    setDelAnime(val.target.value);
  }
  function getData3(val) {
    setAddUser(val.target.value);
  }
  async function jikanFilter(val) {
    const obj = {
      anime: val.target.value
    }
    await axios
      .post("/listings/jikanInfo", obj, {
        withCredentials: true
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <>
      {user && <p>welcome {user.name}</p>}
      <p>{count}</p>
      <input ref={input} />
      <button className="bg-bermuda rounded-full m-2 p-2" onClick={handleClick}>click for vBucks</button>
      <button className="bg-bermuda rounded-full m-2 p-2" onClick={checkSession}>check whats in session</button>
      <button className="bg-bermuda rounded-full m-2 p-2" onClick={getPageViews}>check times visited</button>
      <button className="bg-bermuda rounded-full m-2 p-2" onClick={resetSession}>reset</button>
      <button className="bg-bermuda rounded-full m-2 p-2" onClick={generateAnimeList}>Generate Anime List</button>
      <button className="bg-bermuda rounded-full m-2 p-2" onClick={colabList}>Colab Together!!</button>
      <div className="bg-bermuda rounded-full m-2 p-2">
        <input type="text" placeholder="Enter Anime Title" onChange={getData}></input>
      <button onClick={addAnime}>Add Anime</button></div>
      <div className="bg-bermuda rounded-full m-2 p-2">
        <input type="text" placeholder="Enter Anime Title" onChange={getData2}></input>
      <button onClick={delAnime}>Delete Anime</button></div>
      <div className="bg-bermuda rounded-full m-2 p-2">
        <input type="text" placeholder="Enter Username to Colab with" onChange={getData3}></input>
      <button onClick={UserColab}>Add User</button></div>
      <div className="bg-bermuda rounded-full m-2 p-2">
        <input type="text" placeholder="Jikan Filter" onChange={jikanFilter}></input></div>
      <Link to="/session">go to another page</Link>
      <Link to="/usertest">go to user test</Link>
    </>
  );
};

export default MALAuthTest2;
