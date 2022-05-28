
import { useState, useEffect } from 'react';
import axios from "axios";
import defaultAnime from "./defaultAnime.svg";
import { AnimatePresence } from "framer-motion";
import { CardWrapper } from "./MotionComponents";

const JoinListCard = (props) => {
  return(
      <div className="bg-lightgrey p-5 rounded-lg flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 justify-between">
                <button className="order-last bg-blue items-center rounded-full justify-center w-1/3 h-5 text-xs text-white" onClick={() => props.joinNewList(props.id)}>Join</button>
                <div className="order-first text-sm">{props.owner}'s list</div>
          </div>
            <div className="flex flex-row">
                <img className="w-1/4 h-15" src={props.image1}/>
                <img className="w-1/4 h-15" src={props.image2}/>
                <img className="w-1/4 h-15" src={props.image3}/>
                <img className="w-1/4 h-15" src={props.image4}/>
            </div>
      </div>
  );
};

const JoinList = (props) => {

    let otherLists = [
        {
            "owner" : "Paul",
            "image1" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "image2" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image3" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image4" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
        },
        {
            "owner" : "Paolo",
            "image1" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "image2" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image3" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image4" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
        },
        {
            "owner" : "Pablo",
            "image1" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "image2" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image3" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image4" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
        },
        {
            "owner" : "Pablo",
            "image1" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "image2" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image3" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image4" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
        },
        {
            "owner" : "Pablo",
            "image1" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "image2" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image3" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "image4" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
        },
    ];

  return ( 
    <div className="grid grid-cols-1 gap-10">
        {otherLists.map((list, i) => {
          return (
            <AnimatePresence>
                <CardWrapper>
                  <JoinListCard owner={list.owner} image1={list.image1} image2={list.image1} image3={list.image1} image4={list.image1} joinNewList={props.joinNewList}/>
                </CardWrapper>
            </AnimatePresence>
          );
        })}
    </div>
  );
};
 
export default JoinList;