import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar/index";
import Nav from "../components/Nav";
import { SlidingWrapper } from "../components/MotionComponents";
import SearchBarProto from "../components/SearchBarTest";
import paul1 from "../pauls/paul1.png";
import MiniButton from "../components/MiniButton";

import CountUp from 'react-countup';
import { Circle } from 'rc-progress';

const CompareUser = () => {
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

  return (
    <div>
      {/* <Nav /> */}
      <SlidingWrapper>
      <div className="p-10">
        <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="flex justify-between gap-x-40">
            <div className="flex flex-col gap-5 w-full">
                <div className="font-serif text-xl text-blue">
                  Compare with friends
                </div>
                <div className="">
                  Want to find out how similar your anime taste is to other users? Or do you want to find an anime club? 
                </div>
                <div className="text-blue">
                  Search by...
                </div>
                <div className="flex flex-row gap-2 mb-40">
                  <MiniButton name="MAL database"></MiniButton>
                  <MiniButton name="Site database"></MiniButton>
                  <MiniButton name="MAL clubs"></MiniButton>
                </div>
                <div className="absolute pt-50 w-max">
                    <SearchBarProto name="Friends"/>
                </div>
                <div className="font-serif text-xl text-blue">
                  Your Recommended Friend
                </div>
                <div className="bg-lightgrey w-max rounded-lg">
                    <div className="flex flex-row">
                    <div className="ml-20 mr-0">
                      <Profile name="YOUR FRIEND" image={paul1}/>
                    </div>
                    <div className="flex flex-col gap-5 p-5">
                      <div className="font-bold">
                        70% Similarity
                      </div>
                        <div>Reach out to your new friend on <a href="https://myanimelist.net/" className="text-blue hover:text-grey"> myanimelist.net</a>.</div>
                    </div>
              </div>
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