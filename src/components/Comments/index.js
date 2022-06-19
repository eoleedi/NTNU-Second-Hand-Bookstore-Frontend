import React, { useState } from 'react';
import {faComment} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../../css/ProductStyle.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




const Comment = ({productId, comments,addcom,setAddcom}) => {
    const[content, setContent] = useState('');

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
        
    
//    console.log({NewData})
    return (
        <div>
            <form >                    
                <h3 style={{marginTop:"-20px"}}>Leave some comments below if you have any question! &nbsp;<FontAwesomeIcon icon={faComment}/></h3>
                    
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
            <TableContainer sx={{height: 200,overflowX: "hidden"}}>
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
    );
};
  
export default Comment;