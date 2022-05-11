import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import MinList from "../components/MinList";
import Navbar from "../components/Navbar/index";

const HomePage = () => {
  return(
    <div className="p-10">
      <Navbar />
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/compare-user">Compare User</Link>
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/find-user">Find User</Link>
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/about">About</Link>
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/contact">Contact</Link>
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