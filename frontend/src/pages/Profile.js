import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);   
  const user1 = JSON.parse(localStorage.getItem('user'));
  const loginId = user1.login_id


  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`/profile/${loginId}`); // Replace '123' with the actual user ID
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container>
      {user && (
        <div>
          <Typography variant="h4" gutterBottom>
            {`${user.first_name} ${user.last_name}`}
          </Typography>
          <Divider />
          <Typography variant="body1" gutterBottom>
            <strong>Login ID:</strong> {user.login_id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Gender:</strong> {user.gender}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user.additional_email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Degrees Completed:</strong> {user.degrees_completed}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Personal Links:</strong> {user.personal_links}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Professional Status:</strong> {user.professional_status}
          </Typography>
          {/* <Typography variant="body1" gutterBottom>
            <strong>Published Papers:</strong> {user.published_papers.join(', ')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Review Papers:</strong> {user.review_papers.join(', ')}
          </Typography> */}
        </div>
      )}
    </Container>
  );
};

export default ProfilePage;
