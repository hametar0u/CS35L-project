import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar/index";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";
import paul1 from "../pauls/paul1.png";
import MiniButton from "../components/MiniButton";

import CountUp from 'react-countup';
import { Circle } from 'rc-progress';
import { SlidingWrapper, CardWrapper } from "../components/MotionComponents";
import { AnimatePresence } from "framer-motion";
import HashLoader from "react-spinners/HashLoader";


const CompareUser = () => {
  const [similarity, setSimilarity] = useState();//temp
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [searchType, setSearchType] = useState("DBuser");
  const [searchInput, setSearchInput] = useState();
  const [mostSimilarUser, setMostSimilarUser] = useState();
  const [userProfile, setUserProfile] = useState(mostSimilarUser);
  const [error, setError] = useState();
  const [color, setColor] = useState("#ffffff");
  const [searchBarPlaceholder, setSearchBarPlaceholder] = useState("Site database");
  const selectedColor = "bg-purple";
  const unselectedColor = "bg-light-purple";

//   useEffect(() => {
//     if (!similarity) return;
//     if (similarity) {
//         if (progress !== similarity) {
//             setTimeout(() => {
//                 setProgress(similarity*Math.tanh(similarity/100*0.02*index))
//                 setIndex((prev) => {return progress < similarity ? prev + 1 : prev - 1;});
//             }, 10);
//         }
//     }
    
// }, [similarity, progress]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setUserProfile();

  const obj = {
    club_name: searchInput, //club
    name: searchInput, //MAL, DB user
  };

  let url;
  if (searchType === "club") {
    url = "/listings/getClubs";
  }
  else if (searchType === "MALuser") {
    url = "/listings/SearchUserMAL";
  }
  else { //DBuser
    url = "/listings/SpecificUser";
  }

  const config = {
    withCredentials: true,
    onUploadProgress(progressEvent) {
      setLoading(true);
    }
  };


  await axios 
    .post(url, obj, config)
    .then((response) => {
      setLoading(false);

      console.log(response.data);
      setSearchInput("");
      if (searchType === "club") {
        window.open(response.data, "_blank");
      }
      else {
        if (response.data.simscore === -1) {
          alert("No such user in our database!");
          setUserProfile();
        }
        else if (response.data.simscore === -2) {
          alert("User is part of your list!");
          setUserProfile();
        }
        else {
          setUserProfile(response.data);
          // const simscore = response.data.simscore === 0 ? 1 : response.data.simscore * 100;
          response.data.simscore = Math.round(response.data.simscore * 100);
          setSimilarity(response.data.simscore);
          setProgress(response.data.simscore);
        }
      }
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.status === 400) {
        alert("user doesn't exist!"); //its over if the error isn't 400
        setSearchInput("");
        setLoading(false);
      }
    });
};

const getRecommendedUser = async () => {
  await axios
    .get("/listings/ReccomendUser", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.username === '') {
        const tempUser = response.data.information[0]
        response.data = {
          username: tempUser.username,
          simscore: 0.69,
          information: {
            images: tempUser.images,
            url: tempUser.url
          }
        };
      }
      response.data.simscore = Math.round(response.data.simscore * 100);
      setMostSimilarUser(response.data);
    })
    .catch((err) => {
      console.log(err.response);
      setError(err.response);
    });
}

useEffect(() => {
  getRecommendedUser();
}, []);

