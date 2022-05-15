import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SmallButton from "../components/SmallButton.js";
import logo from "../components/s.svg";
import "../styles/globals.css";

import BigButton from "../components/BigButton.js";

const LandingPage = (props) => {
  const navigate = useNavigate();
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
          props.handleLogin();
          setUser(response.data); //idk if we still need this
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  };

  const GoToHomePage = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-left sm:justify-center w-full pt-40 pb-10">
      <div className="flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
        <div className="flex flex-row gap-x-10">
          <div className="w-full">
            <img src={logo} />
          </div>
          <div className="flex flex-col gap-10">
            <div className="font-serif text-xl text-blue">
              Welcome to Our Anime List!
            </div>
            <div className="">
              OAL is a community platform based on My Anime List. Our
              application allows you to interact with your friends on My Anime
              List by creating collaborative anime lists, comparing your
              similarity, and more.
            </div>
            <div class="text-blue">We hope you enjoy our app :3</div>
            <SmallButton handleClick={handleClick} name={"Login"} />
            {/* <BigButton handleClick={GoToHomePage} name={"SHARED LIST"} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
