import { useContext } from "react";
import { UserContext } from "../App";
import axios from 'axios';
import Animes from "../components/AnimeCard";
import LoginButton from "../components/LoginButton";
import MinList from "../components/MinList";

const HomePage = () => {
  return(
    <div>
      min
      <MinList/>
      max
      <Animes/>
    </div>
  );
}

export default HomePage;