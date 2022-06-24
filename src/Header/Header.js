import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIngredients from '../MenuIngredients/MenuIngredients.js'
import MenuCategory from '../MenuCategory/MenuCategory.js';


const pages = ['Categories', 'All Recipes'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
     console.log('click', event.currentTarget);

  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
     //console.log('click');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    console.log('click2');
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: '#ccc',
        }}
      >
        <Toolbar disableGutters>
          <Box component="a" href="/">
            <Box
              component="img"
              sx={{
                height: 70,
                width: 70,
                maxHeight: { xs: 100, md: 50 },
                maxWidth: { xs: 100, md: 50 },
                display: { xs: 'none', md: 'flex' },
                mr: 1,
              }}
              alt=" logo"
              src="/images/logo.svg"
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 400,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              pl: '23px',
            }}
          >
            PHYSICAL RECIPES
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
                textAlign: 'center',
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
              <MenuIngredients />
              <MenuCategory />
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block' }}>
                All Recipes
              </Button>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'roboto',
              fontWeight: 400,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PHYSICAL RECIPES
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}
          >
            <MenuIngredients />
            <MenuCategory />
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              All Recipes
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
