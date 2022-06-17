import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";


function Product() {
	const [forSaleProducts, setForSaleProducts] = useState([]);
	const [editingProducts, setEditingProducts] = useState([]);
	const [soldOutProducts, setSoldOutProducts] = useState([]);

	useEffect(() => {
		const fetchlist = async () => {
			await fetch("https://ntnu.site/api/member/products", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setForSaleProducts(data.data.forSaleProducts);
					setEditingProducts(data.data.editingProducts);
					setSoldOutProducts(data.data.soldOutProducts);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchlist();
	}, []);

	return (
		<div className="page">
			<UserSidebar />
			<div className="body-text">
				<label>已上架</label>
				{forSaleProducts &&
					forSaleProducts.map((item) => <label>{item.name}</label>)}
				<label>未上架</label>
				{editingProducts &&
					editingProducts.map((item) => <label>{item.name}</label>)}
				<label>已售出</label>
				{soldOutProducts &&
					soldOutProducts.map((item) => <label>{item.name}</label>)}
			</div>
		</div>
	);
}


export default Product;