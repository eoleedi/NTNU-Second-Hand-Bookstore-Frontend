import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/password.css";


function Password() {

	const [oldPassword    , setOldPassword    ] = useState('');
	const [newPassword    , setNewPassword    ] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	async function updatePassword() {
		if (!oldPassword.trim()) {
			alert("請輸入舊密碼。");
			return
		}
		if (!newPassword.trim()) {
			alert("請輸入新密碼。");
			return
		}
		if (!confirmPassword.trim()) {
			alert("請輸入確認密碼。");
			return
		}
		if (newPassword.trim() != confirmPassword.trim()) {
			alert("兩次輸入密碼不相同。");
			return
		}
		return fetch("https://ntnu.site/api/member/password", {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				oldPassword: oldPassword.trim(),
				newPassword: newPassword.trim(),
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status != "ok") {
					alert(response.message);
				}
				else {
					alert("更新成功！");
					navigate("../profile");
				}
			})
			.catch((err) => {
				console.log(err);
				// alert(error);
			});
	};

	return (
		<div className="page">
			<div className="content-container">
				<label for="oldPassword">舊密碼</label>
				<input
					type="password"
					id="oldPassword"
					name="舊密碼"
					placeholder="舊密碼"
					onChange={(e) => setOldPassword(e.target.value)}
				/>
				<label for="newPassword">新密碼</label>
				<input
					type="password"
					id="newPassword"
					name="新密碼"
					placeholder="新密碼"
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<label for="confirmPassword">確認密碼</label>
				<input
					type="password"
					id="confirmPassword"
					name="確認密碼"
					placeholder="確認密碼"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button onClick={updatePassword}>修改密碼</button>
			</div>
		</div>
	);
}


export default Password;