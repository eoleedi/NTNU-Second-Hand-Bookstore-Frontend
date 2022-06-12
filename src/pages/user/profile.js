import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../../components/UserSidebar";
import { withCookies, Cookies, useCookies } from "react-cookie";
import "../../css/user.css";
import axios from "axios";

function NavigateTo({ screenName }) {
	const navigation = useNavigate();
	return () => navigation.navigate(screenName);
}
async function loginFetch(setCookie) {
	return fetch("https://ntnu.site/api/auth/session", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Credentials": true,
		},
		mode: "cors",
		credentials: "include",
		body: JSON.stringify({
			username: "test001",
			password: "amdmmnwox",
		}),
	})
		.then((response) => {
			if (!response.status == 200) {
				throw new Error(response.statusText);
			}
			console.log(response.body.message);
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
}
function Profile() {
	const [cookies, setCookie] = useCookies(["jwt"]);
	const [login, setlogin] = useState((setCookie) => loginFetch(setCookie));
	const [profile, setProfile] = useState(() => {
		fetch("https://ntnu.site/api/member/info", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Cookie: `jwt=${cookies.jwt}`,
			},
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	const username = "";
	const displayName = "";
	const email = "";
	const phone = "";

	// let handleOnClickEdit = () => {
	// 	const navigate = useNavigate();
	// 	return useCallback(() => navigate("edit"));
	// };
	// let handleOnClickResetPassword = () => {
	// 	const navigate = useNavigate();
	// 	return useCallback(() => navigate("resetpassword"));
	// };
	return (
		<div className="page">
			<UserSidebar />
			<div className="body-text">
				<ul style={{ listStyleType: `none` }}>
					<li>帳號名稱：{username}</li>
					<li>帳號暱稱：{displayName}</li>
					<li>電子信箱：{email}</li>
					<li>聯絡電話：{phone}</li>
				</ul>
				<button type="button" onClick={NavigateTo("edit")}>
					編輯
				</button>
				<button type="button" onClick={NavigateTo("resetpassword")}>
					修改密碼
				</button>
			</div>
		</div>
	);
}
// async function Profile() {
// 	const navigate = useNavigate();
// 	const handleOnClickEdit = useCallback(() => navigate("edit"));
// 	const handleOnClickResetPassword = useCallback(() =>
// 		navigate("resetpassword")
// 	);

// 	const data = await loadData();
// 	const username = data.username;
// 	const displayName = data.displayName;
// 	const email = data.email;
// 	const phone = data.phone;
// 	return (
// 		<div className="page">
// 			<UserSidebar />
// 			<div className="body-text">
// 				<ul style={{ listStyleType: `none` }}>
// 					<li>帳號名稱：{username}</li>
// 					<li>帳號暱稱：</li>
// 					<li>電子信箱：</li>
// 					<li>聯絡電話：</li>
// 				</ul>
// 				<button type="button" onClick={handleOnClickEdit}>
// 					編輯
// 				</button>
// 				<button type="button" onClick={handleOnClickResetPassword}>
// 					修改密碼
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

export default Profile;
