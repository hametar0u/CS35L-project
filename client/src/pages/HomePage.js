import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import MinList from "../components/MinList";
import Navbar from "../components/Navbar/index";
import NewList from "../components/NewList";
import Modal from "../components/Modal";
import Nav from "../components/Nav";
import { ZoomInWrapper } from "../testpages/MotionTest";

const HomePage = () => {

  const [open, setOpen] = useState(false);

  const doClick = () => {
    setOpen(!open);
  }

  if(open) {
    return(
      <ZoomInWrapper>
      <div>

              {/* <Nav /> */}
              <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">        
                  <div className="flex flex-col w-3/4 max-w-5xl">
                  <div className="font-serif text-xl text-blue">
                    Our Anime List Home
                  </div>
                  <div className="flex flex-row gap-5">
                    <MinList/>
                    <NewList onClick={doClick}/>
                  </div>
                  </div>
              </div>
              <div className="absolute top-0 left-0 pt-50 pl-105">
                <Modal onClick={doClick}/>
              </div>
              
            </div>
            </ZoomInWrapper>
    );
  }
  else {
    return(
      <ZoomInWrapper>
      <div>
              {/* <Nav /> */}
              <div className="p-10">
              <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">               
                  <div className="flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
                  <div className="font-serif text-xl text-blue">
                    Our Anime List Home
                  </div>
                  <div className="flex flex-row gap-10">
                    <MinList/>
                    <NewList onClick={doClick}/>
                  </div>
                  </div>
              </div>
            </div>
      </div>  
      </ZoomInWrapper>
    );
  }
  
}

export default HomePage;