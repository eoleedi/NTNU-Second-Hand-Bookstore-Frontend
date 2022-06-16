import React, {useEffect, useState} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookOpenReader} from '@fortawesome/free-solid-svg-icons'
import "../../css/search.css";
import Page from '../../components/SearchPage';
import Pagination from '../../components/SearchPage/Pagination';
const Search = () => {
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    
    const fetchData = async() =>{
      try{
          setLoading(true);
          //先用自己的資料測試，因為搜尋功能api是POST
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
          setProduct(json);
          setLoading(false);
          
      }catch(error){
          console.log("error",error);
      }
  };
  fetchData();
  },[]) ;

  // get current posts
  const indexOfLastPost = currentPage* postsPerPage;
  const indexOfFirstPost = indexOfLastPost-postsPerPage;
  const currentPosts = Product.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate =(pageNumber) => setCurrentPage(pageNumber);

  return (
    <ChakraProvider>
    <div className='description'>
      <p >search result&nbsp;<FontAwesomeIcon icon={faBookOpenReader} />&nbsp;...</p>
      
    </div>
    
    <div className='result'>
      <Page Product={currentPosts} loading={loading}/>
      <Pagination 
          postsPerPage={postsPerPage} 
          totalPosts={Product.length} 
          paginate={paginate}
      />
    </div>
      
      
    </ChakraProvider>
      
  );
};



  
export default Search;