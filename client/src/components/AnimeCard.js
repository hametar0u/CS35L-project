import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/globals.css";


const deleteButton = () => {
    console.log("delete");
};

const AnimeCard = (props) => {
    return(
        <div className="bg-lightgrey p-5">
            <div className="flex flex-row-reverse">
                <button className="bg-red rounded-full justify-center w-8" onClick={deleteButton}>x</button>
            </div>
            <div>{props.title}</div>
            <div><img src={props.image}/></div>
            <div>ID: {props.id}</div>
        </div>
    );
};

const Animes = () => {
    let animeArray = [
        {
            "title" : "5-toubun no Hanayome",
            "image" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "id" : 38101,
        },
        {
            "title" : "5-toubun no Hanayome ∬",
            "image" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "id" : 39783,
        },
        {
            "title" : "91 Days",
            "image" : "https://api-cdn.myanimelist.net/images/anime/13/80515.jpg",
            "id" : 32998,
        },
        {
            "title" : "5-toubun no Hanayome",
            "image" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "id" : 38101,
        },
        {
            "title" : "5-toubun no Hanayome ∬",
            "image" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "id" : 39783,
        },
        {
            "title" : "91 Days",
            "image" : "https://api-cdn.myanimelist.net/images/anime/13/80515.jpg",
            "id" : 32998,
        },
        {
            "title" : "5-toubun no Hanayome",
            "image" : "https://api-cdn.myanimelist.net/images/anime/1819/97947.jpg",
            "id" : 38101,
        },
        {
            "title" : "5-toubun no Hanayome ∬",
            "image" : "https://api-cdn.myanimelist.net/images/anime/1775/109514.jpg",
            "id" : 39783,
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-10">
            {animeArray.map((anime, i) => {
            return <AnimeCard title={anime.title} image={anime.image} id={anime.id} />;
            })}
        </div>
        
    );
}



export default Animes;
