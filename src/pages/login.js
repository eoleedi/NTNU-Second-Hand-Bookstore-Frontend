import React, {useState} from "react";
import Topbar from "../components/Topbar";
// import React, { useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import UserSidebar from "../../components/UserSidebar";
import "../css/login.css";

function login() {
	// const navigate = useNavigate();
	// const handleOnClickEdit = useCallback(() => navigate("edit"));
	// const handleOnClickResetPassword = useCallback(() =>
	// 	navigate("resetpassword")
	// );
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	async function signin () {
		if (!username) {
			setErrorMsg('請輸入帳號');
			return;
		}
		if (!password) {
			setErrorMsg('請輸入密碼');
			return;
		}
		console.log("here")
		let body = {
			"username": username,
			"passowrd": password
		}
		await fetch("https://ntnu.site/api/auth/session", {
		  method: "POST",
		  headers: {
			'Content-Type': 'application/json'
		  },
		  mode: "no-cors",
		  body: JSON.stringify(body),
		})
		.then((response) => {
			// 這裡會得到一個 ReadableStream 的物件
			console.log(response);
		})
		.catch((error) => console.log(error));
	}
	return (
		<div class="page">
			<div class="outer">
				<Topbar />
				<div class="login-form">
					<form id="login-form">
						<h1>Login</h1>
						<div class="content">
						<div class="input-field">
							<input name="username" type="text" placeholder="Account or Email" value={username} onChange={(e) => setUsername(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
						</div>
						{/* <a href="#" class="link">Forgot Your Password?</a> */}
						</div>
						<div class="action">
						<button>Register</button>
						<button onClick={signin}>Sign in</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}



export default login;
