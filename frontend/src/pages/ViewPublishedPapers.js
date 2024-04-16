import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useNavigate } from "react-router-dom";

const ViewPublishedPapers = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [login_id, setLogin] = useState("");

  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [uploadedpage, setUploadedPage] = useState(true);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (uploadedpage) {
      if (user) {
        setLogin(user.login_id);
      } else {
        navigate("/login", { required: true });
      }

      async function func() {
        try {
          let result = await fetch(
            "http://localhost:4000/fetchallpublishedpapers",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          result = await result.json();

          let temp_blogs = [];

          if (result.blogs) {
            for (let i = 0; i < result.blogs.length; i++) {
              temp_blogs.push({
                title: result.blogs[i].title,
                coAuthors: result.blogs[i].authors,
                id: result.blogs[i]._id,
              });
            }
            setPublishedBlogs([...publishedBlogs, ...temp_blogs]);
          }
        } catch (error) {
          console.log(error);
        }
      }

      func();
      setUploadedPage(false);
    }
  }, [login_id, navigate, publishedBlogs, uploadedpage, user]);

  return (
    <Box
      mt={4}
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Papers Published" />
            </Tabs>
          </AppBar>
          {tabValue === 0 && (
            <>
              {publishedBlogs.map((blog, index) => (
                <Link key={index} href={`/review/${blog.id}`}>
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
                    {/* Additional details about the published blog can be added here */}
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

export default ViewPublishedPapers;
