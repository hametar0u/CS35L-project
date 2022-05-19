import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar/index";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";

const CompareUser = () => {
  return (
    <div>
      <Nav />
      <div className="p-10">
        <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="flex justify-between gap-x-40">
            <div>
                <div className="font-serif text-xl text-blue">
                  Compare with friends
                </div>
                <div className="">
                  Want to find out how similar your anime taste is to your fellow list collaborators? 
                </div>
                <div className="text-blue mb-40">
                  Search for a friend below. 
                </div>
                <div className="absolute pt-20 w-1/3">
                    <SearchBarProto name="Friends"/>
                </div>
                <div className="font-serif text-xl text-blue">
                  Your Recommended Friend
                </div>
                <div className="bg-lightgrey w-max h-40 rounded-lg">

                </div>
            </div>
            <div className="bg-lightgrey w-full rounded-lg mt-10">
              right
            </div>
          </div>
        
        </div> 
        </div>
    </div>
    </div>
    
  );
};

export default CompareUser;