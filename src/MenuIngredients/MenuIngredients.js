import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const ingredients = [
  'Яйца',
  'Молоко',
  'Курица',
  'Говядина',
  'Авокадо',
  'Творог',
  'Сыр',
  'Йогурт',
  'Морепродукты',
];

export default function MenuIngredients() {
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
        Ингредиенты
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
        {ingredients.map((ingredient) => (
          <MenuItem key={ingredient} onClick={handleClose}>
            <Link
              to={`/ingredients/${ingredient}`}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              {ingredient}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
