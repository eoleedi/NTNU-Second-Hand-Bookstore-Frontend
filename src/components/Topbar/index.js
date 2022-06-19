import React, { useState,useEffect } from "react";
import { IoIosNotifications, IoMdPerson } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { handleLogout } from "../../pages/user/profile"
import { useCookies } from 'react-cookie';
// import { Nav, NavLink, NavMenu, PersonIcon } from "./TopBarElements";
import "../../css/topbar.css";
// import Search from '../../pages/search';

// class Topbar extends React.Component {
// 	render() {
// 		return (
// 			<>
// 			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
// 				<div class="box">
// 					<div class="container-2">
// 						<a class="title" href="#"><img src="../../logo192.png" width="35px" color="#262626"></img>二手書交易平台</a>
// 					</div>
// 					<div class="container-1">
// 						<input type="search" id="search" placeholder="Search..." />
// 						<button class="icon" onClick={console.log("search")}><i class="fa fa-search"></i></button>
// 					</div>
// 					<button class="icon"><IoIosNotifications /></button>
// 					<button class="icon"><IoMdPerson /></button>
// 				</div>
// 			</>
// 		);
// 	}
// }


function Topbar() {

	const [ notifications     , setNotifications     ] = useState([]);
	const [ lastTimestamp     , setLastTimestamp     ] = useState("");
	const [ searchText        , setSearchText        ] = useState("");
	const [ isLogin           , setIsLogin           ] = useState(false);
	const [ cookies ] = useCookies();
	const navigate = useNavigate();


	async function fetchNotification(read) {

		let url = "https://ntnu.site/api/member/notifications";
		url += "?read=" + read
		if (!!lastTimestamp) url += "&timestamp=" + lastTimestamp;

		return fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status !== "ok") {
					alert(response.message)
				}
				else {
					setNotifications([...notifications, ...response.data.notifications])
					setLastTimestamp(response.data.timestamp)
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function ClickNotificationIcon() {
		if (document.getElementById("notification").style.display === "none") {
			fetchNotification(true)
			document.getElementById("notification").style.display = ''
		}
		else {
			// for (let notification in notifications) {
			// 	notification.read = true
			// }
			notifications.forEach((notification) => {
				notification.read = true
			})
			document.getElementById("notification").style.display = "none"
		}
	}

	useEffect(() => {
		setIsLogin(!!cookies.jwt);
		if (!!cookies.jwt) fetchNotification(false);
	}, [])
	
	async function handleLogout() {
		await fetch("https://ntnu.site/api/auth/session", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				alert(response.message);
				if (response.status === "ok") {
					setIsLogin(!!cookies.jwt)
					navigate("../../login")
				}
			})
			.catch((error) => {
				console.log(error);
			});
    }


	return (
		<div class="box">
			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
			<div class="box">
				<div class="container-2" onClick={() => {navigate("/")}}>
					<img src="../../logo192.png" color="#262626"/><div class="title">二手書交易平台</div>
				</div>
				<div class="container-1" >
					<input type="search" id="search" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
					<button class="icon" onClick={() => { navigate(`/products/search/${searchText}`) }}><i class="fa fa-search"></i></button>
				</div>
				{!isLogin&&(<div onClick={handleLogout}>Logout</div>)}
				{isLogin&&(<div onClick={()=>navigate("../../login")}>Login</div>)}
				<button class="icon" onClick={ClickNotificationIcon}><IoIosNotifications/></button>
				<button class="icon" onClick={() => {navigate("/user/profile")}}><IoMdPerson/></button>
				<div style={{width: 20}}></div>
				<div style={{width: 0}}>
					<div id="notification" class="notification">
						<Table striped bordered hover size="sm" style={{marginBottom: 0}}>
							{
								notifications.length > 0 ?
									notifications.map((notification) => 
										notification.read ? (
											<div>
												<div className="notification-time">時間：{notification.createTime}</div>
												<div className="notification-content">內容：{notification.content}</div>
											</div>
										) : (
											<div className="notification-new">
												<div className="notification-time">時間：{notification.createTime}</div>
												<div className="notification-content">內容：{notification.content}</div>
											</div>
										)
									) : (
										<div>暫無通知</div>	
									)
							}
						</Table>
					</div>
				</div>
			</div>
		</div>
	);
}


export default Topbar;