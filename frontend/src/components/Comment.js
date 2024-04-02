import React, { useState } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
// import Link from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

function Comment({disable = "False", user="xyz", comment="", login_id="None", check_login_id="No", funcvalue=null, index=0, datavalue=[]}) {
    
    const updatelist = (event) => {
        const value = [...datavalue];
        value[index] = event.target.value;
        funcvalue(value);
    }    

    if(login_id != check_login_id){
        let reviewUser = "Posted by reviewer " + user;

        return (
            <TextField
            disabled
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={comment}
            label={reviewUser}
            onChange={(event) => updatelist(event)}>Bruh</TextField>
        );
    }
    else{
        return (
            
            <>
            <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            label="Your Review">Bruh</TextField>

            {/* <Button onClick={addReview}>Add Review</Button> */}
            </>
        );
    }
    
}



export default Comment;