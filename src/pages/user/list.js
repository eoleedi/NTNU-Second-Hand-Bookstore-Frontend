import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { Table } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserSidebar from "../../components/UserSidebar";
import "../../css/user.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function List() {

	const imageHeight = 100;
	const imageWidth  = imageHeight * 3 / 4;
	const tableHeight = 400;

	const [ collection, setCollection ] = useState([]);
	const [ history   , setHistory    ] = useState([]);

	const [ cookies ] = useCookies();
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
					if (response.status !== "ok") {
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

		if (!cookies.jwt) navigate("../../login");
		else fetchlist();
		
	}, []);


	return (
		<div className="member-page">
			<UserSidebar />
			<div className="body-text">
				<div>收藏</div>
				<Table striped bordered hover size="sm">
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{collection.length > 0 ?
							collection.map((item) =>
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}} onClick={() => navigate("../../products/" + item.productId)}>
										<Col sm="auto"><td className="img-container" style={{height: imageHeight, width: imageWidth}}>
											{
												item.images.length > 0 ? (
													<img src={item.images[0]} alt=''/>
												) : (
													<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd5451e837N2pG4biVWIzg3IV-DeCTG4STHw3BwpBhQI2CyyZRKiTyc3MRaZRGohKcLE&usqp=CAU" alt=''/>
												)
											}
										</td></Col>
										<Col sm={3} className="border-column">
											<Row><td>商品名稱：<br/>{item.name}</td></Row>
											<Row><td>商品價格：${item.price}</td></Row>
										</Col>
										<Col><td>商品描述：<br/>{
											item.extraDescription.length > 70 ?
												item.extraDescription.substring(0, 70) + "..." : item.extraDescription
										}</td></Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無喜愛過的商品！</td></Col>
									</Row>
								</tr>
							)
						}
					</tbody>
				</Table>

				<div>歷史紀錄</div>
				<Table striped bordered hover size="sm">
					<tbody style={{overflowY: "scroll", height: tableHeight, display: "block"}}>
						{history.length > 0 ?
							history.map((item) => 
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}} onClick={() => navigate("../../products/" + item.productId)}>
										<Col sm="auto"><td className="img-container" style={{height: imageHeight, width: imageWidth}}>
											{
												item.images.length > 0 ? (
													<img src={item.images[0]} alt=''/>
												) : (
													<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd5451e837N2pG4biVWIzg3IV-DeCTG4STHw3BwpBhQI2CyyZRKiTyc3MRaZRGohKcLE&usqp=CAU" alt=''/>
												)
											}
										</td></Col>
										<Col sm={3} className="border-column">
											<Row><td>商品名稱：<br/>{item.name}</td></Row>
											<Row><td>商品價格：${item.price}</td></Row>
										</Col>
										<Col><td>商品描述：<br/>{
											item.extraDescription.length > 70 ?
												item.extraDescription.substring(0, 70) + "..." : item.extraDescription
										}</td></Col>
									</Row>
								</tr>
							) : (
								<tr style={{display: "block"}}>
									<Row style={{marginLeft: 0, marginRight: 0}}>
										<Col><td>暫無看過的商品！</td></Col>
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


export default List;