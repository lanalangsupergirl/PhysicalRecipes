import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/setFavoriteSlice';
import { useState } from 'react';

export default function RecipeItem(props) {
  const { title, src, subheader, alt, description, id, onItemClick } = props;

  const handleItemClick = () => {
    if (typeof onItemClick === 'undefined') {
      return;
    }

    onItemClick(id);
    console.log('onItemClick id', id);
  };

  const dispatch = useDispatch();

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

  return (
    <Card
      onClick={handleItemClick}
      sx={{
        maxWidth: 345,
        minWidth: 345,
        height: '96%',
        backgroundColor: 'rgba(236, 236, 236, 1)',
        margin: '10px',
        cursor: typeof onItemClick === 'undefined' ? 'default' : 'pointer',
      }}
      id={id}
    >
      <CardHeader
        sx={{ height: '88px' }}
        action={
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
            sx={isFavorite ? { color: 'red' } : { color: 'rgba(0, 0, 0, 0.54)' }}
          >
            <FavoriteIcon />
          </IconButton>
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
        <Box component="img" src={src} height="330px" width="350px" alt={alt} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
