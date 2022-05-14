import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn, //may not be needed
  NavBtnLink, // may not be needed
} from './NavbarElements';
import logo from '../logo.svg';

const Navbar = () => {
  return (
    <div>
      <Nav>
        <div className="flex flex-row gap-108">

          <div className="flex flex-row gap-2 pl-5 font-bold justify-left items-left">
          <img src={logo} className="h-20 w-20"/>
          <div className="flex items-center justify-center">
          Our Anime List
            </div>
          </div>

          <div className="flex flex-row items-right justify-right">
            {/* <Bars className="flex flex-row items-right justify-right"/> */}
            <NavMenu>
              {/* <NavLink to='/home/' activeStyle>
                Home
              </NavLink> */}
              <NavLink to='/about' activeStyle>
                About
              </NavLink>
              <NavLink to='/friends' activeStyle>
                Friends
              </NavLink>
              {/* <NavLink to='/find-user' activeStyle>
                Find
              </NavLink> */}
            </NavMenu>
            <NavBtn>
              <NavBtnLink to='/list'>Shared List</NavBtnLink>
            </NavBtn>
          </div>

        </div>
        
       
          
        </Nav>
    </div>
      
  );
};

export default Navbar;
