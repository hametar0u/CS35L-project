import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SmallButton from "../components/SmallButton.js";
import logo from "../components/s.svg";
import { FadeInWrapper } from "../components/MotionComponents";
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
    <FadeInWrapper>
      <div className="justify-center">
      <div className="h-screen flex justify-left sm:justify-center w-full pt-40 pb-10">
      <div className="transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
      <div className="relative w-full max-w-lg -z-10 blur-xl">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-mint rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-light-blue rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
        <div className="flex flex-row gap-x-10 z-50">
          <div className="w-full">
            <img src={logo} />
          </div>
          <div className="flex flex-col gap-10">
            <div className="font-serif text-4xl text-blue blur">
              Welcome to Our Anime List!
            </div>
            <div className="">
              OAL is a community platform based on My Anime List. Our
              application allows you to interact with your friends on My Anime
              List by creating collaborative anime lists, comparing your
              similarity, and more.
            </div>
            <div class="text-blue italic">We hope you enjoy our app :3</div>
            <SmallButton className="" handleClick={handleClick} name={"Login"} />
            {/* <BigButton handleClick={GoToHomePage} name={"SHARED LIST"} /> */}
          </div>
        </div>
      </div>
    </div>
      </div>
    </FadeInWrapper>
  );
};

export default LandingPage;
