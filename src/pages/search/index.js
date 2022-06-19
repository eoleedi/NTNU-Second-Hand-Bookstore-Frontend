import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
import "../../css/search.css";
import Page from '../../components/SearchPage';
import Pagination from '../../components/SearchPage/Pagination';


const Search = () => {

  const {searchText} = useParams();
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    
    const fetchData = async() =>{
      try{
          setLoading(true);
          const response = await fetch(`https://ntnu.site/api/product/search`,{
              method:'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              mode: "cors",
              credentials:"include",
              body: JSON.stringify({
                keywords:searchText ,
            }),
          })
          const json = await response.json();
          // console.log(json);
          setProduct(json.data.products);
          setLoading(false);
          
      }catch(error){
          console.log("error",error);
      }
  };
  fetchData();
  },[searchText]) ;

  // get current posts
  const indexOfLastPost = currentPage* postsPerPage;
  const indexOfFirstPost = indexOfLastPost-postsPerPage;
  const currentPosts = Product.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate =(pageNumber) => setCurrentPage(pageNumber);

  return (
    <ChakraProvider>
    <div className='description'>
      <p >search result for "{searchText}" &nbsp;<FontAwesomeIcon icon={faBookOpenReader} />&nbsp;...</p>
      
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