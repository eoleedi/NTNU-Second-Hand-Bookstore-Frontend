import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
  
      <Nav  >
        <NavMenu>
          <NavLink to="/about" end>
            平台規範
          </NavLink>
          <NavLink to="/contact" end>
            FAQ
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;