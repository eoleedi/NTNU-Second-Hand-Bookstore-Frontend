import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/password.css";


function EditProfile() {

	const [displayName, setDisplayName] = useState('');
	const [email      , setEmail]       = useState('');
	const [phone      , setPhone]       = useState('');
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
				.then((data) => {
					setDisplayName(data.data.displayName);
					setEmail(data.data.email);
					setPhone(data.data.phone);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchInfo();
	}, []);

	async function updateInfo() {
		if (!displayName.trim()) {
			alert("請輸入帳號暱稱。");
			return
		}
		if (!email.trim()) {
			alert("請輸入電子信箱。");
			return
		}
		if (!phone.trim()) {
			alert("請輸入聯絡電話。");
			return
		}
		return fetch("https://ntnu.site/api/member/info", {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				displayName: displayName.trim(),
				email      : email.trim(),
				phone      : phone.trim(),
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
				<label for="displayName">帳號暱稱</label>
				<input
					type="text"
					id="displayName"
					name="帳號暱稱"
					placeholder="帳號暱稱"
					defaultValue={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				/>
				<label for="email">電子信箱</label>
				<input
					type="text"
					id="email"
					name="電子信箱"
					placeholder="電子信箱"
					defaultValue={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label for="phone">聯絡電話</label>
				<input
					type="text"
					id="phone"
					name="聯絡電話"
					placeholder="聯絡電話"
					defaultValue={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<button onClick={updateInfo}>更新資料</button>
			</div>
		</div>
	);
}


export default EditProfile;