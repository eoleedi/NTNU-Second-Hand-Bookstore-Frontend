import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
function List() {
	const [collection, setCollection] = useState([]);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const fetchlist = async () => {
			await fetch("https://ntnu.site/api/member/lists", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setCollection(data.data.collection);
					setHistory(data.data.history);
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
				<label>收藏</label>
				{collection && collection.map((item) => <label>{item.name}</label>)}
				<label>歷史紀錄</label>
				{history && history.map((item) => <label>{item.name}</label>)}
			</div>
		</div>
	);
}

export default List;
