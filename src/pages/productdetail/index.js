import React, {useEffect, useState}  from 'react';
import {useParams} from "react-router-dom";
import "../../css/ProductStyle.css";
import Carousel from "../../components/Carousel"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faBagShopping, faHeart} from '@fortawesome/free-solid-svg-icons'
// // import CommentList from './components/Comments/CommentList';
import Comment from '../../components/Comments';



const ProductDetail = () =>  {
    const {productId} = useParams();
    const [ProductData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadnew,setLoadnew] = useState(true);
    const [NewData, setNewData] = useState([]);
    // const [count,setCount] = useState(0);
    const [like,setLike] = useState(false);
    const [buy,setBuy] = useState(false);
    
    //add new data to db
    // const handleCount= async() =>{
    //     try{
    //         setCount(count+1);
    //         const response = await fetch(`https://ntnu.site/api/product/like`,{
    //             method:'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             mode: "cors",
    //             credentials:"include",
    //             body: JSON.stringify({
    //                 productId: productId,
    //                 likes: count,
    //             }), 
    //         });
    //         const json = await response.json();
    //         console.log(json);
            
    //     }catch(error){
    //         console.log("error",error);
    //     }
    //     //check valid user
    //     //e.preventDefault();
        
    // };
    
    
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
                console.log('json: ',json);
                setProductData((json.data.details));
                setLoading(false);
                // console.log("fetch finish")
            }catch(error){
                console.log("error",error);
            }
        };
        fetchData();
        // eslint-disable-next-line
    },[])

    

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
            console.log("load finish")
        }
        console.log(NewData)
        // eslint-disable-next-line
    },[ProductData,loading])

    
    let Noted;
    if(NewData.noted === "True")
        Noted = "有"
    else
        Noted = "無"
    
    const label = like? 'Unlike':'Like'


    const handleLike=()=> {
        setLike(preState => !preState)
    }
    const handleBuy=() => {
        setBuy(preState => !preState)
    }
    

    

    if (loadnew){
        return <h2>Loading...</h2>
        
      }
    else    
    {
        return (
                <div className="MainContainer" style={{ maxWidth: 1500, marginLeft: 60,marginBottom: 10}}>
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
                            <FontAwesomeIcon icon={faHeart} className="LikesAndViews"/>{NewData.likes}
                            <FontAwesomeIcon icon={faEye} className="LikesAndViews" />{NewData.views}
                        </div>
                    </div>  
                    
                    <div style={{Width: 300,marginLeft: 100, marginTop: 20}}>
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
                            <button onClick={handleLike} className={like?'ChangeLike':'Feature'} >
                                <FontAwesomeIcon icon={faHeart} />&nbsp;{label}
                            </button>
                            <button onClick={handleBuy} className={buy?'ChangeBuy':'Feature'}>
                                <FontAwesomeIcon icon={faBagShopping} />&nbsp;Buy
                            </button>
                        </div>
                    </div>
                    <div style={{width:"30%",marginLeft: 100,marginTop: 20}}>
                        
                        <Comment productId={productId}/>
                    </div>
                </div>
                
                
        )
    }
           
        
    
};
  
export default ProductDetail;