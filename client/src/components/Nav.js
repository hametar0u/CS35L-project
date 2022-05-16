import BigButton from "./BigButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "./s.svg";

const Nav = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/list");
  }

  return (
    <div className="bg-light-purple flow-root items-center">
      <div className="pl-10 flex flex-row gap-5 float-left align-middle items-center">
        <img src={logo} className="w-20 h-20" />
        <div className="font-bold">Our Anime List</div>
      </div>
      <div className="pr-10 pt-4 flex flex-row gap-10 float-right align-middle items-center">
      <Link to="/home" className="hover:text-grey">Home</Link>
        <Link to="/about" className="hover:text-grey">About</Link>
        <Link to="/friends" className="hover:text-grey">Friends</Link>
        <BigButton name={"SHARED LIST"} handleClick={handleClick}/>
      </div>
    </div>
  );
};
export default Nav;