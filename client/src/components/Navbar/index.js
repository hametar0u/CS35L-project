import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn, //may not be needed
  NavBtnLink, // may not be needed
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to='/home/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/friends' activeStyle>
            Friends
          </NavLink>
          <NavLink to='/find-user' activeStyle>
            Find
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Login to My Anime List</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
