import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import LoginButton from "../components/LoginButton";
import MinList from "../components/MinList";

const HomePage = () => {
  return(
    <div>
      <Link to="/compare-user">Compare User</Link>
      <Link to="/find-user">Find User</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <div className="flex justify-left sm:justify-center w-full pt-40 pb-10">        
          <div className="flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
          <div>
            min
            <MinList/>
          </div>
          </div>
      </div>
    </div>
    
  );
}

export default HomePage;