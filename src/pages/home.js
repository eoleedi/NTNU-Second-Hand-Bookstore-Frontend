import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Announcement from "../components/Announcement"
import Carousel from "../components/Carousel"
import "../css/imagestyle.css"; //align picture

// http://localhost:3000/productarray  //json : local data test slider
// https://ntnu.site/api/product       //json.data.data.products

const Home = () => {
  
  const [ProductData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async() =>{
      try{
          const response = await fetch(`http://localhost:3000/productarray`,{
              method:'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              mode: "cors",
              credentials:"include",
          });
          const json = await response.json();
          // console.log(json);
          setProductData((json));
          
      }catch(error){
          console.log("error",error);
      }
  };
  fetchData();
  },[]) ;
  // console.log(ProductData);
  
  return (

    <div>
      
      <Link to="/products/search">go to search result page</Link>
      <br/>
                 
      <div style={{ marginTop: 60, marginLeft: 310, height: 50}}>
          <h2>Top 10</h2>
      </div>
      <div style={{ align:"center", maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', marginBottom: 40}}>
        <Carousel show={4}>
        
          { ProductData.map(products=> {
            return(
              <div className="column" key={ products.productId } style={{width: 134}}>
              <img src={ products.images[0]} alt="" style={{height:"80%",width:"95%"}}/>
              <br />
              <Link to={`/products/${products.productId}`}>{products.name}</Link> 
              </div>
            )})}
              
          
        
        </Carousel>
      </div>
      <div style={{ align:"center"}}>
        <Announcement>
        </Announcement>
      </div>
      
    </div>
  );
};



  
export default Home;