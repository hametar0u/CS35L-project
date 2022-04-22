import { useState } from "react";
import axios from 'axios';

const Create = (props) => {
  const handleClick = async () => {
    await axios.post('/listings/add', {
      id: props.id,
      session_id: props.session_id
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <button
      onClick={() => handleClick()}
    >
      Add
    </button>
  );
}

export default Create;