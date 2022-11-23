import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/setFavoriteSlice';
import { clearSearchInput } from '../store/searchSlice';
import { hideSearchBar } from '../store/searchSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeItem(props) {
  const { title, src, subheader, alt, description, id, categories, onItemClick } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (typeof onItemClick === 'undefined') {
      return;
    }
    onItemClick(id);
    dispatch(clearSearchInput(''));
    console.log('onItemClick id', id);
  };;

  const favoriteRecipes = useSelector((state) => state.favoriteRecipes.favoriteRecipes);

  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes !== null ? favoriteRecipes.includes(id) : false,
  );

  //console.log('flag-favorite', isFavorite);

  const handleFavoriteClick = React.useCallback(
    (e) => {
      e.preventDefault();

      setIsFavorite(!isFavorite);
      // console.log('isFav', isFavorite);

      if (!isFavorite) {
        dispatch(addFavorite(id));
      } else {
        dispatch(removeFavorite(id));
      }
    },
    [isFavorite],
  );

  const handleEditClick = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(hideSearchBar(true));
      navigate('/edit-recipe');
    }
  );

  return (
    <Card
      onClick={handleItemClick}
      sx={{
        maxWidth: 315,
        minWidth: 315,
        height: '96%',
        backgroundColor: 'rgba(236, 236, 236, 1)',
        borderRadius: '10px',
        margin: '10px',
        cursor: typeof onItemClick === 'undefined' ? 'default' : 'pointer',
      }}
      id={id}
    >
      <CardHeader
        sx={{ height: '88px' }}
        action={
          <>
            <IconButton
              aria-label="add to favorites"
              onClick={handleFavoriteClick}
              sx={isFavorite ? { color: 'red' } : { color: 'rgba(0, 0, 0, 0.54)' }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia
      // component="a"
      // onClick={handleItemClick}
      // sx={{
      //   cursor: typeof onItemClick === 'undefined' ? 'default' : 'pointer',
      // }}
      >
        <Box component="img" src={src} height="310px" width="350px" alt={alt} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ mt: '10px' }}>
          {/* <Typography>Категории:</Typography> */}
          <Typography variant="body2" color="text.secondary">
            {categories.map((category) => (
              <Button
                sx={{
                  backgroundColor: '#ccc',
                  // padding: '2px',
                  mr: '6px',
                  mb: '6px',
                  opacity: 0.6,
                  color: 'black',
                  borderRadius: '14px',
                  '&:hover': { backgroundColor: '#b5b3b3', opacity: 1 },
                }}
                variant="contained"
                size="small"
                key={category + 'item'}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/categories/${category}`);
                }}
              >
                {category.toUpperCase() + ' '}
              </Button>
            ))}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
