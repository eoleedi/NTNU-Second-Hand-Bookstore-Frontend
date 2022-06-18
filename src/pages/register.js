import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";


function page() {

	const [username   , setUsername   ] = useState('');
	const [password   , setPassword   ] = useState('');
	const [repassword , setRepassword ] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [email      , setEmail      ] = useState('');
	const [phone      , setPhone      ] = useState('');
	const navigate = useNavigate();

	async function register() {
		if (!username.trim()) {
			alert("請輸入帳號。");
			return
		}
		if (!password.trim()) {
			alert("請輸入密碼。");
			return
		}
		if (!repassword.trim()) {
			alert("請輸入確認密碼。");
			return
		}
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
		if (password.trim() != repassword.trim()) {
			alert("兩次輸入密碼不相同。");
			return
		}
		return fetch("https://ntnu.site/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
            // mode: "cors",
			credentials: "include",
			body: JSON.stringify({
				username   : username.trim(),
				password   : password.trim(),
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
					alert("註冊成功！請進行登入。");
					navigate("../login");
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
					<h1>註冊</h1>
					<div class="content">
						<div class="input-field">
							<input type="text" placeholder="帳號" autocomplete="nope" value={username} onChange={(e) => setUsername(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="密碼" autocomplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="確認密碼" autocomplete="new-password" value={repassword} onChange={(e) => setRepassword(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="text" placeholder="帳號暱稱" autocomplete="nope" value={displayName} onChange={(e) => setDisplayName(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="email" placeholder="電子信箱" autocomplete="nope" value={email} onChange={(e) => setEmail(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="tel" placeholder="聯絡電話" autocomplete="nope" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
						</div>
					</div>
					<div class="action">
						<button onClick={() => navigate("../login")}>移至登入</button>
						<button onClick={register}>確認註冊</button>
					</div>
				</div>
			</div>
		</div>
	);
}


export default page;