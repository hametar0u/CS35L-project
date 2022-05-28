
import { useState, useEffect } from 'react';
import axios from "axios";
import defaultAnime from "./defaultAnime.svg";
import { AnimatePresence } from "framer-motion";
import { CardWrapper } from "./MotionComponents";

const AnimeCard = (props) => {
  return(
      <div className="bg-lightgrey p-5 rounded-lg flex flex-col gap-2 w-full">
          <div className="flex flex-row-reverse">
              <button className="bg-mint items-center rounded-full justify-center w-5 h-5 text-xs text-white" onClick={() => props.addAnime(props.id)}>+</button>
          </div>
          <div className="w-3/4"><img src={props.image}/></div>
          <div className="text-xs">{props.title}</div>

          {/* <div>ID: {props.id}</div> */}
      </div>
  );
};

const RecommendedAnime = (props) => {
  return ( 
    <div className="grid grid-cols-1 gap-10">
        {props.animeList.map((anime, i) => {
          return (
            <AnimatePresence>
                <CardWrapper>
                  <AnimeCard title={anime.title} image={anime.main_picture ? anime.main_picture.medium : ""} id={anime.id}  addAnime={props.addAnime} key={anime.id}/>
                </CardWrapper>
            </AnimatePresence>
          );
        })}
    </div>
  );
};
 
export default RecommendedAnime;