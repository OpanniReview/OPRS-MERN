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

  let login_id = "rishabh8124@kgpain.iitkgp.ac.in"
  if (location.state) login_id = location.state.login_id;

  // Dummy data for blogs (replace with your actual data)
  const publishedBlogs = [
    { title: 'Published Blog 1', dateWritten: '2022-03-25', coAuthors: ['Author 1', 'Author 2'] },
    { title: 'Published Blog 2', dateWritten: '2022-04-01', coAuthors: ['Author 1'] },
    // Add more published blogs as needed
  ];

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
                  <Typography variant="subtitle2" gutterBottom>
                    Date Written: {blog.dateWritten}
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
