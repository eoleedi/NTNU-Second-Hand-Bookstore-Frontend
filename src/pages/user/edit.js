import React, { useState, useEffect } from "react";
import "../../css/password.css";

function EditProfile() {
	// const navigate = useNavigate();

	const [profile, setProfile] = useState(null);

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
				.then((data) => {
					setProfile(data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchInfo();
	}, []);

	// const navigateTo = (screenName) => {
	// 	navigate(screenName);
	// };
	return (
		<div className="page">
			<div className="content-container">
				{profile && (
					<form action="">
						<label for="displayName">帳號暱稱</label>
						<input
							type="text"
							id="displayName"
							name="帳號暱稱"
							placeholder="帳號暱稱"
							value={profile.displayName}
						/>
						<label for="email">電子信箱</label>
						<input
							type="text"
							id="email"
							name="電子信箱"
							placeholder="電子信箱"
							value={profile.email}
						/>
						<label for="phone">聯絡電話</label>
						<input
							type="text"
							id="phone"
							name="聯絡電話"
							placeholder="聯絡電話"
							value={profile.phone}
						/>
						<button type="submit">儲存</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default EditProfile;
