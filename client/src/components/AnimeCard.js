import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const deleteButton = () => {
    console.log("delete");
};

const AnimeCard = (props) => {
    return(
        <div>
            <button onClick={deleteButton}>x</button>
            <div>{props.title}</div>
            <div><img src={props.image}/></div>
            <div>{props.id}</div>
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
        }
    ];

    return (
        <div>
            {animeArray.map((anime, i) => {
            return <AnimeCard title={anime.title} image={anime.image} id={anime.id} />;
            })}
        </div>
        
    );
}



export default Animes;
