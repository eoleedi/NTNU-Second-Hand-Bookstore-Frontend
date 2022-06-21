import React from 'react';
import { ChakraProvider,Button,Box } from '@chakra-ui/react'
  
const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i=1;i<= Math.ceil(totalPosts/ postsPerPage);i++){
        pageNumbers.push(i);
    }

    return (
        <ChakraProvider>
            <div >
                {pageNumbers.map(number => (
                    <Box key={number} ml='10'  >
                        <Button  onClick={()=> paginate(number)} colorScheme='blue' variant='outline' mt='2' >
                            {number}
                        </Button>
                    </Box>
                ))}
            </div>
        </ChakraProvider>
        
    )
};
  
export default Pagination;