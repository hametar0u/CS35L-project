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

  return (
    <>
      <button onClick={getUserTest}>get user list</button>
    </>
  );
};

export default UserTestTest;