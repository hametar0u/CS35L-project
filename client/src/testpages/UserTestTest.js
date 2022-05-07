import { useContext, useState, useEffect } from "react";
import axios from "axios";

const UserTestTest = (props) => {
  const [error, setError] = useState();
  const [userList, setUserList] = useState();


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
    await axios.delete(`/deleteFromList/28977`, { //replace the id
      withCredentials: true,

      data: {
        id: 28977
      }
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
    console.log("i got to post")
  await axios.post(`/addToList/28977`, { //replace the id
    withCredentials: true,

    data: {
      id: 28977
    }
  })
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
      <button onClick={deleteFromList}>delete from list</button>
      <button onClick={addToList}>add to list</button>
    </>
  );
};

export default UserTestTest;