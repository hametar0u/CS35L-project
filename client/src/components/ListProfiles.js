import { useState, useEffect } from 'react';
import axios from "axios";
import defaultAnime from "./defaultAnime.svg";
import { AnimatePresence } from "framer-motion";
import { CardWrapper } from "./MotionComponents";


const Profiles = () => {
    const [users, setUsers] = useState([]);

    const redirectToProfile = (url) => {
        window.open(url, "_blank");
    }

    useEffect(() => {
        const config = { withCredentials: true };
        axios.post("/getAllUsersOfList", {}, config) //users in list
        .then(response => {
            console.log(response.data.users);
            setUsers(response.data.users);
        })
        .catch(err => {
            console.log(err.response);
        });
    }, []);

  return ( 
    <div className="flex flex-row gap-5 overflow-x-auto">
        {users.map((user, i) => {
          return (
            <AnimatePresence>
                <CardWrapper>
                    <div className="object-contain flex flex-col justify-center text-center" onClick={() => redirectToProfile(user.url)} key={i}>
                        <div className="bg-white w-10 h-10 rounded-full self-center hover:shadow-lg">
                            <img className="object-contain w-10 h-10 rounded-full" src={user.image}/>
                        </div>
                        <div className="text-xs">{user.name}</div>
                    </div>
                
                </CardWrapper>
            </AnimatePresence>
          );
        })}
    </div>
  );
};
 
export default Profiles;