import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { categories } from '../utils';
import { Link } from 'react-router-dom';

export default function MenuCategory() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <MenuItem key={item} onClick={handleClose}>
            <Link
              to={`/categories/${item}`}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              {item}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
