import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar/index";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";
<<<<<<< HEAD
<<<<<<< HEAD
import paul1 from "../pauls/paul1.png";
import MiniButton from "../components/MiniButton";

import CountUp from 'react-countup';
import { Circle } from 'rc-progress';
import { SlidingWrapper } from "../components/MotionComponents";
=======
>>>>>>> da45d36 (started styling friends components)
=======
import paul1 from "../pauls/paul1.png";
>>>>>>> ffeb2f9 (alignment of components)

import CountUp from 'react-countup';
import { Circle } from 'rc-progress';

const CompareUser = () => {
<<<<<<< HEAD
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
=======
  const [similarity, setSimilarity] = useState(70);//temp
  const [progress, setProgress] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!similarity) return;
    if (similarity) {
        if (progress < similarity) {
            setTimeout(() => {
                setProgress(similarity*Math.tanh(similarity/100*0.02*index))
                setIndex((prev) => {return prev + 1;});
            }, 10);
        }
    }
    
}, [similarity, progress]);
>>>>>>> 1cbfae0 (add progress)

  return (
    <div>
      {/* <Nav /> */}
      <SlidingWrapper>
      <div className="p-10">
        <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="flex justify-between gap-x-40">
<<<<<<< HEAD
<<<<<<< HEAD
            <div className="flex flex-col gap-5 w-full">
=======
            <div>
>>>>>>> da45d36 (started styling friends components)
=======
            <div className="flex flex-col gap-5">
>>>>>>> ffeb2f9 (alignment of components)
                <div className="font-serif text-xl text-blue">
                  Compare with friends
                </div>
                <div className="">
<<<<<<< HEAD
                  Want to find out how similar your anime taste is to other users? Or do you want to find an anime club? 
                </div>
                <div className="text-blue">
                  Search by...
                </div>
                <div className="flex flex-row gap-2 mb-40">
                  <MiniButton name="MAL database" handleClick={() => {setSearchType("MALuser");}}></MiniButton>
                  <MiniButton name="Site database" handleClick={() => {setSearchType("DBuser");}}></MiniButton>
                  <MiniButton name="MAL clubs" handleClick={() => {setSearchType("club");}}></MiniButton>
                </div>
                <div className="absolute pt-50 w-max">
                <form onSubmit={handleSubmit}>
                  <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="type input here" />
                </form>
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
=======
                  Want to find out how similar your anime taste is to your fellow list collaborators? 
                </div>
                <div className="text-blue mb-40">
                  Search for a friend below. 
                </div>
                <div className="absolute pt-40 w-max">
                    <SearchBarProto name="Friends"/>
                </div>
                <div className="font-serif text-xl text-blue">
                  Your Recommended Friend
                </div>
                <div className="bg-lightgrey w-max h-40 rounded-lg">
                    <div className="flex flex-row gap-5">
                      <Profile name="Jeffrey Kwan" image={paul1}/>
                    <div className="flex flex-col gap-5 p-5">
                      <div className="font-bold">
                        70% Similarity
                      </div>
                        <div>Reach out to your new friend on <a href="https://myanimelist.net/" className="text-blue hover:text-grey"> myanimelist.net</a>.</div>
                    </div>
              </div>
                </div>
            </div>
            <div className="bg-lightgrey w-full rounded-lg mt-10">
<<<<<<< HEAD
<<<<<<< HEAD
              right
>>>>>>> da45d36 (started styling friends components)
=======
              
>>>>>>> ffeb2f9 (alignment of components)
=======
              <CountUp style={{fontWeight: 700, fontSize: 120, color: '#F3C950'}} end={similarity} useEasing="true" />
              <Circle 
                  percent={progress}
                  strokeWidth="6" 
                  strokeColor="#F3C950" 
                  trailColor={similarity === 0 ? "#d3d3d3" : "#477BE8"}
                  trailWidth="6"
              /> 
>>>>>>> 1cbfae0 (add progress)
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