import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar/index";
import Nav from "../components/Nav";
import { SlidingWrapper } from "../components/MotionComponents";

const CompareUser = () => {
  return (
    <div>
      {/* <Nav /> */}
      <SlidingWrapper>
      <div className="p-10">
      
      {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
        <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
        <div className="font-serif text-xl text-blue">
          Compare with friends
        </div>
        <div className="">
        choose your friend
        </div>
        <div  className="flex flex-col">
          <Profile name="Paul Eggie" image={"https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg"}/>
          <Profile name="Paul Eggie" image={"https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg"}/>
          <Profile name="Paul Eggie" image={"https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg"}/>
        </div>
        
        </div> 
        </div>
    </div>
    </SlidingWrapper>
    </div>
    
  );
};

export default CompareUser;