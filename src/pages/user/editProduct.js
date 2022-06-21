import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styles from "../../css/editProduct.module.css";
import StarRating from "../../components/Rating";
import ImageUploader from "../../components/ImageUploader";
import Carousel from "../../components/Carousel";
import "../../css/imagestyle.css";  //align picture


const test = () => {

	const [ cookies ] = useCookies();
    const navigate = useNavigate();
	
    const { productId } = useParams();
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
	
	const imageHeight = 300;
	const imageWidth  = imageHeight * 3 / 4;

	async function save() {
        await fetch("https://ntnu.site/api/member/products/edit",{
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
			body: JSON.stringify({
				productId       : Number(productId),
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
			alert(response.message);
			navigate("../product");
        })
        .catch((err) => {
            console.log(err);
        });
    };

	// async function launch() {
    //     await fetch(`https://ntnu.site/api/product/view?productId=${productId}`,{
    //         method:"GET",
    //         credentials:"include",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then((response) => response.json())
    //     .then((response) => {
    //         if (response.status !== "ok") {
    //             alert(response.message);
    //         }
    //         else {
    //             setLikeNo(response.data.details.likes)
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // };

	// async function saveAndLaunch() {
    //     await fetch(`https://ntnu.site/api/product/view?productId=${productId}`,{
    //         method:"GET",
    //         credentials:"include",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then((response) => response.json())
    //     .then((response) => {
    //         if (response.status !== "ok") {
    //             alert(response.message);
    //         }
    //         else {
    //             setLikeNo(response.data.details.likes)
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // };

	useEffect(() => {

		const fetchProductData = async() => {
            await fetch(`https://ntnu.site/api/product/view?productId=${productId}`,{
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
					setISBN(response.data.details.ISBN)
					setName(response.data.details.name)
					setPrice(response.data.details.price)
					setImages(response.data.details.images)
					setCondition(response.data.details.condition)
					setNoted(response.data.details.noted)
					setLocation(response.data.details.location)
					setLanguage(response.data.details.language)
					setExtraDescription(response.data.details.extraDescription)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };

		const checkAccess = async() => {
            await fetch("https://ntnu.site/api/member/products",{
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response.status !== "ok") {
                    alert(response.message);
                }
                else {
					let access = false;
                    response.data.editingProducts.map((product) => {
                        if (productId == product.productId) access = true;
                    })
					if (!access) {
						alert("該商品不屬於您或非未上架狀態。");
						navigate("../product");
					}
					else fetchProductData();
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };
		
		if (!cookies.jwt) navigate("../../login");
		else checkAccess();

	}, []);

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
		<div className="index-page">
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
							<label htmlFor="description" style={{display: "block"}}>
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
						<input type="text"
							   placeholder="商品名稱"
							   defaultValue={name}
							   onChange={(e) => setName(e.target.value)}/>

						<label htmlFor="ISBN">ISBN</label>
						<input type="text"
							   placeholder="ISBN"
							   defaultValue={ISBN}
							   onChange={(e) => setISBN(e.target.value)}/>

						<label htmlFor="price">價格</label>
						<input type="text"
							   placeholder="價格"
							   defaultValue={price}
							   onChange={(e) => setPrice(e.target.value)}/>

						<label htmlFor="location">地點</label>
						<input type="text"
							   placeholder="地點"
							   defaultValue={location}
							   onChange={(e) => setLocation(e.target.value)}/>

						<label htmlFor="language">語言</label>
						<input type="text"
							   placeholder="語言"
							   defaultValue={language}
							   onChange={(e) => setLanguage(e.target.value)}/>
						
						<div>
							<input type="checkbox" checked={noted}
								   onClick={() => setNoted(noted => !noted)}/>
							<label htmlFor="noted">是否有筆記</label>
						</div>
						<br/>

						<label htmlFor="condition">新舊狀態</label>
						<StarRating
							rating={condition}
							setRating={setCondition}
						/>

					</div>
				</div>
				<div className={styles.buttonzone}>
					<button onClick={save}>儲存修改</button>
					{/* <button onClick={launch}>儲存修改並直接上架</button> */}
				</div>
			</div>
		</div>
	)
}


export default test;