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
import List from "./pages/user/list";
import User from "./pages/user/index";
import Password from "./pages/user/password";
import EditProfile from "./pages/user/edit";
import EditProduct from "./pages/user/editProduct";
import ImageUploader from "./components/ImageUploader";
import NewProduct from "./pages/user/newProduct";
function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/user" element={<User />}>
						<Route index element={<Navigate to="profile" />} />
						<Route path="profile" element={<Profile />} />
						<Route path="edit" element={<EditProfile />} />
						<Route path="password" element={<Password />} />
						<Route path="product" element={<Product />} />
						<Route path="list" element={<List />} />
						<Route path="editproduct" element={<EditProduct />} />
						<Route path="newproduct" element={<NewProduct />} />
					</Route>
					<Route path="test" element={<ImageUploader />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
