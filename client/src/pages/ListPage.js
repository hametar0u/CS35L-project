import { useState, useEffect} from "react";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";
import { ZoomInWrapper } from "../components/MotionComponents";
import RecommendedAnime from "../components/RecommendedAnime";
import Recs from "../components/RecommendedAnime";
import MiniButton from "../components/MiniButton";
import JoinList from "../components/JoinList";
import Profiles from "../components/ListProfiles";

//helper func
const getDifference = (array1, array2) => {
  return array1.filter(object1 => {
    return !array2.some(object2 => {
      return object1.id === object2.id;
    });
  });
}

//main component
const ListPage = () => {
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

      
      if (animeToDelete.length !== 0) {
        delAnime(animeToDelete[0].id); //del recursive calls getAnime so I only have to delete one thing
      }
      if (animeToAdd.length !== 0) {
        // animeToAdd.forEach(anime => addAnime(anime.id));
        addAnime(animeToAdd[0].id);
      }

      setAnimeList(DBdata);
      setRecommendedAnimeList(RecommendedAnimeData);
    }))
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  }

  const addAnime = async (id) => {
    const params = {
      malId: id
    };

    axios.all([
      axios.post("/listings/animeAddByMalID", params, config), 
      axios.post(`/addToList/${id}`, params, config)
    ])
    .then(axios.spread((data1, data2) => {
      // output of req.
      console.log('data1', data1, 'data2', data2)
      getAnime();
    }))
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };

  const delAnime = async (id) => {
    const params = {
      malId: id
    };

    axios.all([
      axios.post("/listings/animeDelete", params, config), 
      axios.post(`/deleteFromList/${id}`, params, config)
    ])
    .then(axios.spread((data1, data2) => {
      // output of req.
      console.log('data1', data1, 'data2', data2)
      getAnime();
    }))
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };

const clearAnime = () => {
  console.log("clear anime");
  axios
    .get("/obliterate", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      console.log("pressed clearList");
    })
    .catch((err) => {
      console.log(err);
    })
  getAnime();
};

  return(
    <ZoomInWrapper>
    <div>
    {/* <Nav/> */}
    <div className="h-max w-screen bg-gradient-to-r from-background-mint via-background-blue to-background-purple animate-bg">
      <div className="p-10 relative">
      
        {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
          <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
          <div className="relative flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
            <div className="flex flex-row gap-10 items-center">
                  <div className="font-serif text-xl text-blue">
                    Shared List
                </div>
                <div className="">
                <Profiles/>
                </div>
            </div>
          
          <div className="absolute pt-20 items-end w-3/4 z-40 flex flex-row gap-20 justify-between pr-5">
            <div className="w-full">
            <SearchBarProto className="w-full" name={"Anime"} addAnime={addAnime}/>
            </div>
             
              <MiniButton className="w-full" name="Clear all Anime" handleClick={clearAnime}/>
            </div>    
            {/* <div className="flex flex-row-reverse self-end w-full">
              <MiniButton name="Clear all Anime" onClick={clearAnime}/>
              </div> */}
          <div className="mt-20 flex flex-row gap-10 justify-between">
            <div className="w-3/4">
              <Animes animeList={animeList} delAnime={delAnime}/>
            </div>
            <div className="h-fit w-1/4 flex flex-col gap-5">
              <div className="font-serif text-xl text-blue">
                Recommended
              </div>
              <div className="bg-purple rounded-lg w-fit h-155 overflow-y-auto justify-center items-center">
                <div className="p-5">
                  <RecommendedAnime animeList={recommendedAnimeList} addAnime={addAnime}/>
                </div>
              </div>
              <div className="font-serif text-xl text-blue pt-10">
                Join a new list
              </div>
               <div className="bg-purple rounded-lg w-fit h-155 overflow-y-auto justify-center items-center">
                <div className="p-5">
                  <JoinList animeList={recommendedAnimeList} joinNewList={addAnime}/>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  </div>
  </div>
  </ZoomInWrapper>
  );
}

export default ListPage;