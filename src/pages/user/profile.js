import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";

function Profile() {
	const navigate = useNavigate();
	const handleOnClickEdit = useCallback(() => navigate("edit"));
	const handleOnClickResetPassword = useCallback(() =>
		navigate("resetpassword")
	);
	return (
		<div className="page">
			<Topbar />
			<UserSidebar />
			<div className="body-text">
				<ul style={{ listStyleType: `none` }}>
					<li>帳號名稱：</li>
					<li>電子信箱：</li>
					<li>聯絡電話：</li>
				</ul>
				<button type="button" onClick={handleOnClickEdit}>
					編輯
				</button>
				<button type="button" onClick={handleOnClickResetPassword}>
					修改密碼
				</button>
			</div>
		</div>
	);
}

export default Profile;
