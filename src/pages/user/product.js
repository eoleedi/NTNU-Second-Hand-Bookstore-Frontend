import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Product() {

	const imageWidth        = 80;
	const priceWidth        = 100;
	const actionButtonWidth = 120;
	const tableHeight       = 210;

	const [forSaleProducts, setForSaleProducts] = useState([]);
	const [editingProducts, setEditingProducts] = useState([]);
	const [soldOutProducts, setSoldOutProducts] = useState([]);
	const navigate = useNavigate();
	
	async function resetLists() {
		await fetch("https://ntnu.site/api/member/products", {
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
					setForSaleProducts(response.data.forSaleProducts);
					setEditingProducts(response.data.editingProducts);
					setSoldOutProducts(response.data.soldOutProducts);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function discontinueProduct(productId, name) {
		await fetch("https://ntnu.site/api/member/products/discontinue", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status != "ok") {
					alert(response.message);
				}
				else {
					alert("商品「" + name + "」下架成功！");
					resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function launchProduct(productId, name) {
		await fetch("https://ntnu.site/api/member/products/launch", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status != "ok") {
					alert(response.message);
				}
				else {
					alert("商品「" + name + "」上架成功！");
					resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	async function outOfStockProduct(productId, name) {
		await fetch("https://ntnu.site/api/member/products/outofstock", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				productId: productId,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status != "ok") {
					alert(response.message);
				}
				else {
					alert("商品「" + name + "」標示為售出成功！");
					resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => { resetLists(); }, []);

	return (
		<div className="member-page">
			<UserSidebar />
			<div className="body-text">
				<div>已上架</div>
				<Table striped bordered hover size="sm">
					<thead style={{display: "block", width: "100%"}}>
						<tr style={{display: "block"}}>
							<Row style={{marginLeft: 0, marginRight: 17}}>
								<Col sm="auto"><th style={{width: imageWidth}}>商品圖片</th></Col>
								<Col><th>商品名稱</th></Col>
								<Col sm="auto"><th style={{width: priceWidth}}>商品價格</th></Col>
								<Col sm="auto"><th style={{width: actionButtonWidth}}>行動</th></Col>
							</Row>
						</tr>
					</thead>
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{forSaleProducts.length > 0 ?
							forSaleProducts.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col sm="auto" onClick={() => navigate("../../product")}><td><img style={{width: imageWidth}} src={item.images[0]}/></td></Col>
										<Col onClick={() => navigate("../../product")}><td>{item.name}</td></Col>
										<Col sm="auto" onClick={() => navigate("../../product")}><td style={{width: priceWidth}}>{item.price}</td></Col>
										<Col sm="auto"><td style={{width: actionButtonWidth}}>
											<button onClick={() => discontinueProduct(item.productId, item.name)}>下架</button><br/>
											<button onClick={() => outOfStockProduct(item.productId, item.name)}>標示為售出</button>
										</td></Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無商品</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>

				<div>未上架</div>
				<Table striped bordered hover size="sm">
					<thead style={{display: "block", width: "100%"}}>
						<tr style={{display: "block"}}>
							<Row style={{marginLeft: 0, marginRight: 17}}>
								<Col sm="auto"><th style={{width: imageWidth}}>商品圖片</th></Col>
								<Col><th>商品名稱</th></Col>
								<Col sm="auto"><th style={{width: priceWidth}}>商品價格</th></Col>
								<Col sm="auto"><th style={{width: actionButtonWidth}}>行動</th></Col>
							</Row>
						</tr>
					</thead>
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{editingProducts.length > 0 ?
							editingProducts.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col sm="auto" onClick={() => navigate("../../product")}><td><img style={{width: imageWidth}} src={item.images[0]}/></td></Col>
										<Col onClick={() => navigate("../../product")}><td>{item.name}</td></Col>
										<Col sm="auto" onClick={() => navigate("../../product")}><td style={{width: priceWidth}}>{item.price}</td></Col>
										<Col sm="auto"><td style={{width: actionButtonWidth}}>
											<button onClick={() => launchProduct(item.productId, item.name)}>上架</button><br/>
											<button onClick={() => navigate("../editproduct")}>編輯</button>
										</td></Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無商品</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>

				<div>已售出</div>
				<Table striped bordered hover size="sm">
					<thead style={{display: "block", width: "100%"}}>
						<tr style={{display: "block"}}>
							<Row style={{marginLeft: 0, marginRight: 17}}>
								<Col sm="auto"><th style={{width: imageWidth}}>商品圖片</th></Col>
								<Col><th>商品名稱</th></Col>
								<Col sm="auto"><th style={{width: priceWidth}}>商品價格</th></Col>
								<Col sm="auto"><th style={{width: actionButtonWidth}}>行動</th></Col>
							</Row>
						</tr>
					</thead>
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{soldOutProducts.length > 0 ?
							soldOutProducts.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col sm="auto" onClick={() => navigate("../../product")}><td><img style={{width: imageWidth}} src={item.images[0]}/></td></Col>
										<Col onClick={() => navigate("../../product")}><td>{item.name}</td></Col>
										<Col sm="auto" onClick={() => navigate("../../product")}><td style={{width: priceWidth}}>{item.price}</td></Col>
										<Col sm="auto"><td style={{width: actionButtonWidth}}>
											<button onClick={() => launchProduct(item.productId, item.name)}>上架</button><br/>
										</td></Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無商品</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>
			</div>
		</div>
	);
}


export default Product;