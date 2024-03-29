import React, { useState } from "react";
import { Typography, TextField, Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

function UploadPage() {

  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));
  let login_id = "rishabh8124@kgpian.iitkgp.ac.in";
  if (user) { login_id = user.login_id }

  const [selectedFile, setSelectedFile] = useState(null);
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('abstract', abstract);
    formData.append('authors', authors);
    formData.append('login_id', login_id);
    formData.append('title', title)

    try {
      let response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData
      });

      response = await response.json();
      if (response.status) {
        navigate('/dashboard', {replace: true, state: {
          login_id: login_id
        }});
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Typography variant="h1" gutterBottom style={{ textAlign: "center", textIndent: "20px" }}>
        Conference Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Description:
      </Typography>
      <Typography variant="body2" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis commodo nunc vitae ex commodo, non sollicitudin eros ultrices. Fusce non mauris vel velit lobortis auctor.
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Website:
      </Typography>
      <Typography variant="body2" gutterBottom>
        www.exampleconference.com
      </Typography>
      <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "bold" }}>
        Editors-in-chief:
      </Typography>
      <Typography variant="body2" gutterBottom>
        John Doe, Jane Smith
      </Typography>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        fullWidth
        value = {title}
        margin="normal"
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <TextField
        id="abstract"
        label="Abstract"
        multiline
        value={abstract}
        rows={4}
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setAbstract(e.target.value)}
      />
      <TextField
        id="authors"
        label="Authors"
        helperText="Enter author names separated by commas"
        variant="outlined"
        fullWidth
        value = {authors.join(", ")}
        margin="normal"
        onChange={(e) => {
          setAuthors(e.target.value.split(', '))
        }}
      />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <input
          accept=".pdf,.docx"
          style={{ display: "none" }}
          id="upload-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
          <Button variant="contained" component="span">
            Upload File
          </Button>
        </label>
        {/* <Typography variant="caption">
          {selectedFile ? filePath.replace('C:\\fakepath\\', '') : ''}
        </Typography> */}
      </Grid>
      <Button variant="submit" component="span" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
}

export default UploadPage;
