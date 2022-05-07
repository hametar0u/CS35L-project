import { useContext } from "react";
import { UserContext } from "../App";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import LoginButton from "../components/LoginButton";

const HomePage = () => {
  return(
    <div>
      hi
      <Animes/>
    </div>
  );
}

export default HomePage;