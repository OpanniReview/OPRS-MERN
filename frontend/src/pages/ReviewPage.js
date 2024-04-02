import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, Container } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Comment from "../components/Comment";


function ReviewPage() {

  const {paperId} = useParams();
  const [publishedComments, setCommentsList] = useState([]);
  const [tempComments, setTempComments] = useState([]);
  const [Reviewers, setReviewers] = useState([]);

  const [Authors, setAuthors] = useState([])
  const [Abstract, setAbstract] = useState("")
  const [url, seturl] = useState(null);
  const [title, setTitle] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));
  let login_id = "rishabh8124@kgpian.iitkgp.ac.in";
  if (user) { login_id = user.login_id }

  

  const viewPDF = async () => {
    window.open(url, '_blank');
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

  let comment = "Summary Of Contributions: This study investigates the In-Sample Softmax (INAC) algorithm for Offline RL, focusing on learning from fixed datasets with incomplete action coverage. It compares INAC to similar algorithms across various environments, revealing its robust performance and competitive advantages. The analysis underscores INAC's potential in addressing offline RL challenges. \n Strengths And Weaknesses: \n Strength:This paper is clearly written and easy to follow.";
  
  const addReview = async (event, index) => {
    setCommentsList([...tempComments])
    try {
      let response = await fetch('http://localhost:4000/addcomment', {
        method: 'POST',
        body: JSON.stringify({paper_id: paperId, comment: tempComments}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response) {
        response = response.json();
        console.log(response);
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  const onChangefield = (event, index) => {
    setTempComments(values => values.map((value, i) => i === index ? event.target.value: value));
  }

  const start_func = async() => {
    try {
      let response = await fetch('http://localhost:4000/getpaperdetails', {
        method: 'POST',
        body: JSON.stringify({paper_id: paperId}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      if (response.status) {
        response = response.paper_details[0]

        const byteArray = new Uint8Array(response.pdfdata.data);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        seturl(URL.createObjectURL(blob));
        setAbstract(response.abstract);
        setCommentsList([...publishedComments, ...response.comments]);
        setTempComments([...publishedComments]);
        setAuthors(response.authors)
        setTitle(response.title)
        setReviewers([...Reviewers, ...response.reviewers])

        console.log(Reviewers)
        
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  }

  useEffect(() => {
    start_func();
  }, []) 

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
          <TextField
            disabled={Reviewers[index] != login_id}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={publishedComments[index]}
            onChange={(event) => {onChangefield(event, index)}}>Bruh</TextField>
          {(Reviewers[index] === login_id) && <Button onClick={(event) => addReview(event, index)}>Add Review</Button>}
        </Box>
      ))}
      
      </Typography>
    </Container>
  );
  
}

export default ReviewPage;