useEffect(() => {
  if (searchType === "club") {
    setSearchBarPlaceholder("Search MyAnimeList clubs");
  }
  else if (searchType === "MALuser") {
    setSearchBarPlaceholder("Search for MyAnimeList users");
  }
  else { //DBuser
    setSearchBarPlaceholder("Search for fellow site users");
  }
}, [searchType]);

  return (
    <div>
      {/* <Nav /> */}
      <SlidingWrapper>
      <div className="h-full w-screen bg-gradient-to-r from-background-mint via-background-blue to-white animate-bg">
      <div className="p-10">
        <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="flex justify-between gap-x-40">
            <div className="flex flex-col gap-5 w-full relative">
                <div className="font-serif text-xl text-blue">
                  Compare with friends
                </div>
                <div className="">
                  Want to find out how similar your anime taste is to other users? Or do you want to find an anime club? 
                </div>
                <div className="text-blue">
                  Search by...
                </div>
                <div className="flex flex-col gap-5 mb-10">
                  <div className="flex flex-row gap-2">
                  <MiniButton className={searchType === "MALuser" ? selectedColor : unselectedColor} name="MAL database" handleClick={() => {setSearchType("MALuser");}}></MiniButton>
                  <MiniButton className={searchType === "DBuser" ? selectedColor : unselectedColor} name="Site database" handleClick={() => {setSearchType("DBuser");}}></MiniButton>
                  <MiniButton className={searchType === "club" ? selectedColor : unselectedColor} name="MAL clubs" handleClick={() => {setSearchType("club");}}></MiniButton>
                  </div>
                  <div>
                    <div className="w-max">
                    <div className="bg-light-blue rounded-lg w-full">
                    <form className="p-2" onSubmit={handleSubmit}>
                      <input type="text" className="w-3/4 rounded-lg px-2" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder={searchBarPlaceholder} />
                    </form>
                  </div>
                  </div>
                  </div>
                </div>
      
                <div className="font-serif text-xl text-blue">
                  Your Recommended Friend
                </div>
                
                {mostSimilarUser &&
                <AnimatePresence>
                  <CardWrapper>
                    <div className="bg-lightgrey w-max rounded-lg align-middle">
                        <div className="flex flex-row">
                          <div className="ml-20 mr-0">
                              <Profile name={mostSimilarUser.username} image={mostSimilarUser.information.images.jpg.image_url !== null ? mostSimilarUser.information.images.jpg.image_url : paul1}/>
                          </div>
                          <div className="flex flex-col gap-5 px-5 pt-10 align-middle">
                            <div className="font-bold">
                              {mostSimilarUser.simscore}% Similarity
                            </div>
                              <div>Reach out to your new friend on <a href={mostSimilarUser.information.url} className="text-blue hover:text-grey"> myanimelist.net</a>.</div>
                          </div>
                        </div>
                    </div>
                  </CardWrapper>
                </AnimatePresence>
                }
            </div>
            <div className="bg-lightgrey w-full rounded-lg px-10 py-5">
              {userProfile && 
              <>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 items-center">
                    <CountUp style={{fontWeight: 700, fontSize: 70, color: '#000000'}} end={similarity} useEasing="true" />
                    <div className="text-black text-6xl font-semibold">%</div>
                  </div>
                  <div className="h-1 relative">
                    <div className="absolute pt-200 pl-35">
                      <div className="p-5 gap-5 flex flex-col items-center text-center w-1/4">
                        <div className="w-82 h-82"><img className="rounded-full w-full h-full" src={userProfile.image !== null ? userProfile.image : paul1}/></div>
                        <div className="text-center pt-2">{userProfile.username}</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="absolute pt-122 pl-31 -z-10">
                    <div className="p-5 gap-5 flex flex-col items-center text-center w-1/4">
                      <div className="w-73 h-73"><img className="rounded-full w-full h-full" src={userProfile.image !== null ? userProfile.image : paul1}/></div>
                      <div className="text-center pt-2">{userProfile.username}</div>
                    </div>
                  </div> */}
                </div>
                <div className="z-40">
                <Circle
                    percent={progress}
                    strokeWidth="6" 
                    strokeColor="#4a8fe7" 
                    trailColor={similarity === 0 ? "#d3d3d3" : "#d3d3d3"}
                    trailWidth="6"
                /> 
                </div>
                <div>
                  {/* <div>{userProfile.username}</div> */}
                  
                  {/* <div>{userProfile.url}</div> */}
                </div>
              </>
              }
              <div className="bg-blue"><HashLoader color={"#4a8fe7"} loading={loading}/></div>
              
            </div>
          </div>
        
        </div> 
        </div>
    </div>
    </div>
    </SlidingWrapper>
    </div>
    
  );
};

export default CompareUser;