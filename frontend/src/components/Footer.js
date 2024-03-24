import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Company Name
            </Typography>
            <Typography variant="body2" component="p">
              Making the world a better place through constructing elegant hierarchies.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Resources
            </Typography>
            <Link href="#" variant="body2" color="inherit" sx={{ display: 'block' }}>Resource 1</Link>
            <Link href="#" variant="body2" color="inherit" sx={{ display: 'block' }}>Resource 2</Link>
            <Link href="#" variant="body2" color="inherit" sx={{ display: 'block' }}>Resource 3</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="inherit">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="inherit">
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
