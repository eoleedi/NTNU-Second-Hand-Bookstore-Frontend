import "./App.css";
import React from 'react';
import Navbar from './components/Navbar';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from './pages/home';
import Search from './pages/search';
import ProductDetail from './pages/productdetail';
import Topbar from "./components/Topbar";
import Profile from "./pages/user/profile";
import Product from "./pages/user/product";
import List from "./pages/user/list";
import User from "./pages/user/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Rule from "./pages/rule";
import FAQ from "./pages/FAQ";
import About from './pages/About';
import Contact from './pages/Contact';
import Password from './pages/user/password';
import EditProfile from './pages/user/edit';
import EditProduct from './pages/user/editProduct';
import NewProduct from './pages/user/newProduct';
import ImageUploader from "./components/ImageUploader";

function App() {
	return (
		<div>
			<Router>
				<Topbar />
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
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path='/' element={<Home />} />
					<Route path='/products/search/:searchText' element={<Search/>} />
					<Route path='/products/:productId' element={<ProductDetail/>} />
					<Route path='/about' element={<About/>} />
					<Route path='/contact' element={<Contact/>} />
					<Route path='/FAQ' element={<FAQ/>} />
					<Route path='/rules' element={<Rule/>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="test" element={<ImageUploader />} />
				</Routes>
        		{/* <Navbar /> */}
			</Router>
		</div>
	);
}
  
export default App;