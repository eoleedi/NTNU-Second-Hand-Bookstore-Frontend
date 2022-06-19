import { IoMdPerson } from "react-icons/io";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	background: #d9d9d9;
	height: 44rem;
	width: 25rem;
	z-index: 1; /* Stay on top */
	top: 0; /* Stay at the top */
	left: 0;
	overflow-x: hidden; /* Disable horizontal scroll */
	overflow-y: hidden;
	padding-top: 60px; /* Place content 60px from the top */
`;

export const NavLink = styled(Link)`
	padding: 32px 0px 32px 0px;
	text-decoration: none;
	font-size: 32px;
	color: #000000;
	display: block;
	transition: 0.3s;
	&:hover {
		text-decoration: underline;
	}
	&[aria-current] {
		font-weight: bold;
	}
`;

export const PersonIcon = styled(IoMdPerson)`
	color: #333333;
	font-size: 12rem;
	padding-bottom: 2rem;
`;

export const NavMenu = styled.div`
	text-align: center;
`;
