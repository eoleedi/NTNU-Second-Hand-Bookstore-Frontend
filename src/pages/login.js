import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";


function page() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function login() {
		if (!username.trim()) {
			alert("請輸入帳號。");
			return
		}
		if (!password.trim()) {
			alert("請輸入密碼。");
			return
		}
		return fetch("https://ntnu.site/api/auth/session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
            // mode: "cors",
			credentials: "include",
			body: JSON.stringify({
				username: username.trim(),
				password: password.trim(),
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
				if (response.status !== "ok") {
					alert(response.message);
				}
				else {
					alert("登入成功！跳轉至個人頁面。")
					navigate("../user");
				}
			})
			.catch((error) => {
				console.log(error);
				// alert(error);
			});
	}

	return (
		<div class="page">
			<div class="outer">
				<div class="login-form">
					<h1>登入</h1>
					<div class="content">
						<div class="input-field">
							<input type="text" placeholder="帳號" value={username} onChange={(e) => setUsername(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="密碼" value={password} onChange={(e) => setPassword(e.target.value)}></input>
						</div>
						{/* <a href="#" class="link">Forgot Your Password?</a> */}
					</div>
					<div class="action">
						<button onClick={() => navigate("../register")}>移至註冊</button>
						<button onClick={login}>確認登入</button>
					</div>
				</div>
			</div>
		</div>
	);
}


export default page;