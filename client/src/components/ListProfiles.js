import { useState, useEffect } from 'react';
import axios from "axios";
import defaultAnime from "./defaultAnime.svg";
import { AnimatePresence } from "framer-motion";
import { CardWrapper } from "./MotionComponents";


const Profiles = (props) => {

    let dummyProfiles = [
        {
            "pfp" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "name": "Person1",
        },
        {
            "pfp" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "name": "Person2",
        },
        {
            "pfp" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "name": "Person3",
        },
        
    ];

  return ( 
    <div className="flex flex-row gap-10 overflow-x-auto">
        {dummyProfiles.map((elt, i) => {
          return (
            <AnimatePresence>
                <CardWrapper>
                    <div className="flex flex-col justify-center text-center">
                        <div className="bg-white w-10 h-10 rounded-full">
                            <img className="object-contain w-10 h-10 rounded-full" src={elt.pfp}/>
                        </div>
                        <div className="text-xs">{elt.name}</div>
                    </div>
                
                </CardWrapper>
            </AnimatePresence>
          );
        })}
    </div>
  );
};
 
export default Profiles;