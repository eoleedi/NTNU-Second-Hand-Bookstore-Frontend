import React from "react";
// import "../../css/user.css";
import "../../css/password.css";

function Password() {
	// const navigate = useNavigate();
	// const navigateTo = (screenName) => {
	// 	navigate(screenName);
	// };
	return (
		<div className="page">
			<div className="content-container">
				<form action="">
					<label for="oldpassword">舊密碼</label>
					<input
						type="password"
						id="oldpassword"
						name="舊密碼"
						placeholder="舊密碼"
					/>
					<label for="newpassword">新密碼</label>
					<input
						type="password"
						id="newpassword"
						name="新密碼"
						placeholder="新密碼"
					/>
					<label for="confirmpassword">確認密碼</label>
					<input
						type="password"
						id="confirmpassword"
						name="確認密碼"
						placeholder="確認密碼"
					/>
					<button type="submit">儲存</button>
				</form>
			</div>
		</div>
	);
}

export default Password;
