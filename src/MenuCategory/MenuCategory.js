import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../utils';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSearchInput } from '../store/searchSlice';

export default function MenuCategory() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(clearSearchInput(''));
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
        Категории
      </Button>
      <Menu
        id="demo-positioned-menu"
        sx={{ top: '45px', opacity: 0.9 }}
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
        {categories.map((item) => (
          <Link
            to={`/categories/${item}`}
            key={item}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            onClick={handleClose}
          >
            <MenuItem sx={{ color: 'black', fontWeight: 400, fontSize: '1rem' }}>{item}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
