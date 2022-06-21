import { ChakraProvider,Box,Image, Badge } from '@chakra-ui/react'
import { ImageList } from '@material-ui/core';
import {Link} from 'react-router-dom';
import React from 'react';
  
const Page = ({Product, loading}) => {
  if (loading){
    return <h2>Loading...</h2>
  }
  
  return (
    <ChakraProvider>
      <ImageList rowHeight={300} cols={4} style={{width:1000}}>
        { Product.map(products=> {
          let Sold;
          if (products.soldOut) Sold = "已售出"
          else                  Sold = "未售出"

          return(
            <Box key={ products.productId } borderWidth='1px' overflow='hidden'>
              <Image  ml='5' objectFit='contain' boxSize='200px' fallbackSrc='https://via.placeholder.com/150' src={products.images[0]} alt="" />
                <Box  ml='5' p='6'>
                  <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                      {Sold}
                    </Badge>
                    <Box className='Boxes'
                      color='gray.500'
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'
                      ml='2'
                    >
                    {products.likes} likes &bull; {products.views} views
                    </Box>
                  </Box>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                  >
                    <Link to={`/products/${products.productId}`}>{products.name}</Link>
                  </Box>
                  <Box>
                    <Box as='span' color='gray.600' fontSize='sm'>
                      NT.
                    </Box>
                    {products.price}
                  </Box>
                </Box>
            </Box>
          )
          
        })}
      </ImageList>
    </ChakraProvider>
  );
};
  
export default Page;