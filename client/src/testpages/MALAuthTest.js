import { useContext, useState, useEffect } from "react";
import axios from "axios";

const MALAuthTest = (props) => {
  const [error, setError] = useState();

  const checkSession = async () => {
    await axios.get("/checksession", {
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
      <button onClick={checkSession}>check whats in session</button>
    </>
  );
};

export default MALAuthTest;
