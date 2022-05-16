import { useState } from "react";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";

const ListPage = () => {
  const [error, setError] = useState();

  const addAnime = async (id) => {
    const obj = {
      malId: id,
    };

    await axios
    .post("/listings/animeAddByMalID", obj, {
      withCredentials: true
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      setError(err.response);
    });

    const config = {
      withCredentials: true
    };
    const params = {
      malId: id
    };
    await axios.post(`/addToList/${id}`, params, config)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
      setError(err.response);
    });

    // axios.all([
    //   axios.post(`/my-url`, {
    //     myVar: 'myValue'
    //   }), 
    //   axios.post(`/my-url2`, {
    //     myVar: 'myValue'
    //   })
    // ])
    // .then(axios.spread((data1, data2) => {
    //   // output of req.
    //   console.log('data1', data1, 'data2', data2)
    // }));
  }





  return(
    <div>
      <Nav/>
      {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
      <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">        
        <div className="relative flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
          <div className="font-serif text-xl text-blue pb-5">
              List 1
          </div>
          <div className="absolute pt-10 w-full">
            <SearchBarProto addAnime={addAnime}/>
          </div>
          <div>
            <Animes/>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ListPage;