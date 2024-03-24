import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Registerationform = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      gender: data.get('gender'),
      dob: data.get('dob'),
      additionalEmails: additionalEmails,
      personalLinks: personalLinks,
      educationStatus: data.get('educationStatus'),
      degreesCompleted: degreesCompleted,
      degreesPursuing: data.get('degreesPursuing'),
      expectedGraduationYear: data.get('expectedGraduationYear'),
    });
    // Handle registration logic here
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                helperText="Please enter your full name."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="gender"
                id="gender"
                label="Gender"
                helperText="Please specify your gender."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="dob"
                id="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                helperText="Please provide your date of birth."
              />
            </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="emails"
                  id="emails"
                  label="Emails"
                  helperText="Please provide your alternate email"
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="degrees"
                  id="degrees"
                  label="Degrees Completed"
                  helperText="Please provide your highest degree completed"
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="personalLinks"
                  id="personalLinks"
                  label="Personal Links"
                  helperText="Please provide your personal link (LinkedIn, Twitter, Github etc.)"
                />
              </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="educationStatus"
                id="educationStatus"
                label="Education Status"
                helperText="Please specify your current education status (e.g., student, professor, etc.)."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="degreesPursuing"
                id="degreesPursuing"
                label="Degrees Pursuing"
                helperText="Please list the degrees you are currently pursuing."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="expectedGraduationYear"
                id="expectedGraduationYear"
                label="Expected Graduation Year"
                type="number"
                helperText="Please specify your expected year of graduation."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Registerationform;
