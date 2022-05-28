import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD


//helper func
const getDifference = (array1, array2) => {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }
=======
import Profiles from "./ListProfiles";

>>>>>>> 55558b2 (added profiles to min list)

const MinAnimeCard = (props) => {
    return(
        <div>
            <div className="h-min"><img src={props.image}/></div>
        </div>
    );
};

const MinList = () => {
    const [error, setError] = useState();
    const [animeList, setAnimeList] = useState();
    const [pictureArray, setPictureArray] = useState([]);
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
          if (animeToAdd.length !== 0) {
            animeToAdd.forEach(anime => addAnime(anime.id));
          }

          let counter = 0;
          let pictures = [];
          while (counter < 4 && counter < DBdata.length) {
              if (DBdata[counter].main_picture) {
                pictures.push(DBdata[counter].main_picture.medium);
                counter++;
              }
            }
            
            setAnimeList(DBdata);
            setPictureArray(pictures);
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

    const navigate = useNavigate();
    const doEdit = () => {
        console.log("edit list");
        navigate("/list");
    
    };

    return (
        <div className="bg-lightgrey p-5 flex flex-col gap-5 w-1/2 rounded-lg" onClick={doEdit}>
            <div className="flex flex-row justify-between">
                List 1
                <button className="bg-blue w-20 rounded-full text-white" onClick={doEdit}>edit</button>
            </div>
             <Profiles/>
            <div className="flex gap-5">
            <div className="grid grid-cols-2 gap-0">
                {/* <MinAnimeCard className="object-contain h-50" image={animeList[0].main_picture.medium}/>
                <MinAnimeCard className="object-contain h-105" image={animeList[1].main_picture.medium}/>
                <MinAnimeCard className="object-contain h-105" image={animeList[2].main_picture.medium}/>
                <MinAnimeCard className="object-contain h-105" image={animeList[3].main_picture.medium}/> */}
                {pictureArray.map((picture, i) => {
                    return <MinAnimeCard className="object-contain h-50" image={picture} key={i}/>;
                })}
            </div>
        </div>

        </div>
        
        
        
    );
}



export default MinList;
