import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
async function loginFetch() {
	return fetch("https://ntnu.site/api/auth/session", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({
			username: "test001",
			password: "amdmmnwox",
		}),
	})
		.then((response) => {
			if (!response.status === 200) {
				throw new Error(response.statusText);
			}
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
}
function Profile() {
	const [profile, setProfile] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchInfo = async () => {
			await loginFetch();
			await fetch("https://ntnu.site/api/member/info", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setProfile(data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchInfo();
	}, []);

	return (
		<div className="page">
			<UserSidebar />
			<div className="body-text">
				{profile && (
					<ul style={{ listStyleType: `none` }}>
						<li>帳號名稱：{profile.username}</li>
						<li>
							帳號暱稱：
							{profile.displayName}
						</li>
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
