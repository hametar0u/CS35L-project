import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar/index";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";
import paul1 from "../pauls/paul1.png";

const CompareUser = () => {
  return (
    <div>
      <Nav />
      <div className="p-10">
        <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="flex justify-between gap-x-40">
            <div className="flex flex-col gap-5">
                <div className="font-serif text-xl text-blue">
                  Compare with friends
                </div>
                <div className="">
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
              
            </div>
          </div>
        
        </div> 
        </div>
    </div>
    </div>
    
  );
};

export default CompareUser;