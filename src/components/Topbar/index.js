import React, { useState } from "react";
import { IoIosNotifications, IoMdPerson } from "react-icons/io"
import { useNavigate } from "react-router-dom";
// import { Nav, NavLink, NavMenu, PersonIcon } from "./TopBarElements";
import "../../css/topbar.css";

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
	const [errorMsg, setErrorMsg] = useState('');
	const [notifications_data, setNotification] = useState('');
	const [searchText, setSearchText] = useState('');
	// notifications_data = []
	async function fetchNotification() {
		return fetch("https://ntnu.site/api/member/notifications", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		})
			.then((response) => {
				if (!response.status === 200) {
					throw new Error(response.statusText);
				}
				console.log(response);
				return response.json()
			})
			.then((jsonData) => {
				console.log(jsonData['data']['notifications'])
				// setNotification([])
				setNotification(jsonData['data']['notifications'])
				// notifications_data = jsonData['data']['notifications']
			})
			.catch((error) => {
				console.log(error);
				// alert(errorMsg);
			});
	}
	function ClickNotification() {
		if (document.getElementById('notification').style.display == 'none') {
			document.getElementById('notification').style.display = ''
			
		}
		else {
			document.getElementById('notification').style.display = 'none'
		}
	}
	
	function getNotification() {
		fetchNotification()
		var notification_div = <div class='notis'> </div>
		var notis = []
		console.log("noifications:" + notifications_data)
		// if(notifications_data) {
			// notifications_data.array.forEach(element => {
			// 	notis.push(notification_div)
			// });
		// }
		for (var i = 0; i < notifications_data.length; i++) {
			// if(notis == null)
			// 	notis = notification_div
			// else
			// 	notis += notification_div
			notis.push(notification_div)
		}
		return (<> {notis} </>)
	}

	return (
		<>
			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
			<div class="box">
				<div class="container-2">
					<a class="title" href="#"><img src="../../logo192.png" width="35px" color="#262626"></img>二手書交易平台</a>
				</div>
				<div class="container-1" >
					<input type="search" id="search" placeholder="Search..." value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
					<button class="icon" onClick={() => { console.log("search") }}><i class="fa fa-search"></i></button>
				</div>
				<button class="icon" onClick={ClickNotification}><IoIosNotifications /></button>
				<button class="icon"><IoMdPerson /></button>
				<div id='notification' class='notification'>
					{getNotification()}
				</div>
			</div>
		</>
	);
}
export default Topbar;