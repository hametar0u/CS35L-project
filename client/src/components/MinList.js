import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Profiles from "./ListProfiles";
import { CardSlideWrapper } from "./MotionComponents";

//helper func
const getDifference = (array1, array2) => {
    return array1.filter(object1 => {
      return !array2.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }

const MinAnimeCard = (props) => {
    return(
        <div>
            <CardSlideWrapper>
                <div className=""><img className="h-40 w-30 object-cover" src={props.image}/></div>
            </CardSlideWrapper>
        </div>
    );
};

const MinList = () => {
    const [error, setError] = useState();
    const [animeList, setAnimeList] = useState([]);
    const [users, setUsers] = useState([]);
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
          axios.post("getAllUsersOfList", {}, config), //list users
        ])
        .then(axios.spread((MALdata, DBdata, ListUserData) => {
          MALdata = MALdata.data;
          DBdata = DBdata.data;
          ListUserData = ListUserData.data.users;
          console.log(ListUserData);
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
            setUsers(ListUserData);
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
        <div className="bg-lightgrey border-2 border-lightgrey hover:border-blue hover:shadow-xl p-5 flex flex-col gap-5 w-1/3 rounded-lg" onClick={doEdit}>
            <div className="flex flex-row justify-between">
                List 1
                <button className="bg-blue hover:shadow-md w-20 rounded-full text-white" onClick={doEdit}>edit</button>
            </div>
            <Profiles className="z-40" users={users}/>
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
