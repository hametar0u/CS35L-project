import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import MinList from "../components/MinList";
import Navbar from "../components/Navbar";
import Nav from "../components/Nav";
import SearchBarProto from "../components/SearchBarTest";

const ListPage = () => {
  return(
    <div>
    <Nav/>
      <div className="p-10">
      
        {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
          <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">   
          <div className="relative flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
          <div className="font-serif text-xl text-blue pb-15">
              Shared List
          </div>
          <div className="absolute pt-10 w-full">
            <SearchBarProto/>
          </div>
          <div>
            <Animes/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ListPage;