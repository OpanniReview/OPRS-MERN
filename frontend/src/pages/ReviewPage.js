import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, Container, Autocomplete } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Comment from "../components/Comment";


function ReviewPage() {
  
  const [isAdmin, SetIsAdmin] = useState(false);
  const [reviewers, setReviewers] = useState([]);

  const {paperId} = useParams();
  const [publishedComments, setCommentsList] = useState(["B", "r", "u"]);
  const [Authors, setAuthors] = useState([])
  const [Abstract, setAbstract] = useState("")
  const [url, seturl] = useState(null);
  const [title, setTitle] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));
  let login_id = "rishabh8124@kgpian.iitkgp.ac.in";
  if (user) { login_id = user.login_id }

  // check if user is admin
  if(login_id === 'admin@oprs.edu.in'){
    SetIsAdmin(true)
  } 

  const viewPDF = async () => {
    window.open(url, '_blank');
  }

  // Getting list of users
  async function getReviewers() {
    try{
      let result = await fetch(
        'http://localhost:4000/upload', {
          method: "GET",
          headers:{
            'Content-Type': 'application/json'
          }
        });
        result = await result.json()

        setReviewers(result.users)

    }catch(err){
      console.log(err)
    }}
    

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
        setAuthors(response.authors)
        setTitle(response.title)
        
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
    getReviewers();
    console.log(reviewers);
  }, []) 

  // handle admin review submit
  const handleReviewSubmit = () => {

  }

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
      {
        isAdmin &&
        (
          <>
            <Autocomplete
            multiple
            id="tags-outlined"
            options={reviewers}
            getOptionLabel={(option) => option}
            defaultValue={[]}
            filterSelectedOptions
            onChange={(event, value) => {setAuthors(value)}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Reviewers"
                placeholder="Favorites"
              />
              )}
            />
            <Button variant="submit" component="span" onClick={handleReviewSubmit}>
              Approve Reviewers
            </Button>
          </>)
      }
    </Container>
  );
  
}

export default ReviewPage;
