import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import axios from 'axios';
import LoginButton from "../components/LoginButton";
import logo from "../components/logo.svg";
import "../css/LandingPage.css";



const LandingPage = (props) => {


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
              setUser(response.data);
            }
          })
          .catch((err) => {
            console.log(err);
            setError(err.response);
          });
      };
    

  return(
    <div class="row AUContainer">
      <div class="column">
        <img src={logo}/>
      </div>
      <div class="column">
        <div className="bg-bermuda">
        Welcome to Our Anime List!
        </div>
        <div className="text-bermuda">
        OAL is a community platform based on My Anime List. Our application allows you to interact with your friends on My Anime List by creating collaborative anime lists, comparing your similarity, and more. 
        </div>
        <div class="h2">
        We hope you enjoy our app :3
        </div>
        <LoginButton handleClick={handleClick}/>
      </div>
      </div>
     
  );
}

export default LandingPage;