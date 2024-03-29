import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { capitalize } from '../utils';
import { Link } from 'react-router-dom';
import { ingredients } from '../utils';
import { useDispatch } from 'react-redux';
import { clearSearchInput, hideSearchBar } from '../store/searchSlice';

export default function MenuIngredients() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(clearSearchInput(''));
    dispatch(hideSearchBar(false));
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          my: 2,
          color: { xs: 'black', md: 'white' },
          display: 'block',
          fontWeight: 400,
          fontSize: '1rem',
        }}
        onClick={handleClick}
      >
        Ингредиенты
      </Button>
      <Menu
        id="demo-positioned-menu"
        sx={{ top: '45px'}}
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {ingredients.map((ingredient) => (
          <Link
            to={`/ingredients/${ingredient}`}
            key={ingredient}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            onClick={handleClose}
          >
            <MenuItem>{capitalize(ingredient)}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
