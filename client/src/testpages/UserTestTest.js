import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const UserTestTest = (props) => {
  const input = useRef();
  const [error, setError] = useState();
  const [userList, setUserList] = useState();

  const checkSession = async () => {
    await axios
      .get("/checksession", {
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

  const getUserTest = async () => {
    await axios.get("/usertest", {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };

  const deleteFromList = async () => {
      console.log("i got to del")

    const params = {
      id: input.current.value
    };

    await axios.delete(`/deleteFromList/${input.current.value}`, {
      withCredentials: true,
      data: params
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };
  

  const addToList = async () => {
    console.log("i got to patch")
  
  const config = {
    withCredentials: true
  };
  const params = {
    id: input.current.value
  };
  await axios.post(`/addToList/${input.current.value}`, params, config)
  .then(response => {
    console.log(response.data);
  })
  .catch(err => {
    console.log(err);
    setError(err.response);
  });
};

  return (
    <>
      <button onClick={getUserTest}>get user list</button>
      <input ref={input} placeholder="type anime id" />
      <button onClick={deleteFromList}>delete from list</button>
      <button onClick={addToList}>add to list</button>
      <button onClick={checkSession}>check whats in session</button>
    </>
  );
};

export default UserTestTest;