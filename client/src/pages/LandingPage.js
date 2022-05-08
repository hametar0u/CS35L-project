import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import axios from 'axios';
import LoginButton from "../components/LoginButton";





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
    <div>
      <LoginButton handleClick={handleClick}/>
      landing page
    </div>
  );
}

export default LandingPage;