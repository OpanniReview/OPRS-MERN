import React, { useState } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
// import Link from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Comment from "../components/Comment";

function ReviewPage() {
  const [filePath, setFilePath] = useState("");

  let publishedComments = ["B", "r", "u"];

  const user = JSON.parse(localStorage.getItem('user'));
  let login_id = "rishabh8124@kgpian.iitkgp.ac.in";
  if (user) { login_id = user.login_id }

  const viewPDF = async () => {
    try {
      let response = await fetch('http://localhost:4000/viewpdf', {
        method: 'POST',
        body: JSON.stringify({login_id: "tharunselvam@kgpian.iitkgp.ac.in", title: 'Swami gay'}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      if (response.status) {

        const byteArray = new Uint8Array(response.blogs.data);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  }

  // TO DO:

  // Authors should be made variable, linked to their profiles
  // link to the paper to be integrated
  // title to be integrated
  // abstract to be integrated

  // Authors visibility changes
  // Reviewer visibility changes
  // Comments / Reviews to be recorded, streamlined properly
  // Comment components should be such that it is like a thread to the main comment / review.

  let title = "";
  let Authors = []
  let Abstract = ""

  let comment = "Summary Of Contributions: This study investigates the In-Sample Softmax (INAC) algorithm for Offline RL, focusing on learning from fixed datasets with incomplete action coverage. It compares INAC to similar algorithms across various environments, revealing its robust performance and competitive advantages. The analysis underscores INAC's potential in addressing offline RL challenges. \n Strengths And Weaknesses: \n Strength:This paper is clearly written and easy to follow.";
  
  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "left"}}>
        {title} <IconButton onClick={viewPDF}><ArticleIcon variant="contained">Access PDF</ArticleIcon></IconButton>

        <Typography variant="body2" gutterBottom>
        {Authors}
        </Typography>
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Abstract:
      </Typography>
      <Typography variant="body2" gutterBottom>
        {Abstract}
      </Typography>

      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Reviews:

      {publishedComments.map((comment, index) => (
        <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, mb: 2 }}>
          <Comment disable="True" comment={comment}/>
        </Box>
      ))}
      
      </Typography>
    </Container>
  );
  
}

export default ReviewPage;
