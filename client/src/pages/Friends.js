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
import { SlidingWrapper } from "../components/MotionComponents";

const CompareUser = () => {
  const [similarity, setSimilarity] = useState();//temp
  const [progress, setProgress] = useState(1);
  const [index, setIndex] = useState(0);
  const [searchType, setSearchType] = useState("DBuser");
  const [searchInput, setSearchInput] = useState();
  const [mostSimilarUser, setMostSimilarUser] = useState();
  const [userProfile, setUserProfile] = useState(mostSimilarUser);
  const [error, setError] = useState();

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


  await axios 
    .post(url, obj, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      setSearchInput("");
      if (searchType === "club") {
        window.open(response.data, "_blank");
      }
      else {
        if (response.data.information && response.data.information === {}) {
          alert("no such user!");
        }
        else {
          setUserProfile(response.data);
          // const simscore = response.data.simscore === 0 ? 1 : response.data.simscore * 100;
          setSimilarity(response.data.simscore * 100);
          setProgress(response.data.simscore * 100);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getRecommendedUser = async () => {
  await axios
    .get("/listings/ReccomendUser", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      setMostSimilarUser(response.data);
    })
    .catch((err) => {
      console.log(err);
      setError(err.response);
    });
}

useEffect(() => {
  getRecommendedUser();
}, []);

  return (
    <div>
      {/* <Nav /> */}
      <SlidingWrapper>
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
                <div className="flex flex-col gap-5 mb-30">
                  <div className="flex flex-row gap-2">
                  <MiniButton name="MAL database" handleClick={() => {setSearchType("MALuser");}}></MiniButton>
                  <MiniButton name="Site database" handleClick={() => {setSearchType("DBuser");}}></MiniButton>
                  <MiniButton name="MAL clubs" handleClick={() => {setSearchType("club");}}></MiniButton>
                  </div>
                  <div>
                    <div className="w-max">
                    <div className="bg-light-blue rounded-lg w-full">
                    <form className="p-2" onSubmit={handleSubmit}>
                      <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search Clubs" />
                    </form>
                  </div>
                  </div>
                  </div>
                </div>
                

                
                <div className="font-serif text-xl text-blue">
                  Your Recommended Friend
                </div>
                <div className="bg-lightgrey w-max rounded-lg">
                    {mostSimilarUser && 
                    <div className="flex flex-row">
                      <div className="ml-20 mr-0">
                          <Profile name={mostSimilarUser.username} image={mostSimilarUser.information.images.jpg.image_url}/>
                      </div>
                      <div className="flex flex-col gap-5 p-5">
                        <div className="font-bold">
                          {mostSimilarUser.simscore * 100}% Similarity
                        </div>
                          <div>Reach out to your new friend on <a href={mostSimilarUser.information.url} className="text-blue hover:text-grey"> myanimelist.net</a>.</div>
                      </div>
                    </div>
                    }
                </div>
            </div>
            <div className="bg-lightgrey w-full rounded-lg px-10 py-5">
              <div className="flex flex-row gap-2 items-center">
              <CountUp style={{fontWeight: 700, fontSize: 70, color: '#000000'}} end={similarity} useEasing="true" />
              <div className="text-black text-6xl font-semibold">%</div>
              </div>
              <Circle 
                  percent={progress}
                  strokeWidth="6" 
                  strokeColor="#BCD8C1" 
                  trailColor={similarity === 0 ? "#d3d3d3" : "#d3d3d3"}
                  trailWidth="6"
              /> 
              {userProfile && 
                <div>
                  <div>{userProfile.username}</div>
                </div>
              }
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