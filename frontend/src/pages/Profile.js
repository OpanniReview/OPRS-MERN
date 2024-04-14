import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, TextField } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);   
  const user1 = JSON.parse(localStorage.getItem('user'));
  const loginId = user1.login_id

  useEffect(() => {

    console.log(loginId)
    const fetchUser = async () => {
      try {
        console.log("Fetching User")
        const response = await fetch(
          'http://localhost:4000/profile/', {
            method: "post",
            body: JSON.stringify({ loginId: loginId }),
            headers: {
              'Content-Type': 'application/json'
            }
          }); 
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        console.log("Fetching User Done")
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '20px' }}>
      {user && (
        <div style={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Divider style={{ marginBottom: '20px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Login ID</Typography>
              <TextField
                value={user.login_id}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Gender</Typography>
              <TextField
                value={user.gender}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Date of Birth</Typography>
              <TextField
                value={new Date(user.dob).toLocaleDateString()}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Email</Typography>
              <TextField
                value={user.additional_email}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Degrees Completed</Typography>
              <TextField
                value={user.degrees_completed}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Personal Links</Typography>
              <TextField
                value={user.personal_links}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Professional Status</Typography>
              <TextField
                value={user.professional_status}
                disabled
                fullWidth
                InputProps={{ disableUnderline: true }}
                style={{ marginBottom: '5px' }}
              />
            </div>
            {/* Add more data fields here */}
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProfilePage;
