import { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import MinList from "../components/MinList";
import Navbar from "../components/Navbar/index";
import NewList from "../components/NewList";
import Modal from "../components/Modal";
import Nav from "../components/Nav";
import { ZoomInWrapper } from "../components/MotionComponents";


//helper func
const getDifference = (array1, array2) => {
  return array1.filter(object1 => {
    return !array2.some(object2 => {
      return object1.id === object2.id;
    });
  });
}

const HomePage = () => {

  //main component
  const [error, setError] = useState();
  const [animeList, setAnimeList] = useState([]);
  const [recommendedAnimeList, setRecommendedAnimeList] = useState([]);
  const config = {
    withCredentials: true
  };

  useEffect(() => {
    getAnime();
  }, []);
  

  const getAnime = async () => {
    axios.all([
      axios.post("/listings/allanimes", {}, config), //MAL
      axios.post(`/listings/allanimesSharedList`, {}, config), //DB
      axios.post("/listings/listOfRecommendedAnime", {}, config)
    ])
    .then(axios.spread((MALdata, DBdata, RecommendedAnimeData) => {
      console.log(MALdata,DBdata,RecommendedAnimeData);
      MALdata = MALdata.data;
      DBdata = DBdata.data;
      RecommendedAnimeData = RecommendedAnimeData.data;
      DBdata = DBdata.filter(element => { //remove empty object
        if (Object.keys(element).length !== 0) {
          return true;
        }
        return false;
      });
      console.log('MALdata', MALdata, 'DBdata', DBdata);
      let animeToDelete = getDifference(MALdata, DBdata);
      console.log("animeToDelete: ", animeToDelete);
      let animeToAdd = getDifference(DBdata, MALdata);
      console.log("animeToAdd: ", animeToAdd);
      

      setAnimeList(DBdata);
      setRecommendedAnimeList(RecommendedAnimeData);
    }))
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  }

  const [open, setOpen] = useState(false);

  const doClick = () => {
    setOpen(!open);
  }

  // if(open) {
    return(
      <ZoomInWrapper className="w-full">
    <div className="h-max w-screen bg-gradient-to-r from-background-mint via-background-blue to-background-purple animate-bg">
        <div className="p-10">
          {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
            <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
            <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
            <div className="font-serif text-xl text-blue">
              Our Anime List Home
            </div>
                  <div className="flex flex-row gap-5">
                    <MinList />
                    <NewList onClick={doClick}/>
                  </div>
                  </div>
              </div>
              {/* <div className="absolute top-0 left-0 pt-50 pl-105"> */}
                <Modal showModal={open} closeModal={() => setOpen(false)}/>
              {/* </div>               */}
            </div>
            </div>
            </ZoomInWrapper>
    );
  // }
  // else {
  //   return(
  //     <ZoomInWrapper>
  //     <div>
  //             {/* <Nav /> */}
  //             <div className="p-10">
  //             <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">               
  //                 <div className="flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
  //                 <div className="font-serif text-xl text-blue">
  //                   Our Anime List Home
  //                 </div>
  //                 <div className="flex flex-row gap-10">
  //                   <MinList/>
  //                   <NewList onClick={doClick}/>
  //                 </div>
  //                 </div>
  //             </div>
  //           </div>
  //     </div>  
  //     </ZoomInWrapper>
  //   );
  // }
  
}

export default HomePage;