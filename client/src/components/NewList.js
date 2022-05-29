import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewList = (props) => {
  const doEdit = () => {
    console.log("edit list");
  };

  return (
    <div className="flex flex-row gap-10 w-2/3">
      <div
        className="bg-lightgrey p-5 flex flex-col gap-5 w-full h-fit rounded-lg align-middle items-center"
        onClick={props.onClick}
      >
        <div className="justify-center align-middle items-center">
          <div className="self-center text-center text-blue text-6xl">+</div>
        </div>
      </div>
      <div
        className="bg-lightgrey p-5 flex flex-col gap-5 w-full h-fit rounded-lg align-middle items-center"
        onClick={props.onClick}
      >
        <div className="justify-center align-middle items-center">
          <div className="self-center text-center text-blue text-6xl">+</div>
        </div>
      </div>
    </div>
  );
};

export default NewList;
