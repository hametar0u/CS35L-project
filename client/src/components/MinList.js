import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const doEdit = () => {
    console.log("edit list");
};

const MinAnimeCard = (props) => {
    return(
        <div>
            <div><img src={props.image}/></div>
        </div>
    );
};

const MinList = () => {
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
        <div className="bg-lightgrey p-5 flex flex-col gap-10 w-1/2">
             List 1
            <div className="flex gap-5">
            <div className="grid grid-cols-2 gap-0">
                <MinAnimeCard image={animeArray[0].image}/>
                <MinAnimeCard image={animeArray[1].image}/>
                <MinAnimeCard image={animeArray[2].image}/>
                <MinAnimeCard image={animeArray[3].image}/>
            </div>
        </div>
            <button className="bg-blue w-20 rounded-full" onClick={doEdit}>edit</button>

        </div>
        
        
        
    );
}



export default MinList;
