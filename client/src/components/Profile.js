import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/globals.css";

const Profile = (props) => {
  return (
    <div className="p-5 flex flex-col items-center text-center w-1/4">
      <div className="w-30 h-30">
        <img src={props.image} className="rounded-full w-full h-full" />
      </div>
      <div className="text-center pt-2">{props.name}</div>
    </div>
  );
};

export default Profile;
