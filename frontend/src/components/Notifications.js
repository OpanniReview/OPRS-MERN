import React from 'react';
import { Button, Popover, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, Box, grid2Classes } from '@mui/material';
import { spacing } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';


const NotificationsPage = () => {
  
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    async function func() {
      try {
        let result = await fetch(
          'http://localhost:4000/fetchnotifications', {
            method: "post",
            body: JSON.stringify({ login_id: user.login_id }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          result = await result.json();

          let temp_blogs = []

          if (result.notifications) {
            for(let i=0; i < result.notifications.length; i++) {
              temp_blogs.push({
                title: result.notifications[i].title,
                content: result.notifications[i].content,
              })
            }
            setNotifications([...notifications, ...temp_blogs.reverse()])
          }          
          
      } catch(error) {
        console.log(error);
      }
    }

    func();
  }, [])


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