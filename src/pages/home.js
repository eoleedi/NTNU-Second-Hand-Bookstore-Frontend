import React, {useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Announcement from "../components/Announcement"
import Carousel from "../components/Carousel"
import "../css/imagestyle.css";  //align picture


const Home = () => {
  
    const imageHeight = 240;
    const imageWidth  = imageHeight * 3 / 4;
    const imageSpace  = 30;
    const blockWidth  = imageWidth + imageSpace;
    const show        = Math.floor((window.innerWidth*0.7+imageSpace)/blockWidth)

    const [ProductData, setProductData] = useState([]);
	const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() =>{
            await fetch("https://ntnu.site/api/product/", {
                method: "GET",
                credentials:"include",
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
                    setProductData(response.data.products);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };

        fetchData();
    }, []);

    return (
        <div className="index-page">
            {/* <Link to="/products/search">go to search result page</Link><br/> */}
            <div id style={{ marginTop: 40, marginLeft: "auto", marginRight: "auto", width: "70%"}}>
                <h2>Top 10</h2>
            </div>
            <div id="my-carousel-container" className="my-carousel-container">
                <Carousel show={show} lastSpace={ProductData.length*blockWidth-imageSpace-window.innerWidth*0.7}>
                    {
                        ProductData.map((products, index) => {
                            let padding = 0;
                            if (index+1 === ProductData.length) { padding = 0; }
                            else                               { padding = imageSpace; }
                            return (
                                <div className="column"
                                     key={ products.productId }
                                     style={{width: imageWidth, marginRight: padding}}
                                     onClick={ () => navigate("../products/" + products.productId) } //change product to products
                                >
                                    <div className="img-container" style={{height: imageHeight, width: imageWidth}}>
                                        <img src={products.images[0]} alt='' style={{}}/>
                                    </div>
                                    <div className="product-name">{products.name}</div>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div style={{ align:"center"}}>
                <Announcement>
                </Announcement>
            </div>
        </div>
    );
}


export default Home;