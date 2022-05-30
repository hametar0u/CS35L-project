import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/globals.css";
import { PassThrough } from "stream";
import defaultAnime from "./defaultAnime.svg";
import { CardWrapper } from "../components/MotionComponents";
import { AnimatePresence, motion } from "framer-motion";



export const AnimeCard = React.forwardRef((props, ref)=> {
    return(
        <div>
        <motion.div
        style={{
            
        }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity}}
        />
        <div className="bg-lightgrey hover:shadow-md p-5 rounded-lg flex flex-col gap-2 h-85 overflow-x-auto min-h-90">
            <div className="flex flex-row-reverse">
                <button className="bg-red items-center rounded-full justify-center w-5 h-5 text-xs text-white" onClick={() => props.delAnime(props.id)}>x</button>
            </div>
            <div className=""><img src={props.image} className="object-contain h-60"/></div>
            <div className="">{props.title}</div>

            {/* <div>ID: {props.id}</div> */}
        </div>
        </div>
    );
});

export const MotionAnimeCard = motion(AnimeCard);


const Animes = (props) => {
    <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 2 }}
  />
    return (
        <div className="grid grid-cols-3 gap-10">
            {props.animeList.map((anime, i) => {
                return (
                    <AnimatePresence>
                        <CardWrapper>
                            <MotionAnimeCard title={anime.title} image={anime.main_picture ? anime.main_picture.medium : defaultAnime} id={anime.id}  delAnime={props.delAnime} key={anime.id}/>
                        </CardWrapper>
                    </AnimatePresence>
                );
            })}
        </div>
        
    );
}

export default Animes;

