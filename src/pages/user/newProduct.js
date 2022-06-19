import React,{ useEffect, useState } from "react";
// import logo from './logo.svg';
import {useNavigate} from "react-router-dom";
import styles from "../../css/editProduct.module.css";
import StarRating from "../../components/Rating";
import ImageUploader from "../../components/ImageUploader";
import Carousel from "../../components/Carousel";
import "../../css/imagestyle.css";  //align picture

const NewProduct =() =>{
	
	const [ ISBN            , setISBN             ] = useState('');
	const [ name            , setName             ] = useState('');
    const [ price           , setPrice            ] = useState(0);
    const [ images          , setImages           ] = useState([]);
    const [ condition       , setCondition        ] = useState(0);
    const [ noted           , setNoted            ] = useState(false);
    const [ location        , setLocation         ] = useState('');
    const [ language        , setLanguage         ] = useState('');
    const [ extraDescription, setExtraDescription ] = useState('');
	const [ displayImageDivs, setDisplayImageDivs ] = useState([]);
	const navigate = useNavigate();
	const imageHeight = 300;
	const imageWidth  = imageHeight * 3 / 4;

	
	async function launch() {
		await fetch("https://ntnu.site/api/member/products/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				ISBN            : ISBN.trim(),
				name            : name.trim(),
				price           : price,
				images          : images,
				condition       : condition,
				noted           : noted,
				location        : location.trim(),
				language        : language.trim(),
				extraDescription: extraDescription.trim(),
			}),
		})
		.then((response) => response.json())
		.then((response) => {
			if (response.status !== "ok") {
				alert(response.message);
			}
			else {
				
				alert("商品新增成功！");
				navigate("../product");
				// resetLists();
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}
	useEffect(() => {
		const displayImageDivsTmp = images.map((image, index) => {
			return (
				<div key={index} className="column" style={{width: imageWidth}} >
					<div className="img-container" style={{height: imageHeight, width: imageWidth}}>
						<img src={image} alt=""/>
					</div>
				</div>
			)
		})
		displayImageDivsTmp.push(
			<div key={100} className="column" style={{width: imageWidth}}>
				<div className="img-container" style={{height: imageHeight, width: imageWidth}}>
					<ImageUploader className="image-uploader"
								   setImages={setImages}
								   images={images}
								   displayImageDivs={displayImageDivsTmp}/>
				</div>
			</div>
		)
		setDisplayImageDivs(displayImageDivsTmp)
	}, [ images ])

	
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
						<label htmlFor="productImage" style={{marginBottom: 10}}>商品照片</label>

						<div id="carousel-container" className="carousel-container" style={{height: imageHeight, width: imageWidth+40, marginLeft: 50, marginBottom: 30}}>
							<Carousel show={1} imageWidth={imageWidth}>
								{displayImageDivs}
							</Carousel>
						</div>
						<div>
							<label htmlFor="description"  style={{display: "block"}}>
								商品敘述
							</label>
							<textarea rows="10" cols="50"
								defaultValue={extraDescription}
								onChange={(e) => setExtraDescription(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className={styles.panel}>
						<label htmlFor="displayName">商品名稱</label>
						<input
							// onChange={this.handleInputChange}
							type="text"
							id="productName"
							name="productName"
							placeholder="商品名稱"
							// value={this.state.productName}
							onChange={(e) => setName(e.target.value)}
						/>
						<label htmlFor="ISBN">ISBN</label>
						<input
							// onChange={this.handleInputChange}
							type="text"
							id="ISBN"
							name="isbn"
							placeholder="ISBN"
							// value={this.state.isbn}
							onChange={(e) => setISBN(e.target.value)}
						/>
						<label htmlFor="price">價格</label>
						<input
							// onChange={this.handleInputChange}
							type="text"
							id="price"
							name="price"
							placeholder="價格"
							// value={this.state.price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<label htmlFor="location">地點</label>
						<input
							// onChange={this.handleInputChange}
							type="text"
							id="location"
							name="location"
							placeholder="地點"
							onChange={(e) => setLocation(e.target.value)}
							// value={this.state.location}
						/>
						<label htmlFor="language">語言</label>
						<input
							// onChange={this.handleInputChange}
							type="text"
							id="language"
							name="language"
							placeholder="語言"
							onChange={(e) => setLanguage(e.target.value)}
							// value={this.state.language}
						/>
						<div>
							<input
								type="checkbox"
								id="noted"
								name="noted"
								// checked={this.state.noted}
								defaultChecked={noted}
								// onChange={this.handleInputChange}
								onClick={() => setNoted(noted => !noted)}
							/>
							<label htmlFor="noted">是否有筆記</label>
						</div>
						<br />

						<label htmlFor="condition">新舊狀態</label>
						<StarRating
							name="condition"
							rating={condition}
							setRating={setCondition}
						/>
					</div>
				</div>
				<div className={styles.buttonzone}>
					<button onClick={launch}>上架</button>
				</div>
			</div>
		</div>
	);
// 	}
}

export default NewProduct;
