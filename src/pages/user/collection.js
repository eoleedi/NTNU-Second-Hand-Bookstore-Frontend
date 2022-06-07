import React from "react";
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
class Collection extends React.Component {
	render() {
		return (
			<div className="page">
				<UserSidebar />
				<div className="body-text"></div>
			</div>
		);
	}
}

export default Collection;
