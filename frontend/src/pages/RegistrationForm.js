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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Registerationform = () => {
  const [professionalStatus, setProfessionalStatus] = useState('');
  const [gender, setGender] = useState('');
  const [degree, setDegree] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      gender: data.get('gender'),
      dob: data.get('dob'),
      professionalStatus: professionalStatus,
    });
    console.log(data)
  };

  const handleChange = (e, setState) => {
    setState(e.target.value)
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
              {/* <TextField
                fullWidth
                name="gender"
                id="gender"
                label="Gender"
                helperText="Please specify your gender."
              /> */}
              <FormControl fullWidth>
                <InputLabel 
                  id="gender"
                  >Gender</InputLabel>
                  
                <Select
                  labelId="gender"
                  id="select"
                  value={gender}
                  label="Gender"
                  onChange={() => handleChange(setGender)}
                  >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
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
                {/* <TextField
                  fullWidth
                  name="degrees"
                  id="degrees"
                  label="Highest Degree Completed"
                  helperText="Please provide your highest degree completed"
                    /> */}
                <FormControl fullWidth>
                  <InputLabel 
                    id="degree"
                    >Highest Degree Completed</InputLabel>
                  
                  <Select
                    labelId="degree"
                    id="select"
                    value={degree}
                    label="Highest Degree Completed"
                    onChange={() => handleChange(setDegree)}
                    >
                    <MenuItem value={"PhD"}>PhD</MenuItem>
                    <MenuItem value={"PG"}>PG</MenuItem>
                    <MenuItem value={"UG"}>UG</MenuItem>
                    <MenuItem value={"Diploma"}>Diploma</MenuItem>
                    <MenuItem value={"Higher-Secondary-School"}>Higher Secondary School</MenuItem>
                    <MenuItem value={"High-School"}>High School</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
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
              <FormControl fullWidth>
                <InputLabel 
                  id="professionalStatus"
                  >Professional Status</InputLabel>
                  
                <Select
                  labelId="professionalStatus"
                  id="select"
                  value={professionalStatus}
                  label="Professional Status"
                  onChange={() => handleChange(setProfessionalStatus)}
                  >
                  <MenuItem value={"Professor"}>Professor</MenuItem>
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Corporate"}>Corporate</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
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
