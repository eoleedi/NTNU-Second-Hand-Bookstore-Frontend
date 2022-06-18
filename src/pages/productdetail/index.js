import React, {useEffect, useState}  from 'react';
import {useParams, useNavigate} from "react-router-dom";
import "../../css/ProductStyle.css";
import Carousel from "../../components/Carousel"
import Topbar from "../../components/Topbar";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faBagShopping,faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import Comment from '../../components/Comments';



const ProductDetail = () =>  {
    const {productId} = useParams();
    const [ProductData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadnew,setLoadnew] = useState(true);
    const [NewData, setNewData] = useState([]);
    const [like,setLike] = useState(false);
    // const [buy,setBuy] = useState(false);
    const [addcom, setAddcom] = useState(false);
    const navigate = useNavigate();
    
    
    //get productdata
    useEffect(() =>{
        
        const fetchData = async() =>{
            try{
                setLoading(true);
                const response = await fetch(`https://ntnu.site/api/product/view?productId=${productId}`,{
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: "cors",
                    credentials:"include",
                });
                const json = await response.json();
                // console.log('json: ',json);
                setProductData((json.data.details));
                setLoading(false);
                // console.log("fetch finish")
            }catch(error){
                console.log("error",error);
            }
        };
        fetchData();
        // eslint-disable-next-line
    },[like,addcom])

    

    //save data to localstorage
    useEffect(()=>{
        window.localStorage.setItem('MY_PRODUCT_DATA',JSON.stringify(ProductData))
    },[ProductData,loading])
    
    //grab data from localstorage
    useEffect(()=>{
        setLoadnew(true)
        const data = window.localStorage.getItem('MY_PRODUCT_DATA');
        setNewData(JSON.parse(data))
        if(Object.keys(NewData).length !== 0 )
        {
            setLoadnew(false) 
            // console.log("load finish")
        }
        // console.log(NewData)
        // eslint-disable-next-line
    },[ProductData,loading])

    
    let Noted;
    if(NewData.noted === "True")
        Noted = "有"
    else
        Noted = "無"
    



    async function handleLike() {
            return fetch(`https://ntnu.site/api/product/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                credentials:"include",
                body: JSON.stringify({
                    productId: Number(productId),
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status !== "ok") {
                        alert(response.message);
                    }
                    else{
                        setLike(preState => !preState);
                        alert("收藏商品成功!");
                    }
                    if(response.message === "Not logged in.")
                        navigate("../login");
                })
                .catch((error) => {
                    console.log(error);
                });
        
    }

    async function handleUnlike() {
        return fetch(`https://ntnu.site/api/product/like`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials:"include",
            body: JSON.stringify({
                productId: Number(productId),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status !== "ok") {
                    // throw new Error(response.statusText);
                    alert(response.message);
                }
                else{
                    setLike(preState => !preState);
                    alert("刪除收藏商品成功!");
                }
                if(response.message === "Not logged in.")
                    navigate("../login");
            })
            .catch((error) => {
                console.log(error);
            });
    
    }

    async function handleBuy()  {
        return fetch(`https://ntnu.site/api/product/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                credentials:"include",
                body: JSON.stringify({
                    productId: Number(productId),
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status !== "ok") {
                        // setBuy(true)
                        alert(response.message);
                    }
                    else{
                        // setBuy(true)
                        alert("購買(預訂)成功，請確認通知!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    

    if (loadnew){
        
        return (
            <div>
                <Topbar />      
                <h2>Loading...</h2>
            </div>
        )
        
      }
    else    
    {
        return (
            <div>
                <Topbar />   
                <div className="MainContainer" >
                    
                    <div className="ProductPreview" >
                        {/* <img src=  {NewData.images[0]} style={{width:200}}  alt="" ></img> */}
                        <Carousel show={1} >
                        { NewData.images.map((image,index)=> {
                            return(
                                <div key={index} >
                                    <img src={ image} alt="" style={{height:"90%"}}/>
                                </div>
                            )})}                        
                        </Carousel >
                        
                        <div className='LikeAndViewDescription'  >
                            <FontAwesomeIcon icon={faThumbsUp} className="LikesAndViews"/>{NewData.likes}
                            <FontAwesomeIcon icon={faEye} className="LikesAndViews" />{NewData.views}
                        </div>
                    </div>  
                    
                    <div className="Word">
                        <h1 className="ProductTitle"> {NewData.name}</h1>
                        <h2 className="ProductTitle">${NewData.price}</h2>
                        <p className="ProductDescription">
                            ISBN號碼：{NewData.ISBN}<br/>
                            商品新舊程度：{NewData.condition}成新<br/>
                            商品有無筆記：{Noted}<br/>
                            商品語言：{NewData.language}<br/>
                            賣家地點：{NewData.location}<br/>
                            賣家姓名：{NewData.sellerDisplayName}<br/>
                        </p>
                        
                        <div className='Button' >
                            <button onClick={handleLike} className='Feature' >
                                <FontAwesomeIcon icon={faThumbsUp} />&nbsp;Like
                            </button>
                            <button onClick={handleUnlike} className='Feature' >
                                <FontAwesomeIcon icon={faThumbsDown} />&nbsp;Unlike
                            </button>
                            <button onClick={handleBuy} className='Feature'>
                                <FontAwesomeIcon icon={faBagShopping} />&nbsp;Buy
                            </button>
                        </div>
                    </div>
                    
                </div>
                <div className='CommentArea' >
                 <Comment productId={productId} NewData={NewData} addcom={addcom} setAddcom={setAddcom}/>       
                </div>
            </div>
                
                
        )
    }
           
        
    
};
  
export default ProductDetail;