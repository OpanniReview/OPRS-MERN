import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from 'react-router-dom';

const Registerationform = () => {
  const [professionalStatus, setProfessionalStatus] = useState('');
  const [gender, setGender] = useState('');
  const [degree, setDegree] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));
  const login_id = user.login_id;
  
  const first_name = location.state.first_name;
  const last_name = location.state.last_name;
  const [name, setName] = useState(first_name + " " + last_name);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dob = data.get('dob')
    const email = data.get('emails')
    const personal_link = data.get('personalLinks')

    try {
      let result = await fetch(
        'http://localhost:4000/register', {
          method: "post",
          body: JSON.stringify({login_id, first_name, last_name, gender, dob, email, degree, personal_link, professionalStatus}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        result = await result.json();

        if (result.status) {
          navigate('/dashboard', {required: true, state: {login_id}});
        } else {
          console.log("Register Fail");
        }

    } catch(error) {
      console.log(error);
    }
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
                disabled
                autoComplete="name"
                name="name"
                value = {name}
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                helperText="Please enter your full name."
                onChange={(event) => handleChange(event, setName)}
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
                  onChange={(event) => handleChange(event, setGender)}
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
                    onChange={(event) => handleChange(event, setDegree)}
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
                  onChange={(event) => handleChange(event, setProfessionalStatus)}
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
            link="\dashboard"
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Registerationform;
