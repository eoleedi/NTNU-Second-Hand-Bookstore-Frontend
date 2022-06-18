import React from "react";
// import logo from './logo.svg';
import styles from "../../css/editProduct.module.css";
import StarRating from "../../components/Rating";
import ImageUploader from "../../components/ImageUploader";

class EditProduct extends React.Component {
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
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.launch = this.launch.bind(this);
		this.save = this.save.bind(this);
		this.setCondition = this.setCondition.bind(this);
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

	save() {}
	launch() {}

	render() {
		const inputStyle = {
			display: "block",
		};
		return (
			<div className="App">
				<form action="">
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
									<ImageUploader />
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
									name="ISBN"
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
				</form>
			</div>
		);
	}
}


export default EditProduct;