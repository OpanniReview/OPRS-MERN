// ResponsiveNavbar.js
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';

const pages = ['conferences', 'view paper', 'profile', 'logout'];
const href_pages = ['conferences', 'papers', 'profile', 'login'];

const ResponsiveNavbar = () => {
  const url_ = window.location.pathname.split('/').pop();
  const [currentUrl, setCurrentUrl] = useState(url_)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isLogin, setIsLogin] = useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (index) => {
    if (index === 1) {
      localStorage.setItem('user', null)
    }

    setAnchorElNav(null);
  };

  useEffect(()=>{
    const url =  window.location.href.split('/')
    if (url[url.length - 1] === 'login') {
      setIsLogin(true)
      console.log("Yes it is login")
    }

    console.log(isLogin)
  }, [currentUrl])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key='conferences' onClick={() => {handleCloseNavMenu(0)}}>
                <Link href="/conferences">Conferences</Link>
              </MenuItem>
              <MenuItem key='view paper' >
                <Link href="/papers">View Papers</Link>
              </MenuItem>
              <MenuItem key='profile' >
                <Link href="/profile">Profile</Link>
              </MenuItem>
              <MenuItem key='logout' onClick={() => {handleCloseNavMenu(1)}}>
                <Link href="/login">Logout</Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          {/* {
            pages.map((page, index) => {
              return (
              <Box key={index} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                <Button
                  key={page.toUpperCase()}
                  // onClick={(event) => handleCloseNavMenu(index)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href={`/${href_pages[index]}`}
                >
                  {page}
                </Button>
              </Box>
              )
            })
          } */}
          { !isLogin && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button
                key='Conferences'
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/conferences'
              >
                Conferences
              </Button>
            </Box>
            )}
          { !isLogin && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button
                key='viewPapers'
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/papers'
              >
                View Papers
              </Button>
            </Box>
            )}
          { !isLogin && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button
                key='Profile'
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/profile'
              >
                Profile
              </Button>
            </Box>
            )}
          { !isLogin && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Button
                key='Logout'
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/login'
              >
                Logout
              </Button>
            </Box>
            )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveNavbar;
