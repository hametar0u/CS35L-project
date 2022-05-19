import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/globals.css";
import { PassThrough } from "stream";



const AnimeCard = (props) => {
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
        <div className="grid grid-cols-4 gap-10">
            {props.animeList.map((anime, i) => {
                return <AnimeCard title={anime.title} image={anime.main_picture ? anime.main_picture.medium : ""} id={anime.id}  delAnime={props.delAnime} key={anime.id}/>;
            })}
        </div>
        
    );
}



export default Animes;
