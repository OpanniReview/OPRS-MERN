import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {

  let location = useLocation();

  let login_id = "rishabh8124@kgpian.iitkgp.ac.in"
  if (location.state) login_id = location.state.login_id;

  const [publishedBlogs, setPublishedBlogs] = useState([
    { title: 'Published Blog 1', coAuthors: ['Author 1', 'Author 2'] },
    { title: 'Published Blog 2', coAuthors: ['Author 1'] },
  ]);

  const [uploadedpage, setUploadedPage] = useState(false);

  const func = (async() => {
    try {
      let result = await fetch(
        'http://localhost:4000/fetchallpapers', {
          method: "post",
          body: JSON.stringify({ login_id }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        result = await result.json();

        let temp_blogs = []

        if (result.blogs) {
          for(let i=0; i < result.blogs.blogs_and_comments.length; i++) {
            temp_blogs.push({
              title: result.blogs.blogs_and_comments[i].title,
              coAuthors: result.blogs.blogs_and_comments[i].post.authors
            })              
          }

          setPublishedBlogs([...publishedBlogs, ...temp_blogs])
        }  
    } catch(error) {
      console.log(error);
    }
  })

  if (uploadedpage === false) {
    func();
    setUploadedPage(true);
  }

  const draftBlogs = [
    { title: 'Draft Blog 1', lastEdited: '2022-05-15' },
    { title: 'Draft Blog 2', lastEdited: '2022-05-20' },
    // Add more draft blogs as needed
  ];

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box mt={4}>
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          {/* Left column content goes here */}
          {/* Currently empty */}
        </Grid>
        {/* Right column */}
        <Grid item xs={12} md={8}>
          {/* Tabs for switching between published and draft blogs */}
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Published Blogs" />
              <Tab label="Draft Blogs" />
            </Tabs>
          </AppBar>
          {/* Display the selected blogs */}
          {tabValue === 0 && (
            <>
              {publishedBlogs.map((blog, index) => (
                <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Co-Authors: {blog.coAuthors.join(', ')}
                  </Typography>
                  {/* Add more details about the published blog if needed */}
                </Box>
              ))}
            </>
        )}
          {tabValue === 1 && (
            <>
              {draftBlogs.map((blog, index) => (
                <Box key={index} sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Last Edited: {blog.lastEdited}
                  </Typography>
                  {/* Add more details about the draft blog if needed */}
                </Box>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
