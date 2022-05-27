
import { useState, useEffect } from 'react';
import axios from "axios";
import { AnimeCard } from "./AnimeCard";
import defaultAnime from "./defaultAnime.svg";
import { AnimatePresence } from "framer-motion";
import { CardWrapper } from "./MotionComponents";

const RecommendedAnime = () => {
  const [recommendedAnimeList, setRecommendedAnimeList] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get("/listings/listOfRecommendedAnime", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setRecommendedAnimeList(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  }, []);
  
  return ( 
    <div className="grid grid-cols-4 gap-10">
        {recommendedAnimeList.map((anime, i) => {
          return (
            <AnimatePresence>
                <CardWrapper>
                    <AnimeCard title={anime.title} image={anime.main_picture ? anime.main_picture.medium : defaultAnime} id={anime.id} key={anime.id}/>
                </CardWrapper>
            </AnimatePresence>
          );
        })}
    </div>
  );
};
 
export default RecommendedAnime;