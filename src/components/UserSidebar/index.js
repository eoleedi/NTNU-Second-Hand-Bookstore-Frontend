import React from "react";
import { Nav, NavLink, NavMenu, PersonIcon } from "./UserSideBarElements";

class UserSidebar extends React.Component {
	render() {
		let style_profile = {
			background: "#F3CDCD",
		};
		let style_collection = {
			background: "#CEBDBD",
		};
		let style_product = {
			background: "#897B7B",
		};
		return (
			<>
				<Nav>
					<NavMenu>
						<PersonIcon />
						<NavLink to="/user/profile" style={style_profile}>
							基本資料
						</NavLink>
						<NavLink to="/user/collection" style={style_collection}>
							商品相關
						</NavLink>
						<NavLink to="/user/product" style={style_product}>
							我的商品
						</NavLink>
					</NavMenu>
				</Nav>
			</>
		);
	}
}
export default UserSidebar;
