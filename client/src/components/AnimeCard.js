import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/globals.css";
import { PassThrough } from "stream";
import defaultAnime from "./defaultAnime.svg";
<<<<<<< HEAD
import { CardWrapper } from "../components/MotionComponents";
import { AnimatePresence } from "framer-motion";
=======
>>>>>>> da45d36 (started styling friends components)



export const AnimeCard = (props) => {
    return(
        <div className="bg-lightgrey p-5 rounded-lg flex flex-col gap-2">
            <div className="flex flex-row-reverse">
                <button className="bg-red items-center rounded-full justify-center w-5 h-5 text-xs text-white" onClick={() => props.delAnime(props.id)}>x</button>
            </div>
            <div className=""><img src={props.image} className="object-contain h-60"/></div>
            <div className="">{props.title}</div>

            {/* <div>ID: {props.id}</div> */}
        </div>
    );
};

const Animes = (props) => {
    return (
        <div className="grid grid-cols-3 gap-10">
            {props.animeList.map((anime, i) => {
<<<<<<< HEAD
                return (
                    <AnimatePresence>
                        <CardWrapper>
                            <AnimeCard title={anime.title} image={anime.main_picture ? anime.main_picture.medium : defaultAnime} id={anime.id}  delAnime={props.delAnime} key={anime.id}/>
                        </CardWrapper>
                    </AnimatePresence>
                );
=======
                return <AnimeCard title={anime.title} image={anime.main_picture ? anime.main_picture.medium : defaultAnime} id={anime.id}  delAnime={props.delAnime} key={anime.id}/>;
>>>>>>> da45d36 (started styling friends components)
            })}
        </div>
        
    );
}



export default Animes;
