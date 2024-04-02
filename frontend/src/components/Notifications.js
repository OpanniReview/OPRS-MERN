import React from 'react';
import { Button, Popover, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Box, grid2Classes } from '@mui/material';
import { spacing } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const NotificationsPage = () => {

  


  const notifications = 
  [
    {  title:'Notification 1', content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).' },
    {  title:'Notification 12', content: 'Hello3' },
    {  title:'Notification 13', content: 'Hello2' }

  ]
  return (
    <>
      <Typography variant='h6' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >Notifications</Typography>
      <div>
        {notifications.map((notification, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
              <Typography>{notification.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography>{notification.content}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};


// const NotificationsPage = () =>{
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;
//   return(
//     <div>
//       <Button aria-describedby={id} variant="contained" onClick={handleClick}>
//         Open Popover
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         sx={{maxWidth: 'md'}}
//       >
//         {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
//         <PopperMenu />
//       </Popover>
//     </div>
//   )
// }

export default NotificationsPage;