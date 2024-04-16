import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useNavigate } from "react-router-dom";

// import NotificationsPage from '../components/Notifications';

const Admin = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [start_render, setstart] = useState(true);
  const [login_id, setLogin] = useState("");

  useEffect(() => {
    if (start_render) {
      if (user) {
        setLogin(user.login_id);
      } else {
        navigate("/login", { required: true });
      }

      if (user.login_id !== "admin@oprs.edu.com") {
        navigate("/login", { required: true });
      }
      setstart(false);
    }

    func()
  },[]);

  const [submittedBlogs, setSubmittedBlogs] = useState([]);

  const [draftBlogs, setDraftBlogs] = useState([]);

  const [publishedBlogs, setPublishedBlogs] = useState([]);

  const [uploadedpage, setUploadedPage] = useState(false);

  const func = async () => {
    try {
      let result = await fetch("http://localhost:4000/fetchallpapersAdmin", {
        method: "post",
        body: JSON.stringify({ login_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      let temp_blogs = [];
      let temp_blogs_1 = [];
      let temp_blogs_2 = [];

      if (result.blogs) {
        for (let i = 0; i < result.blogs.length; i++) {
          temp_blogs.push({
            title: result.blogs[i].title,
            coAuthors: result.blogs[i].authors,
            id: result.blogs[i]._id
          });
        }
        setSubmittedBlogs([...submittedBlogs, ...temp_blogs]);
      }

      if (result.reviewers_assigned) {
        for (let i = 0; i < result.reviewers_assigned.length; i++) {
          temp_blogs_1.push({
            title: result.reviewers_assigned[i].title,
            coAuthors: result.reviewers_assigned[i].authors,
            reviewers: result.reviewers_assigned[i].reviewers,
            id: result.reviewers_assigned[i]._id
          });
        }
  
        setDraftBlogs([...draftBlogs, ...temp_blogs_1]);
      }

      if (result.published_blogs) {
        for (let i = 0; i < result.published_blogs.length; i++) {
          temp_blogs_2.push({
            title: result.published_blogs[i].title,
            coAuthors: result.published_blogs[i].authors,
            id: result.published_blogs[i]._id
          });
        }
  
        setPublishedBlogs([...publishedBlogs, ...temp_blogs_2]);

      }
    } catch (error) {
      console.log(error);
    }
  };

  if (uploadedpage === false) {
    func();
    setUploadedPage(true);
  }

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box mt={4}>
      <Grid container justifyContent={'center'}>
        <Grid>
          {/* Tabs for switching between published and draft blogs */}
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Papers Submitted" />
              <Tab label="Papers Sent for Review" />
              <Tab label="Papers Published" />
            </Tabs>
          </AppBar>
          {/* Display the selected blogs */}
          {tabValue === 0 && (
            <>
              {submittedBlogs.map((blog, index) => (
                <Link key={index} href={`/review/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Co-Authors: {blog.coAuthors.join(", ")}
                    </Typography>
                    {/* Add more details about the published blog if needed */}
                  </Box>
                </Link>
              ))}
            </>
          )}
          {tabValue === 1 && (
            <>
              {draftBlogs.map((blog, index) => (
                <Link key={index} href={`/review/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Reviewers: {blog.reviewers.toString()}
                    </Typography>
                    {/* Add more details about the draft blog if needed */}
                  </Box>
                </Link>
              ))}
            </>
          )}
          {tabValue === 2 && (
            <>
              {publishedBlogs.map((blog, index) => (
                <Link key={index} href={`/review/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {blog.title}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Reviewers: {blog.reviewers}
                    </Typography>
                    {/* Add more details about the draft blog if needed */}
                  </Box>
                </Link>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
