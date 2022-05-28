import { Link } from "react-router-dom";
import SmallButton from "../components/SmallButton";
import Profile from "../components/Profile";
import Nav from "../components/Nav";
import paul1 from "../pauls/paul1.png";
import paul2 from "../pauls/paul2.png";
import paul3 from "../pauls/paul3.jpg";
import { SlidingWrapper } from "../components/MotionComponents";

const handleClick = () => {
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

const About = () => {
  return (
    <div>
      {/* <Nav/> */}
      <SlidingWrapper>
        <div className="h-max w-screen bg-gradient-to-r from-mint via-light-blue to-purple animate-bg">
        <div className="p-10">
          {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
            <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
            <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
            <div className="font-serif text-xl text-blue">
              About Us
            </div>
            <div className="">
              We are a passionate group of developers hoping to connect the Anime community which has remained isolated and forgotten since long before time. 
              We are under the tutelage of the Great Paul Eggert. He is the Master of Time aka the Time Ward.
              We aim to unite the individuals who watch Naruto at 4AM on the daily. We know that Anime has the power to transport and transcend. We preach the truth. Join us today and contact us now. 
            </div>
            <div className="pb-10">
              <SmallButton name="Contact Us" handleClick={handleClick}/>
            </div>
            <div className="font-serif text-xl text-blue">Our Team</div>
            <div className="">
              <div className="flex flex-row items-center">
              <Profile name="Jeffrey Kwan" image={paul1}/>
              <Profile name="Margaret Capetz" image={paul2}/>
              <Profile name="Chancellor Richey" image={paul3}/>
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

export default About;