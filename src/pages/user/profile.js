import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";


function Profile() {
	
	const [ profile, setProfile ] = useState(null);
	const [ cookies ] = useCookies();
    const navigate = useNavigate();

	useEffect(() => {

		const fetchInfo = async () => {
			await fetch("https://ntnu.site/api/member/info", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status === "ok") {
						setProfile(response.data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		if (!cookies.jwt) navigate("../../login");
		else fetchInfo();

	}, []);

	
	return (
		<div className="member-page">
			<UserSidebar />
			<div className="body-text" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
				{profile && (
					<ul style={{ listStyleType: `none` }}>
						<li>帳號名稱：{profile.username}</li>
						<li>帳號暱稱：{profile.displayName}</li>
						<li>電子信箱：{profile.email}</li>
						<li>聯絡電話：{profile.phone}</li>
					</ul>
				)}
				<button type="button" onClick={() => navigate("../edit")}>
					編輯
				</button>
				<button type="button" onClick={() => navigate("../password")}>
					修改密碼
				</button>
				
			</div>
		</div>
	);
}


export default Profile;