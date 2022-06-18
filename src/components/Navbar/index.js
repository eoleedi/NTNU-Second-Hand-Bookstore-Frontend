import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
  
      <Nav  >
        <NavMenu>
          <NavLink to="/rules" end>
            平台規範
          </NavLink>
          <NavLink to="/FAQ" end>
            FAQ
          </NavLink>
          <NavLink to="/contact" end>
            聯絡資訊
          </NavLink>
          <NavLink to="/about" end>
            關於平台
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;