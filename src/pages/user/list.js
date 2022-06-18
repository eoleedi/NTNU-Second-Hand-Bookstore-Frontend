import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function List() {

	const imageWidth  = 100;
	const priceWidth  = 100;
	const tableHeight = 370;

	const [collection, setCollection] = useState([]);
	const [history, setHistory] = useState([]);
	const navigate = useNavigate();

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
				.then((response) => {
					if (response.status != "ok") {
						alert(response.message);
					}
					else {
						setCollection(response.data.collection);
						setHistory(response.data.history);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchlist();
	}, []);

	return (
		<div className="member-page">
			<UserSidebar />
			<div className="body-text">
				<div>收藏</div>
				<Table striped bordered hover size="sm">
					<thead style={{display: "block", width: "100%"}}>
						<tr style={{display: "block"}}>
							<Row style={{marginLeft: 0, marginRight: 17}}>
								<Col sm="auto"><th style={{width: imageWidth}}>商品圖片</th></Col>
								<Col><th>商品名稱</th></Col>
								<Col sm="auto"><th style={{width: priceWidth}}>商品價格</th></Col>
							</Row>
						</tr>
					</thead>
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{collection.length > 0 ?
							collection.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}} onClick={() => navigate("../../product")}>
										<Col sm="auto"><td><img style={{width: imageWidth}} src={item.images[0]}/></td></Col>
										<Col><td>{item.name}</td></Col>
										<Col sm="auto"><td style={{width: priceWidth}}>{item.price}</td></Col>
									</Row>
								</tr>
							) : (
								<tr>
									<td colSpan={4}>暫無商品</td>	
								</tr>
							)
						}
					</tbody>
				</Table>

				<div>歷史紀錄</div>
				<Table striped bordered hover size="sm">
					<thead style={{display: "block", width: "100%"}}>
						<tr style={{display: "block"}}>
							<Row style={{marginLeft: 0, marginRight: 17}}>
								<Col sm="auto"><th style={{width: imageWidth}}>商品圖片</th></Col>
								<Col><th>商品名稱</th></Col>
								<Col sm="auto"><th style={{width: priceWidth}}>商品價格</th></Col>
							</Row>
						</tr>
					</thead>
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{history.length > 0 ?
							history.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}} onClick={() => navigate("../../product")}>
										<Col sm="auto"><td><img style={{width: imageWidth}} src={item.images[0]}/></td></Col>
										<Col><td>{item.name}</td></Col>
										<Col sm="auto"><td style={{width: priceWidth}}>{item.price}</td></Col>
									</Row>
								</tr>
							) : (
								<tr>
									<td colSpan={4}>暫無商品</td>	
								</tr>
							)
						}
					</tbody>
				</Table>
			</div>
		</div>
	);
}


export default List;