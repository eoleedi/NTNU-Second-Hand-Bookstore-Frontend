import React from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Profile from "./pages/user/profile";
import Product from "./pages/user/product";
import Collection from "./pages/user/collection";
import User from "./pages/user/index";
function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/user" element={<User />}>
						<Route index element={<Navigate to="profile" />} />
						<Route path="profile" element={<Profile />} />
						<Route path="product" element={<Product />} />
						<Route path="collection" element={<Collection />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
