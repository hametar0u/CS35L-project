import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { CardWrapper } from "../testpages/MotionTest";

const AddAnimeCard = (props) => {
  return(
      <div className="bg-lightgrey p-5 rounded-lg">
          <div className="flex flex-row-reverse">
              <button className="bg-mint rounded-full justify-center w-8 text-white" onClick={props.onClick}>+</button>
          </div>
          <div className="">{props.title}</div>
          <div className=""><img src={props.image}/></div>
          <div>ID: {props.id}</div>
      </div>
  );
};

const TestTable = () => {
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
        "title" : "Kimetsu no Yaiba",
        "image" : "https://api-cdn.myanimelist.net/images/anime/1286/99889.jpg",
        "id" : 38000,
    },
    {
        "title" : "Kono Subarashii Sekai ni Shukufuku wo!: Kono Subarashii Choker ni Shukufuku wo!",
        "image" : "https://api-cdn.myanimelist.net/images/anime/1649/98516.jpg",
        "id" : 32380,
    },
];
  const [animes, setAnimes] = useState(animeArray);

  const delAnime = () => {
    const newArr = animes.splice(1);
    setAnimes(newArr);
  }

  return ( 
    <>
      <AnimatePresence>
      {animes.map((anime, i) => {
        return (
            <CardWrapper>
              <AddAnimeCard title={anime.title} image={anime.image} itemid={i} onClick={delAnime} key={i}/>
            </CardWrapper>
        );
      })}
      </AnimatePresence>
    </>
  );
}
 
export default TestTable;