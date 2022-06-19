import React from "react";
import { Nav, NavLink, NavMenu, PersonIcon } from "./UserSideBarElements";


class UserSidebar extends React.Component {
	render() {
		let style_profile = {
			background: "#F3CDCD",
		};
		let style_list = {
			background: "#CEBDBD",
		};
		let style_product = {
			background: "#897B7B",
		};
		let style_new_product ={
			background:"#CEBDBD",
		};
		return (
			<Nav>
				<NavMenu>
					<PersonIcon />
					<NavLink to="/user/profile" style={style_profile}>
						基本資料
					</NavLink>
					<NavLink to="/user/list" style={style_list}>
						商品相關
					</NavLink>
					<NavLink to="/user/product" style={style_product}>
						我的商品
					</NavLink>
					<NavLink to="/user/newproduct" style={style_new_product}>
						新增商品
					</NavLink>
				</NavMenu>
			</Nav>
		);
	}
}


export default UserSidebar;