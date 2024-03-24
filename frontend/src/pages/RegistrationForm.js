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
  const [additionalEmails, setAdditionalEmails] = useState(['']);
  const [degreesCompleted, setDegreesCompleted] = useState(['']);
  const [personalLinks, setPersonalLinks] = useState(['']);

  const handleAddField = (setState) => {
    setState([...setState, '']);
  };

  const handleRemoveField = (index, setState) => {
    setState((prevState) => prevState.filter((_, i) => i !== index));
  };

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
            {additionalEmails.map((email, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  name={`additionalEmail${index + 1}`}
                  id={`additionalEmail${index + 1}`}
                  label={`Additional Email ${index + 1}`}
                  value={email}
                  onChange={(e) => {
                    const updatedEmails = [...additionalEmails];
                    updatedEmails[index] = e.target.value;
                    setAdditionalEmails(updatedEmails);
                  }}
                />
                <Button onClick={() => handleRemoveField(index, setAdditionalEmails)}>Remove</Button>
              </Grid>
            ))}
            <Button onClick={() => handleAddField(setAdditionalEmails)}>Add Additional Email</Button>
            {degreesCompleted.map((degree, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  name={`degreeCompleted${index + 1}`}
                  id={`degreeCompleted${index + 1}`}
                  label={`Degree Completed ${index + 1}`}
                  value={degree}
                  onChange={(e) => {
                    const updatedDegrees = [...degreesCompleted];
                    updatedDegrees[index] = e.target.value;
                    setDegreesCompleted(updatedDegrees);
                  }}
                />
                <Button onClick={() => handleRemoveField(index, setDegreesCompleted)}>Remove</Button>
              </Grid>
            ))}
            <Button onClick={() => handleAddField(setDegreesCompleted)}>Add Completed Degree</Button>
            {personalLinks.map((link, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  name={`personalLink${index + 1}`}
                  id={`personalLink${index + 1}`}
                  label={`Personal Link ${index + 1}`}
                  value={link}
                  onChange={(e) => {
                    const updatedLinks = [...personalLinks];
                    updatedLinks[index] = e.target.value;
                    setPersonalLinks(updatedLinks);
                  }}
                />
                <Button onClick={() => handleRemoveField(index, setPersonalLinks)}>Remove</Button>
              </Grid>
            ))}
            <Button onClick={() => handleAddField(setPersonalLinks)}>Add Personal Link</Button>
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Registerationform;
