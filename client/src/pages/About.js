import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/index";
import SmallButton from "../components/SmallButton";
import Profile from "../components/Profile";

const handleClick = () => {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

const About = () => {
  return (
    <div>
      <Navbar />
        <div className="p-10">
        
          {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
            <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
            <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
            <div className="font-serif text-xl text-blue">
              About Us
            </div>
            <div className="">
            please add some text here
            </div>
            <div className="pb-10">
              <SmallButton name="Contact Us" handleClick={handleClick}/>
            </div>
            <div className="font-serif text-xl text-blue">Our Team</div>
            <div className="">
              <div className="flex flex-row items-center">
              <Profile name="Jeffrey Kwan" image={"https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg"}/>
              <Profile name="Margaret Capetz" image={"https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg"}/>
              <Profile name="Chancellor Richey" image={"https://samueli.ucla.edu/wp-content/uploads/samueli/Paul_Eggert.jpg"}/>
              </div>
            </div>
            
            </div> 
            </div>
      </div>
    </div>
    
  );
};

export default About;