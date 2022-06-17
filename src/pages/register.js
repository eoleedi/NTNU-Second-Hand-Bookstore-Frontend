import React, {useState} from "react";
import Topbar from "../components/Topbar";
// import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import UserSidebar from "../../components/UserSidebar";
import "../css/login.css";

function register() {
	// const navigate = useNavigate();
	// const handleOnClickEdit = useCallback(() => navigate("edit"));
	// const handleOnClickResetPassword = useCallback(() =>
	// 	navigate("resetpassword")
	// );
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();
	async function registe() {
		if (!username) {
			setErrorMsg('請輸入帳號');
			return alert(errorMsg);
		}
		if (!password) {
			setErrorMsg('請輸入密碼');
			return alert(errorMsg);
		}
		if (!repassword) {
			setErrorMsg('請重複輸入相同密碼');
			return alert(errorMsg);
		}
		if (!displayName) {
			setErrorMsg('請輸入暱稱');
			return alert(errorMsg);
		}
		if (!email) {
			setErrorMsg('請輸入Email');
			return alert(errorMsg);
		}
		if (!phone) {
			setErrorMsg('請輸入手機');
			return alert(errorMsg);
		}
		if (password != repassword) {
			setErrorMsg('請重複輸入相同密碼');
		}
		return fetch("https://ntnu.site/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				username: username,
				password: password,
				displayName: displayName,
				email: email,
				phone, phone
			}),
		})
			.then((response) => {
				if (!response.status === 200) {
					throw new Error(response.statusText);
				}
				console.log(response);
				if (response.status === 200) {
					navigate("../login");
				}
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
					<form>
						<h1>Register</h1>
						<div class="content">
						<div class="input-field">
							<input type="text" placeholder="Account" autocomplete="nope"  value={username} onChange={(e) => setUsername(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="Password" autocomplete="new-password"  value={password} onChange={(e) => setPassword(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="Repaet Password" autocomplete="new-password"  value={repassword} onChange={(e) => setRepassword(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="text" placeholder="Nickname" autocomplete="nope"  value={displayName} onChange={(e) => setDisplayName(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="email" placeholder="Email" autocomplete="nope"  value={email} onChange={(e) => setEmail(e.target.value)}></input>
						</div>
						<div class="input-field">
							<input type="tel" placeholder="Phone" autocomplete="nope"  value={phone} onChange={(e) => setPhone(e.target.value)}></input>
						</div>
						{/* <a href="#" class="link">Forgot Your Password?</a> */}
						</div>
						<div class="action">
						<button onClick={() => navigate("../login")}>Sign in</button>
						<button onClick={registe}>Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default register;