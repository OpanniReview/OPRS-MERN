import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, Container, Autocomplete } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

// import Comment from "../components/Comment";

function ReviewPage() {

  const navigate = useNavigate();
  
  const [isAdmin, SetIsAdmin] = useState(false);
  const [reviewersAvail, setReviewersAvail] = useState([]);
  const [reviewersSelected, setReviewersSelected] = useState([]);

  const {paperId} = useParams();
  const [publishedComments, setCommentsList] = useState([]);
  const [tempComments, setTempComments] = useState([]);
  const [Reviewers, setReviewers] = useState([]);

  const [Authors, setAuthors] = useState([])
  const [Abstract, setAbstract] = useState("")
  const [url, seturl] = useState(null);
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'));
  const [login_id, setLogin] = useState("")
  const [start_render, setart] = useState(true)
  
  const viewPDF = async () => {
    window.open(url, '_blank');
  }

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
      }
    } catch(error) {
      console.log(error.message);
    }
  }
  
  // handle admin review submit
  const handleReviewSubmit = async (event) => {
    
      event.preventDefault();
  
      const reviewers = {
        reviewers : reviewersSelected,
        paper_id : paperId
      }

      try {
        if (reviewersSelected.length !== 3) {
          throw Error("Select 3 reviewers")
        }

        let response = await fetch('http://localhost:4000/adminUpload', {
          method: 'POST',
          body: JSON.stringify(reviewers),
          headers:{
            'Content-Type': 'application/json'
          }
        });
  
        response = await response.json();
        if (response.status) {
          navigate('/admin', {replace: true});
          
        } else {
          throw Error("Reviewers not assigned");
        }
      } catch (error) {
        console.log(error.message);
      }
  }

  const onChangefield = (event, index) => {
    setTempComments(values => values.map((value, i) => i === index ? event.target.value: value));
  }

  useEffect(() => {
    if (start_render) {
      if (user) { setLogin(user.login_id) }
      else { navigate('/login', {required: true}) }

      // check if user is admin
      if(user.login_id === 'admin@oprs.edu.com'){
        SetIsAdmin(true)
      } 

      async function start_func() {
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
            setTempComments([...tempComments, ...response.comments])
            setAuthors(response.authors)
            setTitle(response.title)
            setReviewers([...Reviewers, ...response.reviewers])
            setPublished(response.isPublished)
            console.log(response.reviewers);
            
          } else {
            alert('Error uploading file');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Error uploading file');
        }
      }

      start_func();

      async function getReviewers() {
        try{
          let result = await fetch(
            'http://localhost:4000/upload', {
              method: "GET",
              headers:{
                'Content-Type': 'application/json'
              }
            });

            function check_admin(value) {
              return (value !== 'admin@oprs.edu.com')
            }
            result = await result.json()
            let users = result.users
            users = users.filter(check_admin)            
    
            setReviewersAvail(users)
    
        }catch(err){
          console.log(err)
        }
      }

      getReviewers();
      setart(false)
    }
  }, [login_id, navigate, user, Reviewers, paperId, publishedComments, start_render, tempComments]) 


  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "left"}}>
        {title} <IconButton onClick={viewPDF}><ArticleIcon variant="contained">Access PDF</ArticleIcon></IconButton>

       {(published) && <Typography variant="body2" gutterBottom>
        {Authors}
        </Typography>}
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
            disabled={Reviewers[index] !== login_id}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={tempComments[index]}
            onChange={(event) => {onChangefield(event, index)}}>Bruh</TextField>
          {(Reviewers[index] === login_id) && <Button onClick={(event) => addReview(event, index)}>Add Review</Button>}
        </Box>
      ))}
      
      </Typography>
      {
        isAdmin && (Reviewers.length === 0) &&
        (
          <>
            <Autocomplete
            multiple
            id="tags-outlined"
            options={reviewersAvail}
            getOptionLabel={(option) => option}
            defaultValue={[]}
            filterSelectedOptions
            onChange={(event, value) => {setReviewersSelected(value)}}
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
