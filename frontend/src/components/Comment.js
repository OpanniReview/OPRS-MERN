import React, { useState } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
// import Link from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

function Comment({disable = "False", user="xyz", comment=""}) {
    if(disable === "True"){
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
            label={reviewUser}>Bruh</TextField>
        );
    }
    else{
        return (
            <TextField
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            label="Your Review">Bruh</TextField>
        );
    }
    
}

export default Comment;