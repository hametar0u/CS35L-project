import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import MinList from "../components/MinList";

const ListPage = () => {
  return(
    <div>
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link>
      <div className="flex justify-left sm:justify-center w-full pt-40 pb-10">        
          <div className="flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
          <div>
            max
            <Animes/>
          </div>
          </div>
      </div>
    </div>
    
  );
}

export default ListPage;