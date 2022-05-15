import { Link } from "react-router-dom";
import BigButton from "./BigButton";
import logo from "./s.svg";

const Nav = () => {
  return (
    <div className="bg-light-purple flow-root items-center">
      <div className="pl-10 flex flex-row gap-5 float-left align-middle items-center">
        <img src={logo} className="w-20 h-20"/>
        <div className="font-bold">Our Anime List</div>
      </div>
      <div className="pr-10 pt-4 flex flex-row gap-10 float-right align-middle items-center">
        <Link to="/about" className="hover:text-grey">About</Link>
        <Link to="/friends" className="hover:text-grey">Friends</Link>
        <BigButton name={"SHARED LIST"}/>
      </div>
    </div>
  );
};
export default Nav;