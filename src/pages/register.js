import React from "react";
import Topbar from "../components/Topbar";
// import React, { useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import UserSidebar from "../../components/UserSidebar";
import "../css/login.css";

function register() {
	// const navigate = useNavigate();
	// const handleOnClickEdit = useCallback(() => navigate("edit"));
	// const handleOnClickResetPassword = useCallback(() =>
	// 	navigate("resetpassword")
	// );
	return (
		<div class="page">
			<div class="outer">
				<Topbar />
				<div class="login-form">
					<form>
						<h1>Register</h1>
						<div class="content">
						<div class="input-field">
							<input type="text" placeholder="Account" autocomplete="nope"></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="Password" autocomplete="new-password"></input>
						</div>
						<div class="input-field">
							<input type="password" placeholder="Repaet Password" autocomplete="new-password"></input>
						</div>
						<div class="input-field">
							<input type="text" placeholder="Nickname" autocomplete="nope"></input>
						</div>
						<div class="input-field">
							<input type="email" placeholder="Email" autocomplete="nope"></input>
						</div>
						<div class="input-field">
							<input type="tel" placeholder="Phone" autocomplete="nope"></input>
						</div>
						{/* <a href="#" class="link">Forgot Your Password?</a> */}
						</div>
						<div class="action">
						<button>Sign in</button>
						<button>Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default register;
