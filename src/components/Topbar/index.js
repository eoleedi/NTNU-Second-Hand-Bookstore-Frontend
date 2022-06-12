import React from "react";
import {IoIosNotifications, IoMdPerson} from "react-icons/io"
// import { Nav, NavLink, NavMenu, PersonIcon } from "./TopBarElements";
import "../../css/topbar.css";


class Topbar extends React.Component {
	render() {
		return (
			<>
			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
				<div class="box">
					<div class="container-2">
						<a class="title" href="#"><img src="../../logo192.png" width="35px" color="#262626"></img>二手書交易平台</a>
					</div>
					<div class="container-1">
						<input type="search" id="search" placeholder="Search..." />
						<button class="icon"><i class="fa fa-search"></i></button>
					</div>
					<button class="icon"><IoIosNotifications /></button>
					<button class="icon"><IoMdPerson /></button>
				</div>
			</>
		);
	}
}
export default Topbar;
