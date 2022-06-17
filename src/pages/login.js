import React, {useState} from "react";
import Topbar from "../components/Topbar";
// import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
	async function loginFetch() {
		if (!username) {
			setErrorMsg('請輸入帳號');
			return alert(errorMsg);
		}
		if (!password) {
			setErrorMsg('請輸入密碼');
			return alert(errorMsg);
		}
		return fetch("https://ntnu.site/api/auth/session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => {
				if (!response.status === 200) {
					throw new Error(response.statusText);
				}
				if (response.status === 200) {
					navigate("../");
				}
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
				alert(errorMsg);
			});
	}
	return (
		<div class="page">
			<div class="outer">
				<Topbar />
				<div class="login-form">
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
						<button onClick={() => navigate("../register")}>Register</button>
						<button onClick={loginFetch}>Sign in</button>
						</div>
				</div>
			</div>
		</div>
	);
}



export default login;
