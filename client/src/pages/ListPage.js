import { useState, useEffect} from "react";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";

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
  const config = {
    withCredentials: true
  };

  useEffect(() => {
    getAnime();
  }, []);

  const getAnime = async () => {
    axios.all([
      axios.post("/listings/allanimes", {}, config), //MAL
      axios.post(`/listings/allanimesSharedList`, {}, config) //DB
    ])
    .then(axios.spread((MALdata, DBdata) => {
      MALdata = MALdata.data;
      DBdata = DBdata.data;
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
        animeToDelete.forEach(anime => delAnime(anime.id));
      }
      if(animeToAdd.length !== 0) {
        animeToAdd.forEach(anime => addAnime(anime.id));
      }

      setAnimeList(DBdata);
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





  return(
    <div>
    <Nav/>
      <div className="p-10">
      
        {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
          <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
          <div className="relative flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="font-serif text-xl text-blue pb-15">
              Shared List
          </div>
          <div className="absolute pt-10 w-full">
            <SearchBarProto addAnime={addAnime}/>
          </div>
          <div>
            <Animes animeList={animeList} delAnime={delAnime}/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ListPage;