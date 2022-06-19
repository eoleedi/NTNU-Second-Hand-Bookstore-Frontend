import React, { useEffect, useState }  from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "../../css/ProductStyle.css";
import Carousel from "../../components/Carousel"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faBagShopping,faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
// import Comment from '../../components/Comments';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    const [ addcom           , setAddcom           ] = useState(false);

    const [ cookies ] = useCookies();
    const [ isLogin, setIsLogin ] = useState(false);
    const [ liked  , setLiked   ] = useState(false);
    const [ content, setContent ] = useState('');

    const navigate = useNavigate();

    const imageHeight = 300;
	const imageWidth  = imageHeight * 3 / 4;
    
    
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
                        if (productId == product.productId) setLiked(true)
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };

        fetchProductData();
        setIsLogin(!!cookies.jwt);
        if (!!cookies.jwt) checkIsLiked();

    }, [ addcom ]);

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
        return fetch(`https://ntnu.site/api/product/comment`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: Number(productId),
                content: content,
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
        <div className="MainContainer">
            <div className="SubContainer">
                <div id="carousel-container" className="carousel-container"
                        style={{height: imageHeight, width: imageWidth+40, marginLeft: 40, marginRight: 80}}>
                    <Carousel show={1} imageWidth={imageWidth}>
                        {
                            images.length > 0 ? (
                                images.map((image, index) => {
                                    return(
                                        <div key={index} className="column" style={{width: imageWidth}} >
                                            <div className="img-container" style={{height: imageHeight, width: imageWidth}}>
                                                <img src={image} alt=""/>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div key={0} className="column" style={{width: imageWidth}} >
                                    <div className="img-container" style={{height: imageHeight, width: imageWidth}}>
                                        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxH4EMC1hwjDv4FatLy_iwrioXNTv8w243tCn_RAfv17Zklck7rwM24HSo4sRkMR9aWU&usqp=CAU"} alt=""/>
                                    </div>
                                </div>
                            )
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
                        ISBN 號碼：{ISBN}<br/>
                        商品語言：{language}<br/>
                        商品新舊程度：{condition} 成新<br/>
                        商品有無筆記：{noted ? "有" : "無"}<br/>
                        賣家地點：{location}<br/>
                        賣家暱稱：{sellerDisplayName}<br/>
                        商品描述：{extraDescription}<br/>
                    </p>
                    {
                        isLogin && (
                            <div className="Button">
                                {
                                    liked ? (
                                        <button onClick={handleUnlike} className="Feature">
                                            <FontAwesomeIcon icon={faThumbsDown} />&nbsp;Unlike
                                        </button>
                                    ) : (
                                        <button onClick={handleLike} className="Feature">
                                            <FontAwesomeIcon icon={faThumbsUp} />&nbsp;Like
                                        </button>
                                    )
                                }
                                <button onClick={handleBuy} className="Feature">
                                    <FontAwesomeIcon icon={faBagShopping} />&nbsp;Buy
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            
            {
                isLogin && (
                    <div className="CommentArea">
                        <form>                 
                            <h3 >Leave some comments below if you have any question! &nbsp;<FontAwesomeIcon icon={faComment}/></h3>
                            <div class="input-field">
                                <Row>
                                    <Col>
                                        <input
                                            type="text"
                                            id="comments-input"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="some comment..."
                                        />
                                    </Col>
                                    <Col sm="auto">
                                        <button className="Feature" onClick={handleComment}>Add comment</button>
                                    </Col>
                                </Row>
                            </div>
                        </form>
                    </div>
                )
            }
    
            <TableContainer sx={{ma: 200, overflowX: "hidden"}}>
                <Table stickyHeader sx={{ height: "max-content", minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Comment Time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            comments.map((comment) => (
                                <TableRow
                                    key={[comment.commentTime,comment.displayName]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {comment.displayName}
                                    </TableCell>
                                    <TableCell>{comment.content}</TableCell>
                                    <TableCell>{comment.commentTime}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};


export default ProductDetail;