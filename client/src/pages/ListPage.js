import { useState } from "react";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";

const ListPage = () => {
  const [error, setError] = useState();

  const addAnime = async (id) => {
    const config = {
      withCredentials: true
    };
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
    }))
    .catch(err => {
      console.log(err);
      setError(err.response);
    });
  };

  const delAnime = async (id) => {
    const config = {
      withCredentials: true
    };
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
            <Animes  delAnime={delAnime}/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ListPage;