import React from "react";
// import logo from './logo.svg';
import styles from "../../css/editProduct.module.css";
import StarRating from "../../components/Rating";
import ImageUploader from "../../components/ImageUploader";

function EditProduct() {
	const inputStyle = {
		display: "block",
	};
	const save = () => {};
	return (
		<div className="App">
			<form action="">
				<div className={styles.container}>
					<div className={styles.panel}>
						<div>
							<label for="productImage">商品照片</label>
							<ImageUploader />
						</div>
						<div>
							<label for="description" style={inputStyle}>
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
						<label for="displayName">商品名稱</label>
						<input
							type="text"
							id="productName"
							name="商品名稱"
							placeholder="商品名稱"
							value=""
						/>
						<label for="price">價格</label>
						<input
							type="text"
							id="price"
							name="價格"
							placeholder="價格"
							value=""
						/>
						<label for="location">地點</label>
						<input
							type="text"
							id="location"
							name="地點"
							placeholder="地點"
							value=""
						/>
						<label for="language">語言</label>
						<input
							type="text"
							id="language"
							name="語言"
							placeholder="語言"
							value=""
						/>
						<input type="checkbox" id="noted" name="筆記" />
						<label for="noted">是否有筆記</label>
						<br />

						<label for="condition">新舊狀態</label>
						<StarRating />
						<button type="submit">儲存</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default EditProduct;
