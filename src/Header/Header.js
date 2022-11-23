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
import MenuIngredients from '../MenuIngredients/MenuIngredients.js';
import MenuCategory from '../MenuCategory/MenuCategory.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showFullRecipe } from '../store/fullRecipeSlice';
import { clearSearchInput, hideSearchBar } from '../store/searchSlice';
import { settings } from '../utils';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(showFullRecipe(false));
    dispatch(clearSearchInput(''));
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    // console.log('click2');
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: '#ccc',
          height: 100,
        }}
      >
        <Toolbar disableGutters sx={{ height: 100 }}>
          <Link to="/">
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
          </Link>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              // mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'roboto',
              fontWeight: 300,
              fontSize: '2rem',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              // pl: '23px',
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
                alignItems: 'center',
                padding: '12px',
              }}
            >
              <MenuIngredients />
              <MenuCategory />
              <Link to="all" style={{ textDecoration: 'none' }}>
                <Button
                  onClick={() => {
                    navigate('all', { replace: true });
                    handleCloseNavMenu();
                    dispatch(clearSearchInput(''));
                    dispatch(hideSearchBar(false));
                  }}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    fontWeight: 400,
                    fontSize: '1rem',
                  }}
                >
                  Все рецепты
                </Button>
              </Link>
              <Link to="add-recipe" style={{ textDecoration: 'none' }}>
                <Button
                  onClick={() => {
                    setAnchorElNav(null);
                    dispatch(hideSearchBar(true));
                    dispatch(clearSearchInput(''));
                  }}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    fontWeight: 400,
                    fontSize: '1rem',
                  }}
                >
                  Добавить рецепт
                </Button>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'roboto',
              fontWeight: 300,
              fontSize: '2rem',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PHYSICAL RECIPES
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'row-reverse',
              marginRight: '15px',
              marginLeft: '15px',
            }}
          >
            <MenuIngredients />
            <MenuCategory />
            <Link to="all" style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => {
                  handleCloseNavMenu;
                  dispatch(hideSearchBar(false));
                }}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 400, fontSize: '1rem' }}
              >
                Все Рецепты
              </Button>
            </Link>
            <Link to="add-recipe" style={{ textDecoration: 'none' }}>
              <Button
                onClick={() => {
                  dispatch(hideSearchBar(true));
                  dispatch(clearSearchInput(''));
                  handleCloseNavMenu;
                }}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 400, fontSize: '1rem' }}
              >
                Добавить рецепт
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Открыть настройки">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="/images/avatar/1.png" />
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
                <Link
                  to={`/settings/${setting}`}
                  style={{ color: 'inherit', textDecoration: 'inherit' }}
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
