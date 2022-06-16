import React, { useState } from 'react';
import {faComment} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
    ChakraProvider,
    FormControl,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react'



const Comment = ({productId}) => {
    const[content, setContent] = useState();

    const handleComment= async(e) =>{
        e.preventDefault();
        console.log("===");
        console.log(content);
        try{
            const response = await fetch(`https://ntnu.site/api/product/like`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                credentials:"include",
                body: JSON.stringify({
                    productId: productId,
                    comment:content,
                }), 
            });
            const json = await response.json();
            console.log(json);
            
        }catch(error){
            console.log("error",error);
        }
        //check valid user
        //e.preventDefault();
        
    };
   
    return (
        <ChakraProvider>
            
            <form >
                <FormControl>
                    <FormLabel htmlFor='content'>
                        Leave some comments if you have any question! &nbsp;
                        <FontAwesomeIcon icon={faComment}/>
                    </FormLabel>
                    <Input 
                        type='text'
                        id={productId}  
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        // aria-describedby='content-helper-text'
                        placeholder='some comment...'
                    />
                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>
                <Button  onClick={(e)=>handleComment(e)}> Add comment</Button>
            </form>
            
            
        </ChakraProvider>
        
        
    );
};
  
export default Comment;