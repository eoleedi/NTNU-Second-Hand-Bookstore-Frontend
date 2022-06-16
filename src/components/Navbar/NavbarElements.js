import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #D9D9D9;
  position: fixed;
  top: 690px;
  margin-top: 10px;
  height: 40px;
  width: 100%;
  display: flex;
  justifycontent: flex-front;
  // justifycontent: flex-end;
  // z-index: 12;
`;
  
export const NavLink = styled(Link)`
  color: #A28E8E;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  padding: 0 2rem;
  height: 100%;
  justify-content: flex-start;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;
  
// export const Bars = styled(FaBars)`
//   display: none;
//   color: #808080;
//   @media screen and (max-width: 768px) {
//     display: block;
//     position: fixed;
//     justify-content: flex-end;
//     top: 100;
//     right: 0;
//     transform: translate(-100%, 75%);
//     font-size: 1.8rem;
//     cursor: pointer;
//   }
// `;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: -24px;
  justifycontent: flex-end;
  white-space: nowrap;
  // @media screen and (max-width: 768px) {
  //   // display: none;
  // }
`;