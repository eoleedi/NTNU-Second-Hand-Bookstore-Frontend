import React, { useEffect, useState }  from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "../../css/ProductStyle.css";
import Carousel from "../../components/Carousel"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faBagShopping,faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
// import Comment from '../../components/Comments';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {faComment} from '@fortawesome/free-solid-svg-icons';

const ProductDetail = () => {

    const { productId } = useParams();
    const [ name             , setName             ] = useState('');
    const [ price            , setPrice            ] = useState(0);
    const [ images           , setImages           ] = useState([]);
    const [ likeNo           , setLikeNo           ] = useState(0);
    const [ viewNo           , setViewNo           ] = useState(0);
    const [ noted            , setNoted            ] = useState(false);
    const [ extraDescription , setExtraDescription ] = useState('');
    const [ ISBN             , setISBN             ] = useState('');
    const [ condition        , setCondition        ] = useState(false);
    const [ language         , setLanguage         ] = useState('');
    const [ location         , setLocation         ] = useState('');
    const [ sellerDisplayName, setSellerDisplayName] = useState('');
    const [ comments         , setComments         ] = useState([]);
    const [ cookies ] = useCookies();
    const [ isLogin, setIsLogin ] = useState(false);
    const [ liked  , setLiked   ] = useState(false);
    const [ content, setContent ] = useState('');

    // const [loading, setLoading] = useState(false);
    // const [loadnew,setLoadnew] = useState(true);
    // const [NewData, setNewData] = useState([]);
    // const [like,setLike] = useState(false);
    // const [buy,setBuy] = useState(false);
    const [addcom, setAddcom] = useState(false);

    const navigate = useNavigate();
    
    async function updateLike() {
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
                setLikeNo(response.data.details.likes)
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    //get productdata
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
                console.log(response)
                if (response.status !== "ok") {
                    alert(response.message);
                }
                else {
                    
                    setName(response.data.details.name)
                    setPrice(response.data.details.price)
                    setImages(response.data.details.images)
                    setLikeNo(response.data.details.likes)
                    setViewNo(response.data.details.views)
                    setNoted(response.data.details.noted)
                    setExtraDescription(response.data.details.extraDescription)
                    setISBN(response.data.details.ISBN);
                    setCondition(response.data.details.condition);
                    setLanguage(response.data.details.language);
                    setLocation(response.data.details.location);
                    setSellerDisplayName(response.data.details.sellerDisplayName);
                    setComments(response.data.details.comments)
                    // ISBN: "1234567890123"
                    // comments: []
                    // condition: 8
                    // createTime: "Sat, 18 Jun 2022 18:16:23 GMT"
                    // extraDescription: "Just for testing"
                    // forSale: true
                    // images: ["https://i.imgur.com/zWamFtd.jpg"]
                    // language: "中文"
                    // likes: 1
                    // location: "台師大"
                    // name: "TestProduct3"
                    // noted: true
                    // price: 123
                    // productId: 7
                    // sellerDisplayName: "AAA"
                    // soldOut: false
                    // updateTime: "Sat, 18 Jun 2022 18:16:34 GMT"
                    // views: 1

                }
            })
            .catch((err) => {
                console.log(err);
            });
        };
        
        const checkIsLiked = async() => {
            await fetch("https://ntnu.site/api/member/lists",{
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
                    response.data.collection.map((product) => {
                        if (productId === product.productId) setLiked(true)
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };

        fetchProductData();
        setIsLogin(!cookies.jwt);
        if (!cookies.jwt) checkIsLiked();

    }, [addcom]);


    //save data to localstorage
    // useEffect(()=>{
    //     window.localStorage.setItem('MY_PRODUCT_DATA',JSON.stringify(ProductData))
    // },[ProductData,loading])
    
    //grab data from localstorage
    // useEffect(()=>{
    //     setLoadnew(true)
    //     const data = window.localStorage.getItem('MY_PRODUCT_DATA');
    //     setNewData(JSON.parse(data))
    //     if(Object.keys(NewData).length !== 0 )
    //     {
    //         setLoadnew(false) 
    //         // console.log("load finish")
    //     }
    //     // console.log(NewData)
    //     // eslint-disable-next-line
    // }, [ ProductData, loading ])

    let notedString;
    if (noted) notedString = "有"
    else       notedString = "無"

    async function handleLike() {
        return fetch("https://ntnu.site/api/product/like", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: Number(productId),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status !== "ok") {
                    if (response.message === "Not logged in.") navigate("../login");
                    else alert(response.message);
                }
                else{
                    setLiked(preState => !preState);
                    updateLike();
                    alert("收藏商品成功！");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handleUnlike() {
        return fetch("https://ntnu.site/api/product/like", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                productId: Number(productId),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status !== "ok") {
                    if (response.message === "Not logged in.") navigate("../login");
                    else alert(response.message);
                }
                else {
                    setLiked(preState => !preState);
                    updateLike();
                    alert("刪除收藏商品成功！");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handleBuy() {
        return fetch("https://ntnu.site/api/product/order", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: Number(productId),
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status !== "ok") {
                    if (response.message === "Not logged in.") navigate("../login");
                    else alert(response.message);
                }
                else{
                    alert("購買（預訂）成功，請確認通知！");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    async function handleComment() {
        // console.log(String(content))
        return fetch(`https://ntnu.site/api/product/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials:"include",
            body: JSON.stringify({
                productId: Number(productId),
                content:content,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status !== "ok") {
                    alert(response.message);
                }
                else{
                    alert("新增留言成功!");
                    setAddcom(!addcom);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
    
    }
    return (
        <div>
            <div className="MainContainer" >
                <div className="ProductPreview" >
                    {/* <img src=  {NewData.images[0]} style={{width:200}}  alt="" ></img> */}
                    <Carousel show={1} lastSpace={images.length-1}>
                        {
                            images.map((image, index) => {
                                return(
                                    <div key={index}>
                                        <img src={image} alt="" style={{height:"90%"}}/>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                    
                    <div className="LikeAndViewDescription">
                        <FontAwesomeIcon icon={faThumbsUp} className="LikesAndViews"/>{likeNo}
                        <FontAwesomeIcon icon={faEye} className="LikesAndViews" />{viewNo}
                    </div>
                </div> 
                
                <div className="Word">
                    <h1 className="ProductTitle">{name}</h1>
                    <h2 className="ProductTitle">${price}</h2>
                    <p className="ProductDescription">
                        ISBN號碼：{ISBN}<br/>
                        商品新舊程度：{condition}成新<br/>
                        商品有無筆記：{notedString}<br/>
                        商品語言：{language}<br/>
                        商品描述：{extraDescription}<br/>
                        賣家地點：{location}<br/>
                        賣家姓名：{sellerDisplayName}<br/>
                    </p>
                    {/* className={liked?"ChangeLike":"Feature"}  */}
                    {
                        isLogin && (
                            <div className="Button">
                                <button onClick={handleLike} className="Feature">
                                    <FontAwesomeIcon icon={faThumbsUp} />&nbsp;Like
                                </button>
                                <button onClick={handleUnlike} className="Feature">
                                    <FontAwesomeIcon icon={faThumbsDown} />&nbsp;Unlike
                                </button>
                                <button onClick={handleBuy} className="Feature">
                                    <FontAwesomeIcon icon={faBagShopping} />&nbsp;Buy
                                </button>
                            </div>
                        )
                    }
                </div>
                
            </div>
            <div className="CommentArea">
                {/* <Comment productId={productId} comments={comments} addcom={addcom} setAddcom={setAddcom}/>        */}
                <form >                    
                    <h3 >Leave some comments below if you have any question! &nbsp;<FontAwesomeIcon icon={faComment}/></h3>
                        
                    <div class="input-field">
                        <input 
                            type='text'
                            id="comments-input"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='some comment...'
                        />
                    </div>
                    <button className='Feature' onClick={handleComment}> Add comment</button>
                </form>
            </div>
            <TableContainer sx={{height: 200,overflowX: "hidden",width: "50%",ml:50}}>
                <Table stickyHeader sx={{ height: "max-content",minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">Comment Time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    { comments.map((comment) => (
                        <TableRow
                        key={[comment.commentTime,comment.displayName]}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {comment.displayName}
                        </TableCell>
                        <TableCell align="right">{comment.content}</TableCell>
                        <TableCell align="right">{comment.commentTime}</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>   
            
        </div>
    )
};


export default ProductDetail;