import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/globals.css";


const deleteButton = () => {
    console.log("delete");
};

const AddAnimeCard = (props) => {
    return(
        <div className="bg-lightgrey p-5 rounded-lg">
            <div className="flex flex-row-reverse">
                <button className="bg-mint rounded-full justify-center w-8 text-white" onClick={deleteButton}>+</button>
            </div>
            <div className="">{props.title}</div>
            <div className=""><img src={props.image}/></div>
            <div>ID: {props.id}</div>
        </div>
    );
};

const addAnimes = () => {
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
            return <AddAnimeCard title={anime.title} image={anime.image} id={anime.id} />;
            })}
        </div>
        
    );
}



export default addAnimes;
