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

    const [productData, setProductData] = useState([]);
	const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {
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
                <Carousel show={show} lastSpace={productData.length*blockWidth-imageSpace-window.innerWidth*0.7+40}>
                    {
                        productData.map((products, index) => {
                            let padding = 0;
                            if (index+1 == productData.length) { padding = 0; }
                            else                               { padding = imageSpace; }
                            return (
                                <div className="column"
                                     key={ products.productId }
                                     style={{width: imageWidth, marginRight: padding}}
                                     onClick={ () => navigate("../products/" + products.productId) }
                                >
                                    <div className="img-container" style={{height: imageHeight, width: imageWidth}}>
                                        {
                                            products.images.length > 0 ? (
                                                <img src={products.images[0]} alt=''/>
                                            ) : (
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXd5451e837N2pG4biVWIzg3IV-DeCTG4STHw3BwpBhQI2CyyZRKiTyc3MRaZRGohKcLE&usqp=CAU" alt=''/>
                                            )
                                        }
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