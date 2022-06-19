import React from "react";
// import logo from './logo.svg';
import {useNavigate} from "react-router-dom";
import styles from "../../css/editProduct.module.css";
import StarRating from "../../components/Rating";
import ImageUploader from "../../components/ImageUploader";

class NewProduct extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			description: "",
			productName: "",
			price: "",
			location: "",
			language: "",
			noted: false,
			condition: 0,
			isbn: "",
			images: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.launch = this.launch.bind(this);
		this.save = this.save.bind(this);
		this.setCondition = this.setCondition.bind(this);
		this.setImages = this.setImages.bind(this);
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}
	setCondition(condition) {
		this.setState({ ["condition"]: condition });
	}
	setImages(images) {
		this.setState({ ["images"]: images });
	}

	save() { //save new product
		// fetch("https://ntnu.site/api/member/products/new", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	credentials: "include",
		// 	body: JSON.stringify({
		// 		ISBN: this.state.isbn,
		// 		name: this.state.productName,
		// 		price: isNaN(parseInt(this.state.price))
		// 			? 0
		// 			: parseInt(this.state.price),
		// 		images: this.state.images,
		// 		condition: this.state.condition,
		// 		noted: this.state.noted,
		// 		location: this.state.location,
		// 		language: this.state.language,
		// 		extraDescription: this.state.description,
		// 	}),
		// })
		// 	.then((response) => response.json())
		// 	.then((response) => {
		// 		if (response.status != "ok") {
		// 			alert(response.message);
		// 		}
		// 		else {
		// 			const navigate = useNavigate();
		// 			alert("商品新增成功！");
		// 			navigate("../product");
		// 			// resetLists();
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}
	launch() {
		fetch("https://ntnu.site/api/member/products/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				ISBN: this.state.isbn,
				name: this.state.productName,
				price: isNaN(parseInt(this.state.price))
					? 0
					: parseInt(this.state.price),
				images: this.state.images,
				condition: this.state.condition,
				noted: this.state.noted,
				location: this.state.location,
				language: this.state.language,
				extraDescription: this.state.description,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status != "ok") {
					alert(response.message);
				}
				else {
					const navigate = useNavigate();
					alert("商品新增成功！");
					navigate("../product");
					// resetLists();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const inputStyle = {
			display: "block",
		};
		return (
			<div className="App">
				<div
					className={[
						styles.container,
						styles.vertical,
						styles.page_content,
					].join(" ")}
				>
					<div className={styles.container}>
						<div className={styles.panel}>
							<div>
								<label htmlFor="productImage">商品照片</label>
								<ImageUploader setImages={this.setImages} />
							</div>
							<div>
								<label htmlFor="description" style={inputStyle}>
									商品敘述
								</label>
								<textarea
									name="description"
									id="description"
									rows="10"
									cols="50"
								></textarea>
							</div>
						</div>
						<div className={styles.panel}>
							<label htmlFor="displayName">商品名稱</label>
							<input
								onChange={this.handleInputChange}
								type="text"
								id="productName"
								name="productName"
								placeholder="商品名稱"
								value={this.state.productName}
							/>
							<label htmlFor="ISBN">ISBN</label>
							<input
								onChange={this.handleInputChange}
								type="text"
								id="ISBN"
								name="isbn"
								placeholder="ISBN"
								value={this.state.isbn}
							/>
							<label htmlFor="price">價格</label>
							<input
								onChange={this.handleInputChange}
								type="text"
								id="price"
								name="price"
								placeholder="價格"
								value={this.state.price}
							/>
							<label htmlFor="location">地點</label>
							<input
								onChange={this.handleInputChange}
								type="text"
								id="location"
								name="location"
								placeholder="地點"
								value={this.state.location}
							/>
							<label htmlFor="language">語言</label>
							<input
								onChange={this.handleInputChange}
								type="text"
								id="language"
								name="language"
								placeholder="語言"
								value={this.state.language}
							/>
							<div>
								<input
									type="checkbox"
									id="noted"
									name="noted"
									checked={this.state.noted}
									onChange={this.handleInputChange}
								/>
								<label htmlFor="noted">是否有筆記</label>
							</div>
							<br />

							<label htmlFor="condition">新舊狀態</label>
							<StarRating
								name="condition"
								rating={this.state.condition}
								setRating={this.setCondition}
							/>
						</div>
					</div>
					<div className={styles.buttonzone}>
						<button onClick={this.save}>儲存</button>
						<button onClick={this.launch}>上架</button>
					</div>
				</div>
			</div>
		);
	}
}

export default NewProduct;
